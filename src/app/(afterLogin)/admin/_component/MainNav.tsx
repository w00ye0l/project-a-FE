"use client";

import { useContext } from "react";
import style from "./mainNav.module.css";
import cx from "classnames";
import { NavContext } from "./NavProvider";

export default function MainNav() {
  const { mainTab, setMainTab } = useContext(NavContext);

  const onClickCarDefault = () => {
    setMainTab("carDefault");
  };

  const onClickCarAddition = () => {
    setMainTab("carAddition");
  };

  return (
    <>
      <h2 className={style.navTitle}>메뉴</h2>

      <nav>
        <ul className={style.mainNav}>
          <li
            onClick={onClickCarDefault}
            className={cx(
              style.mainLi,
              mainTab === "carDefault" ? style.active : ""
            )}
          >
            기본 옵션 관리
          </li>
          <li
            className={cx(
              style.mainLi,
              mainTab === "carAddition" ? style.active : ""
            )}
            onClick={onClickCarAddition}
          >
            차량 데이터 관리
          </li>
        </ul>
      </nav>
    </>
  );
}
