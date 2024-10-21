"use client";

import { ModelInfo } from "@/model/car/Info/ModelInfo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./modelList.module.css";
import cx from "classnames";
import DotSpinner from "@/app/_component/DotSpinner";
import CPagination from "../../community/_component/Pagination";
import { PageInfo } from "@/model/PageInfo";
import { getCarList } from "../_lib/getCarList";
import CarBox from "@/app/(afterLogin)/car/_component/CarBox";

export default function ModelList({ type }: { type?: string }) {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [modelInfoList, setModelInfoList] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandName = searchParams.get("b");
  const pathname = usePathname();

  // 모델 리스트 가져오기
  const getData = async ({ brandName }: { brandName: string | null }) => {
    setLoading(true);

    let page = 0;
    if (searchParams.has("page")) {
      page = Number(searchParams.get("page")) - 1;
    }

    try {
      const result = await getCarList({ brandName, pageNumber: page });

      console.log({ result });

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
      <div className={style.menuSection}>
        {type !== "info" && (
          <div className={style.tabBox}>
            <div className={cx(style.tab, style.tabActive)}>전체</div>
            <div className={style.tab}>렌트</div>
            <div className={style.tab}>리스</div>
          </div>
        )}

        <fieldset className={style.searchField}>
          <input
            type="text"
            className={style.search}
            placeholder="차량을 검색해 보세요."
          />
          <span className={style.searchIcon}></span>
        </fieldset>
      </div>

      <div className={style.sortContainer}>
        <p className={cx(style.sort, style.sortActive)}>인기순</p>
        <div className={style.divider}></div>
        <p className={cx(style.sort)}>가격순</p>
        <div className={style.divider}></div>
        <p className={cx(style.sort)}>연비순</p>
        {/* <div className={style.divider}></div>
        <p className={cx(style.sort)}>이용료 낮은순(렌트)</p>
        <div className={style.divider}></div>
        <p className={cx(style.sort)}>이용료 낮은순(리스)</p> */}
      </div>

      <div className={style.modelPart}>
        {loading ? (
          <DotSpinner size={40} />
        ) : (
          modelInfoList.map((modelInfo) => (
            <CarBox
              type={type}
              modelInfo={modelInfo}
              key={modelInfo.detailModelName}
            />
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
