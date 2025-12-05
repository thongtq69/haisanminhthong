import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { categories } from '../data/categories';

const CategoryCard = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -12, 
        scale: 1.05,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 text-center">
        <div className="text-4xl mb-2">{category.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm">{category.description}</p>
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
          className="mt-4 h-1 bg-gradient-to-r from-ocean-blue to-christmas-red rounded-full"
        />
      </div>
    </motion.div>
  );
};

const CategorySection = () => {
  return (
    <section id="categories" className="py-20 bg-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Danh Mục Ghẹ & Hải Sản
          </h2>
          <p className="text-xl text-gray-600">
            Khám phá bộ sưu tập hải sản tươi ngon của chúng tôi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

