// Mock data cho trang chi tiết sản phẩm

export const productDetail = {
  id: 1,
  name: 'Ghẹ Xanh Loại 1 – Size L – Tươi Sống',
  slug: 'ghe-xanh-loai-1-size-l-tuoi-song',
  category: 'Ghẹ tươi sống',
  price: 450000,
  originalPrice: 550000,
  rating: 4.8,
  reviewsCount: 132,
  badge: 'Giảm giá Noel',
  badgeColor: 'christmas-red',
  
  // Hình ảnh sản phẩm
  images: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop',
      alt: 'Ghẹ xanh loại 1 tươi sống - góc chụp tổng thể',
      thumbnail: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1606914509767-8b6b63d8f40a?w=800&h=600&fit=crop',
      alt: 'Ghẹ xanh sau khi chế biến - hấp bia',
      thumbnail: 'https://images.unsplash.com/photo-1606914509767-8b6b63d8f40a?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
      alt: 'Cận cảnh thịt ghẹ xanh tươi ngon',
      thumbnail: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
      alt: 'Ghẹ xanh rang me thơm lừng',
      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
      alt: 'Ghẹ nướng phô mai hấp dẫn',
      thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop'
    }
  ],
  
  // Mô tả ngắn
  shortDescription: 'Ghẹ xanh tươi sống đánh bắt hàng ngày từ vùng biển Cà Mau, đảm bảo còn sống khi giao hàng. Thịt chắc, ngọt đậm đà, hoàn hảo cho các món hấp, rang me, nướng phô mai.',
  
  // Tùy chọn sản phẩm
  options: {
    size: [
      { id: 's', label: 'Size S', value: 's', price: 380000 },
      { id: 'm', label: 'Size M', value: 'm', price: 420000 },
      { id: 'l', label: 'Size L', value: 'l', price: 450000, default: true },
      { id: 'xl', label: 'Size XL', value: 'xl', price: 520000 }
    ],
    weight: [
      { id: '0.5', label: '0.5kg', value: '0.5', price: 225000 },
      { id: '1', label: '1kg', value: '1', price: 450000, default: true },
      { id: '2', label: '2kg', value: '2', price: 850000 }
    ],
    condition: [
      { id: 'fresh', label: 'Sống', value: 'fresh', description: 'Ghẹ còn sống, đảm bảo tươi ngon nhất' },
      { id: 'cleaned', label: 'Làm sạch', value: 'cleaned', description: 'Đã làm sạch, sẵn sàng chế biến' },
      { id: 'steamed', label: 'Hấp sẵn', value: 'steamed', description: 'Đã hấp chín, ăn ngay' },
      { id: 'prepared', label: 'Chế biến trước', value: 'prepared', description: 'Đã chế biến theo yêu cầu' }
    ]
  },
  
  // Mô tả chi tiết
  description: {
    origin: 'Ghẹ xanh được đánh bắt hàng ngày từ vùng biển Cà Mau - một trong những vùng biển giàu hải sản nhất Việt Nam. Chúng tôi chọn lọc kỹ càng, chỉ lấy những con ghẹ còn sống, khỏe mạnh, đảm bảo chất lượng cao nhất.',
    characteristics: 'Thịt ghẹ xanh loại 1 có đặc điểm: thịt chắc, ngọt đậm đà, gạch đỏ tươi. Vỏ ghẹ cứng, màu xanh đậm tự nhiên, chứng tỏ ghẹ khỏe mạnh và tươi sống.',
    cookingSuggestions: [
      {
        title: 'Ghẹ hấp bia',
        description: 'Hấp ghẹ với bia và gừng, thêm chút muối. Món này giữ nguyên vị ngọt tự nhiên của ghẹ, thơm mùi bia và gừng.',
        image: 'https://images.unsplash.com/photo-1606914509767-8b6b63d8f40a?w=400&h=300&fit=crop'
      },
      {
        title: 'Ghẹ rang me',
        description: 'Rang ghẹ với sốt me chua ngọt, thêm ớt cay. Vị chua ngọt của me kết hợp với vị ngọt của ghẹ tạo nên món ăn hấp dẫn.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
      },
      {
        title: 'Ghẹ nướng phô mai',
        description: 'Nướng ghẹ với phô mai béo ngậy, thêm bơ tỏi. Món này đặc biệt thơm ngon, phù hợp cho bữa tiệc.',
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop'
      }
    ]
  },
  
  // Thông tin dinh dưỡng
  nutrition: {
    per100g: {
      protein: '18.5g',
      fat: '1.2g',
      carbs: '0.5g',
      calories: '87 kcal',
      cholesterol: '85mg',
      sodium: '320mg'
    },
    benefits: [
      'Giàu protein chất lượng cao, tốt cho cơ bắp',
      'Chứa omega-3, tốt cho tim mạch và não bộ',
      'Nguồn vitamin B12 dồi dào',
      'Khoáng chất: kẽm, đồng, selen',
      'Ít chất béo, phù hợp chế độ ăn lành mạnh'
    ]
  },
  
  // Hướng dẫn bảo quản
  storage: {
    fresh: 'Nếu nhận ghẹ còn sống: Để trong ngăn mát tủ lạnh (2-4°C), có thể sống thêm 1-2 ngày. Không ngâm nước, giữ ẩm bằng khăn ướt.',
    frozen: 'Nếu muốn bảo quản lâu: Rửa sạch, để ráo, cho vào túi zip hoặc hộp kín, bảo quản ngăn đông (-18°C), có thể giữ 2-3 tháng.',
    cooked: 'Nếu đã chế biến: Để nguội, bọc kín, bảo quản ngăn mát, ăn trong 1-2 ngày. Hâm nóng trước khi ăn.'
  },
  
  // Hướng dẫn chế biến
  cooking: {
    cleaning: 'Rửa ghẹ dưới vòi nước chảy, dùng bàn chải chà sạch vỏ. Mở mai ghẹ, bỏ phần mang và ruột (nếu không thích).',
    steaming: 'Cho ghẹ vào nồi hấp, thêm bia, gừng, muối. Hấp 15-20 phút từ khi nước sôi. Ghẹ chín khi vỏ chuyển sang màu đỏ cam.',
    tips: [
      'Không luộc quá lâu, ghẹ sẽ bị khô thịt',
      'Thêm gừng, sả để khử mùi tanh',
      'Chấm với muối tiêu chanh hoặc sốt me',
      'Ăn ngay khi còn nóng để ngon nhất'
    ]
  },
  
  // Thông tin giao hàng
  shipping: {
    areas: [
      'Hà Nội: Giao trong 2-4 giờ',
      'TP. Hồ Chí Minh: Giao trong 1-3 giờ',
      'Các tỉnh thành khác: 1-2 ngày',
      'Miễn phí ship cho đơn hàng trên 500.000đ'
    ],
    notes: [
      'Đóng gói giữ lạnh chuyên nghiệp',
      'Kiểm tra độ tươi khi nhận hàng',
      'Đổi trả miễn phí nếu không đảm bảo chất lượng',
      'Hỗ trợ giao hàng ngoài giờ (phụ phí)'
    ],
    packaging: 'Ghẹ được đóng gói trong hộp xốp cách nhiệt, có đá gel giữ lạnh, đảm bảo nhiệt độ 2-4°C trong suốt quá trình vận chuyển.'
  },
  
  // Tags
  tags: ['Ghẹ biển', 'Ghẹ xanh', 'Hải sản tươi', 'Combo Noel gợi ý', 'Đánh bắt tự nhiên'],
  
  // Thông tin nhanh
  quickInfo: [
    { icon: '🚚', text: 'Giao trong 2-4 giờ tại Hà Nội' },
    { icon: '❄️', text: 'Đóng gói giữ lạnh chuyên nghiệp' },
    { icon: '✅', text: 'Đổi trả nếu không tươi' },
    { icon: '🎁', text: 'Tặng kèm công thức nấu ăn' }
  ]
};

// Đánh giá sản phẩm
export const reviews = [
  {
    id: 1,
    userName: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Ghẹ rất tươi, còn sống khi nhận hàng. Thịt chắc, ngọt đậm đà. Đóng gói cẩn thận, giữ lạnh tốt. Sẽ đặt lại!',
    date: '2024-12-15',
    verified: true,
    images: []
  },
  {
    id: 2,
    userName: 'Trần Thị B',
    rating: 5,
    comment: 'Lần đầu mua ghẹ online mà chất lượng tốt như vậy. Hấp bia ăn rất ngon, cả nhà đều khen. Giao hàng nhanh, đóng gói chuyên nghiệp.',
    date: '2024-12-14',
    verified: true,
    images: []
  },
  {
    id: 3,
    userName: 'Lê Văn C',
    rating: 4,
    comment: 'Ghẹ tươi, thịt đầy đặn. Có một vài con nhỏ hơn mong đợi nhưng nhìn chung chất lượng tốt. Giá cả hợp lý.',
    date: '2024-12-13',
    verified: true,
    images: []
  },
  {
    id: 4,
    userName: 'Phạm Thị D',
    rating: 5,
    comment: 'Tuyệt vời! Ghẹ size L đúng như mô tả, thịt rất chắc và ngọt. Rang me ăn ngon xuất sắc. Đóng gói giữ lạnh rất tốt, nhận hàng vẫn còn sống.',
    date: '2024-12-12',
    verified: true,
    images: []
  },
  {
    id: 5,
    userName: 'Hoàng Văn E',
    rating: 4,
    comment: 'Chất lượng tốt, giao hàng đúng hẹn. Ghẹ tươi, thịt ngon. Chỉ có điều giá hơi cao một chút nhưng đổi lại chất lượng đảm bảo.',
    date: '2024-12-11',
    verified: true,
    images: []
  },
  {
    id: 6,
    userName: 'Vũ Thị F',
    rating: 5,
    comment: 'Mua cho bữa tiệc Noel, ghẹ rất tươi và ngon. Khách hàng đều khen. Đóng gói đẹp, chuyên nghiệp. Cảm ơn shop!',
    date: '2024-12-10',
    verified: true,
    images: []
  }
];

// Phân bố đánh giá
export const ratingDistribution = {
  5: 80, // 80% đánh giá 5 sao
  4: 15, // 15% đánh giá 4 sao
  3: 3,  // 3% đánh giá 3 sao
  2: 1,  // 1% đánh giá 2 sao
  1: 1   // 1% đánh giá 1 sao
};

// Sản phẩm liên quan
export const relatedProducts = [
  {
    id: 2,
    name: 'Ghẹ Đỏ Tươi Sống (800g)',
    price: 380000,
    originalPrice: 450000,
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 89,
    badge: 'Giảm Noel',
    badgeColor: 'christmas-red'
  },
  {
    id: 3,
    name: 'Ghẹ Sữa Tươi (1.2kg)',
    price: 520000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1606914509767-8b6b63d8f40a?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 156,
    badge: 'Mới',
    badgeColor: 'ocean-blue'
  },
  {
    id: 4,
    name: 'Ghẹ Thịt Cao Cấp (1kg)',
    price: 480000,
    originalPrice: 580000,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 203,
    badge: 'Bán chạy',
    badgeColor: 'christmas-red'
  },
  {
    id: 8,
    name: 'Combo Ghẹ Cao Cấp (2kg)',
    price: 850000,
    originalPrice: 1050000,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    rating: 5.0,
    reviews: 67,
    badge: 'Giảm Noel',
    badgeColor: 'christmas-red'
  }
];

