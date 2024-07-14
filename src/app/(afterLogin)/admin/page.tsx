"use client";

import AGGrid from "./_component/AGGrid";
import style from "./admin.module.css";
import cx from "classnames";
import CountryListSelect from "./_component/CountryListSelect";
import BrandListSelect from "./_component/BrandListSelect";
import { useContext } from "react";
import { NavContext } from "./_component/NavProvider";

export default function AdminPage() {
  const { mainTab, setMainTab } = useContext(NavContext);
  const { subTab, setSubTab } = useContext(NavContext);

  // SubTab에 따른 AGGrid 데이터 설정
  const getGridColData = () => {
    switch (subTab) {
      case "country":
        return /* subTab1에 해당하는 데이터 */;
      case "brand":
        return /* subTab2에 해당하는 데이터 */;
      case "model":
        return /* subTab3에 해당하는 데이터 */;
      case "detailModel":
        return /* subTab4에 해당하는 데이터 */;
      default:
        return [];
    }
  };

  return (
    <>
      {mainTab === "carAddition" && (
        <div className={style.infoSection}>
          <CountryListSelect />

          <BrandListSelect />

          <div className={style.infoContainer}>
            <p className={style.infoTitle}>모델명</p>
            <select className={style.select} name="" id="">
              <option value="">캐스퍼</option>
              <option value="">베뉴</option>
            </select>
          </div>

          <div className={style.infoContainer}>
            <p className={style.infoTitle}>세부모델명</p>
            <select className={style.select} name="" id="">
              <option value="">캐스퍼</option>
              <option value="">캐스퍼</option>
            </select>
          </div>
        </div>
      )}

      <div className={style.dataSection}>
        <h1 className={style.dataTitle}>차량 데이터 추가</h1>

        <AGGrid />
      </div>
    </>
  );
}
