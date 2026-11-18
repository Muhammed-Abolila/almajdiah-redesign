import { useTranslation } from "react-i18next";
import useLang from "../../../utils/useLang";
import {
  colorAndBgColorDependOnNumber,
  formatNumber,
} from "../../../utils/helper";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
const MarketData = () => {
  const { data, isLoading } = useRequest(
    [API_ENDPOINTS.OVERVIEW.KEY],
    API_ENDPOINTS.OVERVIEW.URL
  );
  const { t } = useTranslation();

  const marketData = [
    {
      label: "price",
      value: data?.companyStockSummary?.closeValue,
    },
    {
      label: "open",
      value: data?.companyStockSummary?.openValue,
    },
    {
      label: "prevClosed",
      value: data?.companyStockSummary?.previousCloseValue,
    },
    {
      label: "high",
      value: data?.companyStockSummary?.high,
    },
    {
      label: "low",
      value: data?.companyStockSummary?.low,
    },
  ];

  const changesData = [
    {
      label: `3 ${useLang("months", "شهور")}`,
      value: data?.companyStockSummary?.month3Change,
    },
    {
      label: `6 ${useLang("months", "شهور")}`,
      value: data?.companyStockSummary?.month6Change,
    },
    {
      label: `12 ${useLang("months", "شهر")}`,
      value: data?.companyStockSummary?.ytdChange,
    },
    {
      label: useLang("year to date", "التغير من بدايه العام"),
      value: data?.companyStockSummary?.ybgnChange,
    },
  ];

  const volumnData = [
    {
      label: useLang("turnover", "قيمة التداول"),
      value: formatNumber(data?.companyStockSummary?.amount, 2,"-")
    },

    {
      label: useLang("transactions", "عدد الصفقات"),
      value: formatNumber(data?.companyStockSummary?.contractCount, 0, "-")
    },
    {
      label: useLang("volume", "حجم التداول"),
      value: formatNumber(data?.companyStockSummary?.volume, 0 ,"-")
    },
  ];
  
  return (
    <div className="col-12 col-lg-6">
      <h2 className="section-title  mb-3 mb-lg-4">
        {useLang("market data", "أداء السهم")}
      </h2>

      {isLoading ?
        <SkeletonCard className="w-100" />
        :
        <>
          <div className="mb-3">
            <p className="custom-fs-6 fw-medium m-0 text-capitalize">
              {useLang("market value", "آخر سعر")}
            </p>
            <span
              className="custom-fs-3 fw-semibold"
              style={{ color: colorAndBgColorDependOnNumber(data?.companyStockSummary?.closeValue) }}
            >
              {formatNumber(data?.companyStockSummary?.closeValue)}
            </span>
            <sub className="text-uppercase" style={{ top: "6px" }}>
              {useLang("sar", "ريال")}
            </sub>
          </div>

          {/* Price Row */}
          <div className="row gx-4 gy-3 mb-3 mb-sm-4 fw-medium">
            {marketData.map((item, idx) => (
              <div key={idx} className="col-4 col-sm">
                <p className="m-0 text-capitalize custom-fs-6">
                  {t(`share.${item.label}`)}
                </p>
                <p
                  className="m-0 fw-semibold custom-fs-6"
                  style={{ color: colorAndBgColorDependOnNumber(item?.value) }}
                >
                  {formatNumber(item.value)}
                </p>
              </div>
            ))}
          </div>

          {/* Change Section */}
          <div className="mb-3 mb-sm-4 fw-medium">
            <p className="custom-fs-6 m-0 mb-2 text-capitalize">
              {useLang("change", "التغيير")}
            </p>
            <div className="row gx-4 gy-3">
              {changesData.map((item, idx) => (
                <div key={idx} className="col-6 col-sm-3">
                  <p className="m-0 text-capitalize custom-fs-6">{item.label}</p>
                  <p
                    className="m-0 fw-semibold custom-fs-6"
                    style={{ color: colorAndBgColorDependOnNumber(item.value) }}
                  >
                    {formatNumber(item.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="row gx-4 gy-3">
            {volumnData.map((item, idx) => (
              <div key={idx} className="col-6 col-sm-4 fw-medium">
                <p className="m-0 text-capitalize custom-fs-6">{item.label}</p>
                <p
                  className="m-0 fw-semibold custom-fs-6"
                  style={{ color: colorAndBgColorDependOnNumber(item.value) }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </>
      }


    </div>
  );
};

export default MarketData;
