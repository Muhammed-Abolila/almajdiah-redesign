import { usePostRequest } from "../../../utils/useRequest";
import useLang from "../../../utils/useLang";
import { useEffect, useRef, useState } from "react";
import { authenticateAndSaveToken, base_url } from "../../../utils/getToken";
import axios from "axios";
import { API_ENDPOINTS } from "../../../services/apis";
import ContactInput from "../../../components/common/contactInput/ContactInput";
import { countries } from "../../../constants/constants";
import Alert from "../../../components/common/alert/Alert";
const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    type: "",
    status: false,
    message: "",
  });
  const dropDownRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [inputsData, setInputsData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    selectedCountryValue: "",
    oldAlertsTypes: [],
    alertTypes: [],
    newUser: false,
    isConfirmed: false,
    userAction: "submit",
  });

  // handle change Email
  const handleEmailChange = async (emailValue) => {
    setEmail(emailValue);
    const emailValidation =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu)$/;
    if (emailValidation.test(emailValue)) {
      try {
        const token = await authenticateAndSaveToken();
        setLoading(true);
        const checkEmailResponse = await axios.get(
          `${base_url}/${API_ENDPOINTS.CHECK_EMAIL.URL}/${emailValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        if (checkEmailResponse?.status === 200) {
          const user = checkEmailResponse?.data?.userInfo;
          const alertTypes = [];
          if (user?.events) alertTypes.push("10");
          if (user?.annualReports) alertTypes.push("11");
          if (user?.quarterlyReports) alertTypes.push("12");
          const selectedCountry = countries?.find(
            (item) => item?.english === user?.countryName
          );
          setInputsData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            country:
              useLang(selectedCountry?.english, selectedCountry?.arabic) || "",
            selectedCountryValue: user?.countryName || "",
            isConfirmed: user?.isConfirmed || false,
            newUser: !(user?.firstName && user?.lastName && user?.countryName),
            userAction: user ? "update" : "submit",
            oldAlertsTypes: alertTypes,
            alertTypes: alertTypes,
          });
        }
      } catch (error) {
        console.log("Error validating email:", error);
        setLoading(false);
      }
    } else {
      setError();
      setInputsData({
        firstName: "",
        lastName: "",
        country: "",
        selectedCountryValue: "",
        oldAlertsTypes: [],
        alertTypes: [],
        newUser: false,
        isConfirmed: false,
        userAction: "submit",
      });
    }
  };

  // useEffect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowCountriesDropdown(false);
        setSearchValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle countries select
  const handleCountrySelect = (country) => {
    setInputsData((prev) => ({
      ...prev,
      country: useLang(country?.english, country?.arabic),
      selectedCountryValue: country?.english,
    }));
    setShowCountriesDropdown(false);
    setSearchValue("");
    setFilteredCountries(countries);
  };

  // handle countries search
  const handleCountriesSearch = (searchValue) => {
    setSearchValue(searchValue);
    if (searchValue) {
      const filtered = countries.filter(
        (item) =>
          item?.arabic.includes(searchValue) ||
          item?.english
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const { mutate } = usePostRequest(API_ENDPOINTS?.SUBSCRIBTION_CENTER.URL, {
    onSuccess: (data) => {
      setEmail("");
      setInputsData({
        firstName: "",
        lastName: "",
        country: "",
        selectedCountryValue: "",
        oldAlertsTypes: [],
        alertTypes: [],
        newUser: false,
        isConfirmed: false,
        userAction: "submit",
      });
      let finalMessage = "";
      let type = "success";
      switch (data?.message) {
        case "Subscribed":
          finalMessage = useLang(
            "Subscription completed successfully! Check your email for confirmation.",
            "تم الاشتراك بنجاح! تحقق من بريدك الإلكتروني للتأكيد."
          );
          break;
        case "Updated":
          finalMessage = useLang(
            "Your subscription has been updated successfully.",
            "تم تحديث اشتراكك بنجاح."
          );
          break;
        default:
          type = "error";
          finalMessage = useLang(
            "Something went wrong, please try again later.",
            "حدث خطأ ما، يرجى المحاولة لاحقًا."
          );
          break;
      }
      setShowAlert({
        type,
        status: true,
        message: finalMessage,
      });
      setTimeout(() => {
        setShowAlert({ type: "", status: false, message: "" });
      }, 3000);
    },
  });

  // function to validate inputs
  const validateField = (value) => {
    const regex = /^[A-Za-z\u0600-\u06FF ]{2,30}$/;
    return regex.test(
      value
        ?.trim()
        .replace(/\u200E|\u200F|\u202A|\u202B|\u202C|\u202D|\u202E/g, "")
        .replace(/\s+/g, " ")
    );
  };

  const onSubmit = async () => {
    const errors = {};

    if (email === "") {
      errors.email = true;
    }
    if (!validateField(inputsData?.firstName)) {
      errors.firstName = true;
    }
    if (!validateField(inputsData?.lastName)) {
      errors.lastName = true;
    }
    if (!validateField(inputsData?.country)) {
      errors.country = true;
    }
    if (inputsData.alertTypes?.length === 0) {
      errors.alertTypes = true;
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      if (inputsData?.isConfirmed === false && inputsData?.newUser === false) {
        setShowAlert({
          type: "error",
          status: true,
          message: useLang(
            "Please confirm your previous subscription first.",
            "يرجي تأكيد إشتراكك السابق أولا"
          ),
        });
        setTimeout(() => {
          setShowAlert({ type: "", status: false, message: "" });
        }, 3000);
        return;
      } else if (
        JSON.stringify(inputsData.alertTypes.sort()) ===
        JSON.stringify(inputsData.oldAlertsTypes.sort())
      ) {
        setShowAlert({
          type: "error",
          status: true,
          message: useLang(
            "You are already subscribed to these newsletters.",
            "انت مشترك بالفعل في هذه النشرات"
          ),
        });
        setTimeout(() => {
          setShowAlert({ type: "", status: false, message: "" });
        }, 3000);
        return;
      }
      mutate({
        email: email,
        firstName: inputsData?.firstName,
        lastName: inputsData?.lastName,
        jobTitle: "",
        phoneNo: "",
        countryName: inputsData?.selectedCountryValue,
        languageID: useLang(2, 1),
        platform: "",
        alertTypes: inputsData?.alertTypes,
      });
    }
  };

  const checkBoxesData = [
    {
      label: useLang("calendar events", "المفكرة"),
      value: "10",
    },
    {
      label: useLang("annual reports", "التقارير السنوية"),
      value: "11",
    },
    {
      label: useLang("earnings results", "النتائج المالية"),
      value: "12",
    },
  ];

  const handleCloseAlert = () => {
    setShowAlert({ type: "", status: false, message: "" });
  };

  return (
    <div className="position-relative">
      <div className="d-flex flex-column gap-2">
        <ContactInput
          type="email"
          placeholder={useLang("Email", "البريد الإلكتروني")}
          value={email}
          error={error?.email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />

        <ContactInput
          type="text"
          placeholder={useLang("First Name", "الإسم الأول")}
          value={inputsData?.firstName}
          onChange={(e) =>
            setInputsData({
              ...inputsData,
              firstName: e.target.value,
            })
          }
          error={error?.firstName}
        />

        <ContactInput
          type="text"
          placeholder={useLang("Last Name", "الإسم الأخير")}
          value={inputsData?.lastName}
          onChange={(e) =>
            setInputsData({
              ...inputsData,
              lastName: e.target.value,
            })
          }
          error={error?.lastName}
        />

        <div className="custom-dropdown dropdown" ref={dropDownRef}>
          <div
            className={`btn dropdown-toggle rounded-5 d-flex justify-content-between align-items-center`}
            style={{
              border: error?.country ? "1px solid red" : "1px solid #dee2e6",
            }}
            type="button"
          >
            {showCountriesDropdown ? (
              <input
                type="text"
                className="form-control py-2 border-0"
                placeholder={useLang("Search country...", "ابحث عن الدولة...")}
                value={searchValue}
                onFocus={() => setShowCountriesDropdown(true)}
                onChange={(e) => handleCountriesSearch(e.target.value)}
                autoFocus
              />
            ) : (
              <div
                onClick={() => setShowCountriesDropdown(true)}
                className={`w-100 ${useLang(
                  "text-start",
                  "text-end"
                )}  py-2 px-2`}
              >
                {inputsData?.country ? (
                  <span>{inputsData?.country}</span>
                ) : (
                  <span className="opacity-75">
                    {useLang("Search country...", "ابحث عن الدولة...")}
                  </span>
                )}
              </div>
            )}

            <i className="bi bi-chevron-down"></i>
          </div>

          <ul
            className={`dropdown-menu contact-dropdown-menu w-100 ${
              showCountriesDropdown ? "show" : ""
            }`}
            style={{
              zIndex: "1",
              padding: "10px 5px",
              maxHeight: "250px",
              overflowY: "auto",
            }}
          >
            {filteredCountries?.length > 0 ? (
              filteredCountries.map((item, idx) => (
                <li
                  key={idx}
                  className={`contact-dropdown-item dropdown-item ${useLang(
                    "text-start",
                    "text-end"
                  )} cursor-pointer text-capitalize`}
                  style={{ color: "var(--second-black-color)" }}
                  onClick={() => handleCountrySelect(item)}
                >
                  {useLang(item?.english, item?.arabic)}
                </li>
              ))
            ) : (
              <li
                className="dropdown-item text-center"
                style={{ color: "#999" }}
              >
                {useLang("No countries found", "لم يتم العثور على دول")}
              </li>
            )}
          </ul>
        </div>

        <p
          className="my-2 ms-2 custom-fs-6"
          style={{ color: "var(--text-color)" }}
        >
          {useLang(
            "select from the options below to receive news and financial information by email",
            "اختر من الخيارات أدناه لتلقي الأخبار والمعلومات المالية عبر البريد الإلكتروني."
          )}
        </p>
      </div>

      <div className="d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-between align-items-start row-gap-2 text-capitalize">
        {checkBoxesData?.map((item, idx) => (
          <div key={idx} className="form-check">
            <ContactInput
              type="checkbox"
              value={item?.value}
              checked={inputsData?.alertTypes.includes(item?.value)}
              label={item?.label}
              onChange={(e) => {
                const value = e.target.value;
                const isChecked = e.target.checked;
                setInputsData((prev) => ({
                  ...prev,
                  alertTypes: isChecked
                    ? [...prev.alertTypes, value]
                    : prev.alertTypes.filter((v) => v !== value),
                }));
              }}
              error={error?.alertTypes}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button
          type="submit"
          className="text-capitalize custom-fs-5 btn rounded-5 py-3 px-5 d-flex justify-content-center align-items-center gap-2"
          style={{
            backgroundColor: "var(--identity-color)",
            color: "var(--white-color)",
          }}
          onClick={() => onSubmit()}
        >
          <span>
            {inputsData?.userAction === "submit"
              ? useLang("submit", "إرسال")
              : useLang("update", "تحديث")}
          </span>
          <span
            className={`bi bi-chevron-${useLang("right", "left")} custom-fs-6`}
          />
        </button>
      </div>

      {showAlert?.status && (
        <Alert showAlert={showAlert} onClose={handleCloseAlert} />
      )}

      {loading && (
        <div
          className="position-absolute top-0 bottom-0 start-0 end-0"
          style={{ backgroundColor: "rgba(0,0,0,.5)", zIndex: 10 }}
        />
      )}
    </div>
  );
};

export default ContactForm;