import style from "./brandFilter.module.css";

export default function BrandFilter({ country }: { country: string }) {
  return (
    <div className={style.filterSection}>
      {/* 국산차 */}
      <div className={style.filterContainer}>
        <div className={style.filterTitle}>국산차</div>
        <ul className={style.filterItems}>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="1" />
            <label className={style.label} htmlFor="1">
              현대
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="2" />
            <label className={style.label} htmlFor="2">
              기아
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="3" />
            <label className={style.label} htmlFor="3">
              제네시스
            </label>
          </li>
        </ul>
      </div>

      {/* 수입차 */}
      <div className={style.divider}></div>

      <div className={style.filterContainer}>
        <div className={style.filterTitle}>수입차</div>
        <ul className={style.filterItems}>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="1" />
            <label className={style.label} htmlFor="1">
              현대
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="2" />
            <label className={style.label} htmlFor="2">
              기아
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="3" />
            <label className={style.label} htmlFor="3">
              제네시스
            </label>
          </li>
        </ul>
      </div>

      {/* 지역 */}
      <div className={style.divider}></div>

      <div className={style.filterContainer}>
        <div className={style.filterTitle}>지역</div>
        <ul className={style.filterItems}>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="1" />
            <label className={style.label} htmlFor="1">
              서울
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="2" />
            <label className={style.label} htmlFor="2">
              경기
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="3" />
            <label className={style.label} htmlFor="3">
              인천
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="3" />
            <label className={style.label} htmlFor="3">
              전북
            </label>
          </li>
          <li className={style.filterItem}>
            <input className={style.chkBox} type="checkbox" id="3" />
            <label className={style.label} htmlFor="3">
              전남
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
