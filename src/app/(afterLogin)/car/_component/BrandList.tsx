"use client";

import { Brand } from "@/model/car/Brand";
import { Country } from "@/model/car/Country";
import { useEffect, useState } from "react";
import { getCountryList } from "../../admin/_lib/getCountryList";
import { getBrandList } from "../../admin/_lib/getBrandList";
import Image from "next/image";
import cx from "classnames";
import style from "./brandList.module.css";
import { useRouter } from "next/navigation";
import { useCarPriceStore } from "@/store/carPrice";

interface BrandListItem {
  country: Country;
  brands: Brand[];
}

export default function BrandList({
  setBrandName,
}: {
  setBrandName: (brandName: string) => void;
}) {
  const router = useRouter();
  const [brandList, setBrandList] = useState<BrandListItem[]>([]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const carPriceStore = useCarPriceStore();

  // 제조국에 대한 브랜드 리스트 갱신
  const getBrandListData = async () => {
    const countryList = await getCountryList().then((res) => res.data);
    const brandList = await getBrandList({ countryName: "" }).then(
      (res) => res.data
    );

    // countryList를 돌면서 brandList에 해당하는 브랜드만 필터링
    // country를 키로 하는 객체들의 리스트를 만들어서 렌더링
    const filteredBrandList = countryList.map((country: Country) => {
      const brands = brandList.filter(
        (brand: Brand) => brand.countryPk === country.countryPk
      );
      return { country: country, brands: brands };
    });

    console.log(filteredBrandList);

    setBrandList(filteredBrandList);
  };

  // 제조국 클릭 시 해당 브랜드 리스트 렌더링
  const toggleVisibility = (countryPk: string) => {
    if (visibleSections.includes(countryPk)) {
      setVisibleSections(visibleSections.filter((pk) => pk !== countryPk));
    } else {
      setVisibleSections([...visibleSections, countryPk]);
    }
  };

  // 브랜드 클릭 시 해당 브랜드 정보 페이지로 이동
  const onClickBrand = (brandItem: Brand) => {
    // localStorage.setItem("brandName", brandItem.brandName);
    carPriceStore.setSelectedBrand(brandItem.brandName);
    setBrandName(brandItem.brandName);
    router.push(`/car?b=${brandItem.brandName}`);
  };

  useEffect(() => {
    getBrandListData();
  }, []);

  return (
    <ul className={style.brandSection}>
      {brandList.map((brand: BrandListItem) => (
        <li key={brand.country.countryPk} className={style.brandContainer}>
          <h2
            className={cx(
              style.countryName,
              visibleSections.includes(brand.country.countryPk) &&
                style.countryNameActive
            )}
            onClick={() => toggleVisibility(brand.country.countryPk)}
          >
            {brand.country.countryName}
          </h2>

          {visibleSections.includes(brand.country.countryPk) && (
            <ul className={style.brandBox}>
              {brand.brands.map((brandItem) => (
                <li
                  onClick={() => onClickBrand(brandItem)}
                  className={style.brandItem}
                  key={brandItem.brandPk}
                >
                  <Image
                    className={style.brandImg}
                    src={`/brand/${brandItem.brandName}.jpg`}
                    width={40}
                    height={40}
                    alt={brandItem.brandName}
                  />
                  <p className={style.brandName}>{brandItem.brandName}</p>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
