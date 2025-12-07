import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { getFeaturedProducts } from '../api/products';
import { products as mockProducts } from '../data/products';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getFeaturedProducts();
        const source = (data && data.length) ? data : mockProducts;
        const transformedData = (source || []).map((product) => {
          const fallbackImg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%231565C0" offset="0%"/><stop stop-color="%23E53935" offset="100%"/></linearGradient></defs><rect width="400" height="300" fill="url(%23grad)"/><text x="50%" y="50%" fill="white" font-size="20" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(product.name)}</text></svg>`;
          const firstImage = product.images?.[0] || product.image;
          const sanitizedImage = firstImage && !String(firstImage).includes('placeholder.com') ? firstImage : fallbackImg;

          return {
            id: product._id || product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: sanitizedImage,
            rating: product.avgRating || product.rating,
            reviews: product.reviewCount || product.reviews,
            badge: product.isOnSale ? 'Giảm giá' : product.tags?.[0] || product.badge || 'Mới',
            badgeColor: product.isOnSale ? 'christmas-red' : product.badgeColor || 'ocean-blue',
            origin: product.origin || 'N/A',
            size: product.sizeOptions?.[0]?.label || product.size || '1kg',
            description: product.shortDescription || product.description,
          };
        });
        setProducts(transformedData);
        setError(data && data.length ? null : 'Đang hiển thị dữ liệu mẫu (server chưa phản hồi)');
      } catch (err) {
        console.error('Error fetching products:', err);
        const fallbackData = mockProducts.map((p) => ({
          ...p,
          id: p.id,
        }));
        setProducts(fallbackData);
        setError('Không thể tải sản phẩm từ server, đang hiển thị dữ liệu mẫu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-xl text-gray-600">
            Ghẹ và hải sản tươi ngon, giao tận nhà
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
