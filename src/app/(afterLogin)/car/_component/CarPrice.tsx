"use client";

import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import style from "./carPrice.module.css";
import { useCarPriceStore } from "@/store/carPrice";

export default function CarPrice() {
  const carPriceStore = useCarPriceStore();

  return (
    <>
      <div className={style.main}>
        <p className={style.subTitle}>총 차량 가격</p>
        <div className={style.totalPrice}>
          ₩
          <AnimatedNumber
            className={style.totalRealPrice}
            hasComma={true}
            size={24}
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
        </div>
      </div>
    </>
  );
}
