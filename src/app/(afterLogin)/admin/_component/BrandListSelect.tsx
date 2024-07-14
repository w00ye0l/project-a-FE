"use client";

import { Brand } from "@/model/Brand";
import { useEffect, useState } from "react";
import { getBrandList } from "../_lib/getBrandList";
import style from "../admin.module.css";

export default function BrandListSelect() {
  const [brandList, setBrandList] = useState<Brand[]>([]);

  const getBrandListData = async () => {
    const result = await getBrandList();

    setBrandList(result.data);
  };

  useEffect(() => {
    getBrandListData();
  }, []);

  return (
    <>
      <div className={style.infoContainer}>
        <p className={style.infoTitle}>브랜드</p>
        <select className={style.select} name="" id="">
          {brandList &&
            brandList.length !== 0 &&
            brandList.map((brand) => (
              <option key={brand.brandPk} value={brand.brandName}>
                {brand.brandName}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
