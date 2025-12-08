# Admin (React Admin) cho Ghẹ Biển Hương Phi

## Cài đặt phụ thuộc
```
cd frontend
npm install react-admin ra-data-simple-rest @mui/material @emotion/react @emotion/styled @mui/icons-material ra-input-rich-text
```

## Biến môi trường
- Dùng Vite: `VITE_API_BASE_URL` (ưu tiên) hoặc `VITE_API_URL`.
- Dev local: `http://localhost:5000/api`
- Production: `https://be-haisanminhthong.onrender.com/api`

## Cấu trúc admin React Admin
- `src/config/api.js`: xuất `API_BASE_URL` từ env.
- `src/admin/dataProvider.js`: simpleRestProvider, map blogs -> `/admin/blog`.
- Resource:
  - `products` -> `/products`
  - `categories` -> `/categories`
  - `blogs` -> `/admin/blog`
- `src/admin/AdminApp.jsx`: khai báo `<Admin dataProvider>` và `<Resource>`.
- Resources UI:
  - `src/admin/resources/products.jsx`
  - `src/admin/resources/categories.jsx`
  - `src/admin/resources/blogs.jsx`

## Truy cập
- Chạy `npm run dev` ở frontend, mở `http://localhost:5173/admin/ra`
- Build/prod: `/admin/ra` trên domain FE.

## Lưu ý
- API phải sẵn sàng ở `API_BASE_URL`.
- Blogs resource dùng admin endpoints `/api/admin/blog` (CRUD).
- Form blogs dùng `RichTextInput` (ra-input-rich-text); đảm bảo đã cài package.

## Bảo mật
- Route này không tự gắn auth; cần bảo vệ bằng middleware/backoffice nếu có.
