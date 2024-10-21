import { ModelInfo } from "@/model/car/Info/ModelInfo";
import style from "./carBox.module.css";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCarPriceStore } from "@/store/carPrice";
import { useCarInfoStore } from "@/store/carInfo";

export default function CarBox({
  type,
  modelInfo,
}: {
  type?: string;
  modelInfo: ModelInfo;
}) {
  const router = useRouter();
  const carPriceStore = useCarPriceStore();
  const carInfoStore = useCarInfoStore();

  // 견적내기 버튼 클릭 시 견적 페이지로 이동
  const onClickEstimateBtn = (
    brandName: string,
    detailModelPk: string,
    detailModelName: string,
    detailModelMainImage: string,
    detailModelNormalImages: string[],
    detailModelColorImages: string[]
  ) => {
    const { reset, setSelectedBrand, setSelectedDetailModel } = carPriceStore;

    reset();

    // 브랜드 등록
    setSelectedBrand(brandName);
    // detailmodel 등록
    setSelectedDetailModel({
      detailModelPk: detailModelPk,
      detailModelName: detailModelName,
      detailModelMainImage: detailModelMainImage,
      detailModelNormalImages: detailModelNormalImages,
      detailModelColorImages: detailModelColorImages,
    });

    router.push(`/car/estimate/${detailModelName}`);
  };

  const onClickInfoBtn = () => {
    const { setModelInfo, setModelSpec } = carInfoStore;

    setModelInfo({
      detailModelName: modelInfo.detailModelName,
      detailModelMainImage: modelInfo.detailModelMainImage,
      detailModelNormalImages: modelInfo.detailModelNormalImages,
      detailModelColorImages: modelInfo.detailModelColorImages,
    });

    setModelSpec({
      carClass: modelInfo.detailModelSpec.carClass,
      fuelTypes: modelInfo.detailModelSpec.fuelTypes,
      maxDiscountPercent: modelInfo.detailModelSpec.maxDiscountPercent,
      minCarPrice: modelInfo.detailModelSpec.minCarPrice,
      maxCarPrice: modelInfo.detailModelSpec.maxCarPrice,
      minEngineDisplacement: modelInfo.detailModelSpec.minEngineDisplacement,
      maxEngineDisplacement: modelInfo.detailModelSpec.maxEngineDisplacement,
      minFuelEfficiency: modelInfo.detailModelSpec.minFuelEfficiency,
      maxFuelEfficiency: modelInfo.detailModelSpec.maxFuelEfficiency,
      priority: modelInfo.detailModelSpec.priority,
    });

    router.push(`/info/${modelInfo.detailModelName}`);
  };

  return (
    <div
      className={cx({
        [style.modelSection]: type !== "info",
        [style.infoSection]: type === "info",
      })}
      onClick={() => {
        if (type !== "info") {
          onClickEstimateBtn(
            modelInfo.brandName,
            modelInfo.detailModelPk,
            modelInfo.detailModelName,
            modelInfo.detailModelMainImage,
            modelInfo.detailModelNormalImages,
            modelInfo.detailModelColorImages
          );
        }
      }}
    >
      <div className={style.imageContainer}>
        <div className={style.brandBox}>
          <Image
            className={style.brandImg}
            src={`/brand/${modelInfo.brandName}.jpg`}
            alt=""
            width={90}
            height={60}
          />
          <p className={style.brandName}>{modelInfo.brandName}</p>
        </div>

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

        {type === "info" && (
          <div className={style.buttonSection}>
            <button
              className={style.btn}
              onClick={() => {
                onClickEstimateBtn(
                  modelInfo.brandName,
                  modelInfo.detailModelPk,
                  modelInfo.detailModelName,
                  modelInfo.detailModelMainImage,
                  modelInfo.detailModelNormalImages,
                  modelInfo.detailModelColorImages
                );
              }}
            >
              견적
              <br />
              내기
            </button>
            <button
              className={cx(style.btn, style.fillBtn)}
              onClick={() => {
                onClickInfoBtn();
              }}
            >
              정보
              <br />
              보기
            </button>
          </div>
        )}
      </div>

      {type !== "info" ? (
        <>
          <div className={style.modelInfoBox}>
            <h2 className={style.carName}>{modelInfo.detailModelName}</h2>

            <div
              onClick={
                (e) => {
                  e.stopPropagation();
                  console.log("info");
                }
                // onClickEstimateBtn(
                //   modelInfo.brandName,
                //   modelInfo.detailModelName,
                //   modelInfo.detailModelMainImage,
                //   modelInfo.detailModelNormalImages,
                //   modelInfo.detailModelColorImages
                // )
              }
              className={style.infoBtn}
            >
              정보 보기
            </div>
          </div>

          <p className={style.fuel}>
            복합 {modelInfo.detailModelSpec.minFuelEfficiency}~
            {modelInfo.detailModelSpec.maxFuelEfficiency}km/ℓ
          </p>

          <div className={style.priceSection}>
            <div className={style.priceContainer}>
              <p className={style.price}>
                <span className={style.carPrice}>
                  {Math.round(
                    modelInfo.detailModelSpec.minCarPrice / 10000
                  ).toLocaleString()}
                </span>
                만원 ~
              </p>
              <p className={style.originPrice}>
                {Math.round(
                  modelInfo.detailModelSpec.minCarPrice / 10000
                ).toLocaleString()}{" "}
                만원
              </p>
            </div>

            <div className={style.sale}>-%</div>
          </div>

          <p className={style.discount}>
            최대 할인 <span className={style.discountPrice}>-만원</span>
          </p>
        </>
      ) : (
        <div className={style.modelInfoBox}>
          <h2 className={style.carName}>{modelInfo.detailModelName}</h2>
        </div>
      )}

      {/* <button
          className={style.estimateBtn}
        >
          견적 내기
        </button> */}
    </div>
  );
}
