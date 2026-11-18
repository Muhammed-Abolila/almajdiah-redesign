import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
import { formatNumber, getMonthName } from "../../../utils/helper";
import useLang from "../../../utils/useLang";
const TradingData = ({ data, isLoading }) => {
  const tradingInfo = [
    {
      label: useLang("Trading Market:", "سوق التداول:"),
      value: useLang(data?.marketNameEn, data?.marketNameAr),
    },
    {
      label: useLang("Fiscal Year End:", "نهاية السنة المالية:"),
      value: useLang(
        getMonthName(data?.yearEndMonth),
        getMonthName(data?.yearEndMonth)
      ),
    },
    {
      label: useLang("Free Float (M):", "الأسهم الحرة (مليون):"),
      value: useLang(
        formatNumber(data?.freeFloatShareValue),
        formatNumber(data?.freeFloatShareValue)
      ),
    },
    {
      label: useLang("Free Float %:", "الأسهم الحرة%:"),
      value: useLang(
        formatNumber(data?.percentage),
        formatNumber(data?.percentage)
      ),
    },
    {
      label: useLang("Weight in Index %:", "وزن الشركة%:"),
      value: useLang(
        formatNumber(data?.companyWeight),
        formatNumber(data?.companyWeight)
      ),
    },
    {
      label: useLang(
        "3M Average Volume:",
        "متوسط حجم التداول (سهم) لآخر 3 أشهر:"
      ),
      value: formatNumber(Math.round(data?.avgVolume3Months), 0, "-")
    },
    {
      label: useLang(
        "3M Average Transactions:",
        "متوسط عدد الصفقات اليومية - آخر 3 أشهر:"
      ),
      value: formatNumber(Math.round(data?.avgTransactions3Months), 0, "-")
    },
  ];
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div>
        <h2 className="section-title mb-4">
          {useLang("trading data", "قطاعات أرقام")}
        </h2>
      </div>
      {isLoading ?
        <SkeletonCard  className="w-100"/>
        :
        <div>
          {tradingInfo?.map((item, idx) => (
            <div key={idx} className="box-title">
              <p
                className="m-0 text-capitalize"
                style={{ color: "var(--text-color)" }}
              >
                {item?.label}
              </p>
              <p
                className="m-0 text-capitalize"
                style={{ color: "var(--black-color)" }}
              >
                {item?.value}
              </p>
            </div>
          ))}
        </div>
      }

    </div>
  );
};

export default TradingData;
