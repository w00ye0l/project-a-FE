"use client";

import style from "./mainNav.module.css";
import cx from "classnames";
import { usePathname, useRouter } from "next/navigation";

export default function MainNav() {
  const router = useRouter();
  const pathname = usePathname();

  const onClickCarDefault = () => {
    router.push("/admin/car/default?tab=country");
  };

  const onClickCarAddition = () => {
    router.push("/admin/car/addition?tab=carInfo");
  };

  const onClickHome = () => {
    router.push("/");
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
              pathname === "/admin/car/default" ? style.active : ""
            )}
          >
            차량 기본 데이터
          </li>
          <li
            className={cx(
              style.mainLi,
              pathname === "/admin/car/addition" ? style.active : ""
            )}
            onClick={onClickCarAddition}
          >
            차량 추가 데이터
          </li>
          <li className={cx(style.mainLi)} onClick={onClickHome}>
            홈으로
          </li>
        </ul>
      </nav>
    </>
  );
}
