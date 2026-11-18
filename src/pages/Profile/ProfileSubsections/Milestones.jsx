import { getMonthName } from "../../../utils/helper";
import useLang from "../../../utils/useLang";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import SkeletonTable from "../../../components/ui/SkeletonTable/SkeletonTable";
/* Custom Previous/Next buttons */
const NavigationButtons = ({ onPrev, onNext, isFirstSlide, isLastSlide }) => {
  const arrowClass = (dir) =>
    `bi bi-arrow-${useLang(
      dir === "prev" ? "left" : "right",
      dir === "prev" ? "right" : "left"
    )}-circle ${dir === "prev" ? "prev" : "next"}-arrow cursor-pointer fs-2`;

  return (
    <div className="milestons-navigation-buttons">
      <i
        className={`${arrowClass("prev")} ${isFirstSlide ? "opacity-25" : "opacity-75"
          }`}
        onClick={isFirstSlide ? undefined : onPrev}
      ></i>
      <i
        className={`${arrowClass("next")} ${isLastSlide ? "opacity-25" : "opacity-75"
          }`}
        onClick={isLastSlide ? undefined : onNext}
      ></i>
    </div>
  );
};

const Milestones = ({ data, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === data?.length - 1;

  const changeSlide = (step) =>
    setActiveIndex((prev) => {
      const nextIndex = Math.min(Math.max(prev + step, 0), data?.length - 1);
      if (nextIndex !== prev) swiperInstance?.slideTo?.(nextIndex);
      return nextIndex;
    });

  return (
    <div className="milestones-section space-between-sections">
      <h2 className="section-title mb-4">
        {useLang(`milestones`, "التطورات الرئيسية")}
      </h2>
      {isLoading ?
        <SkeletonTable />
        :
        <div className="slider-container mt-5">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={false}
            spaceBetween={10}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              576: {
                slidesPerView: 2,
              },
              300: {
                slidesPerView: 1,
              },
            }}
          >
            {data?.map((item, idx) => {
              const isActive = activeIndex === idx;
              const activeColor = isActive
                ? "var(--identity-color)"
                : "var(--second-black-color)";

              return (
                <SwiperSlide key={idx} className="single-milestone">
                  <div
                    className="date text-center m-auto rounded-2 position-relative d-flex flex-column justify-content-center align-items-center pt-1 pb-2 fw-medium"
                    style={{
                      maxWidth: "150px",
                      height: "70px",
                      backgroundColor: activeColor,
                      color: "var(--white-color)",
                    }}
                  >
                    <p className="m-0 fs-4">{item?.developmentDay || " "}</p>
                    <p
                      className="m-0 text-capitalize"
                      style={{ fontSize: "13px" }}
                    >
                      {getMonthName(item?.developmentMonth)}
                      {item?.developmentMonth ? ", " : ""}
                      {item?.developmentYear}
                    </p>

                    <div
                      className="after"
                      style={{
                        position: "absolute",
                        width: "30px",
                        height: "15px",
                        top: "98%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                        backgroundColor: activeColor,
                      }}
                    />
                  </div>

                  <div
                    className="circle m-auto mt-4 mb-5 rounded-5"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: activeColor,
                    }}
                  />

                  <p
                    className="m-0 text-center"
                    style={{ color: "var(--second-black-color)" }}
                  >
                    {useLang(item?.titleEn, item?.titleAr)}
                  </p>
                </SwiperSlide>
              );
            })}

            <NavigationButtons
              onPrev={() => changeSlide(-1)}
              onNext={() => changeSlide(1)}
              isFirstSlide={isFirstSlide}
              isLastSlide={isLastSlide}
            />
          </Swiper>
        </div>}
    </div>
  );
};

export default Milestones;