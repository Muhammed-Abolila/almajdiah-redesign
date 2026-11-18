import { useState } from "react";
import useLang from "../../../utils/useLang";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import CustomLink from "../../../components/common/customLink/CustomLink";
import SkeletonChart from "../../../components/ui/SkeletonChart/SkeletonChart";
const Chart = () => {
  // usestate to set choosed filter key
  const [filterKey, setFilterKey] = useState("1D");
  // get chart data from useRequest
  const { data: chartData, isLoading } = useRequest(
    [`${API_ENDPOINTS.OVERVIEW_CHART.KEY},${filterKey}`],
    `${API_ENDPOINTS.OVERVIEW_CHART.URL}/${filterKey}`,
  );
  // highChart options
  const options = {
    time: {
      timezoneOffset: -4 * 60,
    },
    accessibility: {
      enabled: false,
    },
    chart: {
      type: "area",
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
      type: "datetime",
      dateTimeLabelFormats: {
        second: "%H:%M:%S",
        minute: "%H:%M",
        hour: "%H:%M",
        day: "%e %b",
        week: "%e %b",
        month: "%b '%y",
        year: "%Y",
      },
      labels: {
        style: {
          color: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
        x: 0,
        y: 25,
        align: "center",
      },
      crosshair: {
        width: 1,
        color: "#E0E0E0",
        dashStyle: "Dash",
      },
    },
    yAxis: {
      min: chartData?.configurations?.min,
      max: chartData?.configurations?.max,
      minRange: chartData?.configurations?.minPeriod,
      title: null,
      lineWidth: 0,
      labels: {
        style: {
          color: "#000",
          fontSize: "12px",
          fontWeight: "400",
        },
        x: 0,
        y: 0,
        align: "right",
      },
      opposite: false,
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
          stops: [
            [0, "rgba(207, 175, 122, 1)"],
            [1, "rgba(207, 175, 122, 0)"],
          ],
        },
        lineColor: "#cfaf7a",
        lineWidth: 1,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              fillColor: "#cfaf7a",
              radius: 3,
            },
          },
        },
      },
    },

    tooltip: {
      shared: true,
      crosshairs: true,
      xDateFormat: "%A, %d %b, %H:%M",
      formatter: function () {
        const date = this.series?.chart?.time?.dateFormat(
          `%A, %d %b %Y${filterKey === "1D" ? ",%H:%M" : ""}`,
          this.x,
        );
        return `<b>${date}</b><br/>
        <b>${useLang("al-majdiah", "الماجدية")}: ${this.y.toFixed(2)}</b>`;
      },
    },
    series: [
      {
        name: useLang("al-majdiah", "الماجدية"),
        data:
          chartData?.data?.map((data) => ({
            x: Number(data?.x),
            y: data?.y,
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
          },
        },
      ],
    },
  };

  // button date
  const btnData = [
    { title: "1d", id: "1D" },
    { title: "1m", id: "1M" },
    { title: "3m", id: "3M" },
    { title: "6m", id: "6M" },
    { title: "1y", id: "1Y" },
    { title: "all", id: "AY" },
  ];
  return (
    <div className="col-12 col-lg-6">
      {/* chart buttons */}
      <div className="d-flex justify-content-between align-items-center row-gap-3 flex-wrap mb-4">
        <div className="d-flex justify-content-start align-items-center">
          {btnData.map((btn, idx) => (
            <p
              key={idx}
              className="py-2 px-3 m-0 text-uppercase cursor-pointer"
              style={{
                fontSize: "12px",
                borderRadius: "5px",
                color:
                  filterKey === btn?.id
                    ? "var(--white-color)"
                    : "var(--black-color)",
                backgroundColor:
                  filterKey === btn?.id
                    ? "var(--black-color)"
                    : "var(--gray-color)",
              }}
              onClick={() => setFilterKey(btn.id)}
            >
              {btn.title}
            </p>
          ))}
        </div>

        <CustomLink
          text={useLang("more", "المزيد")}
          link={`/${useLang("en", "ar")}/share-information/chart`}
        />
      </div>
      {isLoading ?
        <SkeletonChart />
        :
        <HighchartsReact highcharts={Highcharts} options={options} />
      }
    </div>
  );
};
export default Chart;
