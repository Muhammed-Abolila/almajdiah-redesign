import { createRoot } from "react-dom/client";
// bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
// react date picker
import "react-datepicker/dist/react-datepicker.css";
// css file
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AutoResizeIframe from "./layouts/AutoResizeIframe/AutoResizeIframe.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    {/* <AutoResizeIframe> */}
      <App />
    {/* </AutoResizeIframe> */}
  </QueryClientProvider>,
);
