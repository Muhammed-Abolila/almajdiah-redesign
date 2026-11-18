import useLang from "../../../utils/useLang";
import { useTranslation } from "react-i18next";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import SkeletonTable from "../../../components/ui/SkeletonTable/SkeletonTable";
const ShareInfo = () => {
  const { t } = useTranslation();
  const { data: summaryStock } = useRequest(
    [API_ENDPOINTS.OVERVIEW.KEY],
    API_ENDPOINTS.OVERVIEW.URL
  );
  const data = {
    symbol: summaryStock?.companyStockSummary?.stockSymbol.replace(
      /\.SE$/i,
      ""
    ),
    marketName: useLang(
      summaryStock?.companyStockSummary?.marketNameEn,
      summaryStock?.companyStockSummary?.marketNameAr
    ),
    shortName: useLang(
      summaryStock?.companyStockSummary?.shortNameEn,
      summaryStock?.companyStockSummary?.shortNameAr
    ),
    open: summaryStock?.companyStockSummary?.openValue,
    close: summaryStock?.companyStockSummary?.closeValue,
    previousCloseValue: summaryStock?.companyStockSummary?.previousCloseValue,
    high: summaryStock?.companyStockSummary?.high,
    low: summaryStock?.companyStockSummary?.low,
  };
  return (
    <div dir="ltr" className="carousel-section d-flex align-items-end w-100">
      <div className="white-shape-container h-100 d-flex flex-column justify-content-end">
        <div className={`carousel-shape text-center mx-auto d-flex d-md-none ${!data?.marketName?"opacity-0":"opacity-100"}`}></div>
        {/* mobile carousel */}
        <div id="mobileCarousel" className="carousel slide carousel-fade">
          <div
            className="carousel-inner d-flex d-md-none"
            style={{ minHeight: "55px", color: "var(--white-color)" }}
          >
            <div className="carousel-item active text-center w-auto m-auto">
              {!data?.marketName ? (
                <div
                  className="mb-2"
                  style={{ minWidth: "150px", width: "100%" }}
                >
                  <SkeletonTable columns={1} rows={1} />
                </div>
              ) : (
                <>
                  <p className="text-start m-0">{data?.symbol}</p>
                  <p className="m-0 mt-2">
                    {data?.shortName} : {data?.marketName}
                  </p>
                </>
              )}
            </div>
            <div className="carousel-item d-flex justify-content-center align-items-center gap-1">
              <p className="m-0 custom-fs-2 fw-normal">{data?.close}</p>
              <sub
                className="text-uppercase fw-normal fs-6"
                style={{ bottom: "-9px", left: "5px" }}
              >
                {useLang("sar", "ريال")}
              </sub>
              <i className="bi bi-arrow-up-short text-success fs-2 ms-2"></i>
            </div>

            <div className="carousel-item d-flex justify-content-center align-items-center gap-1">
              <p className="m-0 custom-fs-2 fw-normal">{data?.high}</p>
              <sub
                className="text-capitalize fw-normal fs-6"
                style={{ bottom: "-9px", left: "5px" }}
              >
                {t("share.high")}
              </sub>
              <i className="bi bi-arrow-up-short text-success fs-2 ms-2"></i>
            </div>

            <div className="carousel-item  d-flex justify-content-center align-items-center gap-1">
              <p className="m-0 custom-fs-2 fw-normal">{data?.low}</p>
              <sub
                className="text-capitalize fw-normal fs-6"
                style={{ bottom: "-9px", left: "5px" }}
              >
                {t("share.low")}
              </sub>
              <i className="bi bi-arrow-down-short text-danger fs-2 ms-2"></i>
            </div>

            <div className="carousel-item d-flex justify-content-center align-items-center gap-1">
              <p className="m-0 custom-fs-2 fw-normal">{data?.open}</p>
              <sub
                className="text-capitalize fw-normal fs-6"
                style={{ bottom: "-9px", left: "5px" }}
              >
                {t("share.open")}
              </sub>
              <i className="bi bi-arrow-up-short text-success fs-2 ms-2"></i>
            </div>

            <div className="carousel-item d-flex justify-content-center align-items-center gap-1">
              <p className="m-0 custom-fs-2 fw-normal">
                {data?.previousCloseValue}
              </p>
              <sub
                className="text-capitalize fw-normal fs-6"
                style={{ bottom: "-9px", left: "5px" }}
              >
                {t("share.prevClosed")}
              </sub>
              <i className="bi bi-arrow-down-short text-danger fs-2 ms-2"></i>
            </div>
          </div>
        </div>

        <div className="white-shape bg-white " />
      </div>

      <div
        className="carousel-container d-flex justify-content-center align-items-end mb-0"
        style={{ color: "var(--white-color)" }}
      >
        {/* disktop carousel */}
        <div id="desktopCarousel"
          className="carousel slide carousel-fade w-75 d-none d-md-block" >
          <div className="carousel-inner" style={{ height: "70px" }}>
            {/* first slider */}
            <div className="carousel-item active">
              <div className="d-flex align-items-center mb-3">
                {!data?.marketName ? (
                  <div className="w-75">
                    <SkeletonTable columns={1} rows={1} />
                  </div>
                ) : (
                  <>
                    <div>
                      <span>{data?.symbol}</span>
                      <p className="m-0 mt-2">
                        {data?.marketName} : {data?.shortName}
                      </p>
                    </div>

                    <div className="w-50 d-flex justify-content-center align-items-center gap-1">
                      <p className="m-0 custom-fs-2 fw-normal">{data?.close}</p>
                      <sub
                        className="text-uppercase fw-normal fs-6"
                        style={{ bottom: "-9px", left: "5px" }}
                      >
                        {useLang("sar", "ريال")}
                      </sub>
                      <i className="bi bi-arrow-up-short text-success fs-2 ms-2"></i>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* second slider */}
            <div className="carousel-item ">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <p className="m-0 custom-fs-2 fw-normal">{data?.high}</p>
                  <sub
                    className="text-capitalize fw-normal fs-6"
                    style={{ bottom: "-9px", left: "5px" }}
                  >
                    {t("share.high")}
                  </sub>
                  <i className="bi bi-arrow-up-short text-success fs-2 ms-2"></i>
                </div>

                <div className="w-50 d-flex justify-content-center align-items-center gap-1">
                  <p className="m-0 custom-fs-2 fw-normal">{data?.low}</p>
                  <sub
                    className="text-capitalize fw-normal fs-6"
                    style={{ bottom: "-9px", left: "5px" }}
                  >
                    {t("share.low")}
                  </sub>
                  <i className="bi bi-arrow-down-short text-danger fs-2 ms-2"></i>
                </div>
              </div>
            </div>

            {/* third slider */}
            <div className="carousel-item">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <p className="m-0 custom-fs-2 fw-normal">{data?.open}</p>
                  <sub
                    className="text-capitalize fw-normal fs-6"
                    style={{ bottom: "-9px", left: "5px" }}
                  >
                    {t("share.open")}
                  </sub>
                  <i className="bi bi-arrow-up-short text-success fs-2 ms-2"></i>
                </div>

                <div className="w-50 d-flex justify-content-center align-items-center gap-1">
                  <p className="m-0 custom-fs-2 fw-normal">
                    {data?.previousCloseValue}
                  </p>
                  <sub
                    className="text-capitalize fw-normal fs-6"
                    style={{ bottom: "-9px", left: "5px" }}
                  >
                    {t("share.prevClosed")}
                  </sub>
                  <i className="bi bi-arrow-down-short text-danger fs-2 ms-2"></i>
                </div>
              </div>
            </div>
            
          </div>
          <div className={`carousel-shape ${!data?.marketName?"opacity-0":"opacity-100"}`}></div>
        </div>

        {/* mobile carousel buttons */}
        <div className="mobile-buttons d-flex d-md-none gap-2">
          <i
            className="bi bi-arrow-left-circle cursor-pointer fs-1"
            data-bs-target="#mobileCarousel"
            data-bs-slide="prev"
          ></i>
          <i
            className="bi bi-arrow-right-circle cursor-pointer fs-1"
            data-bs-target="#mobileCarousel"
            data-bs-slide="next"
          ></i>
        </div>

        {/* desktop carousel buttons */}
        <div className="desktop-buttons d-none d-md-flex gap-2">
          <i
            className="bi bi-arrow-left-circle cursor-pointer custom-fs-3"
            data-bs-target="#desktopCarousel"
            data-bs-slide="prev"
          ></i>
          <i
            className="bi bi-arrow-right-circle cursor-pointer custom-fs-3"
            data-bs-target="#desktopCarousel"
            data-bs-slide="next"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ShareInfo;
