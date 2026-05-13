const pexelsImage = (id, width = 900, height = 950) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;

let products = [
  {
    id: "watch-01",
    name: "Marlow 经典腕表",
    category: "配饰",
    scene: "通勤",
    price: 1280,
    original: 1480,
    rating: 4.9,
    reviews: 326,
    stock: 18,
    isNew: true,
    onSale: true,
    featured: 98,
    image: pexelsImage("8711224"),
    fallback: "assets/product-watch.svg",
    colors: ["#202629", "#b99a5b", "#f3eee5"],
    desc: "蓝宝石镜面与意大利小牛皮表带，适合正式会议与日常通勤。",
    material: "精钢 / 真皮",
    delivery: "24 小时内发货",
  },
  {
    id: "bag-02",
    name: "Northline 托特包",
    category: "包袋",
    scene: "通勤",
    price: 960,
    original: 0,
    rating: 4.8,
    reviews: 214,
    stock: 9,
    isNew: false,
    onSale: false,
    featured: 92,
    image: pexelsImage("35685412"),
    fallback: "assets/product-bag.svg",
    colors: ["#1d2424", "#8c6d54", "#d7d0c4"],
    desc: "大容量内仓与可拆卸电脑夹层，兼顾商务感和周末出行。",
    material: "植鞣皮 / 帆布",
    delivery: "48 小时内发货",
  },
  {
    id: "speaker-03",
    name: "Arc Mini 蓝牙音箱",
    category: "数码",
    scene: "居家",
    price: 620,
    original: 720,
    rating: 4.7,
    reviews: 178,
    stock: 24,
    isNew: true,
    onSale: true,
    featured: 91,
    image: pexelsImage("5511714"),
    fallback: "assets/product-speaker.svg",
    colors: ["#202020", "#d8d1c2", "#859a9a"],
    desc: "金属旋钮、低频增强与 18 小时续航，小空间也有饱满声场。",
    material: "阳极铝 / 织物",
    delivery: "现货闪送",
  },
  {
    id: "sneaker-04",
    name: "Civic Runner 轻量鞋",
    category: "鞋履",
    scene: "旅行",
    price: 780,
    original: 880,
    rating: 4.8,
    reviews: 431,
    stock: 6,
    isNew: false,
    onSale: true,
    featured: 88,
    image: pexelsImage("2529148"),
    fallback: "assets/product-sneaker.svg",
    colors: ["#f4efe5", "#2c3434", "#b45f3a"],
    desc: "轻量缓震中底与防泼水鞋面，城市步行与短途旅行都舒适。",
    material: "网布 / 橡胶",
    delivery: "48 小时内发货",
  },
  {
    id: "lamp-05",
    name: "Mica 可调光阅读灯",
    category: "家居",
    scene: "居家",
    price: 540,
    original: 0,
    rating: 4.9,
    reviews: 96,
    stock: 14,
    isNew: true,
    onSale: false,
    featured: 86,
    image: pexelsImage("1112598"),
    fallback: "assets/product-lamp.svg",
    colors: ["#1f2524", "#c7a55b", "#f0eadf"],
    desc: "三段色温、无频闪光源和细窄灯臂，书桌与床头都不占空间。",
    material: "铝合金 / 亚克力",
    delivery: "现货闪送",
  },
  {
    id: "fragrance-06",
    name: "Hinoki 木质香氛",
    category: "香氛",
    scene: "礼赠",
    price: 360,
    original: 420,
    rating: 4.6,
    reviews: 255,
    stock: 32,
    isNew: false,
    onSale: true,
    featured: 85,
    image: pexelsImage("1961792"),
    fallback: "assets/product-fragrance.svg",
    colors: ["#efe5d0", "#8f6d4d", "#2d3836"],
    desc: "雪松、扁柏与微辛香调，附赠雾面礼盒和手写卡片。",
    material: "天然精油",
    delivery: "24 小时内发货",
  },
  {
    id: "coffee-07",
    name: "Fellow 手冲咖啡壶",
    category: "家居",
    scene: "居家",
    price: 690,
    original: 0,
    rating: 4.7,
    reviews: 143,
    stock: 20,
    isNew: false,
    onSale: false,
    featured: 82,
    image: pexelsImage("12329015"),
    fallback: "assets/product-coffee.svg",
    colors: ["#111514", "#b7a077", "#e8e1d5"],
    desc: "细口控流、温控刻度与防烫手柄，让每天早上的冲煮更稳定。",
    material: "不锈钢",
    delivery: "48 小时内发货",
  },
  {
    id: "headphone-08",
    name: "Aural Pro 降噪耳机",
    category: "数码",
    scene: "旅行",
    price: 1490,
    original: 1690,
    rating: 4.9,
    reviews: 512,
    stock: 11,
    isNew: true,
    onSale: true,
    featured: 97,
    image: pexelsImage("3394666"),
    fallback: "assets/product-headphone.svg",
    colors: ["#242829", "#f1eadf", "#8fa1a1"],
    desc: "自适应降噪、空间音频与 40 小时续航，长途飞行也保持安静。",
    material: "铝合金 / 蛋白皮",
    delivery: "现货闪送",
  },
  {
    id: "wallet-09",
    name: "Slim Card 钱夹",
    category: "配饰",
    scene: "礼赠",
    price: 320,
    original: 0,
    rating: 4.6,
    reviews: 84,
    stock: 4,
    isNew: false,
    onSale: false,
    featured: 76,
    image: pexelsImage("27467367"),
    fallback: "assets/product-wallet.svg",
    colors: ["#2b1f19", "#1c2322", "#a87b53"],
    desc: "轻薄结构、RFID 防护与细腻压纹，适合日常携带和礼赠。",
    material: "头层牛皮",
    delivery: "24 小时内发货",
  },
];

products = [];

const state = {
  category: "全部",
  search: "",
  maxPrice: 1600,
  stockOnly: false,
  saleOnly: false,
  sort: "featured",
  cart: {},
  wishlist: [],
  coupons: [],
  orders: [],
  addresses: [],
  accountView: "",
  user: JSON.parse(localStorage.getItem("maison-user") || "null"),
  authMode: "login",
  discount: 0,
  promoCode: "",
  activeDrawer: null,
};

if (state.user && !state.user.id) {
  state.user = null;
  localStorage.removeItem("maison-user");
}

const els = {
  productGrid: document.querySelector(".product-grid"),
  categoryFilters: document.querySelector(".category-filters"),
  categoryTabs: document.querySelector(".category-tabs"),
  resultCount: document.querySelector(".result-count"),
  searchInput: document.querySelector(".search-input"),
  priceRange: document.querySelector(".price-range"),
  priceValue: document.querySelector(".price-value"),
  stockFilter: document.querySelector(".stock-filter"),
  saleFilter: document.querySelector(".sale-filter"),
  sortSelect: document.querySelector(".sort-select"),
  clearFilters: document.querySelector(".clear-filters"),
  userButton: document.querySelector(".user-open"),
  userDrawer: document.querySelector(".user-drawer"),
  userContent: document.querySelector(".user-content"),
  userLabel: document.querySelector(".user-label"),
  cartDrawer: document.querySelector(".cart-drawer"),
  wishlistDrawer: document.querySelector(".wishlist-drawer"),
  overlay: document.querySelector(".overlay"),
  cartItems: document.querySelector(".cart-items"),
  wishlistItems: document.querySelector(".wishlist-items"),
  cartCount: document.querySelector(".cart-count"),
  wishlistCount: document.querySelector(".wishlist-count"),
  subtotal: document.querySelector(".subtotal"),
  shipping: document.querySelector(".shipping"),
  discount: document.querySelector(".discount"),
  total: document.querySelector(".total"),
  promoInput: document.querySelector(".promo-input"),
  quickView: document.querySelector(".quick-view"),
  modalBody: document.querySelector(".modal-body"),
  emptyState: document.querySelector(".empty-state"),
  toast: document.querySelector(".toast"),
  themeToggle: document.querySelector(".theme-toggle"),
};

function getCategories() {
  return ["全部", ...new Set(products.map((product) => product.category))];
}
const iconSvgPaths = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41"/>',
  moon: '<path d="M20 14.4A7.8 7.8 0 0 1 9.6 4 8 8 0 1 0 20 14.4Z"/>',
  heart: '<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>',
  "user-plus": '<path d="M16 21a6 6 0 0 0-12 0"/><circle cx="10" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/>',
  "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  crown: '<path d="m3 8 4 4 5-8 5 8 4-4-2 11H5L3 8Z"/>',
  package: '<path d="M4 8 12 3l8 5-8 5-8-5Z"/><path d="M4 8v8l8 5 8-5V8"/><path d="M12 13v8"/>',
  ticket: '<path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V6Z"/><path d="M9 9h.01 M15 15h.01 M16 8l-8 8"/>',
  "map-pin": '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  "shopping-bag": '<path d="M6 7h12l-1 14H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
  truck: '<path d="M3 6h11v10H3Z"/><path d="M14 10h4l3 3v3h-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  sparkles: '<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z"/>',
  "shield-check": '<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v6h6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/>',
  "arrow-up-down": '<path d="m7 4-3 3 3 3"/><path d="M4 7h16"/><path d="m17 20 3-3-3-3"/><path d="M20 17H4"/>',
  "package-search": '<path d="M4 8 12 3l8 5-8 5-8-5Z"/><path d="M4 8v8l8 5 8-5V8"/><path d="M12 13v8"/><circle cx="18" cy="18" r="3"/><path d="m20.2 20.2 1.8 1.8"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  "trash-2": '<path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 14h10l1-14"/><path d="M9 7V4h6v3"/>',
  eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/>',
};

function money(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value);
}

function persist() {
  if (state.user) {
    localStorage.setItem("maison-user", JSON.stringify(state.user));
  } else {
    localStorage.removeItem("maison-user");
  }
}

localStorage.removeItem("maison-cart");
localStorage.removeItem("maison-wishlist");

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function imageFallbackAttr(fallback) {
  return `referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fallback}'"`;
}

async function apiRequest(url, options = {}) {
  if (window.location.protocol === "file:") {
    throw new Error("请用 http://localhost:5173 打开页面，直接打开 HTML 不会连接数据库");
  }

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "后端接口暂不可用");
  }
  return data;
}

function requireUser() {
  if (state.user?.id) return true;
  openDrawer("user");
  showToast("请先登录账号");
  return false;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
    return;
  }
  document.querySelectorAll("i[data-lucide]").forEach((node) => {
    const name = node.dataset.lucide;
    const paths = iconSvgPaths[name];
    if (!paths) return;
    node.outerHTML = `<svg class="local-icon" data-icon="${name}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  });
}

function getProduct(id) {
  return products.find((product) => product.id === id);
}

function normalizeProduct(product) {
  return {
    ...product,
    price: Number(product.price),
    original: Number(product.original || 0),
    rating: Number(product.rating),
    reviews: Number(product.reviews),
    stock: Number(product.stock),
    isNew: Boolean(product.isNew),
    onSale: Boolean(product.onSale),
    featured: Number(product.featured || 0),
    colors: Array.isArray(product.colors) ? product.colors : JSON.parse(product.colors || "[]"),
  };
}

function applyCartItems(items) {
  state.cart = {};
  (items || []).forEach((item) => {
    const product = normalizeProduct(item.product);
    if (!getProduct(product.id)) products.push(product);
    state.cart[product.id] = Number(item.quantity);
  });
}

function applyWishlistItems(items) {
  state.wishlist = [];
  (items || []).forEach((item) => {
    const product = normalizeProduct(item.product);
    if (!getProduct(product.id)) products.push(product);
    state.wishlist.push(product.id);
  });
}

async function loadProductsFromStore() {
  if (window.location.protocol === "file:") return false;

  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return false;
    products = data.map(normalizeProduct);
    return true;
  } catch (error) {
    console.warn("Store database products unavailable, using local fallback.", error);
    return false;
  }
}

async function loadAccountData() {
  if (!state.user?.id || window.location.protocol === "file:") return;

  const [user, cart, wishlist, coupons, orders, addresses] = await Promise.all([
    apiRequest(`/api/user?userId=${state.user.id}`),
    apiRequest(`/api/cart?userId=${state.user.id}`),
    apiRequest(`/api/wishlist?userId=${state.user.id}`),
    apiRequest(`/api/coupons?userId=${state.user.id}`),
    apiRequest(`/api/orders?userId=${state.user.id}`),
    apiRequest(`/api/addresses?userId=${state.user.id}`),
  ]);

  state.user = user;
  applyCartItems(cart);
  applyWishlistItems(wishlist);
  state.coupons = coupons;
  state.orders = orders;
  state.addresses = addresses;
  persist();
}

function getFilteredProducts() {
  const term = state.search.trim().toLowerCase();
  return products
    .filter((product) => state.category === "全部" || product.category === state.category)
    .filter((product) => product.price <= state.maxPrice)
    .filter((product) => !state.stockOnly || product.stock > 0)
    .filter((product) => !state.saleOnly || product.onSale)
    .filter((product) => {
      if (!term) return true;
      const haystack = [
        product.name,
        product.category,
        product.scene,
        product.desc,
        product.material,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    })
    .sort((a, b) => {
      if (state.sort === "priceAsc") return a.price - b.price;
      if (state.sort === "priceDesc") return b.price - a.price;
      if (state.sort === "rating") return b.rating - a.rating;
      if (state.sort === "newest") return Number(b.isNew) - Number(a.isNew);
      return b.featured - a.featured;
    });
}

function renderCategoryControls() {
  const categories = getCategories();
  const buttons = categories
    .map(
      (category) => `
        <button class="chip ${state.category === category ? "active" : ""}" type="button" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join("");
  const tabs = categories
    .map(
      (category) => `
        <button class="tab-btn ${state.category === category ? "active" : ""}" type="button" data-category="${category}" role="tab" aria-selected="${state.category === category}">
          ${category}
        </button>
      `,
    )
    .join("");

  els.categoryFilters.innerHTML = buttons;
  els.categoryTabs.innerHTML = tabs;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  els.resultCount.textContent = `${filtered.length} 件商品`;
  els.emptyState.hidden = filtered.length > 0;

  els.productGrid.innerHTML = filtered
    .map((product) => {
      const liked = state.wishlist.includes(product.id);
      const lowStock = product.stock <= 6;
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy" ${imageFallbackAttr(product.fallback)} />
            <div class="product-badges">
              ${product.isNew ? "<span>新品</span>" : ""}
              ${product.onSale ? "<span>优惠</span>" : ""}
            </div>
            <button class="wishlist-btn ${liked ? "active" : ""}" type="button" aria-label="${liked ? "取消收藏" : "加入收藏"}" data-action="wishlist" data-id="${product.id}">
              ${icon("heart")}
            </button>
          </div>
          <div class="product-info">
            <div class="product-meta">
              <span>${product.category}</span>
              <span>${product.scene}</span>
            </div>
            <h3>${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="swatches" aria-label="可选颜色">
              ${product.colors.map((color) => `<span class="swatch" style="background:${color}"></span>`).join("")}
            </div>
            <div class="rating-row">
              <span><strong>★ ${product.rating}</strong> / ${product.reviews} 条评价</span>
            </div>
            <div class="price-row">
              <span>
                <strong>${money(product.price)}</strong>
                ${product.original ? `<del>${money(product.original)}</del>` : ""}
              </span>
              <span class="stock ${lowStock ? "low" : ""}">${lowStock ? `仅 ${product.stock} 件` : "现货"}</span>
            </div>
            <div class="card-actions">
              <button class="quick-add" type="button" data-action="add" data-id="${product.id}">
                ${icon("shopping-bag")} 加入购物车
              </button>
              <button class="quick-view-btn" type="button" data-action="view" data-id="${product.id}" aria-label="快速预览 ${product.name}">
                ${icon("eye")} <span>预览</span>
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
  refreshIcons();
}

function renderCart() {
  const entries = Object.entries(state.cart);
  const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const subtotal = entries.reduce((sum, [id, quantity]) => sum + getProduct(id).price * quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 799 ? 0 : 38;
  const coupon = state.coupons.find(
    (item) => item.status === "unused" && item.code.toUpperCase() === state.promoCode.toUpperCase(),
  );
  const discount = coupon && subtotal >= coupon.minSpend ? Math.min(coupon.amount, subtotal + shipping) : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  els.cartCount.textContent = count;
  els.subtotal.textContent = money(subtotal);
  els.shipping.textContent = shipping ? money(shipping) : "免运费";
  els.discount.textContent = `-${money(discount)}`;
  els.total.textContent = money(total);

  els.cartItems.innerHTML = entries.length
    ? entries
        .map(([id, quantity]) => {
          const product = getProduct(id);
          return `
            <div class="cart-line">
              <img src="${product.image}" alt="${product.name}" ${imageFallbackAttr(product.fallback)} />
              <div class="line-main">
                <strong>${product.name}</strong>
                <span>${money(product.price)} · ${product.delivery}</span>
                <div class="qty-control" aria-label="${product.name} 数量">
                  <button class="qty-btn" type="button" data-action="decrease" data-id="${product.id}">${icon("minus")}</button>
                  <span>${quantity}</span>
                  <button class="qty-btn" type="button" data-action="increase" data-id="${product.id}">${icon("plus")}</button>
                </div>
              </div>
              <button class="remove-line" type="button" data-action="remove" data-id="${product.id}" aria-label="移除 ${product.name}">
                ${icon("trash-2")}
              </button>
            </div>
          `;
        })
        .join("")
    : `<div class="empty-copy">购物车还没有商品</div>`;
  persist();
  refreshIcons();
}

function renderWishlist() {
  els.wishlistCount.textContent = state.wishlist.length;
  els.wishlistItems.innerHTML = state.wishlist.length
    ? state.wishlist
        .map((id) => {
          const product = getProduct(id);
          return `
            <div class="wishlist-line">
              <img src="${product.image}" alt="${product.name}" ${imageFallbackAttr(product.fallback)} />
              <div class="line-main">
                <strong>${product.name}</strong>
                <span>${money(product.price)} · ${product.category}</span>
                <button class="quick-add" type="button" data-action="add" data-id="${product.id}">
                  ${icon("shopping-bag")} 加入购物车
                </button>
              </div>
              <button class="remove-line" type="button" data-action="wishlist" data-id="${product.id}" aria-label="取消收藏 ${product.name}">
                ${icon("x")}
              </button>
            </div>
          `;
        })
        .join("")
    : `<div class="empty-copy">收藏夹还没有商品</div>`;
  persist();
  refreshIcons();
}

function getUserInitial(name) {
  return (name || "M").trim().slice(0, 1).toUpperCase();
}

function maskAccount(account) {
  if (!account) return "未绑定账号";
  if (account.includes("@")) {
    const [name, domain] = account.split("@");
    return `${name.slice(0, 2)}***@${domain}`;
  }
  return account.replace(/^(\d{3})\d+(\d{2})$/, "$1****$2");
}

function renderAccountDetail() {
  if (!state.accountView) return "";

  if (state.accountView === "orders") {
    return `
      <div class="account-panel account-detail">
        <span>订单记录</span>
        ${
          state.orders.length
            ? state.orders
                .map(
                  (order) => `
                    <div class="data-card">
                      <strong>${order.orderNo}</strong>
                      <p>${order.items.map((item) => `${item.name} x${item.quantity}`).join("、")}</p>
                      <div><span>${order.status}</span><b>${money(order.total)}</b></div>
                    </div>
                  `,
                )
                .join("")
            : `<div class="empty-copy">数据库里还没有订单</div>`
        }
      </div>
    `;
  }

  if (state.accountView === "coupons") {
    return `
      <div class="account-panel account-detail">
        <span>优惠券</span>
        ${
          state.coupons.length
            ? state.coupons
                .map(
                  (coupon) => `
                    <div class="data-card">
                      <strong>${coupon.title}</strong>
                      <p>券码 ${coupon.code} · 满 ${money(coupon.minSpend)} 可用</p>
                      <div><span>${coupon.status === "unused" ? "可用" : "已使用"}</span><b>-${money(coupon.amount)}</b></div>
                    </div>
                  `,
                )
                .join("")
            : `<div class="empty-copy">数据库里还没有优惠券</div>`
        }
      </div>
    `;
  }

  return `
    <div class="account-panel account-detail">
      <span>收货地址</span>
      ${
        state.addresses.length
          ? state.addresses
              .map(
                (address) => `
                  <div class="data-card">
                    <strong>${address.receiver} ${address.phone}</strong>
                    <p>${address.province}${address.city}${address.detail}</p>
                    <div><span>${address.isDefault ? "默认地址" : "普通地址"}</span><b>数据库记录</b></div>
                  </div>
                `,
              )
              .join("")
          : `<div class="empty-copy">数据库里还没有收货地址</div>`
      }
    </div>
  `;
}

function renderUser() {
  const isSignedIn = Boolean(state.user);
  els.userLabel.textContent = isSignedIn ? state.user.name : "登录";
  els.userButton.classList.toggle("signed-in", isSignedIn);

  if (!isSignedIn) {
    const isRegister = state.authMode === "register";
    els.userContent.innerHTML = `
      <div class="auth-card">
        <div class="auth-switch" role="group" aria-label="登录或注册">
          <button class="auth-tab ${!isRegister ? "active" : ""}" type="button" data-auth-mode="login">
            ${icon("log-in")} 登录
          </button>
          <button class="auth-tab ${isRegister ? "active" : ""}" type="button" data-auth-mode="register">
            ${icon("user-plus")} 注册
          </button>
        </div>
        <form class="auth-form" data-auth-form>
          ${
            isRegister
              ? `<label>
                  <span>昵称</span>
                  <input name="name" type="text" placeholder="例如 Maison 会员" autocomplete="name" />
                </label>`
              : ""
          }
          <label>
            <span>手机号 / 邮箱</span>
            <input name="account" type="text" placeholder="输入手机号或邮箱" autocomplete="username" required />
          </label>
          <label>
            <span>密码</span>
            <input name="password" type="password" placeholder="至少 4 位" autocomplete="${isRegister ? "new-password" : "current-password"}" minlength="4" required />
          </label>
          <button class="checkout-btn" type="submit">${isRegister ? "创建账号" : "登录账号"}</button>
        </form>
        <p class="auth-note">账号会写入 store.users，购物车、收藏、订单、优惠券和地址都从数据库读取。</p>
      </div>
    `;
    refreshIcons();
    return;
  }

  const cartCount = Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0);
  const unusedCoupons = state.coupons.filter((coupon) => coupon.status === "unused").length;
  els.userContent.innerHTML = `
    <div class="member-card">
      <div class="member-top">
        <div class="member-name">
          <span>Maison Black</span>
          <strong>${state.user.name}</strong>
          <p>${maskAccount(state.user.account)}</p>
        </div>
        <div class="avatar">${getUserInitial(state.user.name)}</div>
      </div>
      <div class="member-stats">
        <div><strong>${state.user.points}</strong><span>积分</span></div>
        <div><strong>${unusedCoupons}</strong><span>优惠券</span></div>
        <div><strong>${state.wishlist.length}</strong><span>收藏</span></div>
      </div>
    </div>
    <div class="account-panel">
      <span>我的服务</span>
      <div class="account-list">
        <button class="account-row" type="button" data-user-action="orders">
          <span>${icon("package")} 我的订单</span>
          <small>${state.orders.length ? `${state.orders.length} 笔记录` : "暂无记录"}</small>
        </button>
        <button class="account-row" type="button" data-user-action="coupons">
          <span>${icon("ticket")} 优惠券</span>
          <small>${unusedCoupons} 张可用</small>
        </button>
        <button class="account-row" type="button" data-user-action="address">
          <span>${icon("map-pin")} 收货地址</span>
          <small>${state.addresses.length ? `${state.addresses.length} 条记录` : "待完善"}</small>
        </button>
      </div>
    </div>
    ${renderAccountDetail()}
    <button class="logout-btn" type="button" data-user-action="logout">
      ${icon("log-out")} 退出登录
    </button>
  `;
  persist();
  refreshIcons();
}

function renderAll() {
  renderCategoryControls();
  renderProducts();
  renderCart();
  renderWishlist();
  renderUser();
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 1800);
}

async function addToCart(id) {
  if (!requireUser()) return;
  const product = getProduct(id);
  const items = await apiRequest("/api/cart/add", {
    method: "POST",
    body: JSON.stringify({ userId: state.user.id, productId: id, quantity: 1 }),
  });
  applyCartItems(items);
  state.user = await apiRequest(`/api/user?userId=${state.user.id}`);
  renderCart();
  renderUser();
  showToast(`${product.name} 已加入购物车`);
}

async function toggleWishlist(id) {
  if (!requireUser()) return;
  const product = getProduct(id);
  const result = await apiRequest("/api/wishlist/toggle", {
    method: "POST",
    body: JSON.stringify({ userId: state.user.id, productId: id }),
  });
  applyWishlistItems(result.items);
  state.user = await apiRequest(`/api/user?userId=${state.user.id}`);
  renderProducts();
  renderWishlist();
  renderUser();
  showToast(result.liked ? `已收藏 ${product.name}` : `已取消收藏 ${product.name}`);
}

function setCategory(category) {
  state.category = category;
  renderCategoryControls();
  renderProducts();
}

function openDrawer(drawerName) {
  state.activeDrawer = drawerName;
  const drawers = {
    user: els.userDrawer,
    cart: els.cartDrawer,
    wishlist: els.wishlistDrawer,
  };
  Object.values(drawers).forEach((drawer) => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  });
  const drawer = drawers[drawerName];
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  els.overlay.hidden = false;
}

function closePanels() {
  state.activeDrawer = null;
  els.userDrawer.classList.remove("open");
  els.cartDrawer.classList.remove("open");
  els.wishlistDrawer.classList.remove("open");
  els.userDrawer.setAttribute("aria-hidden", "true");
  els.cartDrawer.setAttribute("aria-hidden", "true");
  els.wishlistDrawer.setAttribute("aria-hidden", "true");
  els.quickView.classList.remove("open");
  els.quickView.setAttribute("aria-hidden", "true");
  els.overlay.hidden = true;
}

function openQuickView(id) {
  const product = getProduct(id);
  const liked = state.wishlist.includes(id);
  els.modalBody.innerHTML = `
    <div class="modal-product">
      <img src="${product.image}" alt="${product.name}" ${imageFallbackAttr(product.fallback)} />
      <div class="modal-copy">
        <p class="eyebrow">${product.category} / ${product.scene}</p>
        <h2>${product.name}</h2>
        <p>${product.desc}</p>
        <div class="price-row">
          <span>
            <strong>${money(product.price)}</strong>
            ${product.original ? `<del>${money(product.original)}</del>` : ""}
          </span>
          <span class="stock ${product.stock <= 6 ? "low" : ""}">${product.stock <= 6 ? `仅 ${product.stock} 件` : "现货"}</span>
        </div>
        <div class="swatches">
          ${product.colors.map((color) => `<span class="swatch" style="background:${color}"></span>`).join("")}
        </div>
        <div class="detail-list">
          <div><span>材质</span><strong>${product.material}</strong></div>
          <div><span>配送</span><strong>${product.delivery}</strong></div>
          <div><span>评分</span><strong>★ ${product.rating}</strong></div>
          <div><span>评价</span><strong>${product.reviews} 条</strong></div>
        </div>
        <div class="modal-actions">
          <button class="quick-add" type="button" data-action="add" data-id="${product.id}">
            ${icon("shopping-bag")} 加入购物车
          </button>
          <button class="quick-view-btn" type="button" data-action="wishlist" data-id="${product.id}" aria-label="${liked ? "取消收藏" : "加入收藏"}">
            ${icon("heart")}
          </button>
        </div>
      </div>
    </div>
  `;
  els.quickView.classList.add("open");
  els.quickView.setAttribute("aria-hidden", "false");
  els.overlay.hidden = false;
  refreshIcons();
}

async function handleProductAction(target) {
  const button = target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "add") await addToCart(id);
  if (action === "wishlist") await toggleWishlist(id);
  if (action === "view") openQuickView(id);
  if (action === "increase") await addToCart(id);
  if (action === "decrease") {
    if (!requireUser()) return;
    const items = await apiRequest("/api/cart/set", {
      method: "POST",
      body: JSON.stringify({ userId: state.user.id, productId: id, quantity: (state.cart[id] || 0) - 1 }),
    });
    applyCartItems(items);
    state.user = await apiRequest(`/api/user?userId=${state.user.id}`);
    renderCart();
    renderUser();
  }
  if (action === "remove") {
    if (!requireUser()) return;
    const items = await apiRequest("/api/cart/set", {
      method: "POST",
      body: JSON.stringify({ userId: state.user.id, productId: id, quantity: 0 }),
    });
    applyCartItems(items);
    state.user = await apiRequest(`/api/user?userId=${state.user.id}`);
    renderCart();
    renderUser();
  }
}

async function handleUserAction(target) {
  const modeButton = target.closest("[data-auth-mode]");
  if (modeButton) {
    state.authMode = modeButton.dataset.authMode;
    renderUser();
    return;
  }

  const actionButton = target.closest("[data-user-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.userAction;

  if (action === "logout") {
    state.user = null;
    state.cart = {};
    state.wishlist = [];
    state.coupons = [];
    state.orders = [];
    state.addresses = [];
    state.accountView = "";
    state.promoCode = "";
    persist();
    renderAll();
    showToast("已退出登录");
    return;
  }

  if (!requireUser()) return;
  if (action === "orders") state.orders = await apiRequest(`/api/orders?userId=${state.user.id}`);
  if (action === "coupons") state.coupons = await apiRequest(`/api/coupons?userId=${state.user.id}`);
  if (action === "address") state.addresses = await apiRequest(`/api/addresses?userId=${state.user.id}`);
  state.accountView = action;
  renderUser();
}

async function authWithStore(mode, payload) {
  if (window.location.protocol === "file:") {
    throw new Error("请用 http://localhost:5173 打开页面，直接双击 HTML 不会连接数据库");
  }

  const response = await fetch(`/api/auth/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "用户接口暂不可用");
  }

  return response.json();
}

document.addEventListener("click", async (event) => {
  try {
    await handleProductAction(event.target);
    await handleUserAction(event.target);
  } catch (error) {
    showToast(error.message);
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    setCategory(categoryButton.dataset.category);
  }

  if (event.target.closest(".user-open")) openDrawer("user");
  if (event.target.closest(".cart-button")) openDrawer("cart");
  if (event.target.closest(".wishlist-open")) openDrawer("wishlist");
  if (
    event.target.closest(".close-user") ||
    event.target.closest(".close-cart") ||
    event.target.closest(".close-wishlist")
  ) {
    closePanels();
  }
  if (event.target.closest(".close-modal") || event.target === els.overlay) closePanels();
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-auth-form]");
  if (!form) return;
  event.preventDefault();

  const formData = new FormData(form);
  const account = String(formData.get("account") || "").trim();
  const password = String(formData.get("password") || "");
  const rawName = String(formData.get("name") || "").trim();

  if (!account || password.length < 4) {
    showToast("请填写账号，并输入至少 4 位密码");
    return;
  }

  try {
    const storeUser = await authWithStore(state.authMode, {
      name: rawName,
      account,
      password,
    });
    state.user = storeUser;
    await loadAccountData();
    persist();
    renderAll();
    showToast(state.authMode === "register" ? "注册成功，已写入 store 数据库" : "登录成功");
  } catch (error) {
    showToast(error.message);
  }
});

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

els.priceRange.addEventListener("input", (event) => {
  state.maxPrice = Number(event.target.value);
  els.priceValue.textContent = state.maxPrice;
  renderProducts();
});

els.stockFilter.addEventListener("change", (event) => {
  state.stockOnly = event.target.checked;
  renderProducts();
});

els.saleFilter.addEventListener("change", (event) => {
  state.saleOnly = event.target.checked;
  renderProducts();
});

els.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

els.clearFilters.addEventListener("click", () => {
  state.category = "全部";
  state.search = "";
  state.maxPrice = 1600;
  state.stockOnly = false;
  state.saleOnly = false;
  state.sort = "featured";
  els.searchInput.value = "";
  els.priceRange.value = "1600";
  els.priceValue.textContent = "1600";
  els.stockFilter.checked = false;
  els.saleFilter.checked = false;
  els.sortSelect.value = "featured";
  renderAll();
});

document.querySelector(".apply-promo").addEventListener("click", () => {
  const code = els.promoInput.value.trim().toUpperCase();
  const subtotal = Object.entries(state.cart).reduce((sum, [id, quantity]) => sum + getProduct(id).price * quantity, 0);
  const coupon = state.coupons.find((item) => item.status === "unused" && item.code.toUpperCase() === code);
  if (coupon && subtotal >= coupon.minSpend) {
    state.promoCode = code;
    showToast("数据库优惠券已生效");
  } else if (code) {
    state.promoCode = "";
    showToast("没有可用的数据库优惠券");
  }
  renderCart();
});

els.themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  els.themeToggle.innerHTML = icon(dark ? "moon" : "sun");
  localStorage.setItem("maison-theme", dark ? "dark" : "light");
  refreshIcons();
});

document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (!requireUser()) return;
  apiRequest("/api/orders/checkout", {
    method: "POST",
    body: JSON.stringify({ userId: state.user.id, couponCode: state.promoCode }),
  })
    .then(async (order) => {
      state.promoCode = "";
      els.promoInput.value = "";
      await loadAccountData();
      renderAll();
      showToast(`订单 ${order.orderNo} 已写入数据库`);
    })
    .catch((error) => showToast(error.message));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});

if (localStorage.getItem("maison-theme") === "dark") {
  document.body.classList.add("dark");
  els.themeToggle.innerHTML = icon("moon");
}

renderAll();
loadProductsFromStore()
  .then(() => loadAccountData())
  .then(() => renderAll())
  .catch((error) => showToast(error.message));
window.addEventListener("load", refreshIcons);
