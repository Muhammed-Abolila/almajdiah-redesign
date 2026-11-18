import "./SkeletonCard.css";
const SkeletonCard = ({ length = 1, className = "" }) => {
  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <div className={className} key={idx}>
          <div className="skeleton-card  mt-4">
            {/* Image placeholder */}
            <div className="skeleton-card-image mb-2"></div>

            {/* Date/header placeholder */}
            <div className="skeleton-card-header pb-2 mb-2">
              <div className="skeleton-card-line short"></div>
            </div>

            {/* Title placeholder */}
            <div className="skeleton-card-body">
              <div className="skeleton-card-line full"></div>
              <div className="skeleton-card-line full"></div>
              <div className="skeleton-card-line medium"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;