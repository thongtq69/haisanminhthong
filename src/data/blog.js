const blogPlaceholder = (text, start, end, width = 600, height = 400) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${encodeURIComponent(start)}" offset="0%"/><stop stop-color="${encodeURIComponent(end)}" offset="100%"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(%23grad)"/><text x="50%" y="50%" fill="white" font-size="22" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(text)}</text></svg>`;

export const blogPosts = [
  {
    id: 1,
    title: '5 Món Ghẹ Cho Tiệc Noel',
    excerpt: 'Khám phá những công thức ghẹ ngon nhất để gây ấn tượng với khách trong mùa lễ này. Từ ghẹ hấp cổ điển đến chả ghẹ đầy hương vị.',
    image: blogPlaceholder('5 Món Ghẹ Noel', '#E53935', '#FF3B3F'),
    date: '15 Tháng 12, 2024',
    category: 'Công Thức',
  },
  {
    id: 2,
    title: 'Cách Bảo Quản Hải Sản Mùa Lạnh',
    excerpt: 'Học các kỹ thuật đúng cách để bảo quản ghẹ và hải sản tươi trong những tháng mùa đông để duy trì độ tươi và chất lượng.',
    image: blogPlaceholder('Bảo Quản Hải Sản', '#1565C0', '#1E88E5'),
    date: '10 Tháng 12, 2024',
    category: 'Mẹo Vặt',
  },
  {
    id: 3,
    title: 'Hướng Dẫn Combo Hải Sản Noel',
    excerpt: 'Tất cả những gì bạn cần biết về combo hải sản Noel đặc biệt của chúng tôi. Hoàn hảo cho các buổi tụ tập gia đình và bữa tiệc lễ hội.',
    image: blogPlaceholder('Combo Hải Sản Noel', '#E53935', '#FF3B3F'),
    date: '8 Tháng 12, 2024',
    category: 'Hướng Dẫn',
  },
  {
    id: 4,
    title: 'Lợi Ích Sức Khỏe Của Ghẹ Tươi',
    excerpt: 'Khám phá những lợi ích dinh dưỡng của thịt ghẹ tươi và tại sao nó là một bổ sung tuyệt vời cho chế độ ăn mùa đông của bạn.',
    image: blogPlaceholder('Lợi Ích Ghẹ Tươi', '#1E88E5', '#1565C0'),
    date: '5 Tháng 12, 2024',
    category: 'Sức Khỏe',
  },
  {
    id: 5,
    title: 'Ý Tưởng Tiệc Hải Sản Mùa Đông',
    excerpt: 'Những ý tưởng sáng tạo để tổ chức một bữa tiệc hải sản mùa đông đáng nhớ. Mẹo về trình bày, kết hợp và tạo không khí hoàn hảo.',
    image: blogPlaceholder('Tiệc Hải Sản Mùa Đông', '#FF3B3F', '#E53935'),
    date: '3 Tháng 12, 2024',
    category: 'Giải Trí',
  },
];
