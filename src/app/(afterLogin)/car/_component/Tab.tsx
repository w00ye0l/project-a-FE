"use client";

import cx from "classnames";
import style from "./tab.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCarPriceStore } from "@/store/carPrice";

export default function Tab() {
  const pathname = usePathname();
  const carPriceStore = useCarPriceStore();
  const brandName = carPriceStore.selectedBrand;
  const detailModelName = carPriceStore.selectedDetailModel;

  console.log(pathname);
  console.log(brandName);
  console.log(detailModelName);

  if (pathname.startsWith("/car/estimate")) {
    return (
      <ul className={style.navTab}>
        <li className={cx(style.tab)}>
          <Link
            href={`/car/estimate/${detailModelName}`}
            className={cx(
              style.tabName,
              decodeURI(pathname) === `/car/estimate/${detailModelName}` &&
                pathname !== "/car/estimate/end" &&
                style.tabActive
            )}
          >
            세부 모델
          </Link>
        </li>

        <span className={style.next}>&gt;</span>

        <li className={style.tab}>
          <Link
            href={
              carPriceStore.selectedCarInfo
                ? `/car/estimate/option/${carPriceStore.selectedDetailModel}?carYear=${carPriceStore.selectedCarInfo.carYear}&engineInfo=${carPriceStore.selectedCarInfo.engineInfo}&trimName=${carPriceStore.selectedCarInfo.trimName}`
                : "/car"
            }
            className={cx(
              style.tabName,
              pathname.startsWith(`/car/estimate/option`) && style.tabActive
            )}
          >
            옵션
          </Link>
        </li>

        <span className={style.next}>&gt;</span>

        <li className={style.tab}>
          <Link
            href={`/car/estimate/end`}
            className={cx(
              style.tabName,
              pathname === `/car/estimate/end` && style.tabActive
            )}
          >
            견적서
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className={style.navTab}>
      <li className={cx(style.tab)}>
        <Link
          href={"/car"}
          className={cx(
            style.tabName,
            pathname.startsWith("/car") && style.tabActive
          )}
        >
          신차
        </Link>
      </li>
      <li className={style.tab}>
        <Link href={"/community"} className={cx(style.tabName)}>
          커뮤니티
        </Link>
      </li>
    </ul>
  );
}
