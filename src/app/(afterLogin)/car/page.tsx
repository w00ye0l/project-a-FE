"use client";

import { useState } from "react";
import BrandList from "./_component/BrandList";
import ModelList from "./_component/ModelList";
import style from "./car.module.css";
import Image from "next/image";

export default function CarPage() {
  const [brandName, setBrandName] = useState<string>("");
  return (
    <main className={style.main}>
      <Image
        className={style.ads}
        src="/main/test_ads_top.png"
        width={1200}
        height={100}
        alt="ads"
      />

      <BrandList setBrandName={setBrandName} />

      <ModelList />
    </main>
  );
}
