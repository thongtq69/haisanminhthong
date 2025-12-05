import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from './ui/Button';
import { IconGift, IconBell, IconTree } from './ui/Icons';

const FlashSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const combos = [
    {
      id: 1,
      name: 'Combo Noel Gia Đình',
      description: 'Hoàn hảo cho 4-6 người',
      price: 1200000,
      originalPrice: 1500000,
      items: ['2kg Ghẹ Xanh', '1kg Ghẹ Đỏ', '500g Tôm', 'Canh Ghẹ'],
      image: 'https://via.placeholder.com/400x300/E53935/FFFFFF?text=Combo+Noel+Gia+Dinh',
    },
    {
      id: 2,
      name: 'Combo Hải Sản Mùa Đông',
      description: 'Lý tưởng cho tiệc tùng',
      price: 1800000,
      originalPrice: 2200000,
      items: ['3kg Ghẹ Hỗn Hợp', '1kg Ghẹ Nướng', 'Đĩa Hải Sản', '2x Canh Ghẹ'],
      image: 'https://via.placeholder.com/400x300/1565C0/FFFFFF?text=Combo+Hai+San+Mua+Dong',
    },
    {
      id: 3,
      name: 'Combo Noel Cao Cấp',
      description: 'Tuyển chọn cao cấp',
      price: 2500000,
      originalPrice: 3200000,
      items: ['4kg Ghẹ Cao Cấp', '2kg Ghẹ Tươi Sống', 'Đĩa Cao Cấp', 'Hộp Quà'],
      image: 'https://via.placeholder.com/400x300/FF3B3F/FFFFFF?text=Combo+Noel+Cao+Cap',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <section id="combos" className="py-20 bg-gradient-to-br from-christmas-red via-accent-red to-christmas-red relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute text-white text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 3 === 0 ? <IconTree /> : i % 3 === 1 ? <IconGift /> : <IconBell />}
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
          <div className="flex items-center justify-center gap-4 mb-4">
            <IconBell className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Flash Sale - Combo Noel
            </h2>
            <IconBell className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl text-white/90 mb-6">
            Ưu đãi có hạn - Đặt hàng ngay trước khi quá muộn!
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex gap-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-8"
          >
              <div className="text-center">
              <div className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm text-white/80">Giờ</div>
            </div>
            <div className="text-3xl font-bold text-white">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm text-white/80">Phút</div>
            </div>
            <div className="text-3xl font-bold text-white">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm text-white/80">Giây</div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {combos.map((combo, index) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <IconGift className="w-8 h-8 text-christmas-red" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{combo.name}</h3>
                <p className="text-gray-600 mb-4">{combo.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {combo.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="text-christmas-red">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-christmas-red">
                      {formatPrice(combo.price)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(combo.originalPrice)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Tiết kiệm {formatPrice(combo.originalPrice - combo.price)}
                  </div>
                </div>

                <Button variant="primary" className="w-full" size="lg">
                  Đặt Combo Noel
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;

