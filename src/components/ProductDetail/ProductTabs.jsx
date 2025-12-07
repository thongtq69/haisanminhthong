import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Mô tả chi tiết', icon: '📝' },
    { id: 'nutrition', label: 'Thông tin dinh dưỡng', icon: '🥗' },
    { id: 'storage', label: 'Bảo quản & Chế biến', icon: '❄️' },
    { id: 'shipping', label: 'Thông tin giao hàng', icon: '🚚' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-ocean-blue/10 to-christmas-red/10">
        <div className="flex flex-wrap gap-2 p-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-christmas-red text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'description' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🌊</span> Nguồn gốc
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description?.origin}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🦀</span> Đặc điểm
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description?.characteristics}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🍽️</span> Gợi ý món ăn
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {(product.description?.cookingSuggestions || []).map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-ocean-blue/5 to-christmas-red/5 rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-bold text-lg text-gray-900 mb-2">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {suggestion.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Thành phần dinh dưỡng (trên 100g)
                </h3>
                <div className="bg-gradient-to-br from-ocean-blue/10 to-christmas-red/10 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.nutrition?.per100g || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700 capitalize">
                          {key === 'calories' ? 'Năng lượng' : 
                           key === 'protein' ? 'Protein' :
                           key === 'fat' ? 'Chất béo' :
                           key === 'carbs' ? 'Carbohydrate' :
                           key === 'cholesterol' ? 'Cholesterol' :
                           key === 'sodium' ? 'Natri' : key}
                        </span>
                        <span className="font-bold text-christmas-red">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Lợi ích sức khỏe
                </h3>
                <ul className="space-y-3">
                  {(product.nutrition?.benefits || []).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-christmas-red text-xl">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>❄️</span> Cách bảo quản
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-ocean-blue p-4 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Ghẹ còn sống:</h4>
                    <p className="text-gray-700">{product.storage?.fresh}</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-ocean-blue p-4 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Bảo quản đông lạnh:</h4>
                    <p className="text-gray-700">{product.storage?.frozen}</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-ocean-blue p-4 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Đã chế biến:</h4>
                    <p className="text-gray-700">{product.storage?.cooked}</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>👨‍🍳</span> Hướng dẫn chế biến
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-christmas-red p-4 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Sơ chế:</h4>
                    <p className="text-gray-700">{product.cooking?.cleaning}</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-christmas-red p-4 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Cách hấp:</h4>
                    <p className="text-gray-700">{product.cooking?.steaming}</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-christmas-red p-4 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Mẹo nấu ngon:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {(product.cooking?.tips || []).map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📍</span> Khu vực giao hàng
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(product.shipping?.areas || []).map((area, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-ocean-blue/10 to-christmas-red/10 p-4 rounded-lg"
                    >
                      <p className="text-gray-700 font-medium">{area}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📦</span> Đóng gói
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.shipping?.packaging}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>ℹ️</span> Lưu ý khi nhận hàng
                </h3>
                <ul className="space-y-3">
                  {(product.shipping?.notes || []).map((note, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-christmas-red text-xl">•</span>
                      <span className="text-gray-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductTabs;
