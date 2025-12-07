import { motion } from 'framer-motion';

const CategoryBadgeList = ({ categories, selectedCategoryId, onCategorySelect }) => {
  const handleCategoryClick = (categoryId) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId === selectedCategoryId ? null : categoryId);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {/* "All" option */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCategoryClick(null)}
        className={`px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
          selectedCategoryId === null
            ? 'bg-slate-900 text-white shadow-lg'
            : 'bg-white text-slate-700 hover:bg-slate-100 shadow-md'
        }`}
      >
        Tất cả
      </motion.button>

      {/* Category badges */}
      {categories.map((category, index) => (
        <motion.button
          key={category._id || category.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryClick(category._id || category.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
            selectedCategoryId === (category._id || category.id)
              ? 'bg-slate-900 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-100 shadow-md'
          }`}
        >
          <span className="text-xl">{category.icon || '🦀'}</span>
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryBadgeList;

