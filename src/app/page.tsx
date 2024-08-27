import Image from "next/image";
import style from "./page.module.css";
import cx from "classnames";
import EmblaCarousel from "./_component/EmblaCarousel";

export default function Home() {
  return (
    <main className={style.main}>
      {/* 배너 */}
      {/* <div className={style.bannerSection}>
        <div className={style.bannerContainer}>
          <Image
            className={style.ad}
            src="/main/test_ads.png"
            width={100}
            height={100}
            alt="ads"
          />
        </div>
      </div> */}
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
          <div className={style.contentBox}>
            <Image
              className={style.contentImg}
              src="/main/icon/estimate.png"
              alt=""
              width={200}
              height={160}
            />
            <div className={style.contentNameBox}>
              <p className={style.contentName}>신차견적</p>
            </div>
          </div>
          <div className={style.contentBox}>
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
          <div className={style.contentBox}>
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
          <div className={style.contentBox}>
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
      </div>

      {/* 프리뷰 */}
      <div className={style.previewSection}>
        <div className={cx(style.previewContainer, style.left)}>
          <div className={style.titleBox}>
            <h1 className={style.title}>으라차차 !</h1>
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
                src="/main/car/cona.png"
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
              <p className={style.caption}>멘트 고갈 당했다 뭐라고 쓰지</p>
              <h1 className={style.featureTitle}>
                멘트 고갈 당했다 뭐라고 쓰지
                <br />
                멘트 고갈 당했다 뭐라고 쓰지
              </h1>

              <p>멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>
                멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지멘트
                고갈 당했다
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
            <Image
              src="/main/info.png"
              width={460}
              height={360}
              alt="estimate"
            />

            <div className={style.featureInfo}>
              <p className={style.caption}>멘트 고갈 당했다 뭐라고 쓰지</p>
              <h1 className={style.featureTitle}>
                멘트 고갈 당했다 뭐라고 쓰지
                <br />
                멘트 고갈 당했다 뭐라고 쓰지
              </h1>

              <p>멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>
                멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지멘트
                고갈 당했다
              </p>
            </div>
          </div>

          <div className={style.featureBox}>
            <div className={style.featureInfo}>
              <p className={style.caption}>멘트 고갈 당했다 뭐라고 쓰지</p>
              <h1 className={style.featureTitle}>
                멘트 고갈 당했다 뭐라고 쓰지
                <br />
                멘트 고갈 당했다 뭐라고 쓰지
              </h1>

              <p>멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>
                멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지멘트
                고갈 당했다
              </p>
            </div>

            <Image
              src="/main/community.png"
              width={460}
              height={360}
              alt="estimate"
            />
          </div>

          <div className={cx(style.featureBox, style.rightFeature)}>
            <Image
              src="/main/auction.png"
              width={460}
              height={360}
              alt="estimate"
            />

            <div className={style.featureInfo}>
              <p className={style.caption}>멘트 고갈 당했다 뭐라고 쓰지</p>
              <h1 className={style.featureTitle}>
                멘트 고갈 당했다 뭐라고 쓰지
                <br />
                멘트 고갈 당했다 뭐라고 쓰지
              </h1>

              <p>멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지</p>
              <p>
                멘트 고갈 당했다 뭐라고 쓰지멘트 고갈 당했다 뭐라고 쓰지멘트
                고갈 당했다
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className={style.footerSection}>
        <div className={style.footerContainer}>
          <h2>회사 소개</h2>
        </div>
      </footer>

      <div className={style.counselBtn}>
        <Image
          className={style.icon}
          src="/icon/counsel.png"
          alt=""
          width={36}
          height={54.27}
        />
      </div>
    </main>
  );
}
