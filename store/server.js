const crypto = require("crypto");
const fs = require("fs");
const fsp = require("fs/promises");
const http = require("http");
const path = require("path");
const { execFile } = require("child_process");

const rootDir = __dirname;

function loadEnvFile() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const config = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || "3306",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "store",
  mysqlBin:
    process.env.MYSQL_BIN ||
    "D:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe",
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sqlString(value) {
  return `'${String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "''")}'`;
}

function sqlUtf8(value) {
  return `_utf8mb4 0x${Buffer.from(String(value ?? ""), "utf8").toString("hex")}`;
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

function runMysql(sql, { database = config.database } = {}) {
  return new Promise((resolve, reject) => {
    const args = [
      `--host=${config.host}`,
      `--port=${config.port}`,
      `--user=${config.user}`,
      "--default-character-set=utf8mb4",
      "--batch",
      "--raw",
      "--skip-column-names",
    ];

    if (database) {
      args.push(`--database=${database}`);
    }

    args.push("--execute", sql);

    const env = { ...process.env };
    if (config.password) {
      env.MYSQL_PWD = config.password;
    }

    execFile(config.mysqlBin, args, { env, windowsHide: true }, (error, stdout, stderr) => {
      if (error) {
        const detail = stderr.trim() || error.message;
        reject(new Error(detail));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

async function runStoreSqlFile() {
  const sqlPath = path.join(rootDir, "db", "store.sql");
  const sql = await fsp.readFile(sqlPath, "utf8");
  await runMysql(sql, { database: "" });
}

function parseJsonOutput(output, fallback) {
  if (!output || output === "NULL") return fallback;
  const lastLine = output.split(/\r?\n/).filter(Boolean).at(-1);
  if (!lastLine || lastLine === "NULL") return fallback;
  return JSON.parse(lastLine);
}

function productJsonSql(alias = "p") {
  return `
    JSON_OBJECT(
      'id', ${alias}.product_id,
      'name', ${alias}.name,
      'category', ${alias}.category,
      'scene', ${alias}.scene,
      'price', CAST(${alias}.price AS UNSIGNED),
      'original', CAST(${alias}.original_price AS UNSIGNED),
      'rating', ${alias}.rating,
      'reviews', ${alias}.reviews,
      'stock', ${alias}.stock,
      'isNew', ${alias}.is_new,
      'onSale', ${alias}.on_sale,
      'featured', ${alias}.featured,
      'image', ${alias}.image_url,
      'fallback', ${alias}.fallback_url,
      'colors', CAST(${alias}.colors AS JSON),
      'desc', ${alias}.description,
      'material', ${alias}.material,
      'delivery', ${alias}.delivery
    )
  `;
}

function userJsonSql(whereClause) {
  return `
    SELECT JSON_OBJECT(
      'id', u.id,
      'name', u.name,
      'account', u.account,
      'points', u.points,
      'coupons', (SELECT COUNT(*) FROM user_coupons c WHERE c.user_id = u.id AND c.status = 'unused'),
      'wishlistCount', (SELECT COUNT(*) FROM wishlist_items w WHERE w.user_id = u.id),
      'cartCount', COALESCE((SELECT SUM(ci.quantity) FROM cart_items ci WHERE ci.user_id = u.id), 0),
      'orderCount', (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id),
      'pendingOrders', (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id AND o.status IN ('pending', 'paid', 'processing')),
      'address', COALESCE(
        (SELECT CONCAT(a.receiver, ' · ', a.city) FROM addresses a WHERE a.user_id = u.id ORDER BY a.is_default DESC, a.id DESC LIMIT 1),
        '待完善'
      )
    )
    FROM users u
    ${whereClause}
    LIMIT 1
  `;
}

async function getProducts() {
  const output = await runMysql(`
    SELECT COALESCE(
      JSON_ARRAYAGG(
        ${productJsonSql("p")}
      ),
      JSON_ARRAY()
    )
    FROM products p
    WHERE p.active = 1
    ORDER BY p.featured DESC
  `);
  return parseJsonOutput(output, []);
}

async function getHealth() {
  const output = await runMysql(`
    SELECT JSON_OBJECT(
      'ok', TRUE,
      'database', DATABASE(),
      'version', VERSION(),
      'host', ${sqlString(config.host)},
      'port', ${sqlString(config.port)}
    )
  `);
  return parseJsonOutput(output, { ok: false });
}

function normalizeUser(row) {
  return {
    id: row.id,
    name: row.name,
    account: row.account,
    points: row.points,
    coupons: row.coupons,
    wishlistCount: row.wishlistCount || 0,
    cartCount: row.cartCount || 0,
    orderCount: row.orderCount || 0,
    pendingOrders: row.pendingOrders || 0,
    address: row.address,
  };
}

async function ensureInitialCoupons(userId) {
  const output = await runMysql(`
    SELECT COUNT(*)
    FROM user_coupons
    WHERE user_id = ${Number(userId)}
  `);
  if (Number(output) > 0) return;

  await runMysql(`
    INSERT INTO user_coupons (user_id, code, title, amount, min_spend, expires_at)
    VALUES
      (${Number(userId)}, 'MAISON120', '新会员满减券', 120, 799, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)),
      (${Number(userId)}, 'FREESHIP', '免运费券', 38, 0, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)),
      (${Number(userId)}, 'GIFTBOX', '礼盒包装券', 28, 399, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY))
  `);
}

async function findUser(account, password) {
  const output = await runMysql(userJsonSql(`
    WHERE u.account = ${sqlUtf8(account)}
      AND u.password_hash = ${sqlString(hashPassword(password))}
  `));
  const user = parseJsonOutput(output, null);
  if (!user) return null;
  await ensureInitialCoupons(user.id);
  return getUserById(user.id);
}

async function createUser({ name, account, password }) {
  const userName = name || (account.includes("@") ? account.split("@")[0] : `会员${account.slice(-4)}`);
  const output = await runMysql(`
    INSERT INTO users (name, account, password_hash, points)
    VALUES (${sqlUtf8(userName)}, ${sqlUtf8(account)}, ${sqlString(hashPassword(password))}, 1200);
    SET @new_user_id = LAST_INSERT_ID();
    INSERT INTO user_coupons (user_id, code, title, amount, min_spend, expires_at)
    VALUES
      (@new_user_id, 'MAISON120', '新会员满减券', 120, 799, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)),
      (@new_user_id, 'FREESHIP', '免运费券', 38, 0, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY)),
      (@new_user_id, 'GIFTBOX', '礼盒包装券', 28, 399, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY));
    ${userJsonSql("WHERE u.id = @new_user_id")}
  `);
  return normalizeUser(parseJsonOutput(output, null));
}

async function getUserById(userId) {
  if (!Number(userId)) return null;
  await ensureInitialCoupons(userId);
  const output = await runMysql(userJsonSql(`WHERE u.id = ${Number(userId)}`));
  const user = parseJsonOutput(output, null);
  return user ? normalizeUser(user) : null;
}

async function getCart(userId) {
  const output = await runMysql(`
    SELECT COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'quantity', ci.quantity,
          'product', ${productJsonSql("p")}
        )
      ),
      JSON_ARRAY()
    )
    FROM cart_items ci
    JOIN products p ON p.product_id = ci.product_id
    WHERE ci.user_id = ${Number(userId)}
    ORDER BY ci.updated_at DESC
  `);
  return parseJsonOutput(output, []);
}

async function setCartItem(userId, productId, quantity) {
  const safeQuantity = Math.max(0, Number(quantity) || 0);
  if (safeQuantity <= 0) {
    await runMysql(`
      DELETE FROM cart_items
      WHERE user_id = ${Number(userId)} AND product_id = ${sqlUtf8(productId)}
    `);
    return getCart(userId);
  }

  await runMysql(`
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES (${Number(userId)}, ${sqlUtf8(productId)}, ${safeQuantity})
    ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
  `);
  return getCart(userId);
}

async function addCartItem(userId, productId, delta = 1) {
  await runMysql(`
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES (${Number(userId)}, ${sqlUtf8(productId)}, ${Number(delta) || 1})
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `);
  return getCart(userId);
}

async function getWishlist(userId) {
  const output = await runMysql(`
    SELECT COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'product', ${productJsonSql("p")},
          'createdAt', w.created_at
        )
      ),
      JSON_ARRAY()
    )
    FROM wishlist_items w
    JOIN products p ON p.product_id = w.product_id
    WHERE w.user_id = ${Number(userId)}
    ORDER BY w.created_at DESC
  `);
  return parseJsonOutput(output, []);
}

async function toggleWishlistItem(userId, productId) {
  const existsOutput = await runMysql(`
    SELECT COUNT(*)
    FROM wishlist_items
    WHERE user_id = ${Number(userId)} AND product_id = ${sqlUtf8(productId)}
  `);
  const exists = Number(existsOutput) > 0;
  if (exists) {
    await runMysql(`
      DELETE FROM wishlist_items
      WHERE user_id = ${Number(userId)} AND product_id = ${sqlUtf8(productId)}
    `);
  } else {
    await runMysql(`
      INSERT INTO wishlist_items (user_id, product_id)
      VALUES (${Number(userId)}, ${sqlUtf8(productId)})
    `);
  }
  return { liked: !exists, items: await getWishlist(userId) };
}

async function getCoupons(userId) {
  const output = await runMysql(`
    SELECT COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', id,
          'code', code,
          'title', title,
          'amount', CAST(amount AS UNSIGNED),
          'minSpend', CAST(min_spend AS UNSIGNED),
          'status', status,
          'expiresAt', expires_at
        )
      ),
      JSON_ARRAY()
    )
    FROM user_coupons
    WHERE user_id = ${Number(userId)}
    ORDER BY status = 'unused' DESC, expires_at ASC, id DESC
  `);
  return parseJsonOutput(output, []);
}

async function getAddresses(userId) {
  const output = await runMysql(`
    SELECT COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', id,
          'receiver', receiver,
          'phone', phone,
          'province', province,
          'city', city,
          'detail', detail,
          'isDefault', is_default
        )
      ),
      JSON_ARRAY()
    )
    FROM addresses
    WHERE user_id = ${Number(userId)}
    ORDER BY is_default DESC, id DESC
  `);
  return parseJsonOutput(output, []);
}

async function getOrders(userId) {
  const output = await runMysql(`
    SELECT COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', o.id,
          'orderNo', o.order_no,
          'total', CAST(o.total AS UNSIGNED),
          'subtotal', CAST(o.subtotal AS UNSIGNED),
          'shipping', CAST(o.shipping AS UNSIGNED),
          'discount', CAST(o.discount AS UNSIGNED),
          'status', o.status,
          'createdAt', o.created_at,
          'items', COALESCE((
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'productId', oi.product_id,
                'name', oi.product_name,
                'price', CAST(oi.unit_price AS UNSIGNED),
                'quantity', oi.quantity
              )
            )
            FROM order_items oi
            WHERE oi.order_id = o.id
          ), JSON_ARRAY())
        )
      ),
      JSON_ARRAY()
    )
    FROM orders o
    WHERE o.user_id = ${Number(userId)}
    ORDER BY o.created_at DESC
  `);
  return parseJsonOutput(output, []);
}

async function createOrderFromCart(userId, couponCode = "") {
  const cart = await getCart(userId);
  if (!cart.length) {
    throw new Error("购物车为空");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 799 ? 0 : 38;
  let discount = 0;
  let couponId = null;

  if (couponCode) {
    const couponOutput = await runMysql(`
      SELECT JSON_OBJECT('id', id, 'amount', CAST(amount AS UNSIGNED), 'minSpend', CAST(min_spend AS UNSIGNED))
      FROM user_coupons
      WHERE user_id = ${Number(userId)}
        AND code = ${sqlUtf8(couponCode)}
        AND status = 'unused'
      LIMIT 1
    `);
    const coupon = parseJsonOutput(couponOutput, null);
    if (coupon && subtotal >= coupon.minSpend) {
      couponId = coupon.id;
      discount = Math.min(Number(coupon.amount), subtotal + shipping);
    }
  }

  const total = Math.max(0, subtotal + shipping - discount);
  const orderNo = `MS${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const itemSql = cart
    .map(
      (item) =>
        `(@order_id, ${sqlUtf8(item.product.id)}, ${sqlUtf8(item.product.name)}, ${Number(item.product.price)}, ${Number(item.quantity)})`,
    )
    .join(",");

  const output = await runMysql(`
    INSERT INTO orders (user_id, order_no, total, subtotal, shipping, discount, status)
    VALUES (${Number(userId)}, ${sqlUtf8(orderNo)}, ${total}, ${subtotal}, ${shipping}, ${discount}, 'pending');
    SET @order_id = LAST_INSERT_ID();
    INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
    VALUES ${itemSql};
    ${couponId ? `UPDATE user_coupons SET status = 'used' WHERE id = ${Number(couponId)};` : ""}
    DELETE FROM cart_items WHERE user_id = ${Number(userId)};
    SELECT JSON_OBJECT('orderNo', ${sqlUtf8(orderNo)}, 'total', ${total})
  `);
  return parseJsonOutput(output, { orderNo, total });
}

async function handleApi(req, res, url) {
  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, await getHealth());
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/products") {
      sendJson(res, 200, await getProducts());
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/user") {
      const userId = Number(url.searchParams.get("userId"));
      const user = await getUserById(userId);
      if (!user) {
        sendJson(res, 404, { message: "用户不存在" });
        return;
      }
      sendJson(res, 200, user);
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/cart") {
      sendJson(res, 200, await getCart(Number(url.searchParams.get("userId"))));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/cart/add") {
      const body = await readBody(req);
      sendJson(res, 200, await addCartItem(body.userId, body.productId, body.quantity || 1));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/cart/set") {
      const body = await readBody(req);
      sendJson(res, 200, await setCartItem(body.userId, body.productId, body.quantity));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/wishlist") {
      sendJson(res, 200, await getWishlist(Number(url.searchParams.get("userId"))));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/wishlist/toggle") {
      const body = await readBody(req);
      sendJson(res, 200, await toggleWishlistItem(body.userId, body.productId));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/orders") {
      sendJson(res, 200, await getOrders(Number(url.searchParams.get("userId"))));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/orders/checkout") {
      const body = await readBody(req);
      sendJson(res, 201, await createOrderFromCart(body.userId, body.couponCode || ""));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/coupons") {
      sendJson(res, 200, await getCoupons(Number(url.searchParams.get("userId"))));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/addresses") {
      sendJson(res, 200, await getAddresses(Number(url.searchParams.get("userId"))));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/auth/login") {
      const body = await readBody(req);
      const user = await findUser(String(body.account || "").trim(), String(body.password || ""));
      if (!user) {
        sendJson(res, 401, { message: "账号或密码不正确" });
        return;
      }
      sendJson(res, 200, user);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/auth/register") {
      const body = await readBody(req);
      const account = String(body.account || "").trim();
      const password = String(body.password || "");
      const name = String(body.name || "").trim();

      if (!account || password.length < 4) {
        sendJson(res, 400, { message: "请填写账号，并输入至少 4 位密码" });
        return;
      }

      try {
        sendJson(res, 201, await createUser({ name, account, password }));
      } catch (error) {
        if (String(error.message).includes("Duplicate entry")) {
          sendJson(res, 409, { message: "这个账号已经注册过" });
          return;
        }
        throw error;
      }
      return;
    }

    sendJson(res, 404, { message: "API not found" });
  } catch (error) {
    sendJson(res, 500, {
      message: "MySQL store connection failed",
      detail: error.message,
    });
  }
}

async function serveStatic(req, res, url) {
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(rootDir, requestedPath));

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

async function main() {
  if (process.argv.includes("--init-db")) {
    await runStoreSqlFile();
    console.log("Initialized MySQL database `store`.");
    return;
  }

  const port = Number(process.env.PORT || 5173);
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  });

  server.listen(port, () => {
    console.log(`Maison Store running at http://localhost:${port}`);
    console.log(`MySQL target: ${config.user}@${config.host}:${config.port}/${config.database}`);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
