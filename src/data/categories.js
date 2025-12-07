const svgPlaceholder = (text, start, end, width = 300, height = 200) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${encodeURIComponent(start)}" offset="0%"/><stop stop-color="${encodeURIComponent(end)}" offset="100%"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(%23grad)"/><text x="50%" y="50%" fill="white" font-size="20" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(text)}</text></svg>`;

export const categories = [
  {
    id: 1,
    name: 'Ghẹ Xanh',
    icon: '🦀',
    image: svgPlaceholder('Ghẹ Xanh', '#1565C0', '#1E88E5'),
    description: 'Ghẹ xanh tươi sống đánh bắt hàng ngày',
  },
  {
    id: 2,
    name: 'Ghẹ Đỏ',
    icon: '🦀',
    image: svgPlaceholder('Ghẹ Đỏ', '#E53935', '#FF3B3F'),
    description: 'Tuyển chọn ghẹ đỏ cao cấp',
  },
  {
    id: 3,
    name: 'Ghẹ Sữa',
    icon: '🦀',
    image: svgPlaceholder('Ghẹ Sữa', '#1E88E5', '#1565C0'),
    description: 'Thịt ghẹ sữa mềm ngọt',
  },
  {
    id: 4,
    name: 'Ghẹ Thịt',
    icon: '🦀',
    image: svgPlaceholder('Ghẹ Thịt', '#FF3B3F', '#E53935'),
    description: 'Ghẹ thịt đầy đặn, chắc nịch',
  },
  {
    id: 5,
    name: 'Combo Noel Gia Đình',
    icon: '🎄',
    image: svgPlaceholder('Combo Noel', '#E53935', '#FF3B3F'),
    description: 'Gói combo đặc biệt dịp lễ',
  },
];
