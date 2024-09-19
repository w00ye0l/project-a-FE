"use client";

import { ChoiceOption } from "@/model/car/Info/ChoiceOption";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import cx from "classnames";
import style from "./page.module.css";
import { useCarPriceStore } from "@/store/carPrice";
import Image from "next/image";
import "react-awesome-animated-number/dist/index.css";
import { createPortal } from "react-dom";

export default function EstimateOptionPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const detailModelName = params.detailModelName;
  const carYear = searchParams.get("carYear");
  const engineInfo = searchParams.get("engineInfo");
  const trimName = searchParams.get("trimName");
  const [choiceOptionList, setChoiceOptionList] = useState<ChoiceOption[]>([]);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [position, setPosition] = useState({ top: 0, bottom: 0, left: 0 });
  const carPriceStore = useCarPriceStore();

  // 옵션 리스트 가져오기
  const getOptionList = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/options?detailModelName=${detailModelName}&carYear=${carYear}&engineInfo=${engineInfo}&trimName=${trimName}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      setChoiceOptionList(result.data.choiceOption || []);
    } catch (error) {
      console.error("Failed to fetch option list:", error);
    }
  }, [detailModelName, carYear, engineInfo, trimName]);

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
      const connectOptions = choiceOptionList.filter((option) => {
        return connectOption.includes(option.choiceOptionPk);
      });
      const removeOptions = choiceOptionList.filter((option) => {
        return removeOption.includes(option.choiceOptionPk);
      });

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

  // 닫기 버튼 클릭 핸들러
  const handleCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveOption(null);
  };

  // 정보 아이콘 클릭 핸들러
  const handleInfoClick = (event: React.MouseEvent, optionPk: string) => {
    event.stopPropagation();
    setActiveOption(optionPk);

    // optionContainer의 부모 요소 기준으로 위치 가져오기
    const containerPosition = event.currentTarget
      .closest("li")!
      .getBoundingClientRect();
    setPosition({
      top: containerPosition.top + window.scrollY, // 스크롤을 고려해 위치 설정
      bottom: containerPosition.bottom + window.scrollY,
      left: containerPosition.left + window.scrollX - 340, // 설명창 너비 고려
    });
  };

  useEffect(() => {
    getOptionList();
  }, [getOptionList]);

  // choiceOptionDescription를 React Portal로 렌더링
  const renderChoiceOptionDescription = () => {
    const activeChoiceOption = choiceOptionList.find(
      (option) => option.choiceOptionPk === activeOption
    );
    if (!activeChoiceOption) return null;

    // 화면 하단에 넘치는지 여부 계산
    const expectedTop = position.top; // 현재 `top` 값
    const expectedBottom = position.bottom; // 현재 `bottom` 값
    const windowHeight = window.innerHeight; // 화면 높이

    // 설명창이 화면 하단에 가려지는지 여부 확인
    const isOverflowing = expectedTop > windowHeight * 0.5;

    return createPortal(
      <div
        className={style.choiceOptionDescription}
        style={{
          position: "absolute",
          top: isOverflowing ? "auto" : `${expectedTop}px`,
          bottom: isOverflowing ? `${windowHeight - expectedBottom}px` : "auto",
          left: `${position.left - 10}px`,
        }}
      >
        <div className={style.descriptionHeader}>
          <h3>{activeChoiceOption.choiceOptionName}</h3>
          <button className={style.closeButton} onClick={handleCloseClick}>
            닫기
          </button>
        </div>
        <p>{activeChoiceOption.choiceOptionDescription}</p>
      </div>,
      document.body // choiceOptionDescription을 document.body에 렌더링
    );
  };

  return (
    <>
      <h1 className={style.title}>옵션 선택</h1>

      <div className={style.optionSection}>
        {choiceOptionList.map((choiceOption) => (
          <li
            className={cx(style.optionContainer, {
              [style.optionActive]: carPriceStore.selectedOptions.some(
                (option) => option.pk === choiceOption.choiceOptionPk
              ),
            })}
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
              <p>{choiceOption.choiceOptionName}</p>
              <div className={style.infoIconWrapper}>
                <Image
                  className={style.infoIcon}
                  src={"/icon/info_gray.png"}
                  width={20}
                  height={20}
                  alt="info"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleInfoClick(event, choiceOption.choiceOptionPk);
                  }}
                />
              </div>
            </div>

            <p>{choiceOption.choiceOptionPrice.toLocaleString()}원</p>
          </li>
        ))}
        {/* React Portal을 통해 choiceOptionDescription 렌더링 */}
        {activeOption && renderChoiceOptionDescription()}
      </div>
    </>
  );
}
