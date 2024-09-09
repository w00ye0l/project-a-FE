"use client";

import { ColorOption } from "@/model/car/Info/ColorOption";
import { useCarPriceStore } from "@/store/carPrice";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./page.module.css";
import cx from "classnames";

export default function CarInteriorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const detailModelName = params.detailModelName;
  const carYear = searchParams.get("carYear");
  const engineInfo = searchParams.get("engineInfo");
  const trimName = searchParams.get("trimName");
  const [colorOptionList, setColorOptionList] = useState<ColorOption[]>([]);
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
      // console.log(result.data);

      const interiorColorList = result.data.colorOption.filter(
        (option: ColorOption) => option.colorOptionType === "내장색상"
      );
      console.log({ interiorColorList });

      setColorOptionList(interiorColorList || []);
    } catch (error) {
      console.error("Failed to fetch option list:", error);
    }
  };

  // 내장색상 선택 시
  const selectInteriorColor = async (
    colorPk: string,
    colorName: string,
    colorCodes: string[],
    colorPrice: number
  ) => {
    const { selectedInteriorColor, setSelectedInteriorColor } = carPriceStore;

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

  useEffect(() => {
    getOptionList();
  }, []);

  return (
    <>
      <h1 className={style.title}>외장 컬러 선택</h1>

      <div className={style.trimSection}>
        <ul className={style.colorOptionContainer}>
          {colorOptionList.map((colorOption) => (
            <li
              key={colorOption.colorOptionPk}
              className={cx(
                style.colorOptionBox,
                carPriceStore.selectedInteriorColor.pk ===
                  colorOption.colorOptionPk && style.colorOptionBoxActive
              )}
              onClick={() =>
                selectInteriorColor(
                  colorOption.colorOptionPk,
                  colorOption.colorOptionName,
                  colorOption.colorOptionCodes,
                  colorOption.colorOptionPrice
                )
              }
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
            </li>
          ))}
        </ul>

        <hr className={style.hr} />

        <div className={style.selectColorSection}>
          <p className={style.colorName}>
            {carPriceStore.selectedInteriorColor.name}
          </p>
          <b>
            +{" "}
            <span className={style.colorPrice}>
              {carPriceStore.selectedInteriorColor.price}
            </span>{" "}
            원
          </b>
        </div>
      </div>
    </>
  );
}
