import style from "./dotSpinner.module.css";

export default function DotSpinner({ size }: { size: number }) {
  return (
    <div
      className={style.container}
      style={{ "--uib-size": `${size}px` } as React.CSSProperties}
    >
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
    </div>
  );
}
