"use client";

import style from "../../admin.module.css";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const CarDefaultProvider = React.lazy(
  () => import("../../_component/CarDefaultProvider")
);
const CarDefaultOption = React.lazy(
  () => import("../../_component/CarDefaultOption")
);
const AGGrid = React.lazy(() => import("../../_component/AGGrid"));
const UploadButtons = React.lazy(
  () => import("../../_component/UploadButtons")
);

export default function CarDefaultPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [gridData, setGridData] = useState({});

  // SubTab에 따른 AGGrid 데이터 설정
  const getGridColData = () => {
    console.log({ tab });
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
              width: 350,
            },
            {
              field: "modelPk",
              headerName: "모델 코드",
              editable: true,
              width: 180,
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
              field: "basicOptionDataPk",
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
              field: "optionName",
              headerName: "옵션명",
              editable: true,
              width: 200,
            },
            {
              field: "optionDescription",
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
    <Suspense fallback={<div>Loading...</div>}>
      <CarDefaultProvider>
        <article className={style.mainSection}>
          <UploadButtons />

          <div className={style.mainContainer}>
            {tab !== "country" && tab !== "basicOption" && <CarDefaultOption />}

            <div className={style.dataSection}>
              <AGGrid data={gridData} />
            </div>
          </div>
        </article>
      </CarDefaultProvider>
    </Suspense>
  );
}
