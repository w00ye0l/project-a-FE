"use client";

import Image from "next/image";
import style from "./topCarCard.module.css";
import cx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopCarCard({ type }: { type: string }) {
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
      className={style.main}
    >
      <div className={style.imageSection}>
        <div className={style.optionSection}>
          {type === "promotion" && (
            <div className={style.optionPromotion}>프로모션</div>
          )}
          {type === "deadline" && (
            <div className={style.optionDeadline}>
              <div className={style.dday}>D-1</div>
              <div className={style.carType}>시승차</div>
            </div>
          )}
          {type === "top" && <div className={style.optionTop}>제안 +5</div>}

          <Image
            className={style.brand}
            src="/brand/기아.jpg"
            width={46}
            height={22}
            alt="brand"
          />
        </div>

        <Image
          className={style.carImage}
          src="/logo.png"
          width={224}
          height={224}
          alt="car"
        />

        <div className={style.colorSection}>
          <div className={cx(style.color, style.color1)}></div>
          <div className={cx(style.color, style.color2)}></div>
        </div>
      </div>

      {type === "promotion" && (
        <div className={style.promotionSection}>
          <p className={style.name}>람보르기니</p>
          <p className={style.amount}>*수량 3대</p>

          <div className={style.priceSection}>
            <div className={style.priceContainer}>
              <div className={cx(style.buyType, style.rent)}>렌트</div>
              <p className={style.price}>
                <span className={style.month}>월</span>23만원대~
              </p>
            </div>
            <div className={style.priceContainer}>
              <div className={cx(style.buyType, style.lease)}>리스</div>
              <p className={style.price}>
                <span className={style.month}>월</span>21만원대~
              </p>
            </div>
          </div>
        </div>
      )}
      {type === "deadline" && (
        <div className={style.deadlineSection}>
          <p className={style.name}>람보르기니</p>

          <div className={style.priceSection}>
            <div className={style.priceContainer}>
              <p className={style.price}>8억 1158만원</p>
              <p className={style.realPrice}>8억 8158만원</p>
            </div>

            <p className={style.percentage}>22%</p>
          </div>
        </div>
      )}
      {type === "top" && (
        <div className={style.topSection}>
          <div className={style.nameContainer}>
            <p className={style.name}>DS3 Crossback E-Tense</p>

            <div className={style.buyTypeContainer}>
              <div className={style.buyType}>할부</div>
              <div className={style.buyType}>리스</div>
            </div>
          </div>

          <div className={style.priceContainer}>
            <div className={style.priceBox}>
              <p className={style.priceTag}>차량가격</p>
              <p>39,290,000 원</p>
            </div>
            <div className={style.priceBox}>
              <p className={style.priceTag}>옵션가격</p>
              <p>9,290,000 원</p>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
