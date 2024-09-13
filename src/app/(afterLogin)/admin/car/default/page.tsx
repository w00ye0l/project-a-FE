"use client";

import style from "../../admin.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CarDefaultProvider from "../../_component/CarDefaultProvider";
import AGGrid from "../../_component/AGGrid";
import UploadButtons from "../../_component/UploadButtons";
import { LinkRenderer } from "../../_component/LinkRenderer";
import { CarImageRenderer } from "../../_component/CarImageRenderer";

export default function CarDefaultPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [gridData, setGridData] = useState({});

  // SubTab에 따른 AGGrid 데이터 설정
  const getGridColData = () => {
    // console.log({ tab });
    switch (tab) {
      // 제조국가
      case "country":
        return {
          tab: tab,
          IRow: { flag: "", countryPk: "", countryName: "" },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "countryPk",
              headerName: "제조국가 코드",
              editable: true,
              width: 180,
            },
            {
              field: "countryName",
              headerName: "제조국가",
              editable: true,
              width: 200,
            },
          ],
        };

      // 브랜드
      case "brand":
        return {
          tab: tab,
          IRow: { flag: "", brandPk: "", brandName: "", countryPk: "" },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "brandPk",
              headerName: "브랜드 코드",
              editable: true,
              width: 180,
            },
            {
              field: "brandName",
              headerName: "브랜드",
              editable: true,
              width: 200,
            },
            {
              field: "countryPk",
              headerName: "제조국가 코드",
              editable: true,
              width: 180,
            },
          ],
        };

      // 모델
      case "model":
        return {
          tab: tab,
          IRow: { flag: "", modelPk: "", modelName: "", brandPk: "" },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "modelPk",
              headerName: "모델 코드",
              editable: true,
              width: 180,
            },
            {
              field: "modelName",
              headerName: "모델 이름",
              editable: true,
              width: 300,
            },
            {
              field: "brandPk",
              headerName: "브랜드 코드",
              editable: true,
              width: 180,
            },
          ],
        };

      // 세부모델
      case "detailModel":
        return {
          tab: tab,
          IRow: {
            flag: "",
            detailModelPk: "",
            detailModelName: "",
            modelPk: "",
          },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "detailModelPk",
              headerName: "세부 모델 코드",
              editable: true,
              width: 180,
            },
            {
              field: "detailModelName",
              headerName: "세부 모델명",
              editable: true,
              width: 250,
            },
            {
              field: "modelPk",
              headerName: "모델 코드",
              editable: true,
              width: 120,
            },
            {
              field: "mainImage",
              headerName: "대표 이미지",
              cellRenderer: CarImageRenderer,
              width: 200,
            },
            {
              field: "link",
              headerName: "이미지 설정",
              cellRenderer: LinkRenderer,
              width: 120,
            },
          ],
        };

      // 기본옵션
      case "basicOption":
        return {
          tab: tab,
          IRow: {
            flag: "",
            basicOptionDataPk: "",
            category: "",
            optionName: "",
            optionDescription: "",
          },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "basicOptionDefinePk",
              headerName: "기본 옵션 코드",
              editable: true,
              width: 160,
            },
            {
              field: "category",
              headerName: "종류",
              editable: true,
              width: 140,
            },
            {
              field: "basicOptionName",
              headerName: "옵션명",
              editable: true,
              width: 200,
            },
            {
              field: "basicOptionDescription",
              headerName: "옵션 설명",
              editable: true,
              width: 500,
            },
          ],
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    setGridData(getGridColData());
  }, [tab]);

  return (
    <CarDefaultProvider>
      <article className={style.mainSection}>
        <UploadButtons />

        <div className={style.mainContainer}>
          {/* {tab !== "country" && tab !== "basicOption" && <CarDefaultOption />} */}

          <div className={style.dataSection}>
            <AGGrid data={gridData} />
          </div>
        </div>
      </article>
    </CarDefaultProvider>
  );
}
