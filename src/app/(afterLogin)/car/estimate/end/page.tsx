"use client";

import { useCarPriceStore } from "@/store/carPrice";
import style from "./page.module.css";
import cx from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMonthlyPrice } from "../../_lib/getMonthlyPrice";

export default function EstimateEndPage() {
  const carPriceStore = useCarPriceStore();
  const detailModel = carPriceStore.selectedDetailModel;
  const imageUrl = detailModel.detailModelMainImage;
  const carInfo = carPriceStore.selectedCarInfo;
  const options = carPriceStore.selectedOptions;
  const exteriorColor = carPriceStore.selectedExteriorColor;
  const interiorColor = carPriceStore.selectedInteriorColor;
  const [buyType, setBuyType] = useState<string>("rent");
  const [month, setMonth] = useState<number>(48);
  const [distance, setDistance] = useState<number>(20000);
  const [prePrice, setPrePrice] = useState<string>("threePre");
  const [depositPrice, setDepositPrice] = useState<string>("");
  const [buyerType, setBuyerType] = useState<string>("person");
  const [area, setArea] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [carTax, setCarTax] = useState<number>(0);
  const [getTax, setGetTax] = useState<number>(0);
  const [monthlyPrice, setMonthlyPrice] = useState<any[]>([]);

  const carPk = carPriceStore.selectedCarSpec.carPk;
  const totalPrice =
    carPriceStore.defaultPrice +
    options.reduce((acc, cur) => acc + cur.price, 0) +
    exteriorColor.price +
    interiorColor.price;

  const prePriceList = ["onePre", "twoPre", "threePre", "fourPre", "fivePre"];
  const depositPriceList = [
    "oneDep",
    "twoDep",
    "threeDep",
    "fourDep",
    "fiveDep",
  ];

  const handleBuyType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyType(e.target.value);
  };

  const handleMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(Number(e.target.value));
  };

  const handleDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(e.target.value));
  };

  const handlePrePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrePrice(e.target.value);
  };

  const handleDepPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositPrice(e.target.value);
  };

  const handleBuyerType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerType(e.target.value);
  };

  const getPriceData = async () => {
    setLoading(true);

    let calBuyType = "";
    let calPrePrice = 0;
    let calDepositPrice = 0;
    let calBuyerType = "";
    let calAreaType = "";

    if (buyType === "rent") {
      calBuyType = "렌트";
    } else if (buyType === "lease") {
      calBuyType = "리스";
    } else if (buyType === "cash") {
      calBuyType = "현금";
    } else if (buyType === "month") {
      calBuyType = "할부";
    }

    if (prePrice === "onePre") {
      calPrePrice = totalPrice * 0.1;
    } else if (prePrice === "twoPre") {
      calPrePrice = totalPrice * 0.2;
    } else if (prePrice === "threePre") {
      calPrePrice = totalPrice * 0.3;
    } else if (prePrice === "fourPre") {
      calPrePrice = totalPrice * 0.4;
    } else if (prePrice === "fivePre") {
      calPrePrice = totalPrice * 0.5;
    } else {
      calPrePrice = Number(prePrice) * 10000;
    }

    if (depositPrice === "") {
      calDepositPrice = 0;
    } else if (depositPrice === "oneDep") {
      calDepositPrice = totalPrice * 0.1;
    } else if (depositPrice === "twoDep") {
      calDepositPrice = totalPrice * 0.2;
    } else if (depositPrice === "threeDep") {
      calDepositPrice = totalPrice * 0.3;
    } else if (depositPrice === "fourDep") {
      calDepositPrice = totalPrice * 0.4;
    } else if (depositPrice === "fiveDep") {
      calDepositPrice = totalPrice * 0.5;
    } else {
      calDepositPrice = Number(depositPrice) * 10000;
    }

    if (buyerType === "person") {
      calBuyerType = "개인";
    } else if (buyerType === "business") {
      calBuyerType = "사업자";
    } else if (buyerType === "corporate") {
      calBuyerType = "법인";
    }

    if (area === "seoul") {
      calAreaType = "서울";
    } else if (area === "gyeonggi") {
      calAreaType = "경기";
    } else if (area === "incheon") {
      calAreaType = "인천";
    }

    console.log(month, carPk, totalPrice, calPrePrice, calDepositPrice);

    try {
      const result = await getMonthlyPrice({
        carPk,
        totalPrice,
        prePrice: calPrePrice,
        depositPrice: calDepositPrice,
        buyType: calBuyType,
        month,
        km: distance,
        buyerType: calBuyerType,
        areaType: calAreaType,
      });

      console.log({ result });
      setCarTax(result.data.carTax);
      setGetTax(result.data.getTax);
      setMonthlyPrice(result.data.monthlyPrices);
    } catch (error) {
      console.error("Failed to fetch model details:", error);
    }
  };

  useEffect(() => {
    // carPk와 totalCarPrice가 모두 정의되었을 때만 getPriceData 실행
    if (carPk && totalPrice) {
      getPriceData();
    }
  }, [
    buyType,
    month,
    distance,
    prePrice,
    depositPrice,
    buyerType,
    area,
    carPk,
    totalPrice,
  ]);

  return (
    <div className={style.main}>
      <div className={style.titleSection}>
        <div className={style.titleContainer}>
          <div className={style.carInfo}>
            <h1 className={style.title}>
              고객님만의
              <br />
              <span className={style.modelName}>
                {detailModel.detailModelName}
              </span>{" "}
              견적이 완성되었습니다!
            </h1>

            <hr className={style.hr} />

            <div>
              <p className={style.expectationLabel}>예상 견적 가격</p>
              <p className={style.expectationPrice}>
                {totalPrice.toLocaleString()}
                <span className={style.expectationUnit}>원</span>
              </p>
              <button className={style.moreButton}>더 알아보기</button>
              <p className={style.warning}>
                * 웹사이트 내 차량 및 옵션 관련 이미지는 실체 차량과 다를 수
                있으므로 전시장 방문 및 실차 확인을 권장해드립니다.
              </p>
            </div>
          </div>

          <div className={style.carModel}>
            <Image
              src={imageUrl}
              width={640}
              height={360}
              alt={detailModel.detailModelName}
            />
            <p className={style.modelNameTwo}>{detailModel.detailModelName}</p>
            <p className={style.subModelName}>
              {carInfo.carYear}년형 {carInfo.engineInfo} {carInfo.trimName}
            </p>
          </div>
        </div>
      </div>

      <div className={style.contentSection}>
        {/* 차량 옵션 및 결제 정보 */}
        <div className={style.estimateSection}>
          {/* 기본 견적 */}
          <div className={style.infoContainer}>
            <div className={style.estimateTabContainer}>
              <div className={style.estimateTab}>기본 견적</div>
            </div>

            {/* 색상 */}
            <div className={style.optionSection}>
              <div className={style.optionContainer}>
                <p className={style.optionTitle}>색상</p>

                <div className={style.optionBox}>
                  <div className={style.colorOptionContainer}>
                    <p className={style.optionName}>외장</p>

                    <div className={style.colorOption}>
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
                      <p className={style.colorName}>{exteriorColor.name}</p>
                    </div>
                  </div>
                  <div className={style.colorOptionContainer}>
                    <p className={style.optionName}>내장</p>

                    <div className={style.colorOption}>
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
                      <p className={style.colorName}>{interiorColor.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className={style.optionPrice}>
                {(exteriorColor.price + interiorColor.price).toLocaleString()}
                <span className={style.optionPriceUnit}>원</span>
              </p>
            </div>

            {/* 추가옵션 */}
            <div className={style.optionSection}>
              <div className={style.optionContainer}>
                <p className={style.optionTitle}>선택 옵션</p>

                <div className={style.optionBox}>
                  {options.map((option) => (
                    <div
                      className={style.choiceOptionContainer}
                      key={option.pk}
                    >
                      <p className={style.choiceOptionName}>{option.name}</p>
                      {/* <p>+ {option.price.toLocaleString()} 원</p> */}
                    </div>
                  ))}
                </div>
              </div>
              <p className={style.optionPrice}>
                {options
                  .reduce((acc, cur) => acc + cur.price, 0)
                  .toLocaleString()}
                <span className={style.optionPriceUnit}>원</span>
              </p>
            </div>

            {/* 할인 */}
            <div className={style.optionSection}>
              <div className={style.optionContainer}>
                <p className={style.optionTitle}>할인</p>

                <div className={style.optionBox}>
                  <div className={style.choiceOptionContainer}>
                    <p className={style.choiceOptionName}>딜러 할인</p>
                  </div>
                </div>
              </div>

              <p className={style.optionPrice}>
                <span className={style.optionPriceUnit}>-</span> 0
                <span className={style.optionPriceUnit}>원</span>
              </p>
            </div>
          </div>

          <hr className={style.dashedHr} />

          {/* 총 가격 */}
          <div className={style.totalPriceSection}>
            <p className={style.totalPriceLabel}>예상 기본 견적</p>
            <p className={style.totalPrice}>
              {(
                carPriceStore.defaultPrice +
                options.reduce((acc, cur) => acc + cur.price, 0) +
                exteriorColor.price +
                interiorColor.price
              ).toLocaleString()}
              <span className={style.totalPriceUnit}>원</span>
            </p>
          </div>

          {/* 상세 견적 */}
          <div className={style.infoContainer}>
            <div className={style.estimateTabContainer}>
              <div className={style.estimateTab}>상세 견적</div>
            </div>

            {/* 구매 방법 */}
            <div className={style.buyTypeSection}>
              <div className={style.buyTypeContainer}>
                <input
                  type="radio"
                  name="buyType"
                  id="cash"
                  value="cash"
                  checked={buyType === "cash"}
                  onChange={handleBuyType}
                />
                <label
                  className={cx({ [style.active]: buyType === "cash" })}
                  htmlFor="cash"
                >
                  현금
                </label>
              </div>

              <div className={style.buyTypeContainer}>
                <input
                  type="radio"
                  name="buyType"
                  id="month"
                  value="month"
                  checked={buyType === "month"}
                  onChange={handleBuyType}
                />
                <label
                  className={cx({ [style.active]: buyType === "month" })}
                  htmlFor="month"
                >
                  할부
                </label>
              </div>

              <div className={style.buyTypeContainer}>
                <input
                  type="radio"
                  name="buyType"
                  id="rent"
                  value="rent"
                  checked={buyType === "rent"}
                  onChange={handleBuyType}
                />
                <label
                  className={cx({ [style.active]: buyType === "rent" })}
                  htmlFor="rent"
                >
                  렌트
                </label>
              </div>

              <div className={style.buyTypeContainer}>
                <input
                  type="radio"
                  name="buyType"
                  id="lease"
                  value="lease"
                  checked={buyType === "lease"}
                  onChange={handleBuyType}
                />
                <label
                  className={cx({ [style.active]: buyType === "lease" })}
                  htmlFor="lease"
                >
                  리스
                </label>
              </div>
            </div>

            {/* 개월수, 거리 */}
            <div className={style.detailSection}>
              <div className={style.detailContainer}>
                <p className={style.detailTitle}>개월수</p>

                <div className={style.detailBox}>
                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="month"
                      id="threeSix"
                      value={36}
                      checked={month === 36}
                      onChange={handleMonth}
                    />
                    <label
                      className={cx({ [style.active]: month === 36 })}
                      htmlFor="threeSix"
                    >
                      36개월
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="month"
                      id="fourEight"
                      value={48}
                      checked={month === 48}
                      onChange={handleMonth}
                    />
                    <label
                      className={cx({ [style.active]: month === 48 })}
                      htmlFor="fourEight"
                    >
                      48개월
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="month"
                      id="sixZero"
                      value={60}
                      checked={month === 60}
                      onChange={handleMonth}
                    />
                    <label
                      className={cx({ [style.active]: month === 60 })}
                      htmlFor="sixZero"
                    >
                      60개월
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.detailContainer}>
                <p className={style.detailTitle}>거리</p>

                <div className={style.detailBox}>
                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="distance"
                      id="oneHalfKm"
                      value={15000}
                      checked={distance === 15000}
                      onChange={handleDistance}
                    />
                    <label
                      className={cx({
                        [style.active]: distance === 15000,
                      })}
                      htmlFor="oneHalfKm"
                    >
                      1.5만km
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="distance"
                      id="twoKm"
                      value={20000}
                      checked={distance === 20000}
                      onChange={handleDistance}
                    />
                    <label
                      className={cx({ [style.active]: distance === 20000 })}
                      htmlFor="twoKm"
                    >
                      2만km
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="distance"
                      id="twoHalfKm"
                      value={25000}
                      checked={distance === 25000}
                      onChange={handleDistance}
                    />
                    <label
                      className={cx({
                        [style.active]: distance === 25000,
                      })}
                      htmlFor="twoHalfKm"
                    >
                      2.5만km
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="distance"
                      id="threeKm"
                      value={30000}
                      checked={distance === 30000}
                      onChange={handleDistance}
                    />
                    <label
                      className={cx({ [style.active]: distance === 30000 })}
                      htmlFor="threeKm"
                    >
                      3만km
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="distance"
                      id="threeHalfKm"
                      value={35000}
                      checked={distance === 35000}
                      onChange={handleDistance}
                    />
                    <label
                      className={cx({
                        [style.active]: distance === 35000,
                      })}
                      htmlFor="threeHalfKm"
                    >
                      3.5만km
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="distance"
                      id="fourKm"
                      value={40000}
                      checked={distance === 40000}
                      onChange={handleDistance}
                    />
                    <label
                      className={cx({ [style.active]: distance === 40000 })}
                      htmlFor="fourKm"
                    >
                      4만km
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="distance"
                      id="infKm"
                      value={0}
                      checked={distance === 0}
                      onChange={handleDistance}
                    />
                    <label
                      className={cx({ [style.active]: distance === 0 })}
                      htmlFor="infKm"
                    >
                      무제한
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 선납금, 보증금 */}
            <div className={style.detailSection}>
              <div className={style.detailContainer}>
                <p className={style.detailTitle}>선납금</p>

                <div className={style.detailBox}>
                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="prePrice"
                      id="onePre"
                      value="onePre"
                      checked={prePrice === "onePre"}
                      onChange={handlePrePrice}
                    />
                    <label
                      className={cx({
                        [style.active]: prePrice === "onePre",
                      })}
                      htmlFor="onePre"
                    >
                      10%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="prePrice"
                      id="twoPre"
                      value="twoPre"
                      checked={prePrice === "twoPre"}
                      onChange={handlePrePrice}
                    />
                    <label
                      className={cx({
                        [style.active]: prePrice === "twoPre",
                      })}
                      htmlFor="twoPre"
                    >
                      20%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="prePrice"
                      id="threePre"
                      value="threePre"
                      checked={prePrice === "threePre"}
                      onChange={handlePrePrice}
                    />
                    <label
                      className={cx({
                        [style.active]: prePrice === "threePre",
                      })}
                      htmlFor="threePre"
                    >
                      30%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="prePrice"
                      id="fourPre"
                      value="fourPre"
                      checked={prePrice === "fourPre"}
                      onChange={handlePrePrice}
                    />
                    <label
                      className={cx({
                        [style.active]: prePrice === "fourPre",
                      })}
                      htmlFor="fourPre"
                    >
                      40%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="prePrice"
                      id="fivePre"
                      value="fivePre"
                      checked={prePrice === "fivePre"}
                      onChange={handlePrePrice}
                    />
                    <label
                      className={cx({
                        [style.active]: prePrice === "fivePre",
                      })}
                      htmlFor="fivePre"
                    >
                      50%
                    </label>
                  </div>

                  <input
                    className={cx(style.writeInput, {
                      [style.active]: prePriceList.includes(prePrice) === false,
                    })}
                    type="text"
                    value={prePriceList.includes(prePrice) ? "" : prePrice}
                    onChange={handlePrePrice}
                    placeholder="직접입력(만원)"
                  />
                </div>
              </div>

              <div className={style.detailContainer}>
                <p className={style.detailTitle}>보증금</p>

                <div className={style.detailBox}>
                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="depositPrice"
                      id="oneDep"
                      value="oneDep"
                      checked={depositPrice === "oneDep"}
                      onChange={handleDepPrice}
                    />
                    <label
                      className={cx({
                        [style.active]: depositPrice === "oneDep",
                      })}
                      htmlFor="oneDep"
                    >
                      10%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="depositPrice"
                      id="twoDep"
                      value="twoDep"
                      checked={depositPrice === "twoDep"}
                      onChange={handleDepPrice}
                    />
                    <label
                      className={cx({
                        [style.active]: depositPrice === "twoDep",
                      })}
                      htmlFor="twoDep"
                    >
                      20%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="depositPrice"
                      id="threeDep"
                      value="threeDep"
                      checked={depositPrice === "threeDep"}
                      onChange={handleDepPrice}
                    />
                    <label
                      className={cx({
                        [style.active]: depositPrice === "threeDep",
                      })}
                      htmlFor="threeDep"
                    >
                      30%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="depositPrice"
                      id="fourDep"
                      value="fourDep"
                      checked={depositPrice === "fourDep"}
                      onChange={handleDepPrice}
                    />
                    <label
                      className={cx({
                        [style.active]: depositPrice === "fourDep",
                      })}
                      htmlFor="fourDep"
                    >
                      40%
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="depositPrice"
                      id="fiveDep"
                      value="fiveDep"
                      checked={depositPrice === "fiveDep"}
                      onChange={handleDepPrice}
                    />
                    <label
                      className={cx({
                        [style.active]: depositPrice === "fiveDep",
                      })}
                      htmlFor="fiveDep"
                    >
                      50%
                    </label>
                  </div>

                  <input
                    className={cx(style.writeInput, {
                      [style.active]:
                        depositPriceList.includes(depositPrice) === false &&
                        depositPrice !== "",
                    })}
                    type="text"
                    value={
                      depositPriceList.includes(depositPrice)
                        ? ""
                        : depositPrice
                    }
                    onChange={handleDepPrice}
                    placeholder="직접입력(만원)"
                  />
                </div>
              </div>
            </div>

            {/* 유형, 지역 */}
            <div className={style.detailSection}>
              <div className={style.detailContainer}>
                <p className={style.detailTitle}>유형</p>

                <div className={style.detailBox}>
                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="buyerType"
                      id="person"
                      value="person"
                      checked={buyerType === "person"}
                      onChange={handleBuyerType}
                    />
                    <label
                      className={cx({
                        [style.active]: buyerType === "person",
                      })}
                      htmlFor="person"
                    >
                      개인
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="buyerType"
                      id="business"
                      value="business"
                      checked={buyerType === "business"}
                      onChange={handleBuyerType}
                    />
                    <label
                      className={cx({
                        [style.active]: buyerType === "business",
                      })}
                      htmlFor="business"
                    >
                      개인사업자
                    </label>
                  </div>

                  <div className={style.detailValue}>
                    <input
                      type="radio"
                      name="buyerType"
                      id="corporate"
                      value="corporate"
                      checked={buyerType === "corporate"}
                      onChange={handleBuyerType}
                    />
                    <label
                      className={cx({
                        [style.active]: buyerType === "corporate",
                      })}
                      htmlFor="corporate"
                    >
                      법인사업자
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.detailContainer}>
                <p className={style.detailTitle}>지역</p>

                <div className={style.detailBox}>
                  <select
                    className={style.detailSelect}
                    name="area"
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    <option value="" defaultValue="" hidden>
                      지역
                    </option>
                    <option value="서울">서울</option>
                    <option value="경기">경기</option>
                    <option value="인천">인천</option>
                    <option value="강원">강원</option>
                    <option value="대전">대전</option>
                    <option value="세종">세종</option>
                    <option value="충북">충북</option>
                    <option value="충남">충남</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="울산">울산</option>
                    <option value="경북">경북</option>
                    <option value="경남">경남</option>
                    <option value="광주">광주</option>
                    <option value="전북">전북</option>
                    <option value="전남">전남</option>
                    <option value="제주">제주</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 월납입금 */}
          <div className={style.monthSection}>
            <div className={style.monthContainer}>
              <div className={style.monthLabelContainer}>
                <p className={cx(style.monthLabel, style.capitalLabel)}>
                  금융사
                </p>
                <p className={cx(style.monthLabel, style.priceLabel)}>
                  월납입금
                </p>
              </div>

              <div className={style.monthPriceContainer}>
                {monthlyPrice && monthlyPrice.length > 0 ? (
                  monthlyPrice.map(
                    (price: { capitalName: string; monthPrice: number }) => (
                      <div
                        className={style.priceContainer}
                        key={price.capitalName}
                      >
                        <div className={style.capitalNameBox}>
                          <input
                            className={style.capitalRadio}
                            type="radio"
                            name="capital"
                            id={price.capitalName}
                          />
                          <label
                            className={style.capitalName}
                            htmlFor={price.capitalName}
                          >
                            {price.capitalName}
                          </label>
                        </div>
                        <p className={style.monthPrice}>
                          월{" "}
                          <span className={style.realMonthPrice}>
                            {price.monthPrice.toLocaleString()}
                          </span>
                          원
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className={style.none}>
                    금융사 정보가 없습니다.
                    <br />
                    다른 조건을 선택해주세요.
                  </p>
                )}
              </div>
            </div>

            <div className={style.bigo}>
              <div className={style.monthLabelContainer}>
                <p className={style.monthLabel}>비고</p>
              </div>

              <div className={style.bigoContentContainer}>
                <div className={style.bigoBox}>
                  <div className={style.bigoContent}>
                    <p>취등록세</p>
                    <p>{getTax.toLocaleString()}</p>
                  </div>
                  <div className={style.bigoContent}>
                    <p>자동차세</p>
                    <p>{carTax.toLocaleString()}</p>
                  </div>
                  <div className={style.bigoContent}>
                    <p>탁송료</p>
                    <p>-</p>
                  </div>
                </div>
                <div className={style.bigoBox}>
                  <div className={style.bigoContent}>
                    <p>할인</p>
                    <p>-</p>
                  </div>
                  <div className={style.bigoContent}>
                    <p>기본할인</p>
                    <p>-</p>
                  </div>
                  <div className={style.bigoContent}>
                    <p>금융사할인</p>
                    <p>-</p>
                  </div>
                </div>
                <div className={style.bigoBox}>
                  <div className={style.bigoContent}>
                    <p>보조금 혜택</p>
                    <p>-</p>
                  </div>
                  <div className={style.bigoContent}>
                    <p>국고 보조금</p>
                    <p>-</p>
                  </div>
                  <div className={style.bigoContent}>
                    <p>지자체 보조금</p>
                    <p>-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className={style.saveBtn}>저장하기</button>
        </div>

        {/* 견적 관련 */}
        <div className={style.featSection}>
          <div className={style.buttonSection}>
            <button className={cx(style.btn)}>견적 문의하기</button>
            <button className={cx(style.btn, style.outlineBtn)}>
              견적 다운로드
            </button>
          </div>

          <ul className={style.warningSection}>
            <li>
              상기 견적 금액은 개별 소비세 5.0% 적용 견적입니다.(단, 차종 및
              면세구분에 따라 세제 혜택이 적용됩니다.)
            </li>
            <br />
            <li>
              상기 이미지는 실제 차량과 사양 및 컬러가 다를 수 있으므로 전시장
              방문 및 실차 확인을 권장합니다.
            </li>
            <br />

            <li>
              일부 이미지는 대표 등급 기준으로 연출되었으며 추후 사전예고 없이
              변경이나 업데이트가 될 수 있습니다.
            </li>
            <br />

            <li>
              본 견적서는 고객님의 차량 구입(청약) 의사결정에 도움을 드리고자
              작성된 것으로, 법적인 효력이 없으며, 자세한 문의는 지점·대리점을
              통해 확인바랍니다.
            </li>
            <br />

            <li>
              실계약 진행 시 차량 매매 관련 대금(계약금 포함)은 반드시 ‘고객전용
              입금계좌’ 혹은 ‘현대자동차(주) 명의 계좌’로 입금하여 주시기
              바라며, 이외의 계좌로 송금하는 것은 자동차 매매 대금을 지급한
              것으로 인정되지 않으니 유의하시기 바랍니다.
            </li>
            <br />

            <li>
              주문생산방식으로 계약된 차량의 경우 최소 45일 납기를 예상합니다.
            </li>

            <br />
            <li>
              선택 품목을 포함한 최종 가격은 세제 혜택 등에 따라 다를 수
              있습니다. 최종 판매가는 반드시 지점·대리점에 문의 바랍니다.
            </li>

            <br />
            <li>지점·대리점 견적서 내의 옵션·컬러 명칭과 다를 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
