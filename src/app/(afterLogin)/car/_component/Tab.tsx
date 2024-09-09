"use client";

import cx from "classnames";
import style from "./tab.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCarPriceStore } from "@/store/carPrice";
import Image from "next/image";

export default function Tab() {
  const pathname = usePathname();
  const carPriceStore = useCarPriceStore();
  const brandName = carPriceStore.selectedBrand;
  const detailModelName = carPriceStore.selectedDetailModel.detailModelName;

  return (
    <div className={style.main}>
      <div className={style.title}>
        {brandName && (
          <Image
            src={`/brand/${brandName}.jpg`}
            width={90}
            height={60}
            alt={brandName}
          />
        )}
        <p>
          <b>{brandName}</b> {detailModelName}
        </p>
      </div>

      <ul className={style.navTab}>
        <li className={cx(style.tab)}>
          <Link
            href={`/car/estimate/${detailModelName}`}
            className={cx(
              style.tabName,
              decodeURI(pathname) === `/car/estimate/${detailModelName}` &&
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
                ? `/car/estimate/${detailModelName}/exterior?carYear=${carPriceStore.selectedCarInfo.carYear}&engineInfo=${carPriceStore.selectedCarInfo.engineInfo}&trimName=${carPriceStore.selectedCarInfo.trimName}`
                : "/car"
            }
            className={cx(
              style.tabName,
              pathname.includes("/exterior") && style.tabActive
            )}
          >
            익스테리어
          </Link>
        </li>

        <span className={style.next}>&gt;</span>

        <li className={style.tab}>
          <Link
            href={
              carPriceStore.selectedCarInfo
                ? `/car/estimate/${detailModelName}/interior?carYear=${carPriceStore.selectedCarInfo.carYear}&engineInfo=${carPriceStore.selectedCarInfo.engineInfo}&trimName=${carPriceStore.selectedCarInfo.trimName}`
                : "/car"
            }
            className={cx(
              style.tabName,
              pathname.includes("/interior") && style.tabActive
            )}
          >
            인테리어
          </Link>
        </li>

        <span className={style.next}>&gt;</span>

        <li className={style.tab}>
          <Link
            href={
              carPriceStore.selectedCarInfo
                ? `/car/estimate/${detailModelName}/option?carYear=${carPriceStore.selectedCarInfo.carYear}&engineInfo=${carPriceStore.selectedCarInfo.engineInfo}&trimName=${carPriceStore.selectedCarInfo.trimName}`
                : "/car"
            }
            className={cx(
              style.tabName,
              pathname.includes("/option") && style.tabActive
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
            견적 완료
          </Link>
        </li>
      </ul>
    </div>
  );
}
