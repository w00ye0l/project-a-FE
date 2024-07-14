"use client";

import style from "./mainNav.module.css";
import cx from "classnames";

export default function MainNav() {
  return (
    <>
      <h2 className={style.navTitle}>메뉴</h2>

      <nav>
        <ul className={style.mainNav}>
          <li className={cx(style.mainLi, style.active)}>차량 데이터 관리</li>
          <li>기본 옵션 관리</li>
        </ul>
      </nav>
    </>
  );
}
