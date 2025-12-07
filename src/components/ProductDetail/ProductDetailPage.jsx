import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageGallery from './ImageGallery';
import ProductInfoPanel from './ProductInfoPanel';
import ProductTabs from './ProductTabs';
import ReviewSection from './ReviewSection';
import RelatedProductsSection from './RelatedProductsSection';
import AddToCartBar from './AddToCartBar';
import { getProductBySlug, getProductReviews, getFeaturedProducts } from '../../api/products';
import { products as mockProducts } from '../../data/products';
import { safeImageUrl } from '../../utils/safeImage';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const fallbackImage = (text) =>
          `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%231565C0" offset="0%"/><stop stop-color="%23E53935" offset="100%"/></linearGradient></defs><rect width="800" height="600" fill="url(%23grad)"/><text x="50%" y="50%" fill="white" font-size="32" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(text || '')}</text></svg>`;

        // Try API first
        let productData = null;
        try {
          productData = await getProductBySlug(slug);
        } catch (apiErr) {
          console.warn('API product fetch failed, using fallback:', apiErr);
        }

        // Fallback to mock if API fails
        const mockFallback = mockProducts.find((p) => p.slug === slug);
        const sourceProduct = productData || mockFallback;

        if (!sourceProduct) {
          throw new Error('Sản phẩm không tồn tại');
        }

        const rawImages = sourceProduct.images?.length
          ? sourceProduct.images
          : sourceProduct.image
          ? [sourceProduct.image]
          : [];

        const safeImages = (rawImages.length ? rawImages : [fallbackImage(sourceProduct.name)]).map((img, idx) => {
          const url = safeImageUrl(img, sourceProduct.name);
          return {
            id: idx + 1,
            url,
            alt: sourceProduct.name,
            thumbnail: url,
          };
        });

        // Build safe defaults for tab data
        const defaultDescription = {
          origin: sourceProduct.origin || 'Nguồn ghẹ tươi sống, giao nhanh trong ngày.',
          characteristics: sourceProduct.shortDescription || 'Ghẹ thịt chắc, ngọt, phù hợp hấp, rang me, nướng phô mai.',
          cookingSuggestions: [
            {
              title: 'Ghẹ hấp bia',
              description: 'Giữ vị ngọt tự nhiên, dùng kèm muối tiêu chanh.',
              image: fallbackImage(sourceProduct.name),
            },
            {
              title: 'Ghẹ rang me',
              description: 'Chua ngọt đậm đà, hợp khẩu vị gia đình.',
              image: fallbackImage(sourceProduct.name),
            },
            {
              title: 'Ghẹ nướng phô mai',
              description: 'Béo thơm, phù hợp tiệc Noel.',
              image: fallbackImage(sourceProduct.name),
            },
          ],
        };

        const defaultNutrition = {
          per100g: {
            calories: '98 kcal',
            protein: '19 g',
            fat: '1.5 g',
            carbs: '0 g',
            cholesterol: '59 mg',
            sodium: '395 mg',
          },
          benefits: [
            'Giàu đạm, ít béo, phù hợp ăn kiêng',
            'Cung cấp khoáng chất: kẽm, selen',
            'Tốt cho tim mạch nếu chế biến ít dầu mỡ',
          ],
        };

        const defaultStorage = {
          fresh: 'Bảo quản trong thùng đá, dùng trong 4-6 giờ.',
          frozen: 'Đông lạnh -18°C, dùng trong 1-2 tháng.',
          cooked: 'Bảo quản mát 0-4°C, dùng trong 24 giờ.',
        };

        const defaultCooking = {
          cleaning: 'Rửa nhanh với nước muối loãng, không ngâm lâu.',
          steaming: 'Hấp 8-10 phút với bia/sả để giữ vị ngọt.',
          tips: ['Ướp nhẹ 15 phút trước khi nướng', 'Không hấp quá chín để giữ độ ngọt'],
        };

        const defaultShipping = {
          areas: ['Nội thành (2h)', 'Ngoại thành (trong ngày)'],
          packaging: 'Đóng thùng xốp + đá gel giữ lạnh 0-4°C.',
          notes: ['Kiểm tra gói lạnh khi nhận hàng', 'Liên hệ ngay nếu sản phẩm không còn tươi'],
        };

        // Ensure options arrays are not empty
        const sizeOptions = sourceProduct.sizeOptions?.map((opt) => ({
          id: opt.value,
          label: opt.label,
          value: opt.value,
          price: sourceProduct.price,
          default: opt.default,
        })) ||
          (sourceProduct.size
            ? [
                {
                  id: 'default',
                  label: sourceProduct.size,
                  value: sourceProduct.size,
                  price: sourceProduct.price,
                  default: true,
                },
              ]
            : [
                { id: 'default', label: 'Size tiêu chuẩn', value: 'default', price: sourceProduct.price, default: true },
              ]);

        const weightOptions = sourceProduct.weightOptions?.map((opt) => ({
          id: String(opt.value),
          label: opt.label,
          value: String(opt.value),
          price: sourceProduct.price * opt.value,
          default: opt.default,
        })) || [];

        // Transform product data
        const transformedProduct = {
          id: sourceProduct._id || sourceProduct.id,
          slug: sourceProduct.slug,
          name: sourceProduct.name,
          category: sourceProduct.category?.name || sourceProduct.category || '',
          price: sourceProduct.price,
          originalPrice: sourceProduct.originalPrice,
          rating: sourceProduct.avgRating || sourceProduct.rating || 4.8,
          reviewsCount: sourceProduct.reviewCount || sourceProduct.reviews || 0,
          badge: sourceProduct.isOnSale ? 'Giảm giá Noel' : sourceProduct.badge || '',
          badgeColor: 'christmas-red',
          images: safeImages,
          shortDescription: sourceProduct.shortDescription || sourceProduct.description,
          origin: sourceProduct.origin,
          options: {
            size: sizeOptions,
            weight: weightOptions.length ? weightOptions : [{ id: 'w-default', label: '1kg', value: '1', price: sourceProduct.price, default: true }],
            condition: [
              { id: 'fresh', label: 'Sống', value: 'fresh', description: 'Ghẹ còn sống' },
              { id: 'cleaned', label: 'Làm sạch', value: 'cleaned', description: 'Đã làm sạch' },
            ],
          },
          quickInfo:
            sourceProduct.quickInfo ||
            [
              { icon: '❄️', text: 'Đóng gói giữ lạnh 0-4°C' },
              { icon: '⏱️', text: 'Giao nhanh 2h nội thành' },
              { icon: '💰', text: 'Hoàn tiền nếu không hài lòng' },
            ],
          tags: sourceProduct.tags || ['Ghẹ tươi', 'Noel', 'Giao nhanh'],
          description:
            typeof sourceProduct.description === 'object'
              ? { ...defaultDescription, ...sourceProduct.description }
              : defaultDescription,
          nutrition: sourceProduct.nutrition ? { ...defaultNutrition, ...sourceProduct.nutrition } : defaultNutrition,
          storage: sourceProduct.storage ? { ...defaultStorage, ...sourceProduct.storage } : defaultStorage,
          cooking: sourceProduct.cooking ? { ...defaultCooking, ...sourceProduct.cooking } : defaultCooking,
          shipping: sourceProduct.shipping ? { ...defaultShipping, ...sourceProduct.shipping } : defaultShipping,
        };

        setProduct(transformedProduct);

        // Set default selections
        if (transformedProduct.options.size.length > 0) {
          setSelectedSize(transformedProduct.options.size[0]);
        }
        if (transformedProduct.options.weight.length > 0) {
          setSelectedWeight(transformedProduct.options.weight[0]);
        }
        if (transformedProduct.options.condition.length > 0) {
          setSelectedCondition(transformedProduct.options.condition[0]);
        }

        // Fetch reviews (fallback empty on error)
        if (productData?._id) {
          try {
            const reviewsData = await getProductReviews(productData._id, 10);
            const transformedReviews = reviewsData.map((review) => ({
              id: review._id,
              userName: review.authorName,
              rating: review.rating,
              comment: review.comment,
              date: new Date(review.createdAt).toISOString().split('T')[0],
              verified: true,
              images: [],
            }));
            setReviews(transformedReviews);
          } catch (reviewErr) {
            console.warn('Reviews fallback to empty:', reviewErr);
            setReviews([]);
          }
        } else {
          setReviews([]);
        }

        // Fetch related products
        let relatedData = [];
        try {
          relatedData = await getFeaturedProducts();
        } catch (relErr) {
          console.warn('Related products fallback to mock:', relErr);
          relatedData = mockProducts;
        }
        const transformedRelated = (relatedData || [])
          .filter((p) => (p._id || p.id) !== (sourceProduct._id || sourceProduct.id))
          .slice(0, 4)
          .map((p) => ({
            id: p._id || p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.originalPrice,
            image: p.images?.[0] || p.image || fallbackImage(p.name),
            rating: p.avgRating || p.rating,
            reviews: p.reviewCount || p.reviews,
            badge: p.isOnSale ? 'Giảm Noel' : p.badge || 'Mới',
            badgeColor: 'christmas-red',
          }));
        setRelatedProducts(transformedRelated);

        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Không thể tải sản phẩm');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    console.log('Add to cart:', {
      productId: product.id,
      size: selectedSize,
      weight: selectedWeight,
      condition: selectedCondition,
      quantity
    });
    alert('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <main className="pt-20 pb-12 bg-snow-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="pt-20 pb-12 bg-snow-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-600">{error || 'Sản phẩm không tồn tại'}</p>
          </div>
        </div>
      </main>
    );
  }

  // Calculate rating distribution as percentages from reviews
  const totalReviews = reviews.length || 1;
  const ratingDistribution = {
    5: Math.round((reviews.filter((r) => r.rating === 5).length / totalReviews) * 100),
    4: Math.round((reviews.filter((r) => r.rating === 4).length / totalReviews) * 100),
    3: Math.round((reviews.filter((r) => r.rating === 3).length / totalReviews) * 100),
    2: Math.round((reviews.filter((r) => r.rating === 2).length / totalReviews) * 100),
    1: Math.round((reviews.filter((r) => r.rating === 1).length / totalReviews) * 100),
  };

  return (
    <>
      <main className="pt-20 pb-12 bg-snow-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Product Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Images */}
              <div>
                <ImageGallery images={product.images} />
              </div>

              {/* Right Column - Product Info */}
              <div>
                <ProductInfoPanel 
                  product={product}
                  selectedSize={selectedSize}
                  selectedWeight={selectedWeight}
                  selectedCondition={selectedCondition}
                  quantity={quantity}
                  onSizeChange={setSelectedSize}
                  onWeightChange={setSelectedWeight}
                  onConditionChange={setSelectedCondition}
                  onQuantityChange={setQuantity}
                />
              </div>
            </div>
          </motion.div>

          {/* Product Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <ProductTabs product={product} />
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <ReviewSection
              reviews={reviews}
              ratingDistribution={ratingDistribution}
              averageRating={product.rating}
              totalReviews={product.reviewsCount}
              productId={product.id}
              onReviewAdded={async () => {
                // Refresh product data after review is added
                const productData = await getProductBySlug(slug);
                setProduct((prev) => ({
                  ...prev,
                  rating: productData.avgRating,
                  reviewsCount: productData.reviewCount,
                }));
              }}
            />
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <RelatedProductsSection products={relatedProducts} />
          </motion.div>
        </div>
      </main>

      {/* Sticky Add to Cart Bar (Mobile) */}
      <AddToCartBar
        product={product}
        selectedSize={selectedSize}
        selectedWeight={selectedWeight}
        selectedCondition={selectedCondition}
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </>
  );
};

export default ProductDetailPage;
