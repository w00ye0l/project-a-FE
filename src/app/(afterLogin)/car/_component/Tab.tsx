"use client";

import cx from "classnames";
import style from "./tab.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCarPriceStore } from "@/store/carPrice";
import Image from "next/image";

export default function Tab() {
  const router = useRouter();
  const pathname = usePathname();
  const carPriceStore = useCarPriceStore();
  const brandName = carPriceStore.selectedBrand;
  const detailModelName = carPriceStore.selectedDetailModel.detailModelName;

  const handleCloseButton = () => {
    if (confirm("견적내기를 취소하시면 선택하신 차량 정보가 초기화됩니다.")) {
      carPriceStore.reset();
      router.push("/car");
    }
  };

  return (
    <div className={style.section}>
      <div className={style.main}>
        <div className={style.title}>
          <div className={style.brandBox}>
            {brandName && (
              <Image
                className={style.brandImage}
                src={`/brand/${brandName}.jpg`}
                width={90}
                height={60}
                alt={brandName}
              />
            )}
            <p className={style.brandName}>{brandName}</p>
          </div>
          <p className={style.modelName}>{detailModelName}</p>
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

            <Image
              src="/icon/arrow_right.png"
              width={14}
              height={14}
              alt="arrow"
            />
          </li>

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

            <Image
              src="/icon/arrow_right.png"
              width={14}
              height={14}
              alt="arrow"
            />
          </li>

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

            <Image
              src="/icon/arrow_right.png"
              width={14}
              height={14}
              alt="arrow"
            />
          </li>

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

            <Image
              src="/icon/arrow_right.png"
              width={14}
              height={14}
              alt="arrow"
            />
          </li>

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

      <Image
        className={style.close}
        src="/icon/close.png"
        width={42}
        height={42}
        alt="close"
        onClick={handleCloseButton}
      />
    </div>
  );
}
