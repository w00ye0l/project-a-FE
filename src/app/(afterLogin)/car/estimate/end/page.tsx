"use client";

import { useCarPriceStore } from "@/store/carPrice";
import style from "./page.module.css";
import cx from "classnames";

export default function EstimateEndPage() {
  const carPriceStore = useCarPriceStore();
  console.log(carPriceStore.selectedCarInfo);
  console.log(carPriceStore.selectedOptions);
  console.log(carPriceStore.selectedExteriorColor);
  console.log(carPriceStore.selectedInteriorColor);

  return (
    <div className={style.main}>
      <div className={style.modelInfoSection}>
        <div className={style.modelInfoContainer}>
          <h1 className={style.modelName}>
            {carPriceStore.selectedBrand} {carPriceStore.selectedDetailModel}
          </h1>

          <div className={style.modelInfoBox}>
            <p>
              {carPriceStore.selectedCarInfo.carYear}{" "}
              {carPriceStore.selectedCarInfo.engineInfo}{" "}
              {carPriceStore.selectedCarInfo.trimName}
            </p>

            <div>
              <p className={style.subTitle}>예상 견적 가격</p>
              <h1 className={style.totalPrice}>
                {(
                  carPriceStore.defaultPrice +
                  carPriceStore.selectedOptions.reduce(
                    (acc, cur) => acc + cur.price,
                    0
                  ) +
                  carPriceStore.selectedExteriorColor.price +
                  carPriceStore.selectedInteriorColor.price
                ).toLocaleString()}
                원
              </h1>
            </div>
          </div>
        </div>

        <div className={style.modelImg}></div>
      </div>

      <div className={style.estimateSection}>
        <div className={style.estimateContainer}>
          <h2 className={style.estimateTitle}>기본 견적</h2>

          <div className={cx(style.optionContainer, style.defaultOption)}>
            <p className={style.optionTitle}>기본 가격</p>
            <p>+ {carPriceStore.defaultPrice.toLocaleString()} 원</p>
          </div>

          <div className={style.optionContainer}>
            <p className={style.optionTitle}>추가옵션</p>
            {carPriceStore.selectedOptions.map((option) => (
              <div className={style.optionBox} key={option.pk}>
                <p>{option.name}</p>
                <p>+ {option.price.toLocaleString()} 원</p>
              </div>
            ))}
          </div>

          <div className={style.optionContainer}>
            <p className={style.optionTitle}>외장색</p>
            <div className={style.optionBox}>
              <div className={style.colorContainer}>
                <div className={style.colorBox}>
                  {carPriceStore.selectedExteriorColor.codes.map((code) => (
                    <div
                      key={code}
                      className={style.twoColor}
                      style={{
                        backgroundColor: `#${code}`,
                        width: `calc(60px / ${carPriceStore.selectedExteriorColor.codes.length})`,
                      }}
                    ></div>
                  ))}
                </div>
                <p>{carPriceStore.selectedExteriorColor.name}</p>
              </div>
              <p>
                + {carPriceStore.selectedExteriorColor.price.toLocaleString()}{" "}
                원
              </p>
            </div>
          </div>

          <div className={style.optionContainer}>
            <p className={style.optionTitle}>내장색</p>
            <div className={style.optionBox}>
              <div className={style.colorContainer}>
                <div className={style.colorBox}>
                  {carPriceStore.selectedInteriorColor.codes.map((code) => (
                    <div
                      key={code}
                      className={style.twoColor}
                      style={{
                        backgroundColor: `#${code}`,
                        width: `calc(60px / ${carPriceStore.selectedInteriorColor.codes.length})`,
                      }}
                    ></div>
                  ))}
                </div>
                <p>{carPriceStore.selectedInteriorColor.name}</p>
              </div>
              <p>
                + {carPriceStore.selectedInteriorColor.price.toLocaleString()}{" "}
                원
              </p>
            </div>
          </div>
        </div>

        <div className={style.buySection}>
          <button className={style.buyBtn}>구매 상담 신청</button>

          <div className={style.subInfoContainer}>
            <div className={style.subInfoBox}>
              <p className={style.subInfoTitle}>모델 정보 보기 &gt;</p>

              <div className={style.subInfo}>
                {carPriceStore.selectedCarSpec && (
                  <>
                    <p>{carPriceStore.selectedCarSpec.carWidth}</p>
                    <p>{carPriceStore.selectedCarSpec.carHeight}</p>
                    <p>{carPriceStore.selectedCarSpec.carWeight}</p>
                  </>
                )}
              </div>
            </div>

            <div className={style.subInfoBox}>
              <p className={style.subInfoTitle}>모델 기본 옵션 보기 &gt;</p>

              <div className={style.subInfo}>
                {carPriceStore.selectedCarBasicOption.standardOptions &&
                  carPriceStore.selectedCarBasicOption.standardOptions.map(
                    (option) => <p key={option}>{option}</p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
