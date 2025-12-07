import { useState } from 'react';
import { motion } from 'framer-motion';
import Rating from '../ui/Rating';
import Button from '../ui/Button';

const ReviewSection = ({ reviews, ratingDistribution, averageRating, totalReviews }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState(reviews.slice(0, 5));

  const handleLoadMore = () => {
    setDisplayedReviews(reviews);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // TODO: Implement review submission
    alert('Cảm ơn bạn đã đánh giá!');
    setShowReviewForm(false);
    setReviewComment('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <span>⭐</span> Đánh giá từ khách hàng
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          Viết đánh giá
        </Button>
      </div>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
        <div className="text-center">
          <div className="text-6xl font-bold text-christmas-red mb-2">
            {averageRating.toFixed(1)}
          </div>
          <Rating rating={averageRating} reviews={totalReviews} />
          <p className="text-gray-600 mt-2">{totalReviews} đánh giá</p>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-12">
                {stars} sao
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${ratingDistribution[stars] || 0}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: stars * 0.1 }}
                  className="bg-yellow-400 h-full"
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {ratingDistribution[stars] || 0}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmitReview}
          className="mb-8 p-6 bg-gradient-to-br from-ocean-blue/10 to-christmas-red/10 rounded-xl"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá của bạn:
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className="text-3xl transition-transform hover:scale-110"
                >
                  {star <= reviewRating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhận xét:
            </label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hình ảnh (tùy chọn):
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Click để upload hình ảnh</p>
              <p className="text-sm text-gray-400 mt-1">Tối đa 5 hình</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Gửi đánh giá
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowReviewForm(false)}
            >
              Hủy
            </Button>
          </div>
        </motion.form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{review.userName}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      ✓ Đã mua hàng
                    </span>
                  )}
                </div>
                <Rating rating={review.rating} showReviews={false} />
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(review.date)}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Review ${review.id} - ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {displayedReviews.length < reviews.length && (
        <div className="text-center mt-6">
          <Button variant="outline" onClick={handleLoadMore}>
            Xem thêm đánh giá ({reviews.length - displayedReviews.length})
          </Button>
        </div>
      )}
    </motion.section>
  );
};

export default ReviewSection;

