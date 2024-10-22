import Image from "next/image";
import style from "./page.module.css";
import cx from "classnames";
import EmblaCarousel from "./_component/EmblaCarousel";
import Link from "next/link";
import Footer from "./_component/Footer";
import MenuButtons from "./_component/MeunButtons";

export default function Home() {
  return (
    <main className={style.main}>
      {/* 배너 */}
      <EmblaCarousel />

      {/* 메인 컨텐츠 */}
      <div className={style.contentSection}>
        <Image
          className={style.ads}
          src="/main/test_ads_top.png"
          width={1200}
          height={100}
          alt="ads"
        />

        <div className={style.contentContainer}>
          <Link href="/car">
            <div className={style.contentBox}>
              <div className={style.contentImageBox}>
                <Image
                  className={style.contentImg}
                  src="/main/icon/estimate.png"
                  alt=""
                  width={200}
                  height={160}
                />
              </div>
              <div className={style.contentNameBox}>
                <p className={style.contentName}>신차견적</p>
              </div>
            </div>
          </Link>

          <Link href="/car">
            <div className={style.contentBox}>
              <div className={style.contentImageBox}>
                <Image
                  className={style.contentImg}
                  src="/main/icon/info.png"
                  alt=""
                  width={200}
                  height={160}
                />
                <div className={style.contentNameBox}>
                  <p className={style.contentName}>차량정보</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/community">
            <div className={style.contentBox}>
              <div className={style.contentImageBox}>
                <Image
                  className={style.contentImg}
                  src="/main/icon/community.png"
                  alt=""
                  width={200}
                  height={160}
                />
                <div className={style.contentNameBox}>
                  <p className={style.contentName}>커뮤니티</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/auction/dealer">
            <div className={style.contentBox}>
              <div className={style.contentImageBox}>
                <Image
                  className={style.contentImg}
                  src="/main/icon/auction.png"
                  alt=""
                  width={200}
                  height={160}
                />
                <div className={style.contentNameBox}>
                  <p className={style.contentName}>딜러옥션</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 프리뷰 */}
      <div className={style.previewSection}>
        <div className={cx(style.previewContainer, style.left)}>
          <div className={style.titleBox}>
            <h1 className={style.title}>마스터카 !</h1>
            <p className={style.subtitle}>
              시작부터 끝까지 고객님께
              <span className={cx(style.point, style.rotate)}>꼭</span>
              <span className={style.point}>맞</span>
              <span className={style.point}>는</span>
              <br />
              최적의 차량으로 안내드립니다.
            </p>
          </div>

          <Image
            className={style.captain}
            src="/main/captain.png"
            width={450}
            height={450}
            alt="captain"
          />
        </div>

        <div className={cx(style.previewContainer, style.right)}>
          <h2 className={style.previewTitle}>
            렌터카 즉시출고 <span className={style.hot}>핫</span> 딜!
          </h2>
          <div className={style.hotDealPreview}>
            <div className={style.hotDealContainer}>
              <Image
                src="/main/car/grandeur.png"
                width={180}
                height={120}
                alt="grandeur"
              />

              <div className={style.hotDealInfo}>
                <p className={style.hotDealBrand}>현대</p>
                <p className={style.hotDealCar}>디 올 뉴 그랜저 (GN7)</p>
              </div>
            </div>

            <div className={style.hotDealDotButton}>
              <div className={style.hotDealDot}></div>
              <div className={style.hotDealDot}></div>
              <div className={cx(style.hotDealDot, style.activeDot)}></div>
              <div className={style.hotDealDot}></div>
              <div className={style.hotDealDot}></div>
            </div>
          </div>

          <h2 className={style.previewTitle}>국산차 인기 순위</h2>
          <div className={style.rankPreview}>
            <div className={style.rankBox}>
              <p className={style.rank}>1</p>
              <Image
                src="/main/car/cona.png"
                width={120}
                height={70}
                alt="cona"
              />
              <div className={style.rankInfo}>
                <div className={style.rankCar}>
                  <p className={style.rankName}>코나</p>
                  <p className={style.rankBrand}>현대</p>
                </div>
                <p className={style.rankTrim}>2024년 가솔린 터보 1.6</p>
              </div>
            </div>
            <div className={style.rankBox}>
              <p className={style.rank}>2</p>
              <Image
                src="/main/car/carnival.png"
                width={120}
                height={70}
                alt="cona"
              />
              <div className={style.rankInfo}>
                <div className={style.rankCar}>
                  <p className={style.rankName}>카니발</p>
                  <p className={style.rankBrand}>기아</p>
                </div>
                <p className={style.rankTrim}>2024년 가솔린 터보 3.5 (7인승)</p>
              </div>
            </div>
            <div className={style.rankBox}>
              <p className={style.rank}>3</p>
              <Image
                src="/main/car/sportage.png"
                width={120}
                height={70}
                alt="cona"
              />
              <div className={style.rankInfo}>
                <div className={style.rankCar}>
                  <p className={style.rankName}>스포티지</p>
                  <p className={style.rankBrand}>기아</p>
                </div>
                <p className={style.rankTrim}>
                  2024년 가솔린 터보 1.6 하이브리드 2WD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.featureSection}>
        <div className={style.featureContainer}>
          <div className={style.featureBox}>
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
            </div>

            <Image
              src="/main/estimate.png"
              width={460}
              height={360}
              alt="estimate"
            />
          </div>

          <div className={cx(style.featureBox, style.rightFeature)}>
            <Image src="/main/info.png" width={460} height={360} alt="info" />

            <div className={style.featureInfo}>
              <p className={style.caption}>최신 차량 정보</p>
              <h1 className={style.featureTitle}>
                믿을 수 있는 차량 정보,
                <br />
                한눈에
              </h1>

              <p className={style.featureDescription}>
                국내외 인기 차량들의 상세한 스펙과 리뷰를 확인하세요.
                <br />
                성능, 연비, 가격 비교를 통해 최고의 선택을 할 수 있습니다.
              </p>
            </div>
          </div>

          <div className={style.featureBox}>
            <div className={style.featureInfo}>
              <p className={style.caption}>차에 대한 이야기</p>
              <h1 className={style.featureTitle}>
                차를 사랑하는 사람들과의 소통
              </h1>

              <p className={style.featureDescription}>
                자동차에 대한 다양한 경험과 정보를 공유하는 커뮤니티에
                참여하세요.
                <br />
                서로의 노하우와 팁을 나누며 차에 대한 애정을 키워보세요.
              </p>
            </div>

            <Image
              className={style.featureImage}
              src="/main/community.png"
              width={460}
              height={360}
              alt="community"
            />
          </div>

          <div className={cx(style.featureBox, style.rightFeature)}>
            <Image
              src="/main/auction.png"
              width={460}
              height={360}
              alt="auction"
            />

            <div className={style.featureInfo}>
              <p className={style.caption}>차량 경매</p>
              <h1 className={style.featureTitle}>
                원하는 차량,
                <br />
                최고의 가격으로
              </h1>

              <p className={style.featureDescription}>
                옥션을 통해 신뢰할 수 있는 딜러, 캐피탈과의 거래를 경험하세요.
                <br />
                차량을 경매로 보다 저렴하고 안전하게 구매할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <MenuButtons />
    </main>
  );
}
