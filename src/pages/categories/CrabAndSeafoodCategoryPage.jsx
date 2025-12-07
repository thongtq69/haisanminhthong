import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCrabSeafoodCategories } from '../../api/categories';
import { getCrabSeafoodProducts } from '../../api/products';
import CategoryBadgeList from '../../components/categories/CategoryBadgeList';
import ProductCard from '../../components/ProductCard';

const CrabAndSeafoodCategoryPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategoryId, sortOption, allProducts]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [categoriesData, productsResponse] = await Promise.all([
        getCrabSeafoodCategories(),
        getCrabSeafoodProducts({ limit: 100 }), // Get more products for filtering
      ]);

      setCategories(categoriesData || []);
      const products = productsResponse.data || [];

      // Filter products that belong to crab/seafood categories
      const categoryIds = categoriesData.map((cat) => cat._id);
      const filtered = products.filter((product) => {
        const productCategoryId =
          typeof product.category === 'object'
            ? product.category._id
            : product.category;

        // Check if product belongs to any crab/seafood category
        if (categoryIds.includes(productCategoryId)) {
          return true;
        }

        // Also check product tags
        const productTags = (product.tags || []).map((tag) => tag.toLowerCase());
        const keywords = ['ghe', 'ghẹ', 'hai-san', 'hải sản', 'seafood', 'crab'];
        return keywords.some((keyword) =>
          productTags.some((tag) => tag.includes(keyword))
        );
      });

      setAllProducts(filtered);
      setFilteredProducts(filtered);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategoryId) {
      filtered = filtered.filter((product) => {
        const productCategoryId =
          typeof product.category === 'object'
            ? product.category._id
            : product.category;
        return productCategoryId === selectedCategoryId;
      });
    }

    // Sort
    switch (sortOption) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      case 'rating':
        filtered.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải hải sản tươi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Có lỗi xảy ra</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 md:py-32 bg-gradient-to-br from-sky-50 via-cyan-50 to-white overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 right-10 text-8xl opacity-20"
          >
            🦀
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute bottom-20 left-10 text-6xl opacity-20"
          >
            🦐
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6"
            >
              Danh Mục Ghẹ & Hải Sản
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                Tươi Sống
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-700 mb-8"
            >
              Chọn nhanh các loại ghẹ, tôm, mực và hải sản tươi mỗi ngày – giao tận nơi, chế biến
              cực dễ.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base text-slate-600"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Ghẹ tươi sống, thịt chắc</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Hải sản được tuyển chọn mỗi ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Giao hàng nhanh trong 2 giờ</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToProducts}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Xem tất cả sản phẩm Ghẹ & Hải Sản ↓
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Category Highlight Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Danh Mục Nổi Bật
              </h2>
              <p className="text-lg text-slate-600">
                Khám phá các loại hải sản tươi ngon của chúng tôi
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => {
                    setSelectedCategoryId(category._id);
                    handleScrollToProducts();
                  }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group transition-all duration-300 ${
                    selectedCategoryId === category._id
                      ? 'ring-2 ring-cyan-600 shadow-lg'
                      : ''
                  }`}
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">{category.icon || '🦀'}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {category.description || 'Hải sản tươi ngon'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter + Sort Bar */}
      <section id="products-section" className="py-8 bg-slate-50 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <h3 className="text-lg font-semibold text-slate-900 mb-3 md:mb-0">
                Lọc theo danh mục:
              </h3>
              <CategoryBadgeList
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onCategorySelect={setSelectedCategoryId}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                Sắp xếp theo:
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 text-slate-900"
              >
                <option value="newest">Mới nhất</option>
                <option value="priceAsc">Giá tăng dần</option>
                <option value="priceDesc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🦀</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Hiện chưa có sản phẩm cho danh mục này
              </h3>
              <p className="text-slate-600 mb-6">
                Bạn có thể quay lại sau hoặc xem các danh mục hải sản khác.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Về trang chủ
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-slate-600">
                  Tìm thấy <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{' '}
                  sản phẩm
                  {selectedCategoryId &&
                    ` trong danh mục "${
                      categories.find((c) => c._id === selectedCategoryId)?.name || ''
                    }"`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => {
                  // Transform product data to match ProductCard format
                  const transformedProduct = {
                    id: product._id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image:
                      Array.isArray(product.images) && product.images.length > 0
                        ? product.images[0]
                        : 'https://via.placeholder.com/400x300',
                    rating: product.avgRating || 0,
                    reviews: product.reviewCount || 0,
                    badge: product.isOnSale
                      ? 'Giảm giá'
                      : product.tags?.some((tag) =>
                          ['ghe', 'ghẹ', 'hai-san', 'hải sản'].some((k) =>
                            tag.toLowerCase().includes(k)
                          )
                        )
                      ? 'Hải sản hot'
                      : 'Mới',
                    badgeColor: product.isOnSale ? 'christmas-red' : 'ocean-blue',
                    origin: product.origin || 'N/A',
                    size: product.sizeOptions?.[0]?.label || '1kg',
                    description: product.shortDescription || product.description || '',
                  };

                  return (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ProductCard product={transformedProduct} />
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CrabAndSeafoodCategoryPage;

