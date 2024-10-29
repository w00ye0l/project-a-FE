import CounselButton from "./CounselButton";
import TopButton from "./TopButton";
import style from "./menuButtons.module.css";

export default function MenuButtons() {
  return (
    <div className={style.main}>
      <TopButton />

      <CounselButton />
    </div>
  );
}
