"use client";

import style from "./subNav.module.css";
import cx from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SubNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const setTab = (tab: string) => {
    router.push(pathname + "?tab=" + tab);
  };

  return (
    <nav>
      <ul className={style.subNav}>
        {pathname === "/admin/car/default" && (
          <>
            <li
              onClick={() => setTab("country")}
              className={cx(style.subLi, tab === "country" ? style.active : "")}
            >
              국가
            </li>
            <li
              onClick={() => setTab("brand")}
              className={cx(style.subLi, tab === "brand" ? style.active : "")}
            >
              브랜드
            </li>
            <li
              onClick={() => setTab("model")}
              className={cx(style.subLi, tab === "model" ? style.active : "")}
            >
              모델
            </li>
            <li
              onClick={() => setTab("detailModel")}
              className={cx(
                style.subLi,
                tab === "detailModel" ? style.active : ""
              )}
            >
              세부 모델
            </li>
            <li
              onClick={() => setTab("basicOption")}
              className={cx(
                style.subLi,
                tab === "basicOption" ? style.active : ""
              )}
            >
              기본 옵션
            </li>
          </>
        )}
        {pathname === "/admin/car/addition" && (
          <>
            <li
              onClick={() => setTab("carInfo")}
              className={cx(style.subLi, tab === "carInfo" ? style.active : "")}
            >
              차량 관리
            </li>
            <li
              onClick={() => setTab("carSpec")}
              className={cx(style.subLi, tab === "carSpec" ? style.active : "")}
            >
              차량 제원
            </li>
            <li
              onClick={() => setTab("carBasicOption")}
              className={cx(
                style.subLi,
                tab === "carBasicOption" ? style.active : ""
              )}
            >
              차량 기본 옵션
            </li>
            <li
              onClick={() => setTab("carChoiceOption")}
              className={cx(
                style.subLi,
                tab === "carChoiceOption" ? style.active : ""
              )}
            >
              차량 선택 옵션
            </li>
            <li
              onClick={() => setTab("carColorOption")}
              className={cx(
                style.subLi,
                tab === "carColorOption" ? style.active : ""
              )}
            >
              차량 색상
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
