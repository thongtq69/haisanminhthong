import { motion } from 'framer-motion';
import Button from './ui/Button';

const quickFilters = [
  'Ghẹ sống size L',
  'Combo Noel 4 người',
  'Ghẹ hấp sẵn',
  'Giao 2h nội thành',
  'Flash Sale 15%',
];

const SearchBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
      className="max-w-5xl mx-auto -mt-16 px-4"
    >
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 md:p-6 border border-white/50">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 bg-light-blue rounded-xl px-4 py-3 shadow-inner">
            <svg className="w-6 h-6 text-ocean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm ghẹ tươi, combo Noel, giao nhanh..."
              className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-500"
            />
          </div>
          <Button variant="secondary" size="lg" className="w-full md:w-auto">
            Tìm kiếm
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-sm hover:bg-ocean-blue/20 cursor-pointer transition-colors"
            >
              {filter}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-christmas-red">•</span>
            Giao nhanh 2h nội thành, đóng gói giữ lạnh
          </div>
          <div className="flex items-center gap-2">
            <span className="text-christmas-red">•</span>
            Giảm Noel đến 25% cho combo gia đình
          </div>
          <div className="flex items-center gap-2">
            <span className="text-christmas-red">•</span>
            Hotline tư vấn 24/7: 0123 456 789
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
