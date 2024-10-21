"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import { useCarInfoStore } from "@/store/carInfo";
import Image from "next/image";
import cx from "classnames";
import { EngineList } from "@/model/car/Info/EngineList";
import { CarSpec } from "@/model/car/Info/CarSpec";
import { BasicOptionDefine } from "@/model/car/BasicOptionDefine";
import Footer from "@/app/_component/Footer";

const BasicOptionCategory = [
  "외장/내장",
  "안전",
  "멀티미디어",
  "주차보조",
  "편의",
  "시트",
];

const TabList = ["엔진/트림", "상세옵션", "차량제원", "이미지", "출고후기"];

export default function CarInfoDetailPage() {
  const params = useParams();
  const detailModelName = params.detailModelName;
  // detailModelName 인코딩
  const detailModelNameDecoded = decodeURIComponent(detailModelName as string);

  const [carSpec, setCarSpec] = useState<CarSpec>();

  const [engineList, setEngineList] = useState<EngineList[]>([]);
  const [carYearList, setCarYearList] = useState<string[]>([]);
  const [carYear, setCarYear] = useState<string>("");
  const [engineInfo, setEngineInfo] = useState<string>("");
  const [trimName, setTrimName] = useState<string>("");

  // 엔진 선택시 트림 리스트
  const [selectedTrimList, setSelectedTrimList] = useState<any[]>([]);

  // 탭 상태관리
  const [activeTab, setActiveTab] = useState<string>("엔진/트림");
  const engineTrimRef = useRef<HTMLDivElement>(null);
  const detailOptionRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  // 상세옵션
  const [basicOptionList, setBasicOptionList] = useState<BasicOptionDefine[]>(
    []
  );
  const [standardOptions, setStandardOptions] = useState<string[]>([]);
  const [optionalOptions, setOptionalOptions] = useState<string[]>([]);

  // 처음만 불러오기용
  const [isReady, setIsReady] = useState<boolean>(false);

  // 목록에서 가져온 데이터
  const carInfoStore = useCarInfoStore();
  const { modelInfo, modelSpec } = carInfoStore;

  // 상세 모델의 트림 리스트 가져오기
  const getTrimList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/trim-names?detailModelName=${detailModelName}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      console.log(result.data);

      setEngineList(result.data);
      setCarYearList(
        result.data.reduce((acc: string[], engine: EngineList) => {
          if (!acc.includes(engine.carYear)) {
            acc.push(engine.carYear);
          }
          return acc;
        }, [])
      );
      setCarYear(result.data[0].carYear);
      setEngineInfo(result.data[0].engineInfo);
      setSelectedTrimList(result.data[0].trimNameList);
      setTrimName(result.data[0].trimNameList[0].trimName);
      setIsReady(true);
    } catch (error) {
      console.error("Failed to fetch trim list:", error);
    }
  };

  // 상세 모델 모든 정보(스펙, 기본옵션, 선택옵션, 색상옵션) 가져오기
  const getDetailModelInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/options?detailModelName=${detailModelNameDecoded}&carYear=${carYear}&engineInfo=${engineInfo}&trimName=${trimName}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      console.log(result.data);

      setCarSpec(result.data.carSpec[0]);
      setStandardOptions(
        result.data.basicOptionDetail[0].standardOptions.map(
          (option: BasicOptionDefine) => option.basicOptionDefinePk
        )
      );
      setOptionalOptions(
        result.data.basicOptionDetail[0].optionalOptions.map(
          (option: BasicOptionDefine) => option.basicOptionDefinePk
        )
      );
    } catch (error) {
      console.error("Failed to fetch trim list:", error);
    }
  };

  // 기본 옵션 가져오기
  const getBasicOptionDefineList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/car/basic-option-define`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      console.log(result.data);

      setBasicOptionList(result.data);
    } catch (error) {
      console.error("Failed to fetch basic option:", error);
    }
  };

  const handleTabClick = (tabName: string) => {
    let ref;

    switch (tabName) {
      case "엔진/트림":
        ref = engineTrimRef;
        break;
      case "상세옵션":
        ref = detailOptionRef;
        break;
      case "차량제원":
        ref = specRef;
        break;
      case "이미지":
        ref = imageRef;
        break;
      case "출고후기":
        ref = reviewRef;
        break;
    }

    if (ref && ref.current) {
      const yOffset =
        ref.current.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }

    setTimeout(() => {
      setActiveTab(tabName);
    }, 500);
  };

  useEffect(() => {
    if (!isReady) {
      getBasicOptionDefineList();
      getTrimList();
    } else if (isReady && carYear && engineInfo && trimName) {
      getDetailModelInfo();
    }
  }, [isReady, carYear, engineInfo, trimName]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 여유 공간을 둡니다

      if (
        engineTrimRef.current &&
        scrollPosition >= engineTrimRef.current.offsetTop
      ) {
        setActiveTab("엔진/트림");
      }
      if (
        detailOptionRef.current &&
        scrollPosition >= detailOptionRef.current.offsetTop
      ) {
        setActiveTab("상세옵션");
      }
      if (specRef.current && scrollPosition >= specRef.current.offsetTop) {
        setActiveTab("차량제원");
      }
      if (imageRef.current && scrollPosition >= imageRef.current.offsetTop) {
        setActiveTab("이미지");
      }
      if (reviewRef.current && scrollPosition >= reviewRef.current.offsetTop) {
        setActiveTab("출고후기");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={style.main}>
      <div className={style.summarySection}>
        <div className={style.imageSection}>
          <div className={style.normalImages}>
            <div className={style.carNormalImage}></div>
            <div className={style.carNormalImage}></div>
            <div className={style.carNormalImage}></div>
            <div className={style.carNormalImage}></div>
            {modelInfo.detailModelNormalImages.map((image, index) => (
              <div className={style.carNormalImage} key={index}></div>
            ))}
          </div>

          {modelInfo.detailModelMainImage ? (
            <Image
              className={style.carMainImage}
              src={modelInfo.detailModelMainImage}
              width={940}
              height={515}
              alt="차량 이미지"
            />
          ) : (
            <Image
              className={style.carMainImage}
              style={{ opacity: 0.5 }}
              src="/logo_text.png"
              width={940}
              height={940}
              alt="차량 이미지"
            />
          )}
        </div>

        <div className={style.summaryContent}>
          <div className={style.modelTitle}>
            <h1 className={style.modelName}>
              {detailModelNameDecoded}
              <span className={style.modelPrice}>
                ({Math.round(modelSpec.minCarPrice / 10000).toLocaleString()} ~
                {Math.round(modelSpec.maxCarPrice / 10000).toLocaleString()}
                만원)
              </span>
            </h1>
          </div>

          <div className={style.modelSpec}>
            <p>{modelSpec.carClass}</p>
            <p>{modelSpec.fuelTypes.join("/")}</p>
            <p>
              {modelSpec.minEngineDisplacement.toLocaleString()}~
              {modelSpec.maxEngineDisplacement.toLocaleString()}cc
            </p>
            <p>
              복합연비 {modelSpec.minFuelEfficiency}~
              {modelSpec.maxFuelEfficiency}㎞/ℓ
            </p>
          </div>

          <div className={style.colorSection}>
            <p className={style.colorTitle}>
              외장색상 <span className={style.colorName}>내추럴 티타늄</span>
            </p>
            <div className={style.colorContainer}>
              <div className={cx(style.colorOptionBox, style.active)}>
                <div className={style.colorBox}></div>
              </div>
              <div className={style.colorOptionBox}>
                <div className={style.colorBox}></div>
              </div>
              <div className={style.colorOptionBox}>
                <div className={style.colorBox}></div>
              </div>
            </div>
          </div>
          <div className={style.colorSection}>
            <p className={style.colorTitle}>
              내장색상 <span className={style.colorName}>내추럴 티타늄</span>
            </p>
            <div className={style.colorContainer}>
              <div className={cx(style.colorOptionBox, style.active)}>
                <div className={style.colorBox}></div>
              </div>
              <div className={style.colorOptionBox}>
                <div className={style.colorBox}></div>
              </div>
              <div className={style.colorOptionBox}>
                <div className={style.colorBox}></div>
              </div>
            </div>
          </div>

          <div className={style.buttonSection}>
            <button className={style.btn}>견적내기</button>
            <button className={cx(style.btn, style.outline)}>비교하기</button>
          </div>
        </div>
      </div>

      <div className={style.tabBox}>
        {TabList.map((tab) => (
          <div
            key={tab}
            className={cx(style.tab, {
              [style.tabActive]: activeTab === tab,
            })}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className={style.infoSection}>
        <div className={style.infoContent} ref={engineTrimRef}>
          <h2 className={style.infoTitle}>엔진/트림</h2>

          <div className={style.infoBox}>
            <h3 className={style.subTitle}>
              엔진{" "}
              <span className={style.infoName}>
                {carYear}년형 {engineInfo}
              </span>
            </h3>

            {carYearList.length > 0 &&
              carYearList.map((year) => (
                <div className={style.yearContainer} key={year}>
                  <h4 className={style.year}>{year}년형</h4>

                  <div className={style.listContainer}>
                    {engineList
                      .filter((engine) => engine.carYear === year)
                      .map((engine) => (
                        <div
                          className={cx(style.engineBox, {
                            [style.active]:
                              engine.carYear === carYear &&
                              engine.engineInfo === engineInfo,
                          })}
                          key={engine.carYear + engine.engineInfo}
                          onClick={() => {
                            setCarYear(engine.carYear);
                            setEngineInfo(engine.engineInfo);
                            setSelectedTrimList(engine.trimNameList);
                            setTrimName(engine.trimNameList[0].trimName);
                          }}
                        >
                          {engine.engineInfo}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          <div className={style.infoBox}>
            <h3 className={style.subTitle}>
              트림 <span className={style.infoName}>{trimName}</span>
            </h3>

            <div className={style.trimSection}>
              {selectedTrimList.map(
                (trim: { trimName: string; carPrice: number }) => (
                  <div
                    className={cx(style.trimBox, {
                      [style.active]: trim.trimName === trimName,
                    })}
                    key={trim.trimName}
                    onClick={() => setTrimName(trim.trimName)}
                  >
                    <p className={style.trimName}>{trim.trimName}</p>
                    <p className={style.trimPrice}>
                      <span className={style.trimOriginPrice}>
                        {Math.round(trim.carPrice / 10000).toLocaleString()}
                        만원
                      </span>
                      {Math.round(trim.carPrice / 10000).toLocaleString()}만원
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className={style.infoContent} ref={detailOptionRef}>
          <h2 className={style.infoTitle}>상세옵션</h2>

          {BasicOptionCategory.map((category) => (
            <div className={style.optionSection} key={category}>
              <h3 className={style.optionTitle}>{category}</h3>

              <div className={style.optionContainer}>
                {basicOptionList
                  .filter((option) => option.category === category)
                  .map((option) => (
                    <div
                      className={style.optionBox}
                      key={option.basicOptionDefinePk}
                    >
                      <p
                        className={cx(style.optionName, {
                          [style.disable]:
                            !optionalOptions.includes(
                              option.basicOptionDefinePk
                            ) &&
                            !standardOptions.includes(
                              option.basicOptionDefinePk
                            ),
                        })}
                      >
                        {option.basicOptionName}
                      </p>
                      {standardOptions.includes(option.basicOptionDefinePk) ? (
                        <Image
                          width={22}
                          height={22}
                          src="/icon/car/standard.svg"
                          alt="기본"
                        />
                      ) : optionalOptions.includes(
                          option.basicOptionDefinePk
                        ) ? (
                        <Image
                          width={22}
                          height={22}
                          src="/icon/car/option.svg"
                          alt="선택"
                        />
                      ) : (
                        <Image
                          width={22}
                          height={22}
                          src="/icon/car/none.svg"
                          alt="없음"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className={style.infoContent} ref={specRef}>
          <h2 className={style.infoTitle}>차량제원</h2>

          <p className={style.caption}>
            단위 : mm, 전고의 ()은 루프랙 장착 시 기준
          </p>

          <div className={style.infoBox}>
            <div className={style.specImageSection}>
              <div className={style.specImageContainer}>
                <div className={cx(style.lengthContainer, style.left)}>
                  <div className={style.lengthBox}></div>
                  <div className={style.length}>
                    {Number(carSpec?.carHeight).toLocaleString()}mm
                  </div>
                </div>

                <div className={style.detailImageBox}>
                  <Image
                    src="/car/car_front.svg"
                    width={252}
                    height={170}
                    alt="차량제원(앞) 이미지"
                  />

                  <div className={style.lengthContainer}>
                    <div className={cx(style.lengthBox, style.bottom)}></div>
                    <div className={style.length}>
                      {Number(carSpec?.carWidth).toLocaleString()}mm
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx(style.specImageContainer, style.right)}>
                <Image
                  src="/car/car_side.svg"
                  width={378}
                  height={135}
                  alt="차량제원(옆) 이미지"
                />

                <div className={style.lengthContainer}>
                  <div
                    className={cx(
                      style.lengthBox,
                      style.bottom,
                      style.wheelbase
                    )}
                  ></div>
                  <div className={style.length}>
                    {Number(carSpec?.carWheelbase).toLocaleString()}mm
                  </div>
                </div>
                <div className={style.lengthContainer}>
                  <div
                    className={cx(style.lengthBox, style.bottom, style.side)}
                  ></div>
                  <div className={style.length}>
                    {Number(carSpec?.carLength).toLocaleString()}mm
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={style.specSection}>
            <div className={style.specContainer}>
              <div className={style.specBox}>
                <p className={style.specLabel}>배기량 (cc)</p>
                <p className={style.value}>
                  {Number(carSpec?.engineDisplacement).toLocaleString() ?? "-"}
                </p>
              </div>
              <div className={cx(style.specBox, style.endBox)}>
                <p className={style.specLabel}>연비 (km/l)</p>
                <p className={style.value}>{carSpec?.fuelEfficiency ?? "-"}</p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>엔진 최대 토크 (kg,m/rpm)</p>
                <p className={style.value}>{carSpec?.engineTorque ?? "-"}</p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>엔진 최고 출력 (ps/rpm)</p>
                <p className={style.value}>{carSpec?.enginePower ?? "-"}</p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>모터 최대 토크 (kg,m)</p>
                <p className={style.value}>{carSpec?.motorTorque ?? "-"}</p>
              </div>
              <div className={cx(style.specBox, style.endBox)}>
                <p className={style.specLabel}>모터 최고 출력 (ps)</p>
                <p className={style.value}>{carSpec?.motorPower ?? "-"}</p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>엔진 형식</p>
                <p className={style.value}>{carSpec?.engineType ?? "-"}</p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>변속기 단수</p>
                <p className={style.value}>
                  {carSpec?.transmissionInfo ?? "-"}
                </p>
              </div>
            </div>
            <div className={style.specContainer}>
              <div className={style.specBox}>
                <p className={style.specLabel}>전고 (mm)</p>
                <p className={style.value}>
                  {Number(carSpec?.carHeight).toLocaleString() ?? "-"}
                </p>
              </div>
              <div className={cx(style.specBox, style.endBox)}>
                <p className={style.specLabel}>전폭 (mm)</p>
                <p className={style.value}>
                  {Number(carSpec?.carWidth).toLocaleString() ?? "-"}
                </p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>휠 베이스(축거) (mm)</p>
                <p className={style.value}>
                  {Number(carSpec?.carWheelbase).toLocaleString() ?? "-"}
                </p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>전장 (mm)</p>
                <p className={style.value}>
                  {Number(carSpec?.carLength).toLocaleString() ?? "-"}
                </p>
              </div>
              <div className={cx(style.specBox, style.endBox)}>
                <p className={style.specLabel}>공차중량 (kg)</p>
                <p className={style.value}>
                  {Number(carSpec?.carWeight).toLocaleString() ?? "-"}
                </p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>제로백 (초)</p>
                <p className={style.value}>{carSpec?.zeroToHundred ?? "-"}</p>
              </div>
              <div className={style.specBox}>
                <p className={style.specLabel}>승차 인원</p>
                <p className={style.value}>{carSpec?.carSeating ?? "-"}인승</p>
              </div>
            </div>
          </div>

          {carSpec?.engineType === "전기 모터" && (
            <>
              <h3 className={style.specSubTitle}>전기차</h3>

              <div className={style.specSection}>
                <div className={style.specContainer}>
                  {/* 전기차 */}
                  <div className={style.specBox}>
                    <p className={style.specLabel}>최대 속도 (km/h)</p>
                    <p className={style.value}>
                      {carSpec?.motorMaxSpeed ?? "-"}
                    </p>
                  </div>
                  <div className={style.specBox}>
                    <p className={style.specLabel}>주행 가능 거리(복합) (km)</p>
                    <p className={style.value}>
                      {carSpec?.motorDrivingRange ?? "-"}
                    </p>
                  </div>
                  <div className={style.specBox}>
                    <p className={style.specLabel}>가속성능 제로백 (초)</p>
                    <p className={style.value}>
                      {carSpec?.motorZeroToHundred ?? "-"}
                    </p>
                  </div>
                  <div className={style.specBox}>
                    <p className={style.specLabel}>배터리 용량 (kWh)</p>
                    <p className={style.value}>
                      {carSpec?.motorBatteryCapacity ?? "-"}
                    </p>
                  </div>
                </div>
                <div className={style.specContainer}>
                  <div className={style.specBox}>
                    <p className={style.specLabel}>충전방식</p>
                    <p className={style.value}>
                      {carSpec?.motorCharging ?? "-"}
                    </p>
                  </div>
                  <div className={style.specBox}>
                    <p className={style.specLabel}>급속 충전 시간</p>
                    <p className={style.value}>
                      {carSpec?.motorFastCharging ?? "-"}
                    </p>
                  </div>
                  <div className={style.specBox}>
                    <p className={style.specLabel}>완속 충전 시간</p>
                    <p className={style.value}>
                      {carSpec?.motorSlowCharging ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={style.carryingSection}>
            <h3 className={style.specSubTitle}>적재 정보</h3>

            <div className={style.carryingContainer}>
              <div className={style.carryingBox}>
                <div className={style.imageBox}>
                  {Array.from({ length: Number(carSpec?.trunkSuitcase) }).map(
                    (_, index) => (
                      <Image
                        key={index}
                        src="/icon/car/carrier.svg"
                        width={50}
                        height={50}
                        alt="캐리어"
                      />
                    )
                  )}
                </div>
                <p>
                  트렁크에 캐리어{" "}
                  <span className={style.highlight}>
                    {carSpec?.trunkSuitcase}개까지
                  </span>{" "}
                  적재 가능
                </p>
              </div>
              <div className={style.carryingBox}>
                <div className={style.imageBox}>
                  {carSpec?.trunkStroller?.split(" ").map((stroller, index) => {
                    if (stroller === "가능") return null;
                    let imageSrc = "";
                    switch (stroller) {
                      case "휴대용":
                        imageSrc = "/icon/car/baby_carriage_1.svg";
                        break;
                      case "절충형":
                        imageSrc = "/icon/car/baby_carriage_2.svg";
                        break;
                      case "디럭스":
                        imageSrc = "/icon/car/baby_carriage_3.svg";
                        break;
                      default:
                        return null;
                    }
                    return (
                      <Image
                        key={index}
                        src={imageSrc}
                        width={50}
                        height={50}
                        alt={stroller}
                      />
                    );
                  })}
                </div>
                <p>
                  트렁크에{" "}
                  <span className={style.highlight}>
                    {carSpec?.trunkStroller?.split(" ").slice(0, -1).join(", ")}
                  </span>{" "}
                  유모차까지 적재 가능
                </p>
              </div>
              <div className={style.carryingBox}>
                <div className={style.imageBox}>
                  {Array.from({ length: Number(carSpec?.trunkSuitcase) }).map(
                    (_, index) => (
                      <Image
                        key={index}
                        src="/icon/car/golf_bag.svg"
                        width={50}
                        height={50}
                        alt="골프백"
                      />
                    )
                  )}
                </div>
                <p>
                  트렁크에 골프백{" "}
                  <span className={style.highlight}>
                    {carSpec?.trunkSuitcase}개까지
                  </span>{" "}
                  적재 가능
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={style.infoContent} ref={imageRef}>
          <h2 className={style.infoTitle}>이미지 및 동영상</h2>

          <div className={cx(style.infoBox, style.imageBox)}>
            <div className={cx(style.image, style.first)}></div>
            <div className={style.subImageBox}>
              <div className={style.image}></div>
              <div className={style.image}></div>
              <div className={style.image}></div>
              <div className={style.image}></div>
              <div className={style.image}></div>
              <div className={style.imageMore}>+ 더보기</div>
            </div>
          </div>
        </div>

        <div className={style.infoContent} ref={reviewRef}>
          <h2 className={style.infoTitle}>출고 후기</h2>

          <div className={cx(style.infoBox, style.reviewBox)}>
            <h3 className={style.subTitle}>실제 구매 고객님들의 생생한 후기</h3>

            <div className={style.reviewSection}>
              <div className={style.reviewContainer}>
                <p className={style.reviewCar}>더 뉴 그랜저IG</p>

                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/icon/car/star.svg"
                      width={16}
                      height={16}
                      alt="별점"
                    />
                  ))}
                </div>

                <p className={style.reviewTitle}>렉스턴스포츠칸 출고 후기</p>

                <p className={style.reviewContent}>
                  처음에 이곳저곳을 아라보다가 유튜브 유명 중고차 딜러 몇 분께
                  의뢰를 드렸었는데 마음에 드는 차가 있어 대전에서 천안까지
                  한걸음에 달려왔습니다. 근데 말이죠! 완전 사기었던겁니다!!!
                  정말 열이 받지만 차가 이뻐서 5점 드릴게요.
                </p>

                <div className={style.reviewInfo}>
                  <p className={style.reviewUser}>
                    오승* <span className={style.reviewDisabled}>고객님</span>
                  </p>
                  <p className={style.reviewDisabled}>2023.10.26</p>
                </div>
              </div>
              <div className={style.reviewContainer}>
                <p className={style.reviewCar}>더 뉴 그랜저IG</p>

                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/icon/car/star.svg"
                      width={16}
                      height={16}
                      alt="별점"
                    />
                  ))}
                </div>

                <p className={style.reviewTitle}>렉스턴스포츠칸 출고 후기</p>

                <p className={style.reviewContent}>
                  처음에 이곳저곳을 아라보다가 유튜브 유명 중고차 딜러 몇 분께
                  의뢰를 드렸었는데 마음에 드는 차가 있어 대전에서 천안까지
                  한걸음에 달려왔습니다. 근데 말이죠! 완전 사기었던겁니다!!!
                  정말 열이 받지만 차가 이뻐서 5점 드릴게요.
                </p>

                <div className={style.reviewInfo}>
                  <p className={style.reviewUser}>
                    오승* <span className={style.reviewDisabled}>고객님</span>
                  </p>
                  <p className={style.reviewDisabled}>2023.10.26</p>
                </div>
              </div>
              <div className={style.reviewContainer}>
                <p className={style.reviewCar}>더 뉴 그랜저IG</p>

                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/icon/car/star.svg"
                      width={16}
                      height={16}
                      alt="별점"
                    />
                  ))}
                </div>

                <p className={style.reviewTitle}>렉스턴스포츠칸 출고 후기</p>

                <p className={style.reviewContent}>
                  처음에 이곳저곳을 아라보다가 유튜브 유명 중고차 딜러 몇 분께
                  의뢰를 드렸었는데 마음에 드는 차가 있어 대전에서 천안까지
                  한걸음에 달려왔습니다. 근데 말이죠! 완전 사기었던겁니다!!!
                  정말 열이 받지만 차가 이뻐서 5점 드릴게요.
                </p>

                <div className={style.reviewInfo}>
                  <p className={style.reviewUser}>
                    오승* <span className={style.reviewDisabled}>고객님</span>
                  </p>
                  <p className={style.reviewDisabled}>2023.10.26</p>
                </div>
              </div>
              <div className={style.reviewContainer}>
                <p className={style.reviewCar}>더 뉴 그랜저IG</p>

                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/icon/car/star.svg"
                      width={16}
                      height={16}
                      alt="별점"
                    />
                  ))}
                </div>

                <p className={style.reviewTitle}>렉스턴스포츠칸 출고 후기</p>

                <p className={style.reviewContent}>
                  처음에 이곳저곳을 아라보다가 유튜브 유명 중고차 딜러 몇 분께
                  의뢰를 드렸었는데 마음에 드는 차가 있어 대전에서 천안까지
                  한걸음에 달려왔습니다. 근데 말이죠! 완전 사기었던겁니다!!!
                  정말 열이 받지만 차가 이뻐서 5점 드릴게요.
                </p>

                <div className={style.reviewInfo}>
                  <p className={style.reviewUser}>
                    오승* <span className={style.reviewDisabled}>고객님</span>
                  </p>
                  <p className={style.reviewDisabled}>2023.10.26</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
