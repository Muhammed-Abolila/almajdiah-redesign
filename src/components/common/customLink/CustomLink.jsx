import { Link } from "react-router";
import "./CustomLink.css";
const CustomLink = ({ text, link }) => {
  return (
    <Link to={link} className="btn custom-link text-capitalize rounded-0 py-2">
      {text}
    </Link>
  );
};
export default CustomLink;
