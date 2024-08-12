"use client";

import { ModelInfo } from "@/model/car/Info/ModelInfo";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./modelList.module.css";
import Image from "next/image";
import { useCarPriceStore } from "@/store/carPrice";

export default function ModelList() {
  // const [brandName, setBrandName] = useState<string>("");
  const [modelInfoList, setModelInfoList] = useState<ModelInfo[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandName = searchParams.get("b");
  console.log(brandName);
  const carPriceStore = useCarPriceStore();

  // 모델 리스트 가져오기
  const getDetailModelList = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/user-page/detail-models?brandName=${
          brandName === null ? "" : brandName
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result.data);

      setModelInfoList(result.data);
    } catch (error) {
      console.error("Failed to fetch model details:", error);
    }
  };

  // 견적내기 버튼 클릭 시 견적 페이지로 이동
  const onClickEstimateBtn = (detailModelName: string) => {
    // detailmodel 등록
    carPriceStore.setSelectedDetailModel(detailModelName);

    // 견적 페이지로 이동
    router.push(`/car/estimate/${detailModelName}`);
  };

  // 브랜드 이름 변경 시 모델 리스트 갱신
  useEffect(() => {
    getDetailModelList();
  }, [brandName]);

  return (
    <div className={style.main}>
      <h1>시판모델</h1>

      {modelInfoList
        .filter((modelInfo) => modelInfo.modelList.length > 0)
        .map((modelInfo) => (
          <div className={style.modelSection} key={modelInfo.brandName}>
            {modelInfo.modelList.map((model) => (
              <div className={style.modelContainer} key={model.modelName}>
                {/* 차량 정보 */}
                {model.detailModelList.map((detailModel) => (
                  <div
                    className={style.modelInfoSection}
                    key={detailModel.detailModelName}
                  >
                    <div className={style.modelInfoContainer}>
                      {/* 모델 이미지 */}
                      {/* <Image
                        className={style.modelImage}
                        src=""
                        alt=""
                        width={200}
                        height={100}
                      /> */}
                      <div className={style.modelImage}></div>

                      {/* 브랜드, 모델 이름 및 차량 스펙 요약 */}
                      <div className={style.modelInfoBox}>
                        <div className={style.infoTitle}>
                          <Image
                            className={style.brandImg}
                            src={`/brand/${modelInfo.brandName}.jpg`}
                            alt=""
                            width={30}
                            height={30}
                          />
                          <p className={style.modelName}>
                            {modelInfo.brandName} {detailModel.detailModelName}
                          </p>
                        </div>

                        <div className={style.modelSpec}>
                          <span>{detailModel.detailModelSpec.carClass}</span>
                          <span>
                            {detailModel.detailModelSpec.fuelTypes.map(
                              (fuelType, idx) =>
                                detailModel.detailModelSpec.fuelTypes.length -
                                  1 !==
                                idx
                                  ? fuelType + "+"
                                  : fuelType
                            )}
                          </span>
                          <span>
                            {detailModel.detailModelSpec.minEngineDisplacement +
                              "~" +
                              detailModel.detailModelSpec
                                .maxEngineDisplacement +
                              "cc"}
                          </span>
                          <span>
                            {"복합연비 " +
                              detailModel.detailModelSpec.minFuelEfficiency +
                              "~" +
                              detailModel.detailModelSpec.maxFuelEfficiency +
                              "㎞/ℓ"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 출고가 및 견적내기 버튼 */}
                    <div className={style.priceEstimateContainer}>
                      <p className={style.carPrice}>
                        {"출고가 " +
                          Math.round(
                            detailModel.detailModelSpec.minCarPrice / 10000
                          ).toLocaleString() +
                          "만원 ~"}
                      </p>

                      <button
                        onClick={() =>
                          onClickEstimateBtn(detailModel.detailModelName)
                        }
                        className={style.estimateBtn}
                      >
                        견적내기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
