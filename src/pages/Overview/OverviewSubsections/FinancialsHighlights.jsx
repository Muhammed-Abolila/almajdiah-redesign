import { useState } from "react";
import CustomDropdown from "../../../components/common/customDropdown/CustomDropdown";
import useLang from "../../../utils/useLang";
import { changeCurrencyFromRiyalToDollar, getClosestAvailableYear } from "../../../utils/helper";
import { currencies } from "../../../constants/constants";
import CountableSection from "./CountableSection";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
const FinancialsHighlights = () => {
  const { data, isLoading } = useRequest(
    [API_ENDPOINTS.PROFILE.KEY],
    API_ENDPOINTS.PROFILE.URL
  );
  const [choosenCurrency, setChoosenCurrency] = useState({
    labelEn: "riyal",
    labelAr: "ريال سعودي",
    value: "riyal",
  });


  return (
    <section className="space-between-sections">
      <div className="d-flex align-items-center gap-3 custom-fs-4">
        <h2 className="section-title m-0">
          {useLang("financials highlights", "ملخص النتائج المالية")}
        </h2>

        <CustomDropdown
          selectedItem={choosenCurrency}
          list={currencies}
          onClick={(value) => setChoosenCurrency(value)}
        />
      </div>

      <div className="row p-0">

        {isLoading ?
          <SkeletonCard length={4} className="col-12 col-md-6 col-lg-3" />
          :
          (data?.financialHighlights?.map((item, idx) => {
            const yearToUse = getClosestAvailableYear(item);
            const value = yearToUse ? item[yearToUse] : 0;

            return (
              <div
                key={idx}
                className="col-12 col-md-6 col-lg-3 d-flex flex-column gap-2 mt-4 mt-md-5 text-capitalize fw-medium"
              >
                <p className="m-0 custom-fs-5 fw-medium word-nowrap pb-3 border-bottom">
                  {useLang(item?.DisplayNameEn, item?.DisplayNameAr)}
                </p>

                <div
                  dir="ltr"
                  className={`d-flex ${useLang(
                    "justify-content-start",
                    "justify-content-end"
                  )} align-items-center gap-3 custom-fs-3`}
                >
                  <svg
                    width="26"
                    height="29"
                    viewBox="0 0 26 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.1104 21.3675C25.5744 20.3068 25.881 19.1552 25.9985 17.9477L18.3507 19.6253V16.4004L25.1102 14.9189C25.5741 13.8581 25.8808 12.7065 25.9983 11.4991L18.3505 13.1752V1.5774C17.1786 2.25602 16.1379 3.15933 15.2919 4.22484V13.846L12.2333 14.5165V0C11.0614 0.67838 10.0207 1.58193 9.17467 2.64745V15.1867L2.33102 16.6866C1.86708 17.7474 1.56018 18.899 1.44246 20.1064L9.17467 18.4117V22.4729L0.888095 24.289C0.424158 25.3498 0.117488 26.5014 0 27.7088L8.67373 25.8078C9.37981 25.6563 9.98667 25.2257 10.3812 24.6332L11.9719 22.2009V22.2005C12.1371 21.9488 12.2333 21.6454 12.2333 21.3186V17.7412L15.2919 17.0706V23.5205L25.1102 21.367L25.1104 21.3675Z"
                      fill="#CFAF7A"
                    />
                    <path
                      d="M16.1823 25.5802C15.7183 26.6412 15.4117 27.7926 15.2942 29L25.112 26.8475C25.576 25.7868 25.8824 24.6352 26.0001 23.4277L16.1823 25.5802Z"
                      fill="#CFAF7A"
                    />
                  </svg>

                  <CountableSection
                    end={
                      choosenCurrency.value === "riyal"
                        ? value
                        : changeCurrencyFromRiyalToDollar(value)
                    }
                    duration={1000}
                  />
                </div>
              </div>
            );
          }))}
      </div>
    </section>
  );
};

export default FinancialsHighlights;
