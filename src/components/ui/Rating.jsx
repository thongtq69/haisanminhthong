const Rating = ({ rating, reviews, showReviews = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < fullStars ? '★' : i === fullStars && hasHalfStar ? '☆' : '☆'}
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
      {showReviews && reviews && (
        <span className="text-sm text-gray-500">({reviews})</span>
      )}
    </div>
  );
};

export default Rating;

