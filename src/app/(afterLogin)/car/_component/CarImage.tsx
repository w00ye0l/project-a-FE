"use client";

import Image from "next/image";
import style from "./carImage.module.css";
import { useCarPriceStore } from "@/store/carPrice";

export default function CarImage() {
  const carPriceStore = useCarPriceStore();
  const imageUrl = carPriceStore.selectedDetailModel.detailModelMainImage;

  return (
    <div className={style.imgSection}>
      {imageUrl ? (
        <Image
          className={style.modelImg}
          src={imageUrl}
          width={940}
          height={515}
          alt={imageUrl ?? ""}
        />
      ) : (
        <div className={style.modelImg}></div>
      )}
    </div>
  );
}
