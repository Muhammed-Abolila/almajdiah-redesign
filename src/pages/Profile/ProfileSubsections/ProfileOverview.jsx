import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
import { cleanHtml } from "../../../utils/helper";
import useLang from "../../../utils/useLang";
const ProfileOverview = ({ data, isLoading }) => {
  return (
    <div className="col-12 col-lg-7 col-xxl-7">
      <h2 className="section-title mb-4">
        {useLang("business overview", "نبذه موسعه")}
      </h2>
      {isLoading ?
        <SkeletonCard />
        :
        <div className="custom-fs-6" style={{ color: "var(--black-color)" }}>
          {useLang(
            cleanHtml(data?.summaryEn || "")
              .split(".")
              .map((item, idx) => <p key={idx}>{item?.trim()}</p>),

            cleanHtml(data?.summaryAr || "")
              .split(".")
              .map((item, idx) => <p key={idx}>{item?.trim()}</p>)
          )}
        </div>
      }

    </div>
  );
};
export default ProfileOverview;
