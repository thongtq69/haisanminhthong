import { motion } from 'framer-motion';
import { useState } from 'react';

const QuantitySelector = ({ value, onChange, min = 1, max = 10 }) => {
  const [quantity, setQuantity] = useState(value || 1);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    setQuantity(clampedValue);
    onChange(clampedValue);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700 font-medium">Số lượng:</span>
      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrease}
          disabled={quantity <= min}
          className={`px-4 py-2 text-lg font-bold ${
            quantity <= min
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-christmas-red hover:bg-christmas-red hover:text-white transition-colors'
          }`}
        >
          −
        </motion.button>
        
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-16 text-center text-lg font-semibold border-x-2 border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-christmas-red"
        />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrease}
          disabled={quantity >= max}
          className={`px-4 py-2 text-lg font-bold ${
            quantity >= max
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-christmas-red hover:bg-christmas-red hover:text-white transition-colors'
          }`}
        >
          +
        </motion.button>
      </div>
      <span className="text-sm text-gray-500">(Tối đa {max} kg)</span>
    </div>
  );
};

export default QuantitySelector;

