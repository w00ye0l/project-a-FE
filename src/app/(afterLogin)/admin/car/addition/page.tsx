"use client";

import style from "../../admin.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CarDefaultProvider from "../../_component/CarDefaultProvider";
import CarDefaultOption from "../../_component/CarDefaultOption";
import AGGrid from "../../_component/AGGrid";
import UploadButtons from "../../_component/UploadButtons";

export default function CarAdditionPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [gridData, setGridData] = useState({});

  // SubTab에 따른 AGGrid 데이터 설정
  const getGridColData = () => {
    console.log({ tab });
    switch (tab) {
      // 차량 관리
      case "carInfo":
        return {
          tab: tab,
          IRow: {
            flag: "",
            carPk: "",
            countryName: "",
            brandName: "",
            modelName: "",
            detailModelName: "",
            carYear: 0,
            engineInfo: "",
            trimName: "",
            fuelType: "",
            carClass: "",
            carPrice: 0,
            carStatus: "",
          },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "carPk",
              headerName: "차량 코드",
              editable: true,
              width: 120,
            },
            {
              field: "countryName",
              headerName: "제조국가",
              editable: true,
              width: 100,
            },
            {
              field: "brandName",
              headerName: "브랜드",
              editable: true,
              width: 100,
            },
            {
              field: "modelName",
              headerName: "모델 이름",
              editable: true,
              width: 110,
            },
            {
              field: "detailModelName",
              headerName: "세부 모델 이름",
              editable: true,
              width: 160,
            },
            {
              field: "carYear",
              headerName: "차량 연식",
              editable: true,
              width: 110,
            },
            {
              field: "engineInfo",
              headerName: "트림 엔진 정보",
              editable: true,
              width: 240,
            },
            {
              field: "trimName",
              headerName: "트림 이름",
              editable: true,
              width: 200,
            },
            {
              field: "fuelType",
              headerName: "연료 타입",
              editable: true,
              width: 110,
            },
            {
              field: "carClass",
              headerName: "차량 크기",
              editable: true,
              width: 140,
            },
            {
              field: "carPrice",
              headerName: "차량 가격",
              editable: true,
              width: 160,
            },
            {
              field: "carStatus",
              headerName: "판매 상태",
              editable: true,
              width: 110,
            },
          ],
        };

      // 차량 제원
      case "carSpec":
        return {
          tab: tab,
          IRow: {
            flag: "",
            carPk: "",
            carCountryName: "",
            carBrandName: "",
            carModelName: "",
            carDetailModelName: "",
            carHeight: "",
            carWidth: "",
            carWheelbase: "",
            carLength: "",
            carWeight: "",
            trunkSuitcase: "",
            trunkStroller: "",
            trunkGolfBag: "",
            carSeating: "",
            fuelEfficiency: "",
            engineDisplacement: "",
            engineType: "",
            engineTorque: "",
            enginePower: "",
            transmissionInfo: "",
            zeroToHundred: "",
            motorTorque: "",
            motorPower: "",
            motorMaxSpeed: "",
            motorZeroToHundred: "",
            motorBatteryCapacity: "",
            motorCharging: "",
            motorFastCharging: "",
            motorSlowCharging: "",
            motorDrivingRange: "",
          },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "carPk",
              headerName: "차량 코드",
              editable: true,
              width: 120,
            },
            {
              field: "carBrandName",
              headerName: "브랜드명",
              editable: true,
              width: 100,
            },
            {
              field: "carModelName",
              headerName: "모델명",
              editable: true,
              width: 110,
            },
            {
              field: "carDetailModelName",
              headerName: "세부 모델명",
              editable: true,
              width: 160,
            },
            {
              field: "carHeight",
              headerName: "전고",
              editable: true,
              width: 80,
            },
            {
              field: "carWidth",
              headerName: "전폭",
              editable: true,
              width: 80,
            },
            {
              field: "carWheelbase",
              headerName: "휠 베이스(축거)",
              editable: true,
              width: 140,
            },
            {
              field: "carLength",
              headerName: "전장",
              editable: true,
              width: 80,
            },
            {
              field: "carWeight",
              headerName: "공차 중량",
              editable: true,
              width: 110,
            },
            {
              field: "trunkSuitcase",
              headerName: "캐리어",
              editable: true,
              width: 100,
            },
            {
              field: "trunkStroller",
              headerName: "유모차",
              editable: true,
              width: 100,
            },
            {
              field: "trunkGolfBag",
              headerName: "골프백",
              editable: true,
              width: 100,
            },
            {
              field: "carSeating",
              headerName: "승차정원",
              editable: true,
              width: 110,
            },
            {
              field: "fuelEfficiency",
              headerName: "연비",
              editable: true,
              width: 80,
            },
            {
              field: "engineDisplacement",
              headerName: "배기량",
              editable: true,
              width: 100,
            },
            {
              field: "engineType",
              headerName: "엔진 형식",
              editable: true,
              width: 110,
            },
            {
              field: "engineTorque",
              headerName: "엔진 최대 토크",
              editable: true,
              width: 140,
            },
            {
              field: "enginePower",
              headerName: "엔진 최고 출력",
              editable: true,
              width: 140,
            },
            {
              field: "transmissionInfo",
              headerName: "변속기 단수",
              editable: true,
              width: 130,
            },
            {
              field: "zeroToHundred",
              headerName: "제로백",
              editable: true,
              width: 100,
            },
            {
              field: "motorTorque",
              headerName: "모터 최대 토크",
              editable: true,
              width: 140,
            },
            {
              field: "motorPower",
              headerName: "모터 최고 출력",
              editable: true,
              width: 140,
            },
            {
              field: "motorMaxSpeed",
              headerName: "최대속도",
              editable: true,
              width: 100,
            },
            {
              field: "motorZeroToHundred",
              headerName: "가속성능 제로백",
              editable: true,
              width: 160,
            },
            {
              field: "motorBatteryCapacity",
              headerName: "배터리 용량",
              editable: true,
              width: 140,
            },
            {
              field: "motorCharging",
              headerName: "충전방식",
              editable: true,
              width: 100,
            },
            {
              field: "motorFastCharging",
              headerName: "급속충전",
              editable: true,
              width: 100,
            },
            {
              field: "motorSlowCharging",
              headerName: "완속충전",
              editable: true,
              width: 100,
            },
            {
              field: "motorDrivingRange",
              headerName: "주행가능거리(복합)",
              editable: true,
              width: 160,
            },
          ],
        };

      // 차량 기본 옵션
      case "carBasicOption":
        return {
          tab: tab,
          IRow: {
            flag: "",
            basicOptionPk: "",
            carPk: "",
            standardOptions: "",
            optionalOptions: "",
          },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "basicOptionPk",
              headerName: "옵션 코드",
              editable: true,
              width: 110,
            },
            {
              field: "carPk",
              headerName: "차량 코드",
              editable: true,
              width: 120,
            },
            {
              field: "standardOptions",
              headerName: "기본 옵션",
              editable: true,
              width: 240,
            },
            {
              field: "optionalOptions",
              headerName: "추가 옵션",
              editable: true,
              width: 240,
            },
          ],
        };

      // 차량 선택 옵션
      case "carChoiceOption":
        return {
          tab: tab,
          IRow: {
            flag: "",
            choiceOptionPk: "",
            carPk: "",
            carCountryName: "",
            carBrandName: "",
            carModelName: "",
            carDetailModelName: "",
            choiceOptionName: "",
            choiceOptionPrice: 0,
            choiceOptionDescription: "",
          },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "choiceOptionPk",
              headerName: "옵션 코드",
              editable: true,
              width: 130,
            },
            {
              field: "carPk",
              headerName: "차량 코드",
              editable: true,
              width: 120,
            },
            {
              field: "carBrandName",
              headerName: "브랜드명",
              editable: true,
              width: 100,
            },
            {
              field: "carModelName",
              headerName: "모델명",
              editable: true,
              width: 110,
            },
            {
              field: "carDetailModelName",
              headerName: "세부 모델명",
              editable: true,
              width: 160,
            },
            {
              field: "choiceOptionName",
              headerName: "옵션명",
              editable: true,
              width: 140,
            },
            {
              field: "choiceOptionPrice",
              headerName: "옵션 가격",
              editable: true,
              width: 140,
            },
            {
              field: "choiceOptionDescription",
              headerName: "옵션 설명",
              editable: true,
              width: 400,
            },
          ],
        };

      // 차량 색상
      case "carColorOption":
        return {
          tab: tab,
          IRow: {
            flag: "",
            colorOptionPk: "",
            carPk: "",
            colorOptionType: "",
            colorOptionPrice: "",
            colorOptionName: "",
            colorOptionCodes: "",
            removeExteriorColors: "",
            removeInteriorColors: "",
          },
          colData: [
            {
              field: "flag",
              headerName: "Flag",
              width: 80,
            },
            {
              field: "colorOptionPk",
              headerName: "옵션 코드",
              editable: true,
              width: 130,
            },
            {
              field: "carPk",
              headerName: "차량 코드",
              editable: true,
              width: 120,
            },
            {
              field: "colorOptionType",
              headerName: "색상 타입",
              editable: true,
              width: 110,
            },
            {
              field: "colorOptionPrice",
              headerName: "색상 가격",
              editable: true,
              width: 140,
            },
            {
              field: "colorOptionName",
              headerName: "색상명",
              editable: true,
              width: 160,
            },
            {
              field: "colorOptionCodes",
              headerName: "색상 코드",
              editable: true,
              width: 200,
            },
            {
              field: "removeExteriorColors",
              headerName: "제외 외장 색상",
              editable: true,
              width: 300,
            },
            {
              field: "removeInteriorColors",
              headerName: "제외 내장 색상",
              editable: true,
              width: 300,
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
          {/* <CarDefaultOption /> */}

          <div className={style.dataSection}>
            <AGGrid data={gridData} />
          </div>
        </div>
      </article>
    </CarDefaultProvider>
  );
}
