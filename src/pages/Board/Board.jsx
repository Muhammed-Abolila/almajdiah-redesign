import imgPlaceholder from "../../../src/assets/img_placeholder.png";
import SkeletonCard from "../../components/ui/SkeletonCard/SkeletonCard";
import { API_ENDPOINTS } from "../../services/apis";
import useLang from "../../utils/useLang";
import useRequest from "../../utils/useRequest";
import "./Board.css";
import BoardModal from "./BoardSubsections/BoardModal";
import { useState } from "react";
const Board = () => {
  const [boradMember, setBoardMember] = useState("");
  const { data: boardData, isLoading } = useRequest(
    [API_ENDPOINTS.BOARD.KEY],
    API_ENDPOINTS.BOARD.URL
  );
  return (
    <section className="board container space-between-sections">
      <div className="members d-flex align-items-center">
        {isLoading ?
          <SkeletonCard length={2} className="w-75" />
          :
          (
            boardData?.individuals
              ?.filter(
                (item) => item?.individualID !== 9397 || item?.positionID === 14
              )
              .map((item, idx) => (
                <div
                  onClick={() => setBoardMember(item)}
                  data-bs-target="#boardModal"
                  data-bs-toggle="modal"
                  key={idx}
                  className="member-card position-relative"
                >
                  <img
                    src={
                      item.profilePicURL ? item.profilePicURL : imgPlaceholder
                    }
                    className="member-img w-100 h-100"
                    alt={useLang(item?.nameEn, item?.nameAr)}
                  />

                  <div className="caption text-capitalize px-2">
                    <h5 className="m-0 custom-fs-5">
                      {useLang(item?.nameEn, item?.nameAr)}
                    </h5>
                    <p className="m-0 custom-fs-6 py-1">
                      {useLang(item?.positionNameEn, item?.positionNameAr)}
                    </p>

                    <p className="board-read-more-btn m-0">
                      <span className={useLang("pe-2", "ps-2")}>
                        {useLang("read more", "قراءه المزيد")}
                      </span>
                      <i
                        className={`bi bi-arrow-${useLang("right", "left")}`}
                      ></i>
                    </p>
                  </div>
                  <div className="layer"></div>
                </div>
              ))
          )
        }
      </div>
      <BoardModal boradMember={boradMember} />
    </section>
  );
};
export default Board;
