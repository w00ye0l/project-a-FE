"use client";

import { TrimList } from "@/model/car/Info/TrimList";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cx from "classnames";
import style from "./page.module.css";
import { useCarPriceStore } from "@/store/carPrice";

export default function EstimatePage() {
  const router = useRouter();
  const params = useParams();
  // 문자 한글로 인코딩
  const detailModelName = params.detailModelName;
  const [trimList, setTrimList] = useState<TrimList[]>([]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const carPriceStore = useCarPriceStore();

  const getTrimList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/trim-names?detailModelName=${detailModelName}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      console.log(result.data);

      setTrimList(result.data);
      setVisibleSections([result.data[0].carYear + result.data[0].engineInfo]);
    } catch (error) {
      console.error("Failed to fetch trim list:", error);
    }
  };

  // 연식 + 엔진 정보 클릭 시 해당 트림 리스트 렌더링
  const toggleVisibility = (carYear: string, engineInfo: string) => {
    const key = carYear + engineInfo;
    if (visibleSections.includes(key)) {
      setVisibleSections(visibleSections.filter((pk) => pk !== key));
    } else {
      setVisibleSections([...visibleSections, key]);
    }
  };

  // 트림 클릭 시 옵션 페이지로 이동
  const onClickTrimName = (
    carYear: string,
    engineInfo: string,
    trimName: string,
    carPrice: number
  ) => {
    carPriceStore.reset();
    carPriceStore.setSelectedCarInfo({
      carYear,
      engineInfo,
      trimName,
    });
    carPriceStore.setDefaultPrice(carPrice);
    // 견적 페이지로 이동
    router.push(
      `/car/estimate/option/${detailModelName}?carYear=${carYear}&engineInfo=${engineInfo}&trimName=${trimName}`
    );
  };

  useEffect(() => {
    getTrimList();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.titleModelImgSection}>
        <h1>세부모델을 선택하세요.</h1>

        <div className={style.modelImg}></div>
      </div>

      <div className={style.trimSection}>
        {trimList.map((trim) => (
          <div
            className={cx(style.trimContainer)}
            onClick={() => toggleVisibility(trim.carYear, trim.engineInfo)}
            key={trim.carYear + trim.engineInfo}
          >
            <h2
              className={cx(
                style.yearEngineName,
                visibleSections.includes(trim.carYear + trim.engineInfo) &&
                  style.yearEngineNameActive
              )}
            >
              {trim.carYear + "년형 " + trim.engineInfo}
            </h2>

            {visibleSections.includes(trim.carYear + trim.engineInfo) && (
              <ul className={style.trimBox}>
                {trim.trimNameList.map((trimName) => (
                  <li
                    onClick={() =>
                      onClickTrimName(
                        trim.carYear,
                        trim.engineInfo,
                        trimName.trimName,
                        trimName.carPrice
                      )
                    }
                    className={style.trimItem}
                    key={trimName.trimName}
                  >
                    <span>{trimName.trimName}</span>
                    <span>
                      {Math.round(trimName.carPrice / 10000).toLocaleString() +
                        "만원"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
