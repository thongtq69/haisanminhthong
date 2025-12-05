import { motion } from 'framer-motion';
import Badge from './ui/Badge';
import Rating from './ui/Rating';
import Button from './ui/Button';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge color={product.badgeColor}>{product.badge}</Badge>
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-4 right-4 bg-christmas-red text-white px-3 py-1 rounded-lg text-sm font-bold">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mb-3">
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-christmas-red">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Hidden details on hover with smooth animation */}
        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-28 group-hover:mt-2">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Nguồn gốc:</strong> {product.origin}</p>
              <p><strong>Kích thước:</strong> {product.size}</p>
              <p className="line-clamp-2">{product.description}</p>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="primary" className="w-full">
            Đặt Ngay
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
