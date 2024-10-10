"use client";

import Image from "next/image";
import style from "./carCard.module.css";
import cx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CarCard({ type }: { type: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={{
        pathname: `/auction/detail/1`,
        query: {
          type: pathname.includes("dealer")
            ? "dealer"
            : pathname.includes("capital")
            ? "capital"
            : "user",
        },
      }}
      className={style.carInfo}
    >
      <div className={style.carImageSection}>
        <div className={style.labelSection}>
          {type === "deadline" && (
            <div className={style.labelContainer}>
              <p className={style.carType}>시승차</p>
              <p className={style.day}>D-5</p>
            </div>
          )}
          {type === "promotion" && (
            <div className={style.labelContainer}>
              <p className={style.carType}>재고차</p>
              <p className={style.day}>D-5</p>
            </div>
          )}
          {type === "top" && (
            <div className={style.labelContainer}>
              <p className={style.carType}>제안 +5</p>
            </div>
          )}

          <Image
            className={style.brand}
            src="/brand/기아.jpg"
            width={38}
            height={19}
            alt="brand"
          />
        </div>

        <Image
          className={style.carImage}
          src="/logo_text.png"
          width={252}
          height={230}
          alt="car"
        />

        <div className={style.colorSection}>
          <div className={style.color}></div>
          <div className={style.color}></div>
        </div>
      </div>

      <p className={style.carName}>
        람보르기니 람보르기니 람보르기니 람보르기니 람보
      </p>

      <hr className={style.hr} />

      {type === "deadline" && (
        <div className={style.priceSection}>
          <div className={style.priceContainer}>
            <p className={style.discount}>딜러할인 -800만원</p>
            <p className={style.price}>8억 2천 356만원</p>
          </div>

          <p className={style.percentage}>22%</p>
        </div>
      )}
      {type === "promotion" && (
        <div className={style.priceSection}>
          <p className={style.month}>월납입금</p>
          <div className={style.priceContainer}>
            <div className={style.priceBox}>
              <div className={style.buyType}>렌트</div>
              <p className={style.price}>41만원대~</p>
            </div>
            <div className={style.priceBox}>
              <div className={style.buyType}>리스</div>
              <p className={style.price}>65만원대~</p>
            </div>
          </div>
        </div>
      )}
      {type === "top" && (
        <div className={cx(style.priceSection, style.priceSectionTop)}>
          <div className={style.priceContainer}>
            <p className={style.priceTag}>차량가격</p>
            <p className={style.price}>39,290,000원</p>
          </div>
          <div className={style.priceContainer}>
            <p className={style.priceTag}>옵션선택가</p>
            <p className={style.price}>9,290,000원</p>
          </div>
        </div>
      )}
    </Link>
  );
}
