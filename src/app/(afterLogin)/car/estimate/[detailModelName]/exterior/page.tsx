"use client";

import { ColorOption } from "@/model/car/Info/ColorOption";
import { useCarPriceStore } from "@/store/carPrice";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./page.module.css";
import cx from "classnames";

export default function CarExteriorPage() {
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
      console.log(result.data);

      const exteriorColorList = result.data.colorOption.filter(
        (option: ColorOption) => option.colorOptionType === "외장색상"
      );
      console.log({ exteriorColorList });

      setColorOptionList(exteriorColorList || []);
      carPriceStore.setSelectedCarSpec(result.data.carSpec[0]);
      carPriceStore.setSelectedCarBasicOption(result.data.basicOption[0]);
    } catch (error) {
      console.error("Failed to fetch option list:", error);
    }
  };

  // 외장색상 선택 시
  const selectExteriorColor = async (
    colorPk: string,
    colorName: string,
    colorCodes: string[],
    colorPrice: number
  ) => {
    const { selectedExteriorColor, setSelectedExteriorColor } = carPriceStore;

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

  useEffect(() => {
    getOptionList();
  }, []);

  return (
    <>
      <h1 className={style.title}>
        익스테리어.<span className={style.subTitle}>외장 색상 선택</span>
      </h1>

      <div className={style.trimSection}>
        <p className={style.colorName}>
          색상 - {carPriceStore.selectedExteriorColor.name}
        </p>

        <ul className={style.colorOptionContainer}>
          {colorOptionList.map((colorOption) => (
            <li
              key={colorOption.colorOptionPk}
              className={cx(
                style.colorOptionBox,
                carPriceStore.selectedExteriorColor.pk ===
                  colorOption.colorOptionPk && style.colorOptionBoxActive
              )}
              onClick={() =>
                selectExteriorColor(
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

        <div className={style.colorPrice}>
          + {carPriceStore.selectedExteriorColor.price.toLocaleString()}원
        </div>
      </div>
    </>
  );
}
