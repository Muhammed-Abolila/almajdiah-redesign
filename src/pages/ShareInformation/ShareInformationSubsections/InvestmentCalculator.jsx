import { useState } from "react";
import NavTabs from "../../../components/ui/NavTabs/NavTabs";
import useLang from "../../../utils/useLang";
import { colorAndBgColorDependOnNumber, formatDate, formatNumber } from "../../../utils/helper";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import DatePicker from "react-datepicker";
import SkeletonTable from "../../../components/ui/SkeletonTable/SkeletonTable";
import SkeletonChart from "../../../components/ui/SkeletonChart/SkeletonChart";
const InvestmentCalculator = () => {
  const [activeTab, setActiveTab] = useState("amount");
  const [dateRange, setDateRange] = useState([
    new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;
  const [investmentAmountAndSharesValue, setInvestmentAmountAndSharesValue] =
    useState(0);
  const [apiUrl, setApiUrl] = useState(null);
  // tabs data
  const tabs = [
    {
      label: useLang("by amount invested", "تنزيل سعر السهم"),
      tab: "amount",
    },
    {
      label: useLang("by shares bought", "محفوظات سعر السهم"),
      tab: "shares",
    },
  ];
  // function to get api url
  const getApiUrl = () => {
    if (investmentAmountAndSharesValue > 0) {
      if (activeTab == "amount") {
        setApiUrl(
          `/${investmentAmountAndSharesValue}/0/${formatDate(
            startDate,
            "YYYY-MM-DD"
          )}/${formatDate(endDate, "YYYY-MM-DD")}`
        );
      } else if (activeTab == "shares") {
        setApiUrl(
          `/0/${investmentAmountAndSharesValue}/${formatDate(
            startDate,
            "YYYY-MM-DD"
          )}/${formatDate(endDate, "YYYY-MM-DD")}`
        );
      }
    }
  };
  const changeTableTab = (tab) => {
    if (activeTab != tab) {
      setInvestmentAmountAndSharesValue(0);
      setDateRange([
        new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        new Date(),
      ]);
      setApiUrl(null);
      setActiveTab(tab);
    }
  };
  const { data: invesmentData, isLoading } = useRequest(
    [API_ENDPOINTS.INVESMENT_CALCULATOR_AMOUNT.KEY, apiUrl],
    `${API_ENDPOINTS.INVESMENT_CALCULATOR_AMOUNT.URL}${apiUrl}/false`,
    { enabled: !!apiUrl }
  );

  const [activeChartTab, setActiveChartTab] = useState("cumulative");
  const chartTabs = [
    {
      label: useLang("cumulative change", "التغير التراكمي"),
      tab: "cumulative",
    },
    {
      label: useLang("periodic change", "التغير الدوري"),
      tab: "periodic",
    },
  ];
  const { data: invesmentChartData, isLoading: invesmentChartLoading } = useRequest(
    [
      `${API_ENDPOINTS.INVESMENT_CALCULATOR_AMOUNT_CHART.KEY},${invesmentData?.amountInvested},${activeChartTab}`,
    ],
    `${API_ENDPOINTS.INVESMENT_CALCULATOR_AMOUNT_CHART.URL}/${activeChartTab == "cumulative"
      ? "investment-calculator-chart-data"
      : "investment-calculator-chart-data-periodic"
    }/${investmentAmountAndSharesValue}/${invesmentData?.sharesBought}/${formatDate(startDate, "YYYY-MM-DD")}/${formatDate(
      endDate,
      "YYYY-MM-DD"
    )}/false`,
    { enabled: invesmentData?.sharesBought > 0 }
  );

  // chart option
  const options = {
    accessibility: {
      enabled: false,
    },
    chart: {
      type: activeChartTab == "cumulative" ? "area" : "column",
      height: 350,
      backgroundColor: "transparent",
      borderRadius: 0,
      zoomType: "x",
      panning: true,
      panKey: "shift",
      animation: {
        duration: 500,
      },
    },
    title: null,
    xAxis: {
      title: {
        text: activeChartTab,
      },
      type: "datetime",
      labels: {
        style: {
          color: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
        x: 0,
        y: 25,
        align: "center",
        format: "{value:%b %e, %Y}",
      },
      crosshair: {
        width: 1,
        color: "#E0E0E0",
        dashStyle: "Dash",
      },
    },

    yAxis: {
      max:
        invesmentChartData?.length > 0 &&
        Math.max(...invesmentChartData?.map((item) => item.sharesValue)),
      min:
        activeChartTab === "cumulative"
          ? invesmentChartData?.length > 0 &&
          Math.min(...invesmentChartData?.map((item) => item.sharesValue))
          : 0,

      minRange: 25,
      title: null,
      lineWidth: 0,
      labels: {
        style: {
          color: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
        x: useLang(0, -20),
        y: 0 - 1,
        align: useLang("right", "left"),
      },
      opposite: useLang(false, true),
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [],
        },
        lineColor: "var(--identity-color)",
        lineWidth: 1,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              fillColor: "var(--identity-color)",
              radius: 3,
            },
          },
        },
      },
      column: {
        color: "var(--identity-color)",
        shadow: false,
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      xDateFormat: "%A, %d %b,%Y",
      formatter: function () {
        const date = Highcharts.dateFormat("%A, %d %b,%Y", this.x);
        return `<b>${date}</b><br/>
                <b>${useLang("al-majdiah", "الماجديه")}: ${this.y.toFixed(
          2
        )}</b>`;
      },
    },
    series: [
      {
        name: "Cumulative",
        data:
          invesmentChartData?.map((data) => ({
            y: data?.sharesValue,
            x: data.forDate,
          })) || [],
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            chart: {
              height: 350,
            },
            xAxis: {
              labels: {
                rotation: -45,
              },
            },
          },
        },
      ],
    },
  };
  return (
    <div className="investment-calculator">
      <h2 className="section-title mb-4">
        {useLang("investment calculator", "حاسبة الإستثمار")}
      </h2>

      <div className="calculator">
        <NavTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={changeTableTab}
        />

        <div className="mt-5 d-flex flex-wrap row-gap-4 align-items-end gap-5">
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            dateFormat="dd/MM/yyyy"
            selectsRange
            isClearable
          />

          <div className="d-flex row-gap-4 align-items-end gap-2">
            <div
              className="input-container d-flex flex-column justify-content-between gap-2 w-100"
              style={{ maxWidth: "250px" }}
            >
              <label htmlFor="investInput" className="text-capitalize">
                {useLang("number or amount", "العدد أو الكمية")}
              </label>
              <input
                type="text"
                id="investInput"
                className="form-control rounded-0"
                value={investmentAmountAndSharesValue}
                onChange={(e) => setInvestmentAmountAndSharesValue(e.target.value)}
              />
            </div>
            <button
              className="btn rounded-0 word-nowrap "
              style={{
                color: "var(--white-color)",
                backgroundColor: "var(--identity-color)",
              }}
              onClick={() => getApiUrl()}
            >
              {useLang("show data", "عرض المعطيات")}
            </button>
          </div>
        </div>

        <div
          className="row row-gap-3 mt-5 text-capitalize m-0 justify-content-between position-relative"
          style={{ minHeight: "350px" }}
        >
          {isLoading ? (
            <SkeletonTable columns={1} rows={3} />
          ) : (
            <>
              <div className="initial-invest-container col-12 col-md-6 col-xxl-5">
                <div className=" mb-4 pb-2 border-bottom d-flex justify-content-between align-items-center">
                  <h3 className="custom-fs-5">
                    {useLang("initial investment", "الإستثمار الأولي")}
                  </h3>
                  {invesmentData && startDate && (
                    <time
                      dateTime={invesmentData?.investmentDate}
                      className="date custom-fs-6"
                    >
                      {formatDate(
                        invesmentData?.investmentDate || startDate,
                        "DD-MM-YYYY"
                      )}
                    </time>
                  )}
                </div>

                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("value (SAR)", "القيمه (ريال)")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.amountInvested)
                      : "-"}
                  </p>
                </div>

                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("value (SAR)", "سعر السهم (ريال)")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.initialSharePrice)
                      : "-"}
                  </p>
                </div>

                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("shares bought", "حصه المحفوظات")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.sharesBought)
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="ends-invest-container col-12 col-md-6 col-xxl-5">
                <div className=" mb-4 pb-2 border-bottom d-flex justify-content-between align-items-center">
                  <h3 className="custom-fs-5">
                    {useLang("end value", "القيمه النهائيه")}
                  </h3>
                  {invesmentData && endDate && (
                    <time
                      dateTime={invesmentData?.endDate}
                      className="date custom-fs-6"
                    >
                      {formatDate(
                        invesmentData?.endsDate || endDate,
                        "DD-MM-YYYY"
                      )}
                    </time>
                  )}
                </div>
                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("value (SAR)", "القيمه (ريال)")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.currentStanding)
                      : "-"}
                  </p>
                </div>

                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("value (SAR)", "سعر السهم (ريال)")}
                  </p>
                  <p className="m-0" style={{ color: "var(--black-color)" }}>
                    {invesmentData
                      ? formatNumber(invesmentData?.endsSharePrice)
                      : "-"}
                  </p>
                </div>

                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("change (SAR)", "التغير (ريال)")}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      color: colorAndBgColorDependOnNumber(
                        invesmentData?.changeAmount
                      )
                    }}
                  >
                    {invesmentData
                      ? formatNumber(invesmentData?.changeAmount)
                      : "-"}
                  </p>
                </div>

                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("change (%)", "التغير (%)")}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      color: colorAndBgColorDependOnNumber(
                        invesmentData?.changeAmountPercentage
                      )
                    }}
                  >
                    {invesmentData
                      ? `${formatNumber(
                        invesmentData?.changeAmountPercentage
                      )}%`
                      : "-"}
                  </p>
                </div>

                <div className="box-title">
                  <p
                    className="m-0 text-capitalize"
                    style={{ color: "var(--text-color)" }}
                  >
                    {useLang("annualizes change (%)", "التغير السنوي (%)")}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      color: colorAndBgColorDependOnNumber(
                        invesmentData?.changeAnnualizePercentage
                      )
                    }}
                  >
                    {invesmentData
                      ? `${formatNumber(
                        invesmentData?.changeAnnualizePercentage
                      )}%`
                      : "-"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      <div className="charts mt-4">
        <NavTabs
          tabs={chartTabs}
          activeTab={activeChartTab}
          setActiveTab={setActiveChartTab}
        />

        <div className="mt-3 position-relative" style={{ minHeight: "250px" }}>
          {!invesmentChartLoading ? (
            <HighchartsReact highcharts={Highcharts} options={options} />
          ) : (
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <SkeletonChart />
            </div>
          )}
        </div>
      </div>


    </div>
  );
};
export default InvestmentCalculator;
