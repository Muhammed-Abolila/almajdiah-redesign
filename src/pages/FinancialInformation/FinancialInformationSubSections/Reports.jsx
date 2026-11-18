import { useMemo, useState } from "react";
import CustomDropdown from "../../../components/common/customDropdown/CustomDropdown";
import useLang from "../../../utils/useLang";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import EmptyComp from "../../../components/common/EmptyComp/EmptyComp";
import ReportsCard from "../../../components/common/reportsCard/ReportsCard";

const Reports = () => {
  const [choosedYear, setChoosedYear] = useState("all");
  const [choosedQt, setChoosedQt] = useState({
    labelAr: "السنوي",
    labelEn: "annual",
    value: "annual",
  });
  const [choosedLang, setChoosedLang] = useState({
    labelAr: "الإنجليزيه",
    labelEn: "english",
    value: "en",
  });

  //create qtOptions array to define available report types
  const qtOptions = [
    { labelAr: "السنوي", labelEn: "annual", value: "annual" },
    { labelAr: "الربع الاول", labelEn: "q1", value: "q1" },
    { labelAr: "الربع الثاني", labelEn: "q2", value: "q2" },
    { labelAr: "الربع الثالث", labelEn: "q3", value: "q3" },
    { labelAr: "الربع الرابع", labelEn: "q4", value: "q4" },
    { labelAr: "تقرير مجلس الإداره", labelEn: "board reports", value: "board" },
  ];

  const languagesOptions = [
    { labelAr: "الإنجليزية", labelEn: "english", value: "en" },
    { labelAr: "العربية", labelEn: "arabic", value: "ar" },
  ];

  //create fileKeyMap object to map each report type (value) to its Arabic and English file keys in API response
  const fileKeyMap = {
    annual: { ar: "annualar", en: "annualen" },
    q1: { ar: "q1ar", en: "q1en" },
    q2: { ar: "q2ar", en: "q2en" },
    q3: { ar: "q3ar", en: "q3en" },
    q4: { ar: "q4ar", en: "q4en" },
    board: { ar: "managementar", en: "managementen" },
  };

  // Helper function to get file key based on language
  const getFileKey = (item, quarterKey, language) => {
    const fileKey = language === "ar" ? quarterKey?.ar : quarterKey?.en;
    return item?.[fileKey];
  };

  //fetch financial reports data from API using useRequest
  const { data: financialReportsData } = useRequest(
    [`${API_ENDPOINTS.FINANCIAL_REPORTS.KEY}`],
    `${API_ENDPOINTS.FINANCIAL_REPORTS.URL}`
  );

  const financialReportsFilteredData = useMemo(() => {
    if (!financialReportsData?.financialResults) return [];
    const filteredByYear =
      choosedYear === "all"
        ? financialReportsData.financialResults
        : financialReportsData.financialResults.filter(
            (item) => item?.year === choosedYear
          );
    const quarterKey = fileKeyMap[choosedQt?.value];
    return filteredByYear
      .filter((item) => {
        const file = getFileKey(item, quarterKey, choosedLang?.value);
        return file && file.trim() !== "";
      })
      .map((item) => ({
        year: item?.year,
        file: getFileKey(item, quarterKey, choosedLang?.value),
      }));
  }, [financialReportsData, choosedYear, choosedQt, choosedLang]);

  return (
    <div className="reports position-relative" style={{ minHeight: "300px" }}>
        <>
          <h2 className="section-title m-0">
            {useLang("al-majdiah", "الماجدية")}
          </h2>
          <div className="d-flex justify-content-start align-items-center gap-2 mt-4 ">
            {/* year dropdown */}
            <div className="custom-dropdown dropdown">
              <button
                id="year-dropdown-button"
                className="btn dropdown-toggle d-flex justify-content-center align-items-center gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
                aria-label={useLang("Filter by year", "تصفية حسب السنة")}
                style={{
                  width: "fit-content",
                  fontSize: "14px",
                  minWidth: "85px",
                  borderRadius: "50px",
                  backgroundColor: "var(--second-black-color)",
                  color: "var(--white-color)",
                  height: "35px",
                }}
              >
                <span className="text-capitalize">{choosedYear}</span>
                <i className="bi bi-chevron-down" aria-hidden="true"></i>
              </button>

              <ul
                className="dropdown-menu"
                role="menu"
                aria-labelledby="year-dropdown-button"
                style={{
                  backgroundColor: "var(--second-black-color)",
                  padding: "10px 5px",
                }}
              >
                <li
                  className={`dropdown-item ${useLang(
                    "text-start",
                    "text-end"
                  )} cursor-pointer text-capitalize ${
                    choosedYear === "all" ? "disabled" : ""
                  }`}
                  role="menuitem"
                  tabIndex="0"
                  style={{ opacity: choosedYear === "all" ? "0.5" : "1" }}
                  onClick={() => choosedYear !== "all" && setChoosedYear("all")}
                  onKeyDown={(e) => {
                    if (
                      (e.key === "Enter" || e.key === " ") &&
                      choosedYear !== "all"
                    ) {
                      e.preventDefault();
                      setChoosedYear("all");
                    }
                  }}
                  aria-current={choosedYear === "all" ? "true" : undefined}
                >
                  <span>{useLang("All years", "جميع السنوات")}</span>
                </li>
                {financialReportsData?.financialResults.map((item) => {
                  const isActive = choosedYear === item.year;
                  return (
                    <li
                      key={item.year}
                      role="menuitem"
                      tabIndex="0"
                      className={`dropdown-item ${useLang(
                        "text-start",
                        "text-end"
                      )} cursor-pointer text-capitalize ${
                        isActive ? "disabled" : ""
                      }`}
                      style={{ opacity: isActive ? "0.5" : "1" }}
                      onClick={() => !isActive && setChoosedYear(item?.year)}
                      onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === " ") && !isActive) {
                          e.preventDefault();
                          setChoosedYear(item?.year);
                        }
                      }}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span>{item?.year}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* quarter dropdown */}
            <CustomDropdown
              selectedItem={choosedQt}
              list={qtOptions}
              onClick={(value) => setChoosedQt(value)}
            />
            {/* languages dropdown */}
            <CustomDropdown
              selectedItem={choosedLang}
              list={languagesOptions}
              onClick={(value) => setChoosedLang(value)}
            />
          </div>

          <div className="row row-gap-4 mt-4">
            {financialReportsFilteredData.length > 0 ? (
              <>
                {financialReportsFilteredData.map((item,idx) => (
                  <div key={idx} className="col-12 col-md-6 col-lg-4">
                    <ReportsCard
                      file={item?.file}
                      date={item?.year}
                      isYear={true}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="col-12">
                <EmptyComp
                  text={useLang("no data available", "لا توجد بيانات متاحة")}
                />
              </div>
            )}
          </div>
        </>
    </div>
  );
};

export default Reports;
