import "./SkeletonChart.css"
const SkeletonChart = () => (
 <div className="container mt-4">
      <div className="row align-items-end skeleton-chart">
        {[...Array(6)].map((_, index) => (
          <div className="col" key={index}>
            <div
              className="skeleton-bar"
              style={{ height: `${30 + index * 20}px` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
);
export default SkeletonChart