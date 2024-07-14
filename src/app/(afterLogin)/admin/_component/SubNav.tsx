"use client";

import { useContext } from "react";
import style from "../admin.module.css";
import cx from "classnames";
import { NavContext } from "./NavProvider";

export default function SubNav() {
  const { mainTab, setMainTab } = useContext(NavContext);
  const { subTab, setSubTab } = useContext(NavContext);

  return (
    <nav>
      <ul className={style.subNav}>
        {mainTab === "carDefault" && (
          <>
            <li
              onClick={() => setSubTab("country")}
              className={cx(
                style.subLi,
                subTab === "country" ? style.active : ""
              )}
            >
              국가
            </li>
            <li
              onClick={() => setSubTab("brand")}
              className={cx(
                style.subLi,
                subTab === "brand" ? style.active : ""
              )}
            >
              브랜드
            </li>
          </>
        )}
        {mainTab === "carAddition" && (
          <>
            <li
              onClick={() => setSubTab("carSpec")}
              className={cx(
                style.subLi,
                subTab === "carSpec" ? style.active : ""
              )}
            >
              차량 관리
            </li>
            <li
              onClick={() => setSubTab("dataAddition")}
              className={cx(
                style.subLi,
                subTab === "dataAddition" ? style.active : ""
              )}
            >
              데이터 추가
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
