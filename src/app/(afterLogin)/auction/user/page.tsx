import style from "./page.module.css";
import TopCarCard from "../_component/TopCarCard";
import CarList from "../_component/CarList";

export default function AuctionUserPage() {
  return (
    <>
      <h1 className={style.title}>TOP 상위노출</h1>

      <div className={style.top}>
        {/* 차 하나 */}
        <TopCarCard type="top" />
        <TopCarCard type="top" />
        <TopCarCard type="top" />
        <TopCarCard type="top" />
        <TopCarCard type="top" />
      </div>

      {/* 차 리스트 */}
      <CarList auction="user" country="all" />
    </>
  );
}
