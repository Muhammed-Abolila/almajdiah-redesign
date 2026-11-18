import { authenticateAndSaveToken, base_url } from "./getToken";
import axios from "axios";
import useLang from "./useLang";
import DOMPurify from "dompurify";

export const getMonthName = (monthNum) => {
  const date = new Date();
  if (!monthNum) return "";
  date.setMonth(monthNum - 1);
  return date.toLocaleString(useLang("en", "ar"), { month: "long" });
};

export const formatDate = (recievedDate, format = "YYYY-MM-DD") => {
  if (!recievedDate) return {};
  let parsedDate;
  // handle recieved date types
  if (
    typeof recievedDate == "string" &&
    recievedDate?.includes(" ") &&
    !recievedDate.includes("GMT")
  ) {
    const [date, time] = recievedDate.split(" ");
    const [day, month, year] = date.split("-");
    parsedDate = new Date(`${year}-${month}-${day}T${time}`);
  } else {
    parsedDate = new Date(recievedDate);
  }
  // handle ouput types
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = String(parsedDate.getFullYear());

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    case "MM-DD-YYYY":
      return `${month}-${day}-${year}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "YYYY/DD/MM":
      return `${year}/${month}/${day}`;
    case "DD monthName,YY":
      return `${day} ${getMonthName(month)},${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
};
// function to seperate year to quarters
export const formatDateToQuarter = (date) => {
  if (date === "NYD") return "NYD";
  if (date.includes("-")) {
    const [month, year] = date.split("-");
    if (month === "0") {
      return year;
    } else {
      const quarter = Math.ceil(month / 3);
      return `${useLang(
        `Q${quarter} -`,
        `الربع ${
          quarter == "1"
            ? "الأول"
            : quarter == "2"
              ? "الثاني"
              : quarter == "3"
                ? "الثالث"
                : "الرابع"
        }`,
      )} ${year}`;
    }
  } else {
    return date;
  }
};

// function to chane riyal to dollar
export const changeCurrencyFromRiyalToDollar = (number) => {
  if (number === null || number == "-") return "-";
  if (number === 0) return "0.00";
  const dollar = number / 3.75;
  return dollar;
};

// function to formate number
export const formatNumber = (value, minFraction = 2, returnedValue) => {
  // if (value == null || value == 0) {
  //   return returnedValue !== undefined ? returnedValue : "n/a";
  // }
  if (!value && returnedValue) return returnedValue;
  if (value == null || value == "-") return "-";
  if (value == 0) return "0.00";
  const number = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: minFraction,
    maximumFractionDigits: minFraction,
  });
  return value < 0 ? `(${number})` : number;
};

// change color and bgColor depend on number is plus or minus
export const colorAndBgColorDependOnNumber = (value) => {
  if (value == null) return "var(--second-black-color)";
  const str = String(value).trim();
  let number = 0;
  const cleanStr = str.replace(/,/g, "");
  if (cleanStr.startsWith("(") && cleanStr.endsWith(")")) {
    number = -Number(cleanStr.replace(/[()]/g, ""));
  } else {
    number = Number(cleanStr);
  }
  return number > 0
    ? "var(--identity-color)"
    : number < 0
      ? "var(--fail-color)"
      : "var(--second-black-color)";
};

// function to initiat configure the chart appearance and behavior
export const chartOptions = (years, data) => ({
  accessibility: {
    enabled: false,
  },
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
    title: { text: null },
    categories: years,
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
      return `<b>${year}</b>: ${this.y.toFixed(2)}`;
    },
  },
  series: [
    {
      data,
    },
  ],
  credits: { enabled: false },
});

// function to clean danger Html
export const cleanHtml = (html, limit) => {
  const filteredHtml = html
    .replace(/<p[^>]*class="ckeCaption"[^>]*>.*?<\/p>/gi, "")
    .replace(/<hr[^>]*>/gi, "")
    .replace(/&nbsp;/gi, " ");
  const clean = DOMPurify.sanitize(filteredHtml, {
    ALLOWED_TAGS: ["p", "br", "ul", "ol", "li", "strong", "img", "em", "a"],
    ALLOWED_ATTR: ["src", "alt", "href", "target"],
  });
  const textOnly = clean.replace(/<[^>]+>/g, "");
  const trimmed =
    textOnly.length > limit ? textOnly.slice(0, limit) + "..." : textOnly;
  if (limit) {
    return trimmed;
  } else {
    return clean;
  }
};

// fiuinction to change color and arrow direction in stock summary
export const stockColorAndArrowDirection = (data) => {
  const change = data?.change;
  const percentageChange = data?.percentageChange;
  if (change > 0 && percentageChange > 0) {
    return { colorVar: "--color-identity", direction: "up" };
  }
  if (change < 0 && percentageChange < 0) {
    return { colorVar: "--color-danger", direction: "down" };
  }
  if (change === 0 && percentageChange === 0) {
    return { colorVar: "--color-center", direction: "center" };
  }
  return { colorVar: "--color-center", direction: "down" };
};

export const exportToExcel = async (url, formData, fileName) => {
  const token = await authenticateAndSaveToken();
  try {
    const response = await axios.get(
      `${base_url}/api/v1/json/excel-apis/${url}`,
      {
        params: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      },
    );
    const blob = new Blob([response.data]);
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(href);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

// get last five years
export const getLastFiveYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push(year);
  }
  return years.reverse();
};

// get period
export const getPreviousPeriod = (periods) => {
  const currentPeriod = Math.floor(new Date().getMonth() / 3);
  const previousPeriod = currentPeriod === 0 ? 3 : currentPeriod - 2;
  return periods[previousPeriod];
};

export const getClosestAvailableYear = (item) => {
  const availableYears = Object.keys(item)
    .map(Number)
    .filter((key) => !isNaN(key));
  if (availableYears.length === 0) return null;

  const closestYear = Math.max(
    ...availableYears.filter((year) => year <= new Date().getFullYear() - 1),
  );

  return closestYear;
};