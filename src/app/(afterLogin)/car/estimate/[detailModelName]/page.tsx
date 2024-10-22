"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import cx from "classnames";
import style from "./page.module.css";
import { useCarPriceStore } from "@/store/carPrice";
import Image from "next/image";
import { EngineList } from "@/model/car/Info/EngineList";

export default function EstimatePage() {
  const params = useParams();
  const detailModelName = params.detailModelName;
  const [engineList, setEngineList] = useState<EngineList[]>([]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [selectedTrim, setSelectedTrim] = useState<string>("");
  const carPriceStore = useCarPriceStore();

  const getEngineList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/trim-names?detailModelName=${detailModelName}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      console.log(result.data);

      setEngineList(result.data);
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

  // 트림 클릭 시
  const onClickTrimName = (
    carYear: string,
    engineInfo: string,
    trimName: string,
    carPrice: number
  ) => {
    carPriceStore.setSelectedCarInfo({
      carYear,
      engineInfo,
      trimName,
    });
    carPriceStore.setDefaultPrice(carPrice);
  };

  useEffect(() => {
    getEngineList();
  }, []);

  useEffect(() => {
    setSelectedTrim(
      carPriceStore.selectedCarInfo.carYear +
        carPriceStore.selectedCarInfo.engineInfo +
        carPriceStore.selectedCarInfo.trimName
    );
  }, [carPriceStore]);

  return (
    <>
      <h1 className={style.title}>
        세부모델.<span className={style.subTitle}>엔진/트림 선택</span>
      </h1>

      <div className={style.trimSection}>
        {engineList.map((engine) => (
          <div
            className={cx(style.trimContainer)}
            onClick={() => toggleVisibility(engine.carYear, engine.engineInfo)}
            key={engine.carYear + engine.engineInfo}
          >
            <div
              className={cx(
                style.yearEngineName,
                visibleSections.includes(engine.carYear + engine.engineInfo) &&
                  style.yearEngineNameActive
              )}
            >
              <p>{engine.carYear + "년형 " + engine.engineInfo}</p>

              {visibleSections.includes(engine.carYear + engine.engineInfo) ? (
                <Image
                  src="/icon/minus_bb.png"
                  width={18}
                  height={18}
                  alt="minus"
                />
              ) : (
                <Image
                  src="/icon/plus_bb.png"
                  width={18}
                  height={18}
                  alt="minus"
                />
              )}
            </div>

            {visibleSections.includes(engine.carYear + engine.engineInfo) && (
              <ul
                className={style.trimBox}
                onClick={(event) => {
                  event.stopPropagation(); // 부모로 이벤트 전파를 막음
                }}
              >
                {engine.trimNameList.map((trimName) => (
                  <li
                    onClick={(event) => {
                      event.stopPropagation();
                      onClickTrimName(
                        engine.carYear,
                        engine.engineInfo,
                        trimName.trimName,
                        trimName.carPrice
                      );
                      setSelectedTrim(
                        engine.carYear + engine.engineInfo + trimName.trimName
                      );
                    }}
                    className={cx(style.trimItem, {
                      [style.trimItemActive]:
                        selectedTrim ===
                        engine.carYear + engine.engineInfo + trimName.trimName,
                    })}
                    key={trimName.trimName}
                  >
                    <input
                      className={style.radioButton}
                      type="radio"
                      name="trim"
                      id={
                        engine.carYear + engine.engineInfo + trimName.trimName
                      }
                      checked={
                        selectedTrim ===
                        engine.carYear + engine.engineInfo + trimName.trimName
                      }
                      readOnly
                    />
                    <label
                      className={style.trimLabel}
                      htmlFor={
                        engine.carYear + engine.engineInfo + trimName.trimName
                      }
                    >
                      <span className={style.name}>{trimName.trimName}</span>

                      <div className={style.priceSection}>
                        <p className={style.discount}>2%</p>
                        <p className={style.price}>
                          {Math.round(
                            trimName.carPrice / 10000
                          ).toLocaleString()}
                          만원
                        </p>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
