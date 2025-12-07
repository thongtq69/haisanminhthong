# Hướng dẫn Trang Chi Tiết Sản Phẩm

## Tổng quan

Trang chi tiết sản phẩm đã được thiết kế hoàn chỉnh với đầy đủ các tính năng theo yêu cầu:
- Layout 2 cột (desktop): Hình ảnh bên trái, thông tin bên phải
- Gallery hình ảnh với zoom và lightbox
- Chọn size, khối lượng, tình trạng sản phẩm
- Mô tả chi tiết, dinh dưỡng, bảo quản, giao hàng
- Đánh giá và bình luận từ khách hàng
- Sản phẩm liên quan
- Sticky add-to-cart bar trên mobile
- Responsive đầy đủ

## Cấu trúc Files

```
src/
├── components/
│   └── ProductDetail/
│       ├── ProductDetailPage.jsx      # Component chính
│       ├── ImageGallery.jsx           # Gallery với zoom & lightbox
│       ├── ProductInfoPanel.jsx       # Panel thông tin sản phẩm
│       ├── QuantitySelector.jsx       # Chọn số lượng
│       ├── ProductTabs.jsx            # Tabs mô tả, dinh dưỡng, etc.
│       ├── ReviewSection.jsx          # Section đánh giá
│       ├── RelatedProductsSection.jsx # Sản phẩm liên quan
│       └── AddToCartBar.jsx           # Sticky bar (mobile)
├── data/
│   └── productDetail.js               # Mock data cho sản phẩm
└── pages/
    └── HomePage.jsx                   # Trang chủ
```

## Routing

Routing đã được setup trong `App.jsx`:

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/product/:id" element={<ProductDetailPage />} />
</Routes>
```

## Cách sử dụng

### 1. Truy cập trang chi tiết

Từ trang chủ hoặc danh sách sản phẩm, click vào bất kỳ sản phẩm nào sẽ điều hướng đến:
```
/product/1
```

### 2. Mock Data

Dữ liệu mẫu được định nghĩa trong `src/data/productDetail.js`:

- `productDetail`: Thông tin chi tiết sản phẩm
- `reviews`: Danh sách đánh giá
- `ratingDistribution`: Phân bố đánh giá theo sao
- `relatedProducts`: Sản phẩm liên quan

### 3. Tích hợp với Backend (Khi có)

Để tích hợp với API thật, cập nhật `ProductDetailPage.jsx`:

```jsx
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product by id
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <NotFound />;

  // ... rest of component
};
```

## Các tính năng chính

### 1. Image Gallery
- Hover để zoom ảnh
- Click để mở lightbox
- Thumbnails để chuyển đổi ảnh
- Navigation arrows trong lightbox

### 2. Product Options
- **Size**: S, M, L, XL
- **Weight**: 0.5kg, 1kg, 2kg
- **Condition**: Sống, Làm sạch, Hấp sẵn, Chế biến trước
- Giá tự động cập nhật theo lựa chọn

### 3. Product Tabs
- **Mô tả chi tiết**: Nguồn gốc, đặc điểm, gợi ý món ăn
- **Thông tin dinh dưỡng**: Bảng dinh dưỡng, lợi ích sức khỏe
- **Bảo quản & Chế biến**: Hướng dẫn chi tiết
- **Thông tin giao hàng**: Khu vực, đóng gói, lưu ý

### 4. Review Section
- Hiển thị điểm trung bình và phân bố sao
- Danh sách đánh giá từ khách hàng
- Form để viết đánh giá mới
- Load more reviews

### 5. Related Products
- Carousel/grid sản phẩm liên quan
- Click để xem chi tiết sản phẩm khác

### 6. Sticky Add-to-Cart Bar (Mobile)
- Tự động hiện khi scroll xuống
- Hiển thị tên sản phẩm, giá, nút thêm vào giỏ
- Chỉ hiện trên mobile/tablet

## Customization

### Thay đổi màu sắc

Màu sắc được định nghĩa trong `tailwind.config.js`:
- `christmas-red`: #E53935
- `ocean-blue`: #1565C0
- `accent-red`: #FF3B3F
- `accent-blue`: #1E88E5

### Thay đổi layout

Chỉnh sửa `ProductDetailPage.jsx` để thay đổi:
- Thứ tự các section
- Spacing và padding
- Grid layout

### Thêm options mới

Cập nhật `productDetail.js`:

```jsx
options: {
  size: [...],
  weight: [...],
  condition: [...],
  // Thêm option mới
  packaging: [
    { id: 'standard', label: 'Đóng gói tiêu chuẩn' },
    { id: 'premium', label: 'Đóng gói cao cấp' }
  ]
}
```

Sau đó cập nhật `ProductInfoPanel.jsx` để hiển thị option mới.

## Responsive Breakpoints

- **Mobile**: < 640px (1 cột, ảnh trên, thông tin dưới)
- **Tablet**: 640px - 1024px (2 cột)
- **Desktop**: > 1024px (2 cột với spacing lớn hơn)

## SEO

Trang đã được tối ưu SEO:
- H1 là tên sản phẩm
- Semantic HTML tags (`<main>`, `<section>`, `<article>`)
- Alt text cho tất cả hình ảnh
- Meta description (cần thêm vào `<head>`)

Để thêm meta tags động, sử dụng `react-helmet` hoặc tương tự:

```jsx
import { Helmet } from 'react-helmet';

<Helmet>
  <title>{product.name} - Ghẹ Biển Hương Phi</title>
  <meta name="description" content={product.shortDescription} />
</Helmet>
```

## Animation

Sử dụng Framer Motion cho:
- Fade-in khi scroll
- Hover effects
- Tab transitions
- Sticky bar slide-up

## Testing

Để test trang chi tiết:

1. Chạy dev server: `npm run dev`
2. Truy cập: `http://localhost:5173/product/1`
3. Hoặc click vào bất kỳ sản phẩm nào từ trang chủ

## Notes

- Hiện tại sử dụng mock data, cần tích hợp với API thật
- Add to cart và Buy now hiện chỉ hiển thị alert, cần implement logic thật
- Review form cần backend để lưu đánh giá
- Images đang dùng placeholder từ Unsplash, cần thay bằng ảnh thật

## Next Steps

1. Tích hợp với API backend
2. Implement shopping cart logic
3. Implement checkout flow
4. Add image upload cho reviews
5. Add wishlist/favorite functionality
6. Add share functionality
7. Add print-friendly version
