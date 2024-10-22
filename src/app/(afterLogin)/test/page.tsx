import EmblaCarousel from "@/app/_component/EmblaCarousel";
import style from "./page.module.css";
import cx from "classnames";
import Image from "next/image";
import Footer from "@/app/_component/Footer";
import Link from "next/link";

export default function TestPage() {
  return (
    <>
      <div className={style.container}>
        <section className={style.one}>
          {/* 배너 */}
          <EmblaCarousel />

          {/* 검색 */}
          <div className={style.searchSection}>
            <div className={style.searchContainer}>
              <label className={style.searchLabel} htmlFor="car">
                차량 검색
              </label>
              <input
                className={style.searchInput}
                type="text"
                id="car"
                placeholder="모델명을 입력하세요. 예) G80"
              />
            </div>

            <button className={style.searchButton}>검색</button>
          </div>

          {/* 기능 소개 */}
          <div className={style.featureSection}>
            <h2 className={style.title}>마스터카만의 기능</h2>

            <div className={style.featureContainer}>
              <div className={style.featureBox}></div>
              <div className={style.featureBox}></div>
              <div className={style.featureBox}></div>
              <div className={style.featureBox}></div>
            </div>
          </div>
        </section>

        <section className={style.two}>
          <div className={style.feature}>
            <div className={style.featureInfo}>
              <p className={style.caption}>맞춤형 신차 견적</p>
              <h1 className={style.featureTitle}>
                내게 맞는 차량,
                <br />
                합리적인 가격으로
              </h1>

              <p className={style.featureDescription}>
                원하는 옵션과 예산에 맞는 신차를 손쉽게 견적 내세요.
                <br />
                다양한 브랜드와 모델을 비교하고 나만의 완벽한 차량을 찾으세요.
              </p>

              <Link href="/car">
                <button className={style.featureButton}>견적 내러 가기</button>
              </Link>
            </div>

            <div className={style.IconSection}>
              <Image
                src="/main/test/estimate.png"
                width={522}
                height={532}
                alt="차량 견적 내기"
              />
              <Image
                className={style.coinOne}
                src="/main/test/coin_1.svg"
                width={84}
                height={81}
                alt="coin"
              />
              <Image
                className={style.coinTwo}
                src="/main/test/coin_2.svg"
                width={140}
                height={87}
                alt="coin"
              />
              <Image
                className={style.coinThree}
                src="/main/test/coin_3.svg"
                width={103}
                height={109}
                alt="coin"
              />
            </div>
          </div>
        </section>

        <section className={style.three}>
          <div className={style.feature}>
            <div className={style.IconSection}>
              <Image
                className={style.car}
                src="/main/test/car.png"
                width={452}
                height={273}
                alt="자량 정보 확인"
              />
              <Image
                className={style.lens}
                src="/main/test/lens.png"
                width={458}
                height={468}
                alt="돋보기"
              />
            </div>

            <div className={style.featureInfo}>
              <p className={style.caption}>최신 차량 정보</p>
              <h1 className={style.featureTitle}>
                믿을 수 있는 차량 정보,
                <br />한 눈에 보기 쉽게
              </h1>

              <p className={style.featureDescription}>
                국내외 인기 차량들의 상세한 스펙과 리뷰를 확인하세요.
                <br />
                성능, 연비, 가격 비교를 통해 최고의 선택을 할 수 있습니다.
              </p>

              <Link href="/car/info">
                <button className={style.featureButton}>정보 확인 하기</button>
              </Link>
            </div>
          </div>
        </section>

        <section className={style.four}>
          <div className={style.feature}>
            <div className={style.featureInfo}>
              <p className={style.caption}>차에 대한 이야기</p>
              <h1 className={style.featureTitle}>
                차를 좋아하고 아끼는
                <br />
                사람들과의 소통 창구
              </h1>

              <p className={style.featureDescription}>
                자동차에 대한 다양한 경험과 정보를 공유하는 커뮤니티에
                참여하세요.
                <br />
                서로의 노하우와 팁을 나누며 차에 대한 애정을 키워보세요.
              </p>

              <Link href="/community">
                <button className={style.featureButton}>이야기하러 가기</button>
              </Link>
            </div>

            <div className={style.IconSection}>
              <Image
                className={style.community}
                src="/main/test/community.png"
                width={438}
                height={408}
                alt="커뮤니티"
              />
              <Image
                className={style.heart}
                src="/main/test/heart.png"
                width={100}
                height={105}
                alt="coin"
              />
            </div>
          </div>
        </section>

        <section className={style.five}>
          <div className={style.feature}>
            <div className={style.IconSection}>
              <Image
                className={style.ground}
                src="/main/test/ground.png"
                width={414}
                height={212}
                alt="판"
              />
              <Image
                className={style.hammer}
                src="/main/test/hammer.png"
                width={356}
                height={298}
                alt="망치"
              />
              <Image
                className={style.coin}
                src="/main/test/coin_4.png"
                width={149}
                height={158}
                alt="동전"
              />
            </div>

            <div className={style.featureInfo}>
              <p className={style.caption}>차량 경매 가능</p>
              <h1 className={style.featureTitle}>
                원하는 차량,
                <br />
                최고의 가격으로 입찰
              </h1>

              <p className={style.featureDescription}>
                옥션을 통해 신뢰할 수 있는 딜러, 캐피탈과의 거래를 경험하세요.
                <br />
                차량을 경매로 보다 저렴하고 안전하게 구매할 수 있습니다.
              </p>

              <Link href="/auction/dealer">
                <button className={style.featureButton}>입찰하러 가기</button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer /> */}
    </>
  );
}
