import "./Alert.css";
const Alert = ({ showAlert, onClose }) => {
  return (
    <div
      className="alert alert-dismissible fade show position-fixed z-2 alert-custom"
      style={{
        backgroundColor:
          showAlert?.type === "success"
            ? "var(--success-color)"
            : "var(--fail-color)",
        color: "var(--white-color)",
        top: "10px",
        right: "10px",
        minWidth: "300px"
      }}
      role="alert"
    >
      <p className="m-0">{showAlert?.message}</p>
      <i
        className="bi bi-x close-alert"
        onClick={onClose}
        aria-label="Close"
      ></i>
    </div>
  );
};
export default Alert;