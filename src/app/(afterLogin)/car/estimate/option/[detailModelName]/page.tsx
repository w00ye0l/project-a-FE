"use client";

import { ChoiceOption } from "@/model/car/Info/ChoiceOption";
import { ColorOption } from "@/model/car/Info/ColorOption";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import cx from "classnames";
import style from "./page.module.css";
import { useCarPriceStore } from "@/store/carPrice";
import Image from "next/image";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";

export default function EstimateOptionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const detailModelName = params.detailModelName;
  const carYear = searchParams.get("carYear");
  const engineInfo = searchParams.get("engineInfo");
  const trimName = searchParams.get("trimName");
  const [choiceOptionList, setChoiceOptionList] = useState<ChoiceOption[]>([]);
  const [colorOptionList, setColorOptionList] = useState<ColorOption[]>([]);
  const [visibleSection, setVisibleSection] = useState<string>("choiceOption");
  const carPriceStore = useCarPriceStore();

  // 옵션 리스트 가져오기
  const getOptionList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/options?detailModelName=${detailModelName}&carYear=${carYear}&engineInfo=${engineInfo}&trimName=${trimName}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      console.log(result.data);

      setChoiceOptionList(result.data.choiceOption || []);
      setColorOptionList(result.data.colorOption || []);
      carPriceStore.setSelectedCarSpec(result.data.carSpec);
      carPriceStore.setSelectedCarBasicOption(result.data.basicOption);
    } catch (error) {
      console.error("Failed to fetch option list:", error);
    }
  };

  // 옵션, 색상 토글
  const toggleVisibility = (optionName: string) => {
    setVisibleSection(optionName);
  };

  // 옵션 선택 시
  const selectOption = (
    optionPk: string,
    optionName: string,
    optionPrice: number,
    connectOption: string[],
    removeOption: string[]
  ) => {
    const { selectedOptions, setSelectedOptions } = carPriceStore;
    const optionExists = selectedOptions.find(
      (option) => option.pk === optionPk
    );

    if (optionExists) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.pk !== optionPk)
      );
    } else {
      console.log(connectOption);

      const connectOptions = choiceOptionList.filter((option) => {
        return connectOption.includes(option.choiceOptionPk);
      });
      const removeOptions = choiceOptionList.filter((option) => {
        return removeOption.includes(option.choiceOptionPk);
      });

      console.log(connectOptions);
      console.log(removeOptions);

      setSelectedOptions([
        ...selectedOptions,
        ...connectOptions.map(
          ({
            choiceOptionPk,
            choiceOptionName,
            choiceOptionPrice,
          }: ChoiceOption) => ({
            pk: choiceOptionPk,
            name: choiceOptionName,
            price: choiceOptionPrice,
          })
        ),
        { pk: optionPk, name: optionName, price: optionPrice },
      ]);
    }
  };

  // 외장색상 선택 시
  const selectExteriorColor = async (
    colorPk: string,
    colorName: string,
    colorCodes: string[],
    colorPrice: number
  ) => {
    const { selectedExteriorColor, setSelectedExteriorColor } =
      useCarPriceStore.getState();

    if (selectedExteriorColor.pk !== "") {
      if (selectedExteriorColor.pk === colorPk) {
        setSelectedExteriorColor({ pk: "", name: "", codes: [], price: 0 });
        return;
      }
      setSelectedExteriorColor({ pk: "", name: "", codes: [], price: 0 });
    }

    setSelectedExteriorColor({
      pk: colorPk,
      name: colorName,
      codes: colorCodes,
      price: colorPrice,
    });
  };

  // 내장색상 선택 시
  const selectInteriorColor = async (
    colorPk: string,
    colorName: string,
    colorCodes: string[],
    colorPrice: number
  ) => {
    const { selectedInteriorColor, setSelectedInteriorColor } =
      useCarPriceStore.getState();

    if (selectedInteriorColor.pk !== "") {
      if (selectedInteriorColor.pk === colorPk) {
        setSelectedInteriorColor({ pk: "", name: "", codes: [], price: 0 });
        return;
      }
      setSelectedInteriorColor({ pk: "", name: "", codes: [], price: 0 });
    }

    setSelectedInteriorColor({
      pk: colorPk,
      name: colorName,
      codes: colorCodes,
      price: colorPrice,
    });
  };

  // 견적서 저장하기 버튼 클릭 시
  const onClickEnd = () => {
    // 견적서 저장 API 호출
    router.push("/car/estimate/end");
  };

  useEffect(() => {
    getOptionList();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.titleModelImgSection}>
        <h1>옵션을 선택하세요.</h1>
        <div className={style.modelImg}></div>
      </div>

      <div className={style.right}>
        <div className={style.optionSection}>
          <h2
            className={cx(
              style.optionTitle,
              visibleSection === "choiceOption" && style.optionTitleActive
            )}
            onClick={() => toggleVisibility("choiceOption")}
          >
            선택 옵션
          </h2>

          {visibleSection === "choiceOption" && (
            <ul className={style.choiceOptionSection}>
              {choiceOptionList.map((choiceOption) => (
                <li
                  className={style.choiceOptionContainer}
                  onClick={() =>
                    selectOption(
                      choiceOption.choiceOptionPk,
                      choiceOption.choiceOptionName,
                      choiceOption.choiceOptionPrice,
                      choiceOption.connectChoiceOption,
                      choiceOption.removeChoiceOption
                    )
                  }
                  key={choiceOption.choiceOptionPk}
                >
                  <div className={style.checkName}>
                    <input
                      type="checkbox"
                      checked={carPriceStore.selectedOptions.some(
                        (option) => option.pk === choiceOption.choiceOptionPk
                      )}
                      readOnly
                    />
                    <p>{choiceOption.choiceOptionName}</p>
                    <div className={style.choiceOptionInfo}>
                      <Image
                        className={style.infoIcon}
                        src={"/icon/info.png"}
                        width={20}
                        height={20}
                        alt="info"
                      />
                      <p className={style.choiceOptionDescription}>
                        {choiceOption.choiceOptionDescription}
                      </p>
                    </div>
                  </div>

                  <p>{choiceOption.choiceOptionPrice.toLocaleString()}원</p>
                </li>
              ))}
            </ul>
          )}

          <h2
            className={cx(
              style.optionTitle,
              visibleSection === "colorOption" && style.optionTitleActive
            )}
            onClick={() => toggleVisibility("colorOption")}
          >
            색상 옵션
          </h2>

          {visibleSection === "colorOption" && colorOptionList && (
            <div className={style.colorOptionSection}>
              {/* 외장색상 */}
              <h2>외장색상</h2>
              <ul className={style.colorOptionContainer}>
                {colorOptionList
                  .filter(
                    (colorOption) => colorOption.colorOptionType === "외장색상"
                  )
                  .map((colorOption) => (
                    <li
                      className={cx(
                        style.colorOptionBox,
                        carPriceStore.selectedExteriorColor.pk ===
                          colorOption.colorOptionPk &&
                          style.colorOptionBoxActive
                      )}
                      onClick={() =>
                        selectExteriorColor(
                          colorOption.colorOptionPk,
                          colorOption.colorOptionName,
                          colorOption.colorOptionCodes,
                          colorOption.colorOptionPrice
                        )
                      }
                      key={colorOption.colorOptionPk}
                    >
                      {colorOption.colorOptionCodeCount === 1 && (
                        <div
                          className={style.colorBox}
                          style={{
                            backgroundColor: `#${colorOption.colorOptionCodes[0]}`,
                          }}
                        ></div>
                      )}
                      {colorOption.colorOptionCodeCount === 2 && (
                        <div className={cx(style.colorBox, style.twoColorBox)}>
                          <div
                            className={style.twoColor}
                            style={{
                              backgroundColor: `#${colorOption.colorOptionCodes[0]}`,
                            }}
                          ></div>
                          <div
                            className={style.twoColor}
                            style={{
                              backgroundColor: `#${colorOption.colorOptionCodes[1]}`,
                            }}
                          ></div>
                        </div>
                      )}
                      <p className={style.colorName}>
                        {colorOption.colorOptionName}
                      </p>
                      {colorOption.colorOptionPrice !== 0 && (
                        <p>{colorOption.colorOptionPrice.toLocaleString()}원</p>
                      )}
                    </li>
                  ))}
              </ul>

              {/* 내장색상 */}
              <h2>내장색상</h2>
              <ul className={style.colorOptionContainer}>
                {colorOptionList
                  .filter(
                    (colorOption) => colorOption.colorOptionType === "내장색상"
                  )
                  .map((colorOption) => (
                    <li
                      className={cx(
                        style.colorOptionBox,
                        carPriceStore.selectedInteriorColor.pk ===
                          colorOption.colorOptionPk &&
                          style.colorOptionBoxActive
                      )}
                      onClick={() =>
                        selectInteriorColor(
                          colorOption.colorOptionPk,
                          colorOption.colorOptionName,
                          colorOption.colorOptionCodes,
                          colorOption.colorOptionPrice
                        )
                      }
                      key={colorOption.colorOptionPk}
                    >
                      {colorOption.colorOptionCodeCount === 1 && (
                        <div
                          className={style.colorBox}
                          style={{
                            backgroundColor: `#${colorOption.colorOptionCodes[0]}`,
                          }}
                        ></div>
                      )}
                      {colorOption.colorOptionCodeCount === 2 && (
                        <div className={cx(style.colorBox, style.twoColorBox)}>
                          <div
                            className={style.twoColor}
                            style={{
                              backgroundColor: `#${colorOption.colorOptionCodes[0]}`,
                            }}
                          ></div>
                          <div
                            className={style.twoColor}
                            style={{
                              backgroundColor: `#${colorOption.colorOptionCodes[1]}`,
                            }}
                          ></div>
                        </div>
                      )}
                      <p className={style.colorName}>
                        {colorOption.colorOptionName}
                      </p>
                      {colorOption.colorOptionPrice !== 0 && (
                        <p>{colorOption.colorOptionPrice.toLocaleString()}원</p>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div className={style.priceBtnSection}>
          <div className={style.priceContainer}>
            <div className={cx(style.price, style.defaultPrice)}>
              <span>기본 가격</span>
              <p>{carPriceStore.defaultPrice.toLocaleString()}원</p>
            </div>

            <div className={cx(style.price, style.optionPrice)}>
              <span>옵션 가격</span>
              <p>
                +
                {(
                  carPriceStore.selectedExteriorColor.price +
                  carPriceStore.selectedInteriorColor.price +
                  carPriceStore.selectedOptions.reduce(
                    (acc, option) => acc + option.price,
                    0
                  )
                ).toLocaleString()}
                원
              </p>
            </div>

            <div className={cx(style.price, style.additionPrice)}>
              <b>총합</b>

              <div className={style.totalPriceContainer}>
                <AnimatedNumber
                  className={style.totalPrice}
                  hasComma={true}
                  size={24}
                  value={
                    carPriceStore.defaultPrice +
                    carPriceStore.selectedExteriorColor.price +
                    carPriceStore.selectedInteriorColor.price +
                    carPriceStore.selectedOptions.reduce(
                      (acc, option) => acc + option.price,
                      0
                    )
                  }
                />
                <span>원</span>
              </div>
            </div>
          </div>

          <button
            className={style.endBtn}
            onClick={onClickEnd}
            disabled={
              carPriceStore.selectedExteriorColor.pk === "" ||
              carPriceStore.selectedInteriorColor.pk === ""
            }
          >
            견적서 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
