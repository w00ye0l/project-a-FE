"use client";

import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import style from "./carPrice.module.css";
import { useCarPriceStore } from "@/store/carPrice";

export default function CarPrice() {
  const carPriceStore = useCarPriceStore();

  return (
    <>
      <div className={style.selectModelContainer}>
        <h1 className={style.subTitle}>
          {carPriceStore.selectedDetailModel.detailModelName}
        </h1>
        <div className={style.totalPrice}>
          총 차량 가격
          <AnimatedNumber
            className={style.totalRealPrice}
            hasComma={true}
            size={32}
            value={
              carPriceStore.defaultPrice +
              carPriceStore.selectedOptions.reduce(
                (acc, cur) => acc + cur.price,
                0
              ) +
              carPriceStore.selectedExteriorColor.price +
              carPriceStore.selectedInteriorColor.price
            }
          />
          원
        </div>
      </div>
    </>
  );
}
