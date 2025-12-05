import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { IconSnow, IconTree } from './ui/Icons';

const FeatureCard = ({ icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-lg text-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="text-5xl mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: '🦀',
      title: 'Tươi Mỗi Ngày',
      description: 'Ghẹ và hải sản của chúng tôi được đánh bắt tươi hàng ngày và giao đến bạn trong vòng 24 giờ',
    },
    {
      icon: '🚚',
      title: 'Giao Nhanh',
      description: 'Miễn phí giao hàng trong bán kính 20km. Giao trong ngày cho đơn hàng trước 14h',
    },
    {
      icon: '🧊',
      title: 'Đóng Gói Giữ Lạnh',
      description: 'Tất cả sản phẩm được đóng gói với đá và hộp cách nhiệt để duy trì độ tươi',
    },
    {
      icon: '✅',
      title: 'Hoàn Tiền Nếu Không Hài Lòng',
      description: 'Đảm bảo 100% hài lòng. Hoàn tiền đầy đủ nếu chất lượng không đạt yêu cầu',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-gradient-to-b from-light-blue to-white relative overflow-hidden">
      {/* Decorative winter elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute text-ocean-blue text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 2 === 0 ? <IconSnow /> : <IconTree />}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <p className="text-xl text-gray-600">
            Chúng tôi đảm bảo hải sản tươi nhất với dịch vụ tốt nhất
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

