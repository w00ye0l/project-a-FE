"use client";

import { Country } from "@/model/Country";
import { useEffect, useState } from "react";
import { getCountryList } from "../_lib/getCountryList";
import style from "../admin.module.css";

export default function CountryListSelect() {
  const [countryList, setCountryList] = useState<Country[]>([]);

  const getCountryListData = async () => {
    const result = await getCountryList();

    setCountryList(result.data);
  };

  useEffect(() => {
    getCountryListData();
  }, []);

  return (
    <>
      <div className={style.infoContainer}>
        <p className={style.infoTitle}>제조국가</p>
        <select className={style.select} name="" id="">
          {countryList &&
            countryList.length !== 0 &&
            countryList.map((country) => (
              <option key={country.countryPk} value={country.countryName}>
                {country.countryName}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
