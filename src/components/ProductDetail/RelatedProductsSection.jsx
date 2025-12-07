import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard';

const RelatedProductsSection = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-ocean-blue/5 to-christmas-red/5 rounded-xl p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <span>🦀</span> Món ghẹ khác bạn có thể thích
        </h2>
        <p className="text-gray-600 mt-2">
          Khám phá thêm các sản phẩm ghẹ và hải sản tươi ngon khác
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleProductClick(product.id)}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RelatedProductsSection;

