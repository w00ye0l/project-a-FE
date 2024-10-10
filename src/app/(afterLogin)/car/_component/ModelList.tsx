"use client";

import { ModelInfo } from "@/model/car/Info/ModelInfo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./modelList.module.css";
import cx from "classnames";
import Image from "next/image";
import { useCarPriceStore } from "@/store/carPrice";
import DotSpinner from "@/app/_component/DotSpinner";
import CPagination from "../../community/_component/Pagination";
import { PageInfo } from "@/model/PageInfo";
import { getCarList } from "../_lib/getCarList";

export default function ModelList() {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [modelInfoList, setModelInfoList] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandName = searchParams.get("b");
  const pathname = usePathname();
  const carPriceStore = useCarPriceStore();

  // 모델 리스트 가져오기
  const getData = async ({ brandName }: { brandName: string | null }) => {
    setLoading(true);

    let page = 0;
    if (searchParams.has("page")) {
      page = Number(searchParams.get("page")) - 1;
    }

    try {
      const result = await getCarList({ brandName, pageNumber: page });

      if (result.data.content !== null) {
        setModelInfoList(result.data.content);
        setPageInfo({
          number: result.data.number,
          totalElements: result.data.totalElements,
          totalPages: result.data.totalPages,
          first: result.data.first,
          size: result.data.size,
          last: result.data.last,
        });
      }
    } catch (error) {
      console.error("Failed to fetch model details:", error);
    } finally {
      setLoading(false);
    }
  };

  // 견적내기 버튼 클릭 시 견적 페이지로 이동
  const onClickEstimateBtn = (
    modelName: string,
    detailModelName: string,
    detailModelMainImage: string,
    detailModelNormalImages: string[],
    detailModelColorImages: string[]
  ) => {
    const { reset, setSelectedBrand, setSelectedDetailModel } = carPriceStore;

    reset();

    // 브랜드 등록
    setSelectedBrand(modelName);
    // detailmodel 등록
    setSelectedDetailModel({
      detailModelName: detailModelName,
      detailModelMainImage: detailModelMainImage,
      detailModelNormalImages: detailModelNormalImages,
      detailModelColorImages: detailModelColorImages,
    });

    router.push(`/car/estimate/${detailModelName}`);
  };

  // 브랜드 이름 변경 시 모델 리스트 갱신
  useEffect(() => {
    getData({ brandName });
  }, [brandName]);

  // 페이지네이션 핸들러
  const handlePageMove = async (pageNumber: number) => {
    const result = await getCarList({
      brandName: brandName,
      pageNumber: pageNumber - 1,
    });

    console.log(pageNumber);
    console.log(result.data.content);

    setModelInfoList(result.data.content);
    setPageInfo({
      number: result.data.number,
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      first: result.data.first,
      size: result.data.size,
      last: result.data.last,
    });

    // 스크롤을 상단으로 이동
    window.scrollTo({ top: 0, left: 0 });

    /// url에 page 쿼리 추가
    // url 객체 생성
    const params = new URLSearchParams(searchParams);

    // page 쿼리 추가
    params.set("page", pageNumber.toString());

    // url 변경
    router.push(`${pathname}?${params.toString()}`);
  };

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
        {loading ? (
          <DotSpinner size={40} />
        ) : (
          modelInfoList.map((modelInfo) => (
            <div className={style.modelSection} key={modelInfo.detailModelName}>
              <div className={style.modelContainer}>
                <div className={style.modelInfoSection}>
                  <div className={style.modelInfoContainer}>
                    {modelInfo.detailModelMainImage ? (
                      <Image
                        className={style.modelImage}
                        src={modelInfo.detailModelMainImage}
                        width={940}
                        height={515}
                        alt={modelInfo.detailModelName}
                      />
                    ) : (
                      <div className={style.modelImage}></div>
                    )}

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
                          onClickEstimateBtn(
                            modelInfo.brandName,
                            modelInfo.detailModelName,
                            modelInfo.detailModelMainImage,
                            modelInfo.detailModelNormalImages,
                            modelInfo.detailModelColorImages
                          )
                        }
                        className={style.infoBtn}
                      >
                        정보 보기
                      </button>
                    </div>
                  </div>

                  <h2 className={style.carName}>{modelInfo.detailModelName}</h2>

                  <p className={style.carPrice}>
                    {Math.round(
                      modelInfo.detailModelSpec.minCarPrice / 10000
                    ).toLocaleString()}
                    <span className={style.priceUnit}> 만원 ~</span>
                  </p>
                </div>

                <button
                  onClick={() =>
                    onClickEstimateBtn(
                      modelInfo.brandName,
                      modelInfo.detailModelName,
                      modelInfo.detailModelMainImage,
                      modelInfo.detailModelNormalImages,
                      modelInfo.detailModelColorImages
                    )
                  }
                  className={style.estimateBtn}
                >
                  견적 내기
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {pageInfo && (
        <div className={style.paginationSection}>
          <CPagination handlePageMove={handlePageMove} pageInfo={pageInfo} />
        </div>
      )}
    </div>
  );
}
