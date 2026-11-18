import * as yup from "yup"
import useLang from "../utils/useLang";
export const schema = () =>
  yup.object({
    email: yup
      .string()
      .email(useLang("Invalid email", "بريد إلكتروني غير صالح"))
      .required(useLang("Email is required", "البريد الإلكتروني مطلوب")),
    firstName: yup
      .string()
      .required(useLang("First Name is required", "الاسم الأول مطلوب")),
    lastName: yup
      .string()
      .required(useLang("Last Name is required", "الاسم الأخير مطلوب")),
    country: yup
      .string()
      .required(useLang("Country is required", "الدولة مطلوبة")),
    alertTypes: yup
      .array()
      .min(
        1,
        useLang(
          "Please select at least one alert type",
          "يرجى اختيار نوع تنبيه واحد على الأقل"
        )
      )
      .required(useLang("Alert type is required", "نوع التنبيه مطلوب")),
  });
