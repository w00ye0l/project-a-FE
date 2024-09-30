"use client";

import { useParams, useSearchParams } from "next/navigation";
import style from "./page.module.css";
import cx from "classnames";
import Image from "next/image";
import AuctionContainer from "../../_component/AuctionContainer";
import UserAuctionContainer from "../../_component/UserAuctionContainer";

export default function AuctionDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const auctionId = params.auctionId; // Dynamic route parameter
  const type = searchParams.get("type"); // Query parameter

  return (
    <div className={style.main}>
      {/* 타이틀 */}
      <div className={style.titleContainer}>
        <p className={style.subTitle}>딜러 옥션</p>
        <h1 className={style.title}>MASTERCAR</h1>
      </div>

      {/* 자동차 정보 */}
      <div className={style.carInfo}>
        <div className={style.carSection}>
          <Image
            className={style.brand}
            src="/brand/제네시스.jpg"
            width={68}
            height={45}
            alt="brand"
          />
          <Image
            className={style.carImage}
            src="/test_car.png"
            width={900}
            height={600}
            alt="car image"
          />
        </div>

        <div className={style.infoSection}>
          <h2 className={style.name}>제네시스 GV70</h2>

          <div className={style.specContainer}>
            <p className={style.spec}>가솔린</p>
            <p className={style.spec}>복합 8.8 ~ 11.2km/ℓ</p>
            <p className={style.spec}>2,497cc ~ 3,342cc</p>
            <p className={style.spec}>2,497cc ~ 3,342cc</p>
            <p className={style.spec}>2,497cc ~ 3,342cc</p>
          </div>

          <p className={style.priceContainer}>
            ￦<span className={style.price}>53,600,000</span>원
          </p>

          <button className={style.moreBtn}>자세히 보기</button>
        </div>
      </div>

      {/* 옥션 정보 */}
      <div className={style.auctionSection}>
        {type !== "user" && (
          <>
            <AuctionContainer type={type} />
            <AuctionContainer type={type} />
            <AuctionContainer type={type} />
            <AuctionContainer type={type} />
          </>
        )}
        {type === "user" && <UserAuctionContainer />}
      </div>
    </div>
  );
}
