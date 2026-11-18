import { useState } from "react";
import useLang from "../../../../../utils/useLang";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Exporting from "highcharts/modules/exporting";
import { formatNumber } from "../../../../../utils/helper";
import CustomDropdown from "../../../../../components/common/customDropdown/CustomDropdown";
import useRequest from "../../../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../../../services/apis";
import SkeletonTable from "../../../../../components/ui/SkeletonTable/SkeletonTable";
const ChartComp = () => {
  // useState to display chart types like candlestick or ohlc
  const [chartType, setChartType] = useState({
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 28"
        width="35"
        height="35"
        fill="currentColor"
      >
        <path d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"></path>
        <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
        <path d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"></path>
        <path d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"></path>
      </svg>
    ),
    value: "candlestick",
    label: useLang("candles", "شموع"),
  });
  // useState to handle chart date range
  const [chartRange, setChartRange] = useState({
    labelEn: "year",
    labelAr: "سنه",
    value: "1Y",
  });
  // useState to set share performance chart data from API to control it and make it easly to filter
  const { data: sharePerformanceChartData, isLoading } = useRequest(
    [`${API_ENDPOINTS.SHARE_PERFORMANCE_CHART.KEY},${chartRange?.value}`],
    `${API_ENDPOINTS.SHARE_PERFORMANCE_CHART.URL}/${chartRange?.value}`,
  );

  const ChartTypes = [
    {
      label: useLang("bars", "أعمدة"),
      value: "ohlc",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          width="35"
          height="30"
        >
          <path
            fill="currentColor"
            d="M19 6h-1v7h-3v1h3v8h1v-3h3v-1h-3V6ZM11 7h-1v13H7v1h3v2h1V10h3V9h-3V7Z"
          ></path>
        </svg>
      ),
    },
    {
      label: useLang("candles", "شموع"),
      value: "candlestick",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          width="35"
          height="35"
          fill="currentColor"
        >
          <path d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"></path>
          <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
          <path d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"></path>
          <path d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"></path>
        </svg>
      ),
    },
    {
      label: useLang("Line", "خط"),
      value: "line",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          width="35"
          height="28"
        >
          <path
            fill="currentColor"
            d="m25.39 7.31-8.83 10.92-6.02-5.47-7.16 8.56-.76-.64 7.82-9.36 6 5.45L24.61 6.7l.78.62Z"
          ></path>
        </svg>
      ),
    },
    {
      label: useLang("area", "مساحة"),
      value: "area",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          width="35"
          height="28"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m25.35 5.35-9.5 9.5-.35.36-.35-.36-4.65-4.64-8.15 8.14-.7-.7 8.5-8.5.35-.36.35.36 4.65 4.64 9.15-9.14.7.7ZM2 21h1v1H2v-1Zm2-1H3v1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1V9h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1H9v1H8v1H7v1H6v1H5v1H4v1Zm1 0v1H4v-1h1Zm1 0H5v-1h1v1Zm1 0v1H6v-1h1Zm0-1H6v-1h1v1Zm1 0H7v1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1H9v1H8v1H7v1h1v1Zm1 0v1H8v-1h1Zm0-1H8v-1h1v1Zm1 0H9v1h1v1h1v-1h1v1h1v-1h1v1h1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1H9v1h1v1Zm1 0v1h-1v-1h1Zm0-1v-1h-1v1h1Zm0 0v1h1v1h1v-1h-1v-1h-1Zm6 2v-1h1v1h-1Zm2 0v1h-1v-1h1Zm0-1h-1v-1h1v1Zm1 0h-1v1h1v1h1v-1h1v1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v1h-1v1h-1v1h-1v1h1v1Zm1 0h-1v1h1v-1Zm0-1h1v1h-1v-1Zm0-1h1v-1h-1v1Zm0 0v1h-1v-1h1Zm-4 3v1h-1v-1h1Z"
          ></path>
        </svg>
      ),
    },
  ];

  const ChartRanges = [
    {
      labelEn: "1 day",
      labelAr: "1 يوم",
      value: "1D",
    },
    {
      labelEn: "5 days",
      labelAr: "5 أيام",
      value: "5D",
    },
    {
      labelEn: "3 months",
      labelAr: "3 شهور",
      value: "3M",
    },
    {
      labelEn: "6 months",
      labelAr: "6 شهور",
      value: "6M",
    },
    {
      labelEn: "year",
      labelAr: "سنه",
      value: "1Y",
    },
    {
      labelEn: "2 years",
      labelAr: "2 سنوات",
      value: "2Y",
    },
    {
      labelEn: "5 years",
      labelAr: "5 سنوات",
      value: "5Y",
    },
    {
      labelEn: "all",
      labelAr: "الكل",
      value: "AY",
    },
  ];

  const options = {
    accessibility: {
      enabled: false,
    },
    time: {
      timezoneOffset: -4 * 60,
    },
    // chart: {
    //   height: 350,
    //   backgroundColor: "transparent",
    //   zoomType: "x",
    //   panKey: "shift",
    //   animation: {
    //     duration: 500,
    //   },

    //   // events: {
    //   //   render: function () {
    //   //     const lastPoint = this?.series[0]?.points.at(-1);
    //   //     if (!lastPoint) return;
    //   //     const date = Highcharts.dateFormat("%b %e, %Y", lastPoint.x);
    //   //     this.setTitle(null, {
    //   //       text: `
    //   //       <div>
    //   //        <span style="font-weight:900;color:#cfaf7a">Al-Majdiah</span>: 
    //   //         <span style="font-weight:700">.Date</span>: ${date} 
    //   //         <span style="font-weight:700">.O</span>: ${lastPoint?.open} 
    //   //         <span style="font-weight:700">.H</span>: ${lastPoint?.high} 
    //   //         <span style="font-weight:700">.L</span>: ${lastPoint?.low} 
    //   //         <span style="font-weight:700">.C</span>: ${lastPoint?.close} 
    //   //         <span style="font-weight:700">.Vol</span>: ${lastPoint?.volume}
    //   //       </div>`,
    //   //     });
    //   //   },
    //   // },
    // },

    subtitle: {
      align: "left",
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function () {
              const chart = this.series.chart;
              const date = Highcharts.dateFormat("%b %e, %Y", this.x);
              const text = `
            <div style="max-width:50%">
             <span style="font-weight:900;color:#cfaf7a">Al-Majdiah</span>: 
              <span style="font-weight:700">.Date</span>: ${date} 
              <span style="font-weight:700">.O</span>: ${this?.open} 
              <span style="font-weight:700">.H</span>: ${this?.high} 
              <span style="font-weight:700">.L</span>: ${this?.low} 
              <span style="font-weight:700">.C</span>: ${this?.close} 
              <span style="font-weight:700">.Vol</span>: ${this?.volume}
            </div>
          `;

              chart.setTitle(null, {
                useHTML: true,
                text: text,
              });
            },
          },
        },
      },
    },

    xAxis: {
      title: null,
    },

    yAxis: {
      title: null,
      opposite: true,
    },

    credits: {
      enabled: false,
    },

    title: {
      text: null,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      xDateFormat: "%A, %d %b, %H:%M",
      formatter: function () {
        const date = this.series.chart.time.dateFormat(
          `%A, %d %b %Y${chartRange?.value=="1D"?",%H:%M":""}`,
          this.x,
        );
        return `<b>${date}</b><br/><b>${useLang("Al-majdiah", "الماجدية")}: ${formatNumber(this.y)}</b>`;
      },
      style: {
        fontSize: "12px",
      },
    },

    series: [
      {
        type: chartType.value === "step" ? "line" : chartType.value,
        step: chartType.value === "step" ? true : undefined,
        name: useLang("Al-majdiah", "الماجدية"),
        data:
          sharePerformanceChartData &&
          sharePerformanceChartData?.data?.map((item) => ({
            x: Number(item?.x),
            open: item?.open,
            high: item?.high,
            low: item?.low,
            close: item?.close,
            y: item?.close,
            volume: formatNumber(item?.volume),
          })),
        color:
          chartType.value === "step" ||
          chartType.value === "area" ||
          chartType.value === "line"
            ? "var(--identity-color)"
            : "var(--text-color)",

        upColor: "#000080",
      },
    ],

    rangeSelector: { enabled: false },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          align: "right",
          verticalAlign: "top",
          x: 0,
          y: 0,
          symbolStroke: "#000",
          symbolFill: "transparent",
          theme: {
            fill: "transparent",
            states: {
              hover: {
                fill: "transparent",
              },
              select: {
                fill: "rgba(0,0,0,0.1)",
              },
            },
          },
        },
      },
    },
  };
  return (
    <>
      <div className="chart-head d-flex justify-content-start align-items-center gap-2 mb-3 mb-sm-1">
        <h2 className="section-title word-nowrap">
          {useLang("al majdiah", "الماجدية")}
        </h2>

        <CustomDropdown
          selectedItem={chartRange}
          list={ChartRanges}
          onClick={(val) => setChartRange(val)}
        />
        
        <div className="dropdown">
          <button
            className="btn border-none dropdown-toggle d-flex justify-content-center align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              color: "var(--black-color)",
              height: "30px",
            }}
          >
            {chartType?.icon}
          </button>

          <ul
            className="dropdown-menu border-none"
            style={{
              backgroundColor: "var(--gray-color)",
              padding: "10px 5px",
            }}
          >
            {ChartTypes?.map((item, idx) => {
              const isActive = chartType?.value === item.value;
              return (
                <li
                  key={idx}
                  className={`dropdown-item text-start cursor-pointer text-capitalize ${
                    isActive ? "disabled" : ""
                  }`}
                  style={{
                    opacity: isActive ? "0.5" : "1",
                    color: "var(--black-color)",
                    padding: "5px",
                    paddingLeft: "0px",
                  }}
                  onClick={() => !isActive && setChartType(item)}
                >
                  {item.icon && (
                    <span style={{ color: "var(--identity-color)" }}>
                      {item.icon}
                    </span>
                  )}
                  <span className="text-capitalize">{item?.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {!isLoading ? (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
        />
      ) : (
        <SkeletonTable columns={1} rows={6} />
      )}
    </>
  );
};

export default ChartComp;
