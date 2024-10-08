"use client";

import { useCarPriceStore } from "@/store/carPrice";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import cx from "classnames";
import style from "./estimateButtons.module.css";

export default function EstimateButtons() {
  const router = useRouter();
  const path = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const detailModelName = params.detailModelName;
  const carPriceStore = useCarPriceStore();

  // 버튼 disabled 여부
  // const isDisabled = () => {
  //   if (path.includes("end")) {
  //     return false;
  //   } else if (path.includes("option")) {
  //     return carPriceStore.selectedCarBasicOption.basicOptionPk === 0;
  //   } else if (path.includes("interior")) {
  //     return carPriceStore.selectedInteriorColor.pk === "";
  //   } else if (path.includes("exterior")) {
  //     return carPriceStore.selectedExteriorColor.pk === "";
  //   }
  // };

  // 이전 페이지로 이동
  const onClickPreButton = () => {
    let url = "";

    if (path.includes("end")) {
      url = `/car/estimate/${detailModelName}/option?`;
    } else if (path.includes("option")) {
      url = `/car/estimate/${detailModelName}/interior?`;
    } else if (path.includes("interior")) {
      url = `/car/estimate/${detailModelName}/exterior?`;
    } else if (path.includes("exterior")) {
      url = `/car/estimate/${detailModelName}?`;
    } else {
      router.push("/car");
      return;
    }

    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (url.includes(key)) return;

        if (url.endsWith("?")) {
          url += `${key}=${value}`;
        } else {
          url += `&${key}=${value}`;
        }
      });
    }

    router.push(url);
  };

  // 다음 페이지로 이동
  const onClickNextButton = () => {
    const { carYear, engineInfo, trimName } = carPriceStore.selectedCarInfo;
    let url = "";

    if (path.includes("option")) {
      url = `/car/estimate/end?`;
    } else if (path.includes("interior")) {
      url = `/car/estimate/${detailModelName}/option?`;
    } else if (path.includes("exterior")) {
      url = `/car/estimate/${detailModelName}/interior?`;
    } else {
      url = `/car/estimate/${detailModelName}/exterior`;
      url += `?carYear=${carYear}&engineInfo=${engineInfo}&trimName=${trimName}`;
    }

    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (url.includes(key)) return;

        if (url.endsWith("?")) {
          url += `${key}=${value}`;
        } else {
          url += `&${key}=${value}`;
        }
      });
    }

    router.push(url);
  };

  return (
    <div className={style.btnSection}>
      <button className={cx(style.btn, style.pre)} onClick={onClickPreButton}>
        이전
      </button>
      <button
        className={cx(style.btn, style.next)}
        onClick={onClickNextButton}
        // disabled={isDisabled()}
      >
        계속
      </button>
    </div>
  );
}
