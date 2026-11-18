import { useState } from "react";
import useLang from "../../../utils/useLang";
import { NavLink, useNavigate } from "react-router";

const Navbar = ({ menuItems }) => {
  const navigate = useNavigate();
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <div className="mt-5 w-100 container position-relative">
      {/* nav head */}
      <div
        className="nav-content row m-0 py-3"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
      >
        {/* list icon */}
        <div className="col-3 col-md-2 d-flex align-items-center gap-2">
          <div
            className="icon-container px-3 py-2 bg-black"
            style={{ color: "var(--white-color)" }}
          >
            <i
              className={`bi ${
                openNavbar ? "bi-x-lg" : "bi-list"
              } fs-3 cursor-pointer`}
              onClick={() => setOpenNavbar(!openNavbar)}
            ></i>
          </div>
        </div>
        {/* logo */}
        <div
          className={`logo col-9 col-md-8 m-auto cursor-pointer ${useLang(
            "text-end",
            "text-start"
          )} text-md-center`}
          onClick={() => navigate("/")}
        >
          {useLang(
            <svg width="185" height="17" viewBox="0 0 185 17" fill="none">
              <path
                d="M75.249 3.30527H73.0068V12.6413H82.5168V10.7663H75.249V3.30527Z"
                fill="currentColor"
              ></path>
              <path
                d="M61.6406 3.30527L56.0352 12.6413H58.6446L63.129 5.08356L67.594 12.6413H70.2035L64.6173 3.30527H61.6406Z"
                fill="currentColor"
              ></path>
              <path
                d="M110.041 3.30527L104.455 12.6413H107.065L111.549 5.08356L116.014 12.6413H118.623L113.037 3.30527H110.041Z"
                fill="currentColor"
              ></path>
              <path
                d="M182.758 3.30527V7.0358H175.123V3.30527H172.881V12.6413H175.123V8.91074H182.758V12.6413H185V3.30527H182.758Z"
                fill="currentColor"
              ></path>
              <path
                d="M153.203 3.30527H150.961V12.622H153.203V3.30527Z"
                fill="currentColor"
              ></path>
              <path
                d="M161.495 3.30527L155.909 12.6413H158.519L163.003 5.08356L167.468 12.6413H170.078L164.491 3.30527H161.495Z"
                fill="currentColor"
              ></path>
              <path
                d="M98.1154 3.30527L93.7277 10.863L89.3593 3.30527H85.8027V12.6413H88.0449V5.25752L92.336 12.6413H95.1387L99.4298 5.25752V12.6413H101.653V3.30527H98.1154Z"
                fill="currentColor"
              ></path>
              <path
                d="M129.815 7.96361C129.815 9.81921 128.326 10.9403 126.084 10.9403C123.842 10.9403 122.914 10.1865 122.45 8.60147H120.208C120.672 11.1143 123.011 12.7959 126.084 12.7959C129.157 12.7959 132.057 10.747 132.057 7.94428V3.28593H129.815V7.94428V7.96361Z"
                fill="currentColor"
              ></path>
              <path
                d="M142.108 3.30527H135.575V12.622H142.108C145.375 12.622 147.695 10.7663 147.695 7.96361C147.695 5.16087 145.278 3.30527 142.108 3.30527ZM142.108 10.7663H137.817V5.1802H142.108C143.964 5.1802 145.472 6.39794 145.472 7.98294C145.472 9.56794 144.08 10.7857 142.108 10.7857V10.7663Z"
                fill="currentColor"
              ></path>
              <path
                d="M17.7637 3.22797L19.6966 6.43662H29.7478L31.6807 3.22797H17.7637Z"
                fill="currentColor"
              ></path>
              <path
                d="M45.5977 0H33.6136L31.6807 3.22798H43.6648L45.5977 0Z"
                fill="currentColor"
              ></path>
              <path
                d="M3.84668 0H15.8308L17.7637 3.22798H5.7796L3.84668 0Z"
                fill="currentColor"
              ></path>
              <path
                d="M17.7637 9.64528L19.6966 12.8539H29.7478L31.6807 9.64528H17.7637Z"
                fill="currentColor"
              ></path>
              <path
                d="M47.5113 6.43663H33.6136L31.6807 9.64528H45.5977L47.5113 6.43663Z"
                fill="currentColor"
              ></path>
              <path
                d="M1.93262 6.43663H15.8303L17.7632 9.64528H3.84621L1.93262 6.43663Z"
                fill="currentColor"
              ></path>
              <path
                d="M49.4442 12.8539H33.6136L31.6807 16.0626H47.5113L49.4442 12.8539Z"
                fill="currentColor"
              ></path>
              <path
                d="M0 12.8539H15.8306L17.7635 16.0626H1.93292L0 12.8539Z"
                fill="currentColor"
              ></path>
            </svg>,
            <svg width="218" height="22" viewBox="0 0 218 22" fill="none">
              <g clipPath="url(#clip0_59_16433)">
                <path
                  d="M199.398 5.30758L197.381 8.84596H186.848L184.831 5.30758H199.398Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M170.262 1.7692H182.814L184.831 5.30574H172.28L170.262 1.7692Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M213.967 1.7692H201.415L199.398 5.30574H211.949L213.967 1.7692Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M199.398 12.3843L197.381 15.9227H186.848L184.831 12.3843H199.398Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M168.245 8.84596H182.813L184.831 12.3825H170.262L168.245 8.84596Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M215.984 8.84596H201.415L199.398 12.3825H213.967L215.984 8.84596Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M166.229 15.9227H182.814L184.831 19.4611H168.246L166.229 15.9227Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M218 15.9227H201.415L199.398 19.4611H215.984L218 15.9227Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M155.022 1.49985H152.332V16.0168H155.022V1.49985Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M144.7 13.6573H127.369V5.2098H119.551C116.058 5.2098 113.391 7.58963 113.391 10.6152C113.391 11.7885 113.729 12.8197 114.327 13.6591H98.3152V1.49985H95.6265V16.0168H147.39V1.49985H144.7V13.6573ZM116.079 10.6152C116.079 8.88839 117.622 7.56934 119.551 7.56934H124.678V13.6573H119.509C117.508 13.6407 116.081 12.4286 116.081 10.6133L116.079 10.6152Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M35.7894 13.6573H13.9799V5.2098H6.16267C2.66944 5.2098 0 7.58779 0 10.6152C0 13.8584 2.56778 16.0205 6.16091 16.0205L38.4781 16.0168V5.2098H35.7876V13.6573H35.7894ZM11.2877 13.6573H6.16091C4.13649 13.6573 2.68872 12.4415 2.68872 10.6133C2.68872 8.88655 4.23114 7.56749 6.16091 7.56749H11.2877V13.6554V13.6573Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M84.3493 18.2288C83.5623 18.2288 82.9243 18.9003 82.9243 19.7286C82.9243 20.5569 83.5623 21.2285 84.3493 21.2285C85.1363 21.2285 85.7743 20.5569 85.7743 19.7286C85.7743 18.9003 85.1363 18.2288 84.3493 18.2288Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M31.5847 18.2288C30.7977 18.2288 30.1597 18.9003 30.1597 19.7286C30.1597 20.5569 30.7977 21.2285 31.5847 21.2285C32.3716 21.2285 33.0096 20.5569 33.0096 19.7286C33.0096 18.9003 32.3716 18.2288 31.5847 18.2288Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M35.821 18.2288C35.034 18.2288 34.396 18.9003 34.396 19.7286C34.396 20.5569 35.034 21.2285 35.821 21.2285C36.608 21.2285 37.246 20.5569 37.246 19.7286C37.246 18.9003 36.608 18.2288 35.821 18.2288Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M5.31268 3.00154C6.09967 3.00154 6.73767 2.33002 6.73767 1.50169C6.73767 0.673363 6.09967 0 5.31268 0C4.5257 0 3.8877 0.671518 3.8877 1.49985C3.8877 2.32818 4.5257 2.99969 5.31268 2.99969V3.00154Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9.54901 3.00154C10.336 3.00154 10.974 2.33002 10.974 1.50169C10.974 0.673363 10.336 0 9.54901 0C8.76202 0 8.12402 0.671518 8.12402 1.49985C8.12402 2.32818 8.76202 2.99969 9.54901 2.99969V3.00154Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M85.2136 5.2098H77.1422V7.57118H85.2136C87.238 7.57118 88.6858 8.78693 88.6858 10.6152V13.6591H57.4115V10.6152C57.4115 7.37194 54.8437 5.2098 51.2506 5.2098H44.683V7.57118H51.2506C53.275 7.57118 54.7228 8.78693 54.7228 10.6152V13.6591H42.7305V16.0205H91.3763V10.5008H91.3728C91.3114 7.32398 88.7647 5.21165 85.2136 5.21165V5.2098Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_59_16433">
                  <rect width="218" height="21.2285" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>

        <div className="col-2 d-none d-md-block" />
      </div>

      {/* nav content */}
      <div
        className={`position-absolute start-0 end-0 px-2 z-3 bg-transparent navbar-anim ${
          openNavbar ? "show" : "hide"
        }`}
      >
        <div
          className="row px-4 px-lg-5 py-3 m-0 mt-3"
          style={{ backgroundColor: "var(--white-color)" }}
        >
          {menuItems?.map((menuItems, idx) => (
            <NavLink
              to={`/${useLang("en", "ar")}${menuItems?.link}`}
              onClick={() => setOpenNavbar(!openNavbar)}
              key={idx}
              className="custom-nav-item col-12 col-lg-3 d-flex flex-column justify-content-center text-decoration-none py-3"
            >
              <img
                src={menuItems?.icon}
                alt="almagdiah"
                style={{ width: "20px", height: "20px", marginBottom: "5px" }}
              />
              <h3
                className={`custom-fs-6 fw-medium text-capitalize text-wrap ${useLang(
                  "w-50",
                  "w-100"
                )}`}
              >
                {menuItems?.title}
              </h3>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
