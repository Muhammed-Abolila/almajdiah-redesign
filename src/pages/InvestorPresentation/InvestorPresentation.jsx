import ReportsCard from "../../components/common/reportsCard/ReportsCard";
import { API_ENDPOINTS } from "../../services/apis";
import useLang from "../../utils/useLang";
import useRequest from "../../utils/useRequest";
import SkeletonCard from "../../components/ui/SkeletonCard/SkeletonCard";
const InvestorPresentation = () => {
  const { data: investorsPresentaionData, isLoading } = useRequest(
    [`${API_ENDPOINTS.INVESTORS_PRESENTATION.KEY}`],
    `${API_ENDPOINTS.INVESTORS_PRESENTATION.URL}`
  );
  return (
    <section className="investor-presentation container space-between-sections pb-5">
      <h2 className="section-title mb-4">
        {useLang("investor presentation", "عروض المستثمرين")}
      </h2>
      <div className="row mt-5 gx-5" style={{ rowGap: "65px" }}>
        {isLoading
          ?
          <SkeletonCard length={3} className="col-12 col-md-6 col-lg-4" />
          : investorsPresentaionData?.investorsPresentations?.map(
            (item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <ReportsCard
                  desc={useLang(item?.descriptionEn, item?.descriptionAr)}
                  file={useLang(item?.attachLinkUrlEn, item?.attachLinkUrlAr)}
                  date={item?.createdOn}
                />
              </div>
            )
          )}
      </div>
    </section>
  );
};

export default InvestorPresentation;
