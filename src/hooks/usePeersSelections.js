import { useEffect, useMemo, useState } from "react";
import useLang from "../utils/useLang";
import {
  exportToExcel,
  getLastFiveYears,
  getPreviousPeriod,
} from "../utils/helper";
import useRequest from "../utils/useRequest";
import { API_ENDPOINTS } from "../services/apis";

const usePeersSelections = (tabName, customTabs) => {
  const PeriodTabs = customTabs || [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
    {
      label: useLang("quarter", "ربعي"),
      tab: "quarter",
    },
    {
      label: useLang("interim", "مرحلي"),
      tab: "interim",
    },
  ];
  // active tabs
  const [activeTab, setActiveTab] = useState("annual");

  const [choosenCurrency, setChoosenCurrency] = useState({
    labelEn: "riyal",
    labelAr: "ريال سعودي",
    value: "riyal",
  });
  //get last five years
  const allYears = useMemo(() => getLastFiveYears(), []);
  const [choosedYear, setChoosedYear] = useState(null);
  useEffect(() => {
    setChoosedYear(allYears[activeTab === "annual" ? 1 : 0]);
  }, [activeTab, allYears]);
  // quarters data
  const quarters = [
    { labelEn: "q1", labelAr: "الربع الأول", value: "q1" },
    { labelEn: "q2", labelAr: "الربع الثاني", value: "q2" },
    { labelEn: "q3", labelAr: "الربع الثالث", value: "q3" },
    { labelEn: "q4", labelAr: "الربع الرابع", value: "q4" },
  ];
  const [activeQuarter, setActiveQuarter] = useState(getPreviousPeriod(quarters));

  // interims data
  const interims = [
    { labelEn: "i1", labelAr: "الفصل الأول", value: "i1" },
    { labelEn: "i2", labelAr: "الفصل الثاني", value: "i2" },
    { labelEn: "i3", labelAr: "الفصل الثالث", value: "i3" },
    { labelEn: "i4", labelAr: "الفصل الرابع", value: "i4" },
  ];
  const [activeInterim, setActiveInterim] = useState(getPreviousPeriod(interims));

  // get peers ranking table data using useRequest
  const { data, isLoading } = useRequest(
    [
      API_ENDPOINTS.PEERS.KEY,
      tabName,
      useLang("en", "ar"),
      activeTab,
      choosedYear,
      activeQuarter,
      activeInterim,
    ],
    `${
      API_ENDPOINTS.PEERS.URL
    }/${useLang("en", "ar")}?tabName=${tabName}&fiscalPeriodType=${activeTab}&fiscalPeriod=${
      activeTab == "annual"
        ? "year"
        : activeTab == "quarter"
          ? activeQuarter?.value
          : activeInterim?.value
    }&fiscalYear=${choosedYear}&isCurrent=false`,
    {  enabled: !!choosedYear,}
  );
  const handleExportToExcel = async () => {
    const formData = {
      tabName: tabName,
      languageId: useLang(2, 1),
      currency: choosenCurrency.value == "riyal" ? 3 : 10,
      year: choosedYear,
      period:
        activeTab == "annual"
          ? "year"
          : activeTab == "quarter"
            ? activeQuarter?.value
            : activeInterim?.value,
    };
    const generalFileName = `peers-general.xlsx`;
    const fileName = `peers-${tabName}-${choosedYear}${
      activeTab == "quarter" ? `-${activeQuarter?.value}` : ""
    }${activeTab == "interim" ? `-${activeInterim?.value}` : ""}-${useLang(
      "en",
      "ar",
    )}-${choosenCurrency.value}.xlsx`;
    await exportToExcel(
      "get-company-competitor",
      formData,
      tabName === "general" ? generalFileName : fileName,
    );
  };
  return {
    PeriodTabs,
    activeTab,
    setActiveTab,
    activeQuarter,
    quarters,
    setActiveQuarter,
    activeInterim,
    interims,
    setActiveInterim,
    choosedYear,
    setChoosedYear,
    allYears,
    choosenCurrency,
    setChoosenCurrency,
    handleExportToExcel,
    data,
    isLoading,
  };
};
export default usePeersSelections;
