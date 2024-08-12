"use client";

import { useState } from "react";
import BrandList from "./_component/BrandList";
import ModelList from "./_component/ModelList";
import style from "./car.module.css";

export default function CarPage() {
  const [brandName, setBrandName] = useState<string>("");
  return (
    <main className={style.main}>
      <BrandList setBrandName={setBrandName} />
      <ModelList />
    </main>
  );
}
