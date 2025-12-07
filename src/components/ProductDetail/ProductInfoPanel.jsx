import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../../context/CartContext';

const ProductInfoPanel = ({ 
  product,
  selectedSize: controlledSize,
  selectedWeight: controlledWeight,
  selectedCondition: controlledCondition,
  quantity: controlledQuantity,
  onSizeChange,
  onWeightChange,
  onConditionChange,
  onQuantityChange
}) => {
  const navigate = useNavigate();
  const { addToCart, setBuyNow } = useCart();
  
  // Use controlled state if provided, otherwise use internal state
  const [internalSize, setInternalSize] = useState(
    product.options?.size?.find((opt) => opt?.default) || product.options?.size?.[0] || null
  );
  const [internalWeight, setInternalWeight] = useState(
    product.options?.weight?.find((opt) => opt?.default) || product.options?.weight?.[0] || null
  );
  const [internalCondition, setInternalCondition] = useState(
    product.options?.condition?.find((opt) => opt?.default) || product.options?.condition?.[0] || null
  );
  const [internalQuantity, setInternalQuantity] = useState(1);

  const selectedSize = controlledSize || internalSize;
  const selectedWeight = controlledWeight || internalWeight;
  const selectedCondition = controlledCondition || internalCondition;
  const quantity = controlledQuantity !== undefined ? controlledQuantity : internalQuantity;

  const setSelectedSize = (size) => {
    if (onSizeChange) {
      onSizeChange(size);
    } else {
      setInternalSize(size);
    }
  };

  const setSelectedWeight = (weight) => {
    if (onWeightChange) {
      onWeightChange(weight);
    } else {
      setInternalWeight(weight);
    }
  };

  const setSelectedCondition = (condition) => {
    if (onConditionChange) {
      onConditionChange(condition);
    } else {
      setInternalCondition(condition);
    }
  };

  const setQuantity = (qty) => {
    if (onQuantityChange) {
      onQuantityChange(qty);
    } else {
      setInternalQuantity(qty);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  // Calculate price based on selected options
  // Priority: weight price > size price > base product price
  const currentPrice = selectedWeight?.price || selectedSize?.price || product.price;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0;

  const buildCartItem = () => ({
    product: product.id,
    name: product.name,
    thumbnail: product.images?.[0],
    quantity,
    unitPrice: currentPrice,
    subtotal: currentPrice * quantity,
    sizeLabel: selectedSize?.label,
    weightLabel: selectedWeight?.label,
    variantKey: `${product.id}-${selectedSize?.id || 'size'}-${selectedWeight?.id || 'weight'}`,
  });

  const handleAddToCart = () => {
    addToCart(buildCartItem());
    alert('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    setBuyNow(buildCartItem());
    navigate('/checkout?mode=buy_now');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <ol className="flex items-center gap-2">
          <li>
            <a href="/" className="hover:text-christmas-red transition-colors">
              Trang chủ
            </a>
          </li>
          <li>/</li>
          <li>
            <span className="text-gray-900">{product.category}</span>
          </li>
          <li>/</li>
          <li>
            <span className="text-gray-900">{product.name}</span>
          </li>
        </ol>
      </nav>

      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4">
        <Rating rating={product.rating} reviews={product.reviewsCount} />
        <span className="text-sm text-gray-600">
          ({product.reviewsCount} đánh giá)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-christmas-red">
            {formatPrice(currentPrice)}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discount > 0 && (
            <Badge color="christmas-red" className="text-lg px-3 py-1">
              -{discount}%
            </Badge>
          )}
        </div>
        {product.badge && (
          <Badge color={product.badgeColor}>{product.badge}</Badge>
        )}
      </div>

      {/* Short Description */}
      <p className="text-gray-700 leading-relaxed text-lg">
        {product.shortDescription}
      </p>

      {/* Options */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        {/* Size Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chọn size ghẹ:
          </label>
          <div className="flex flex-wrap gap-2">
            {(product.options.size || []).map((size) => (
              <motion.button
                key={size.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedSize?.id === size.id
                    ? 'bg-christmas-red text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Weight Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chọn khối lượng:
          </label>
          <div className="flex flex-wrap gap-2">
            {(product.options.weight || []).map((weight) => (
              <motion.button
                key={weight.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedWeight(weight)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedWeight?.id === weight.id
                    ? 'bg-ocean-blue text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {weight.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Condition Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chọn tình trạng:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(product.options.condition || []).map((condition) => (
              <motion.button
                key={condition.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCondition(condition)}
                className={`p-3 rounded-lg text-left transition-all border-2 ${
                  selectedCondition?.id === condition.id
                    ? 'border-christmas-red bg-red-50'
                    : 'border-gray-200 hover:border-ocean-blue'
                }`}
              >
                <div className="font-medium text-gray-900">{condition.label}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {condition.description}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={10}
      />

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <div className="flex gap-3">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="primary"
              size="lg"
              className="w-full text-lg py-4"
              onClick={handleAddToCart}
            >
              🛒 Thêm vào giỏ
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="secondary"
              size="lg"
              className="w-full text-lg py-4"
              onClick={handleBuyNow}
            >
              ⚡ Đặt ngay
            </Button>
          </motion.div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open('tel:+84123456789')}
          >
            📞 Gọi đặt nhanh
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open('https://zalo.me/0123456789')}
          >
            💬 Chat tư vấn
          </Button>
        </div>
      </div>

      {/* Quick Info */}
      <div className="pt-6 border-t border-gray-200 space-y-3">
        {(product.quickInfo || []).map((info, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-700">
            <span className="text-2xl">{info.icon}</span>
            <span className="text-sm">{info.text}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {(product.tags || []).map((tag, index) => (
            <Badge key={index} color="ocean-blue" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPanel;
