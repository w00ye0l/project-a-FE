"use client";

import { ModelInfo } from "@/model/car/Info/ModelInfo";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./modelList.module.css";
import cx from "classnames";
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
      <div className={style.sortContainer}>
        <p className={cx(style.sort, style.sortActive)}>인기순</p>
        <div className={style.divider}></div>
        <p className={cx(style.sort)}>가격순</p>
        <div className={style.divider}></div>
        <p className={cx(style.sort)}>최근출시순</p>
      </div>

      <div className={style.modelPart}>
        {modelInfoList
          .filter((modelInfo) => modelInfo.modelList.length > 0)
          .map((modelInfo) => (
            <div className={style.modelSection} key={modelInfo.brandName}>
              {modelInfo.modelList.map((model) => (
                <div className={style.modelContainer} key={model.modelName}>
                  {/* 차량 정보 */}
                  {model.detailModelList.map((detailModel) => (
                    <div key={detailModel.detailModelName}>
                      <div className={style.modelInfoSection}>
                        <div className={style.modelInfoContainer}>
                          <div className={style.modelImage}></div>

                          <div className={style.modelInfoBox}>
                            <div className={style.brandBox}>
                              <Image
                                className={style.brandImg}
                                src={`/brand/${modelInfo.brandName}.jpg`}
                                alt=""
                                width={90}
                                height={60}
                              />
                              <p>{modelInfo.brandName}</p>
                            </div>

                            <button
                              onClick={() =>
                                onClickEstimateBtn(detailModel.detailModelName)
                              }
                              className={style.infoBtn}
                            >
                              정보 보기
                            </button>
                          </div>
                        </div>

                        <h2 className={style.carName}>
                          {detailModel.detailModelName}
                        </h2>

                        <p className={style.carPrice}>
                          {Math.round(
                            detailModel.detailModelSpec.minCarPrice / 10000
                          ).toLocaleString()}
                          <span className={style.priceUnit}> 만원 ~</span>
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          onClickEstimateBtn(detailModel.detailModelName)
                        }
                        className={style.estimateBtn}
                      >
                        견적 내기
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
