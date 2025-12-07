const placeholderSvg = (text = 'Seafood') =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%231565C0" offset="0%"/><stop stop-color="%23E53935" offset="100%"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><text x="50%" y="50%" fill="white" font-size="24" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(text)}</text></svg>`;

const isValidHttpUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:image')) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const safeImageUrl = (url, label = 'Seafood') => {
  if (isValidHttpUrl(url)) return url;
  return placeholderSvg(label);
};
