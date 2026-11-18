import { useEffect, useState } from "react";
import CustomTd from "../../../components/common/customTd/CustomTd";
import useLang from "../../../utils/useLang";
import {
  changeCurrencyFromRiyalToDollar,
  formatNumber,
} from "../../../utils/helper";
import ChartModal from "../../../components/common/chartModal/ChartModal";
import CustomDropdown from "../../../components/common/customDropdown/CustomDropdown";
import { currencies } from "../../../constants/constants";
import SkeletonTable from "../../../components/ui/SkeletonTable/SkeletonTable";

const FinancialHighLights = ({ data, isLoading }) => {
  // states
  const [choosenCurrency, setChoosenCurrency] = useState({
    labelEn: "riyal",
    labelAr: "ريال سعودي",
    value: "riyal",
  });
  const [chartValues, setChartValues] = useState({
    years: [],
    values: [],
    title: "",
  });

  const [years, setYears] = useState([]);

  // useEffect to get last 5 years
  useEffect(() => {
    const mapedYears = data?.flatMap((item) =>
      Object.keys(item).filter((key) => /^\d{4}$/.test(key))
    );
    const years = new Set(mapedYears);
    const arrayOfYears = Array.from(years);
    setYears(
      arrayOfYears.sort((oldest, newest) => newest - oldest).slice(0, 5)
    );
  }, [data]);

  // get chart values
  const getChartValues = (item) => {
    const yearsValues = years.map((year) =>
      choosenCurrency?.value == "riyal"
        ? item[year]
        : changeCurrencyFromRiyalToDollar(item[year])
    );
    const sortedAndSlicedValues = yearsValues.slice(0, 5);
    setChartValues({
      years: years,
      values: sortedAndSlicedValues,
      title: useLang(item?.DisplayNameEn, item?.DisplayNameAr),
    });
  };

  return (
    <div className="space-between-sections">
      <div className="d-flex justify-content-between align-items-center gap-3 custom-fs-4 mb-4">
        <h2 className="section-title m-0">
          {useLang("financials highlights", "ملخص النتائج المالية")}
        </h2>
        <CustomDropdown
          selectedItem={choosenCurrency}
          list={currencies}
          onClick={(value) => setChoosenCurrency(value)}
        />
      </div>

      {/* table */}
      {isLoading ?
        <SkeletonTable />
        :
        <div className="table-responsive">
          <table className="w-100 fs-6" style={{ minWidth: "900px" }}>
            <thead
              style={{
                backgroundColor: "var(--identity-color)",
                color: "var(--white-color)",
              }}
            >
              <tr className="text-capitalize">
                <CustomTd
                  textCenter={false}
                  label={useLang("discription", "البيان")}
                  style={{ minWidth: "200px" }}
                />
                <CustomTd label={useLang("chart", "تشارت")} />
                {years?.map((item, idx) => (
                  <CustomTd key={idx} label={item} />
                ))}
              </tr>
            </thead>

            <tbody>
              {data?.map((item, idx) => (
                <tr key={idx} style={{ color: "var(--second-black-color)" }}>
                  <CustomTd
                    textCenter={false}
                    label={useLang(item?.DisplayNameEn, item?.DisplayNameAr)}
                    style={{ minWidth: "200px" }}
                  />
                  <td className="p-3 text-center">
                    <button
                      className="btn chart-btn p-2 py-1"
                      style={{
                        color: "var(--identity-color)",
                      }}
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => getChartValues(item)}
                    >
                      <i className="bi bi-bar-chart-fill"></i>
                    </button>
                  </td>
                  {years?.map((year) => (
                    <CustomTd
                      key={year}
                      label={choosenCurrency?.value == "riyal" ? formatNumber(item[year]) : formatNumber(changeCurrencyFromRiyalToDollar(item[year]))}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      <ChartModal chartValues={chartValues} />
    </div>
  );
};

export default FinancialHighLights;
