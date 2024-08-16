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

export default function BrandList({
  setBrandName,
}: {
  setBrandName: (brandName: string) => void;
}) {
  const router = useRouter();
  const [visibleDomestic, setVisibleDomestic] = useState<Boolean>(true);
  const [domesticBrands, setDomesticBrands] = useState<Brand[]>([]);
  const [importedBrands, setImportedBrands] = useState<Brand[]>([]);
  const [visibleBrandCount, setVisibleBrandCount] = useState<number>(18);
  const carPriceStore = useCarPriceStore();

  // 제조국에 대한 브랜드 리스트 갱신
  const getBrandListData = async () => {
    const countryList = await getCountryList().then((res) => res.data);
    const brandList = await getBrandList({ countryName: "" }).then(
      (res) => res.data
    );

    // '한국'인 브랜드는 국산으로, 나머지는 수입으로 분류
    const domestic: Brand[] = [];
    const imported: Brand[] = [];

    brandList.forEach((brand: Brand) => {
      const country = countryList.find(
        (country: Country) => country.countryPk === brand.countryPk
      );

      if (country.countryName === "한국") {
        domestic.push(brand);
      } else {
        imported.push(brand);
      }
    });

    setDomesticBrands(domestic);
    setImportedBrands(imported);
  };

  // 브랜드 클릭 시 해당 브랜드 정보 페이지로 이동
  const onClickBrand = (brandItem: Brand) => {
    carPriceStore.setSelectedBrand(brandItem.brandName);
    setBrandName(brandItem.brandName);
    router.push(`/car?b=${brandItem.brandName}`);
  };

  // 전체 브랜드 표시하기
  const showMoreBrands = () => {
    if (visibleBrandCount > 18) {
      setVisibleBrandCount(18);
    } else {
      if (visibleDomestic) {
        setVisibleBrandCount(domesticBrands.length);
      } else {
        setVisibleBrandCount(importedBrands.length);
      }
    }
  };

  useEffect(() => {
    getBrandListData();
  }, []);

  return (
    <>
      <ul className={style.brandVisibleSection}>
        <li
          className={cx(style.visibleBtn, {
            [style.activeBrandSection]: visibleDomestic,
          })}
          onClick={() => {
            setVisibleDomestic(!visibleDomestic);
            // 섹션 변경시 브랜드 수 초기화
            setVisibleBrandCount(18);
          }}
        >
          국산
        </li>
        <li
          className={cx(style.visibleBtn, {
            [style.activeBrandSection]: !visibleDomestic,
          })}
          onClick={() => {
            setVisibleDomestic(!visibleDomestic);
            // 섹션 변경시 브랜드 수 초기화
            setVisibleBrandCount(18);
          }}
        >
          수입
        </li>
      </ul>

      <div className={style.brandSection}>
        <div className={style.brandContainer}>
          {visibleDomestic &&
            domesticBrands
              .slice(0, visibleBrandCount)
              .map((brandItem: Brand) => (
                <div key={brandItem.brandPk} className={style.brandBox}>
                  <Image
                    className={style.brandImage}
                    src={`/brand/${brandItem.brandName}.jpg`}
                    width={90}
                    height={60}
                    alt={brandItem.brandName}
                    onClick={() => onClickBrand(brandItem)}
                  />
                  <p className={style.brandName}>{brandItem.brandName}</p>
                </div>
              ))}

          {!visibleDomestic &&
            importedBrands
              .slice(0, visibleBrandCount)
              .map((brandItem: Brand) => (
                <div key={brandItem.brandPk} className={style.brandBox}>
                  <Image
                    className={style.brandImage}
                    src={`/brand/${brandItem.brandName}.jpg`}
                    width={90}
                    height={60}
                    alt={brandItem.brandName}
                    onClick={() => onClickBrand(brandItem)}
                  />
                  <p className={style.brandName}>{brandItem.brandName}</p>
                </div>
              ))}
        </div>

        {visibleBrandCount <=
          (visibleDomestic ? domesticBrands.length : importedBrands.length) && (
          <div className={cx(style.moreBrand)} onClick={showMoreBrands}>
            <Image
              className={cx({
                [style.activeBrand]: visibleBrandCount > 18,
              })}
              src="/icon/more_brand.png"
              width={20}
              height={20}
              alt="more_brand"
            />
          </div>
        )}
      </div>
    </>
  );
}
