import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const AddToCartBar = ({ product, selectedSize, selectedWeight, selectedCondition, quantity, onAddToCart, onBuyNow }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar when scrolled past 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const currentPrice = selectedSize?.price || product.price;
  const totalPrice = currentPrice * quantity;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-christmas-red shadow-2xl lg:hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {product.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-christmas-red">
                    {formatPrice(totalPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(product.originalPrice * quantity)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddToCart}
                  className="whitespace-nowrap"
                >
                  🛒
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onBuyNow}
                  className="whitespace-nowrap"
                >
                  Đặt ngay
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartBar;

