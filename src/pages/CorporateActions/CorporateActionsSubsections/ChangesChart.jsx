import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useLang from "../../../utils/useLang";
function ChangesChart({ chartData, type }) {
  const data = chartData?.sort((oldest, newst) => newst?.FinancialYear - oldest?.FinancialYear)?.slice(0, 5);
  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 15,
        depth: 50,
        viewDistance: 25,
      },
    },
    title: null,
    xAxis: {
      reversed: useLang(false, true),
      title: { text: null },
      categories: data?.map((item) => item?.FinancialYear),
      labels: {
        skew3d: true,
        style: { fontSize: "16px" },
      },
    },
    yAxis: {
      title: { text: null },
    },
    plotOptions: {
      column: { depth: 25 },
      series: { showInLegend: false },
    },
    tooltip: {
      formatter: function () {
        const year = this.key;
        return `<b>${year}</b>: ${this?.y?.toFixed(2)}`;
      },
    },
    series: [
      {
        data:
          data?.map((item) => ({
            y: type === "capital" ? item?.Capital : item?.CashDividendPerShare,
            color:
              (type === "capital"
                ? item?.Capital
                : item?.CashDividendPerShare) > 0
                ? "var(--identity-color)"
                : "var(--fail-color)",
          })) || [],
      },
    ],
    credits: { enabled: false },
  };

  return (
    <>
      <h2 className="section-title mb-4">
        {type === "capital"
          ? useLang("capital changes", "تطور رأس المال")
          : useLang("historical changes", "تطور التوزيعات النقدية")}
      </h2>
      <hr />
      {chartData && chartData?.length > 0 &&
        <HighchartsReact highcharts={Highcharts} options={options} />
      }
    </>
  );
}

export default ChangesChart;
