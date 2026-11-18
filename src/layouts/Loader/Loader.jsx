import "./Loader.css";
const Loader = () => {
  return (
    <div
      dir="ltr"
      className="position-absolute top-0 bottom-0 end-0 start-0 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "var(--white-color)",
        height: "100%",
        zIndex: 999999999,
      }}
    >
      <span className="loader"></span>
    </div>
  );
};
export default Loader;
