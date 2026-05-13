CREATE DATABASE IF NOT EXISTS store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE store;

CREATE TABLE IF NOT EXISTS products (
  product_id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(40) NOT NULL,
  scene VARCHAR(40) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  rating DECIMAL(3, 1) NOT NULL DEFAULT 5.0,
  reviews INT NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  is_new TINYINT(1) NOT NULL DEFAULT 0,
  on_sale TINYINT(1) NOT NULL DEFAULT 0,
  featured INT NOT NULL DEFAULT 0,
  image_url VARCHAR(600) NOT NULL,
  fallback_url VARCHAR(255) NOT NULL,
  colors JSON NOT NULL,
  description TEXT NOT NULL,
  material VARCHAR(120) NOT NULL,
  delivery VARCHAR(80) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  account VARCHAR(160) NOT NULL UNIQUE,
  password_hash CHAR(64) NOT NULL,
  points INT NOT NULL DEFAULT 860,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  order_no VARCHAR(40) NOT NULL UNIQUE,
  total DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping DECIMAL(10, 2) NOT NULL DEFAULT 0,
  discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id VARCHAR(64) NOT NULL,
  product_name VARCHAR(120) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS cart_items (
  user_id INT NOT NULL,
  product_id VARCHAR(64) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, product_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  user_id INT NOT NULL,
  product_id VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, product_id),
  CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  code VARCHAR(40) NOT NULL,
  title VARCHAR(80) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  min_spend DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'unused',
  expires_at DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_coupons_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  UNIQUE KEY uk_user_coupon_code (user_id, code)
);

CREATE TABLE IF NOT EXISTS addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  receiver VARCHAR(80) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  province VARCHAR(80) NOT NULL,
  city VARCHAR(80) NOT NULL,
  detail VARCHAR(220) NOT NULL,
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

INSERT INTO products (
  product_id, name, category, scene, price, original_price, rating, reviews,
  stock, is_new, on_sale, featured, image_url, fallback_url, colors,
  description, material, delivery
) VALUES
(
  'watch-01', 'Marlow 经典腕表', '配饰', '通勤', 1280, 1480, 4.9, 326,
  18, 1, 1, 98,
  'https://images.pexels.com/photos/8711224/pexels-photo-8711224.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-watch.svg',
  JSON_ARRAY('#202629', '#b99a5b', '#f3eee5'),
  '蓝宝石镜面与意大利小牛皮表带，适合正式会议与日常通勤。',
  '精钢 / 真皮',
  '24 小时内发货'
),
(
  'bag-02', 'Northline 托特包', '包袋', '通勤', 960, 0, 4.8, 214,
  9, 0, 0, 92,
  'https://images.pexels.com/photos/35685412/pexels-photo-35685412.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-bag.svg',
  JSON_ARRAY('#1d2424', '#8c6d54', '#d7d0c4'),
  '大容量内仓与可拆卸电脑夹层，兼顾商务感和周末出行。',
  '植鞣皮 / 帆布',
  '48 小时内发货'
),
(
  'speaker-03', 'Arc Mini 蓝牙音箱', '数码', '居家', 620, 720, 4.7, 178,
  24, 1, 1, 91,
  'https://images.pexels.com/photos/5511714/pexels-photo-5511714.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-speaker.svg',
  JSON_ARRAY('#202020', '#d8d1c2', '#859a9a'),
  '金属旋钮、低频增强与 18 小时续航，小空间也有饱满声场。',
  '阳极铝 / 织物',
  '现货闪送'
),
(
  'sneaker-04', 'Civic Runner 轻量鞋', '鞋履', '旅行', 780, 880, 4.8, 431,
  6, 0, 1, 88,
  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-sneaker.svg',
  JSON_ARRAY('#f4efe5', '#2c3434', '#b45f3a'),
  '轻量缓震中底与防泼水鞋面，城市步行与短途旅行都舒适。',
  '网布 / 橡胶',
  '48 小时内发货'
),
(
  'lamp-05', 'Mica 可调光阅读灯', '家居', '居家', 540, 0, 4.9, 96,
  14, 1, 0, 86,
  'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-lamp.svg',
  JSON_ARRAY('#1f2524', '#c7a55b', '#f0eadf'),
  '三段色温、无频闪光源和细窄灯臂，书桌与床头都不占空间。',
  '铝合金 / 亚克力',
  '现货闪送'
),
(
  'fragrance-06', 'Hinoki 木质香氛', '香氛', '礼赠', 360, 420, 4.6, 255,
  32, 0, 1, 85,
  'https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-fragrance.svg',
  JSON_ARRAY('#efe5d0', '#8f6d4d', '#2d3836'),
  '雪松、扁柏与微辛香调，附赠雾面礼盒和手写卡片。',
  '天然精油',
  '24 小时内发货'
),
(
  'coffee-07', 'Fellow 手冲咖啡壶', '家居', '居家', 690, 0, 4.7, 143,
  20, 0, 0, 82,
  'https://images.pexels.com/photos/12329015/pexels-photo-12329015.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-coffee.svg',
  JSON_ARRAY('#111514', '#b7a077', '#e8e1d5'),
  '细口控流、温控刻度与防烫手柄，让每天早上的冲煮更稳定。',
  '不锈钢',
  '48 小时内发货'
),
(
  'headphone-08', 'Aural Pro 降噪耳机', '数码', '旅行', 1490, 1690, 4.9, 512,
  11, 1, 1, 97,
  'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-headphone.svg',
  JSON_ARRAY('#242829', '#f1eadf', '#8fa1a1'),
  '自适应降噪、空间音频与 40 小时续航，长途飞行也保持安静。',
  '铝合金 / 蛋白皮',
  '现货闪送'
),
(
  'wallet-09', 'Slim Card 钱夹', '配饰', '礼赠', 320, 0, 4.6, 84,
  4, 0, 0, 76,
  'https://images.pexels.com/photos/27467367/pexels-photo-27467367.jpeg?auto=compress&cs=tinysrgb&w=900&h=950&fit=crop',
  'assets/product-wallet.svg',
  JSON_ARRAY('#2b1f19', '#1c2322', '#a87b53'),
  '轻薄结构、RFID 防护与细腻压纹，适合日常携带和礼赠。',
  '头层牛皮',
  '24 小时内发货'
)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  category = VALUES(category),
  scene = VALUES(scene),
  price = VALUES(price),
  original_price = VALUES(original_price),
  rating = VALUES(rating),
  reviews = VALUES(reviews),
  stock = VALUES(stock),
  is_new = VALUES(is_new),
  on_sale = VALUES(on_sale),
  featured = VALUES(featured),
  image_url = VALUES(image_url),
  fallback_url = VALUES(fallback_url),
  colors = VALUES(colors),
  description = VALUES(description),
  material = VALUES(material),
  delivery = VALUES(delivery),
  active = 1;
