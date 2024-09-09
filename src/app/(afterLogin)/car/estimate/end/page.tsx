"use client";

import { useCarPriceStore } from "@/store/carPrice";
import style from "./page.module.css";
import cx from "classnames";
import Tab from "../../_component/Tab";
import Image from "next/image";

export default function EstimateEndPage() {
  const carPriceStore = useCarPriceStore();
  const detailModel = carPriceStore.selectedDetailModel;
  const imageUrl = detailModel.detailModelMainImage;
  const carInfo = carPriceStore.selectedCarInfo;
  const options = carPriceStore.selectedOptions;
  const exteriorColor = carPriceStore.selectedExteriorColor;
  const interiorColor = carPriceStore.selectedInteriorColor;

  console.log(carInfo);
  console.log(options);
  console.log(exteriorColor);
  console.log(interiorColor);

  return (
    <div className={style.main}>
      <Tab />

      <div className={style.titleContainer}>
        <Image src="/car/firework.png" width={40} height={40} alt="firework" />
        <h1 className={style.title}>
          고객님만의 {detailModel.detailModelName} 견적이 완성되었습니다!
        </h1>
        <Image
          style={{ transform: "scaleX(-1)" }}
          src="/car/firework.png"
          width={40}
          height={40}
          alt="firework"
        />
      </div>

      <div className={style.contentSection}>
        {/* 차량 옵션 및 결제 정보 */}
        <div className={style.estimateSection}>
          <div className={style.infoContainer}>
            <div className={style.infoTitleContainer}>
              <h2 className={style.infoTitle}>차량 가격</h2>

              <p className={style.priceContainer}>
                <b className={style.infoPrice}>
                  {(
                    carPriceStore.defaultPrice +
                    options.reduce((acc, cur) => acc + cur.price, 0) +
                    exteriorColor.price +
                    interiorColor.price
                  ).toLocaleString()}
                </b>
                원
              </p>
            </div>

            <div className={style.optionContainer}>
              <div className={style.optionSection}>
                {/* 모델 */}
                <div className={style.optionBox}>
                  <p className={style.optionTitle}>모델</p>
                  <p className={style.optionPriceBox}>
                    <span className={style.optionPrice}>
                      {carPriceStore.defaultPrice.toLocaleString()}
                    </span>{" "}
                    원
                  </p>
                </div>

                <div className={style.optionBox}>
                  <p>
                    {detailModel.detailModelName} {carInfo.carYear}{" "}
                    {carInfo.engineInfo} {carInfo.trimName}
                  </p>
                  <p>+ {carPriceStore.defaultPrice.toLocaleString()} 원</p>
                </div>
              </div>

              {/* 색상 */}
              <div className={style.optionSection}>
                <div className={style.optionBox}>
                  <p className={style.optionTitle}>색상</p>
                  <p className={style.optionPriceBox}>
                    <span className={style.optionPrice}>
                      {(
                        exteriorColor.price + interiorColor.price
                      ).toLocaleString()}
                    </span>{" "}
                    원
                  </p>
                </div>

                {/* 외장색 */}
                <div className={style.optionBox}>
                  <div className={style.colorContainer}>
                    <p className={style.colorTitle}>외장색</p>
                    <div className={style.colorBox}>
                      {exteriorColor.codes.map((code) => (
                        <div
                          key={code}
                          className={style.twoColor}
                          style={{
                            backgroundColor: `#${code}`,
                            width: `calc(100% / ${exteriorColor.codes.length})`,
                          }}
                        ></div>
                      ))}
                    </div>
                    <p>{exteriorColor.name}</p>
                  </div>

                  <p>+ {exteriorColor.price.toLocaleString()} 원</p>
                </div>

                {/* 내장색 */}
                <div className={style.optionBox}>
                  <div className={style.colorContainer}>
                    <p className={style.colorTitle}>내장색</p>
                    <div className={style.colorBox}>
                      {interiorColor.codes.map((code) => (
                        <div
                          key={code}
                          className={style.twoColor}
                          style={{
                            backgroundColor: `#${code}`,
                            width: `calc(100% / ${interiorColor.codes.length})`,
                          }}
                        ></div>
                      ))}
                    </div>
                    <p>{interiorColor.name}</p>
                  </div>

                  <p>+ {interiorColor.price.toLocaleString()} 원</p>
                </div>
              </div>

              {/* 추가옵션 */}
              <div className={style.optionSection}>
                <div className={style.optionBox}>
                  <p className={style.optionTitle}>추가옵션</p>
                  <p className={style.optionPriceBox}>
                    <span className={style.optionPrice}>
                      {options
                        .reduce((acc, cur) => acc + cur.price, 0)
                        .toLocaleString()}
                    </span>{" "}
                    원
                  </p>
                </div>

                {options.map((option) => (
                  <div className={style.optionBox} key={option.pk}>
                    <p>{option.name}</p>
                    <p>+ {option.price.toLocaleString()} 원</p>
                  </div>
                ))}
              </div>

              {/* 부대 비용 */}
              <div className={style.optionSection}>
                <div className={style.optionBox}>
                  <p className={style.optionTitle}>부대 비용</p>
                  <p className={style.optionPriceBox}>
                    <span className={style.optionPrice}>0</span> 원
                  </p>
                </div>
                <div className={style.optionBox}>
                  <p>부대 비용</p>
                  <p>+ 0 원</p>
                </div>
              </div>

              {/* 할인 */}
              <div className={style.optionSection}>
                <div className={style.optionBox}>
                  <p className={style.optionTitle}>할인</p>
                  <p className={style.optionPriceBox}>
                    <span className={style.optionPrice}>0</span> 원
                  </p>
                </div>
                <div className={style.optionBox}>
                  <p>할인</p>
                  <p>- 0 원</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 차량 정보 */}
        <div className={style.modelInfoContainer}>
          <h1 className={style.modelName}>
            {carPriceStore.selectedBrand} {detailModel.detailModelName}
          </h1>

          <div className={style.modelInfoBox}>
            <p>
              {carInfo.carYear}년형 {carInfo.engineInfo} {carInfo.trimName}
            </p>

            {imageUrl && (
              <Image
                src={imageUrl}
                width={340}
                height={190}
                alt={detailModel.detailModelName}
              />
            )}

            <div>
              <p className={style.subTitle}>차량 가격</p>
              <h1 className={style.totalPrice}>
                {(
                  carPriceStore.defaultPrice +
                  options.reduce((acc, cur) => acc + cur.price, 0) +
                  exteriorColor.price +
                  interiorColor.price
                ).toLocaleString()}
                원
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
