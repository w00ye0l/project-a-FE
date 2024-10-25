"use client";

import { useState } from "react";
import style from "./page.module.css";
import Image from "next/image";
import BrandList from "../car/_component/BrandList";
import ModelList from "../car/_component/ModelList";

export default function CarInfoPage() {
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

      <BrandList
        type="info"
        brandName={brandName}
        setBrandName={setBrandName}
      />

      <ModelList type="info" />
    </main>
  );
}
