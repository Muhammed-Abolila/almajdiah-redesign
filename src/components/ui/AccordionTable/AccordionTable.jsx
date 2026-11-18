import { useState } from "react";
import useLang from "../../../utils/useLang";
import "./AccordionTable.css";
import CustomTd from "../../common/customTd/CustomTd";
import {
  changeCurrencyFromRiyalToDollar,
  formatNumber,
} from "../../../utils/helper";
import ChartModal from "../../common/chartModal/ChartModal";
import PrintOptions from "../../common/PrintOptions/PrintOptions";
import SkeletonTable from "../SkeletonTable/SkeletonTable";
const AccordionTable = ({
  accordionTableData,
  handleExportToExcel,
  currencyActiveTab,
  loading,
}) => {
  const [chartValues, setChartValues] = useState({
    years: [],
    values: [],
    title: "",
  });
  return (
    <>
      <div
        className="accordion accordion-table mt-4 mt-sm-5"
        style={{ minHeight: "500px" }}
        id="accordionExample"
      >
        {loading ? (
          <SkeletonTable columns={1} rows={10} />
        ) : (
          <>
            {accordionTableData?.tableBodyData?.length > 0 &&
              accordionTableData?.tableBodyData?.map((item, mainIdx) => {
                const collapseId = `collapse-${mainIdx}`;
                const headingId = `heading-${mainIdx}`;
                return (
                  <div className="accordion-item" key={mainIdx}>
                    {item?.fields?.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center pb-3">
                        <h3 className="accordion-header" id={headingId}>
                          <button
                            className="accordion-button  text-capitalize p-0 custom-fs-4 fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={mainIdx === 0 ? "true" : "false"}
                            aria-controls={collapseId}
                          >
                            {useLang(item?.nameEn, item?.nameAr)}
                          </button>
                        </h3>
                        <PrintOptions
                          excel={handleExportToExcel ? true : false}
                          excelFun={handleExportToExcel}
                        />
                      </div>
                    )}

                    <div
                      id={collapseId}
                      className={`accordion-collapse collapse ${mainIdx === 0 ? "show" : ""}`}
                      aria-labelledby={headingId}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body p-0 table-responsive">
                        <table
                          style={{ minWidth: "900px" }}
                          className="table print-table-wrapper custom-fs-6 overflow-auto"
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "var(--identity-color)",
                              }}
                            >

                              <CustomTd
                                textCenter={false}
                                label={useLang("discription", "الوصف")}
                                style={{
                                  width: "400px",
                                  color: "var(--white-color)",
                                }}
                              />

                              <CustomTd
                                label={useLang("chart", "تشارت")}
                                style={{ color: "var(--white-color)" }}
                              />

                              {accordionTableData?.tableHeadData?.length > 0 &&
                                accordionTableData?.tableHeadData?.map(
                                  (item, idx) => (
                                    <CustomTd
                                      key={idx}
                                      label={
                                        item?.period && item?.period !== "-"
                                          ? item?.period
                                          : `${item?.year ?? ""}${item?.quarter
                                            ? " " + item?.quarter
                                            : ""
                                          }`
                                      }
                                      style={{ color: "var(--white-color)" }}
                                    />
                                  )
                                )}

                            </tr>
                          </thead>

                          <tbody>
                            {item?.fields?.length > 0 &&
                              item.fields.map((field, idx) => {
                                const isAllZero = field.values.every((item) => item.sarValue === null || item.sarValue === "-" || item.value === null || item.value === "-");
                                if (isAllZero) return null;
                                return (
                                  <tr
                                    key={idx}
                                    style={{ color: "var(--second-black-color)" }}
                                  >

                                    <CustomTd
                                      textCenter={false}
                                      label={useLang(
                                        field.fieldNameEn,
                                        field.fieldNameAr
                                      )}
                                    />

                                    <td className="p-3 text-center no-print">
                                      <button
                                        className="btn p-0"
                                        style={{
                                          color: "var(--identity-color)",
                                        }}
                                        data-bs-target="#exampleModal"
                                        data-bs-toggle="modal"
                                        onClick={() => setChartValues({
                                          years: field?.values?.map((item) => item?.year),
                                          values: field?.values?.map((item) =>
                                            item?.isRatios ?
                                              currencyActiveTab?.value === "riyal"
                                                ? item?.sarValue
                                                : item?.usdValue :
                                              currencyActiveTab?.value === "riyal"
                                                ? item?.value
                                                : changeCurrencyFromRiyalToDollar(item?.value)
                                          ),
                                          title: useLang(
                                            field?.fieldNameEn,
                                            field?.fieldNameAr
                                          ),
                                        })
                                        }
                                      >
                                        <i className="bi bi-bar-chart-fill" />
                                      </button>
                                    </td>



                                    {field.values.map((value, idx) => (
                                      <CustomTd
                                        key={idx}
                                        style={{
                                          color:
                                            Number(value?.sarValue) < 0 || Number(value?.value) < 0
                                              ? "var(--fail-color)"
                                              : "",
                                        }}

                                        label={
                                          value?.isRatios ?
                                            currencyActiveTab?.value === "riyal"
                                              ? formatNumber(value?.sarValue)
                                              : formatNumber(value.usdValue) :
                                            currencyActiveTab?.value === "riyal"
                                              ? formatNumber(value.value)
                                              : formatNumber(changeCurrencyFromRiyalToDollar(value.value))
                                        }
                                      />
                                    ))}

                                  </tr>
                                );
                              })}
                          </tbody>

                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
      <ChartModal chartValues={chartValues} />
    </>
  );
};

export default AccordionTable;
