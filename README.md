<h1 align="center">E-Commerce Store 🛒</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

[專案網址(佈署於 Render 有可能進入睡眠期)](https://eaec-commerce.onrender.com/)

## 專案簡介

這是一款使用 React 建立的電子商務網站。具有會員、Redis 身分驗證、商品分類、後臺管理、圖片裁減、TapPay 金流串接等功能。
.
<br>

## 使用技術

- 🗄️ MongoDB & Redis 一體化設計
- 💳 TapPay 金流串接
- 🔐 身分驗證系統
- 🔑 JWT Refresh/Access Tokens 應用
- 📝 會員註冊 & 登入
- 📦 商品 & 分類管理
- 🛍️ 購物車功能
- 💰 TapPay 信用卡結帳
- ✂️ 商品圖剪裁
- 🏷️ 優惠券系統
- 👑 後台管理系統
- 📊 銷售數據分析
- 🎨 Tailwind 設計
- 🖼️ 首頁 Banner 使用遮色片與 GSAP 動畫製作輪播牆
- 🎞️ 首頁 gsap 滾動式動畫
- 🛒 購物車 / 結帳流程
- 🔒 路由保護
- 🛡️ 資料保護
- 🚀 Redis 快取
- ⌛ 等等 ...

### 設定 .env 環境變數

```bash
PORT=3000

MONGO_URI= Your MONGO_URI

REDIS_PASSWORD= Your RedisPassword
REDIS_HOST= Your REDIS_HOSTToken

ACCESS_TOKEN_SECRET=  Your Access_Token
REFRESH_TOKEN_SECRET= Your Refresh_Token

CLOUDINARY_CLOUD_NAME=your Cloudinary Name
CLOUDINARY_API_KEY= your Cloudinary Key
CLOUDINARY_API_SECRET= your Cloudinary Secret

TAPPAY_PARTNER_KEY=partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM
merchant_id=GlobalTesting_CTBC

NODE_ENV=development
```

### 運行於本地端

```shell
npm run build
```

### 開啟專案

```shell
npm run start
```
