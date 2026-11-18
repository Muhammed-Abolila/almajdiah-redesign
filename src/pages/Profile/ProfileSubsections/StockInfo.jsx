import { useMemo, useState } from "react";
import {
  changeCurrencyFromRiyalToDollar,
  formatNumber,
} from "../../../utils/helper";
import useLang from "../../../utils/useLang";
import CustomDropdown from "../../../components/common/customDropdown/CustomDropdown";
import { currencies } from "../../../constants/constants";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";

const StockInfo = ({ data, isLoading }) => {
  const [choosenCurrency, setChoosenCurrency] = useState({
    labelEn: "riyal",
    labelAr: "ريال سعودي",
    value: "riyal",
  });
  // stock info data
  const stockInfo = [
    {
      label: useLang("par value:", "القيمة الإسمية:"),
      value: choosenCurrency?.value == "riyal" ? formatNumber(data?.nominalValue) : formatNumber(changeCurrencyFromRiyalToDollar(data?.nominalValue))
    },
    {
      label: useLang("book value:", "القيمة الدفترية:"),
      value: choosenCurrency?.value == "riyal" ? formatNumber(data?.bookValue,3) : formatNumber(changeCurrencyFromRiyalToDollar(data?.bookValue))
    },
    {
      label: useLang("market cap (M):", "القيمة السوقية (مليون):"),
      value: choosenCurrency?.value == "riyal" ? formatNumber(data?.marketValue) : formatNumber(changeCurrencyFromRiyalToDollar(data?.marketValue))
    },
  ];
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="d-flex align-items-center gap-3 custom-fs-4 mb-4">
        <h2 className="section-title">
          {useLang("stock information", "بيانات السهم")}
        </h2>
        <CustomDropdown
          selectedItem={choosenCurrency}
          list={currencies}
          onClick={(value) => setChoosenCurrency(value)}
        />
      </div>


      {isLoading ?
        <SkeletonCard className="w-100" />
        :
        (
          <div>
            {/* shares outstanding (m) */}
            <div className="box-title">
              <p
                className="m-0 text-capitalize"
                style={{ color: "var(--text-color)" }}
              >
                {useLang("shares outstanding (m):", "عدد الأسهم (مليون):")}
              </p>
              <p
                className="m-0 text-capitalize"
                style={{ color: "var(--black-color)" }}
              >
                {formatNumber(data?.numberOfShares)}
              </p>
            </div>

            {stockInfo?.map((item, idx) => (
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
        )}

    </div>
  );
};

export default StockInfo;
