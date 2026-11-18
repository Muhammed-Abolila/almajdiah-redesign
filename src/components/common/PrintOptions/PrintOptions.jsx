import excelIcon from "../../../assets/print-options/excel.svg";
import printerIcon from "../../../assets/print-options/printer.svg";
const PrintOptions = ({ excel = true, excelFun, link = false }) => {
  return (
    <div className="print-options d-flex justify-content-center justify-content-lg-end align-items-center gap-2">
      {excel && (
        <img
          src={excelIcon}
          className="cursor-pointer"
          alt="al magdiah excel icon"
          style={{ width: "24px", height: "24px" }}
          onClick={() => excelFun()}
        />
      )}
      {link && (
        <a href={link}>
          <img
            src={excelIcon}
            className="cursor-pointer"
            alt="al magdiah excel icon"
            style={{ width: "24px", height: "24px" }}
          />
        </a>
      )}

      <img
        onClick={() => window.print()}
        src={printerIcon}
        className="cursor-pointer"
        alt="al magdiah print icon"
        style={{ width: "25px", height: "25px" }}
      />
    </div>
  );
};

export default PrintOptions;
