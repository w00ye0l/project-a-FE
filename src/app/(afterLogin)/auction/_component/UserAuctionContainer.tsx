import Image from "next/image";
import style from "./userAuctionContainer.module.css";
import cx from "classnames";
import AuctionContainer from "./AuctionContainer";

export default function UserAuctionContainer() {
  return (
    <div className={style.main}>
      <div className={style.tabBox}>
        <div className={style.tab}>구매희망 옵션</div>
      </div>

      <div className={style.contentSection}>
        <div className={style.contentContainer}>
          <div className={style.contentBox}>
            <h2 className={style.contentTitle}>구매희망 방법</h2>
            <div className={style.contents}>
              <div className={cx(style.content, style.divide)}>
                <div className={style.buyTypeBox}>
                  <input
                    className={style.buyType}
                    type="checkbox"
                    name=""
                    id="cash"
                  />
                  <label className={style.buyTypeLabel} htmlFor="cash">
                    현금
                  </label>
                </div>
                <div className={style.buyTypeBox}>
                  <input
                    className={style.buyType}
                    type="checkbox"
                    name=""
                    id="month"
                    checked
                  />
                  <label
                    className={cx(style.buyTypeLabel, style.active)}
                    htmlFor="month"
                  >
                    할부
                  </label>
                </div>
                <div className={style.buyTypeBox}>
                  <input
                    className={style.buyType}
                    type="checkbox"
                    name=""
                    id="rent"
                    checked
                  />
                  <label
                    className={cx(style.buyTypeLabel, style.active)}
                    htmlFor="rent"
                  >
                    렌트
                  </label>
                </div>
                <div className={style.buyTypeBox}>
                  <input
                    className={style.buyType}
                    type="checkbox"
                    name=""
                    id="lease"
                  />
                  <label className={style.buyTypeLabel} htmlFor="lease">
                    리스
                  </label>
                </div>
                <div className={style.buyTypeBox}>
                  <input
                    className={style.buyType}
                    type="checkbox"
                    name=""
                    id="all"
                  />
                  <label className={style.buyTypeLabel} htmlFor="all">
                    상관없음
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={style.contentBox}>
            <h2 className={style.contentTitle}>견적여부</h2>
            <div className={style.contents}>
              <div className={style.content}>
                <div className={style.estimateBox}>
                  <Image
                    className={style.estimateImage}
                    src="/icon/yes_active.png"
                    width={36}
                    height={36}
                    alt="yes"
                  />
                  <p className={cx(style.estimateLabel, style.active)}>
                    견적 받아본 적 있음
                  </p>
                </div>
                <div className={style.estimateBox}>
                  <Image
                    className={style.estimateImage}
                    src="/icon/no.png"
                    width={36}
                    height={36}
                    alt="yes"
                  />
                  <p className={style.estimateLabel}>견적 받아본 적 없음</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.contentContainer}>
          <div className={style.contentBox}>
            <h2 className={style.contentTitle}>구매희망 색상</h2>
            <div className={style.contents}>
              <div
                className={cx(style.content, style.divide, style.colorContent)}
              >
                <p className={style.colorTitle}>외장 색상</p>
                <div className={style.colorSection}>
                  <div className={style.color}></div>
                  <p className={style.colorName}>오로라 블랙펄</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.contentBox}>
            <div className={style.contents}>
              <div className={cx(style.content, style.colorContent)}>
                <p className={style.colorTitle}>내장 색상</p>
                <div className={style.colorSection}>
                  <div className={style.color}></div>
                  <p className={style.colorName}>네이비 그레이</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.contentContainer}>
          <div className={style.contentBox}>
            <h2 className={style.contentTitle}>구매희망 옵션</h2>
            <div className={style.contents}>
              <div
                className={cx(style.content, style.divide, style.optionContent)}
              >
                <div className={style.optionBox}>
                  <p className={style.optionName}>스타일</p>
                  <Image
                    src="/icon/info_gray.png"
                    width={14}
                    height={14}
                    alt="info"
                  />
                </div>
                <div className={style.optionBox}>
                  <p className={style.optionName}>컴포트</p>
                  <Image
                    src="/icon/info_gray.png"
                    width={14}
                    height={14}
                    alt="info"
                  />
                </div>
                <div className={style.optionBox}>
                  <p className={style.optionName}>HUD + 빌트인 캠2</p>
                  <Image
                    src="/icon/info_gray.png"
                    width={14}
                    height={14}
                    alt="info"
                  />
                </div>
                <div className={style.optionBox}>
                  <p className={style.optionName}>드라이브 와이즈</p>
                  <Image
                    src="/icon/info_gray.png"
                    width={14}
                    height={14}
                    alt="info"
                  />
                </div>
                <div className={style.optionBox}>
                  <p className={style.optionName}>스마트 커넥트</p>
                  <Image
                    src="/icon/info_gray.png"
                    width={14}
                    height={14}
                    alt="info"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.contentBox}>
            <h2 className={style.contentTitle}>지역</h2>
            <div className={style.contents}>
              <div className={style.content}>
                <div className={style.firstArea}>
                  <p className={style.areaLabel}>지역</p>
                  <p className={style.areaValue}>서울특별시</p>
                </div>
                <div className={style.secondArea}>
                  <p className={style.areaLabel}>시군구</p>
                  <p className={style.areaValue}>송파구</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.contentContainer}>
          <div className={style.contentBox}>
            <h2 className={style.contentTitle}>상세 설명</h2>
            <div className={style.contents}>
              <p className={style.info}>
                너무 비싸지 않았으면 좋겠고 최대한 저렴하고 또 저렴하고 굉장히
                저렴하고 누가봐도 저렴하고 너무 저렴해서 사긴가?싶을 정도로
                저렴했으면 좋겠습니다너무 비싸지 않았으면 좋겠고 최대한 저렴하고
                또 저렴하고 굉장히 저렴하고 누가봐도 저렴하고 너무 저렴해서
                사긴가?싶을 정도로 저렴했으면 좋겠습니다너무 비싸지 않았으면
                좋겠고 최대한 저렴하고 또 저렴하고 굉장히 저렴하고 누가봐도
                저렴하고 너무 저렴해서 사긴가?싶을 정도로 저렴했으면
                좋겠습니다너무 비싸지 않았으면 좋겠고 최대한 저렴하고 또
                저렴하고 굉장히 저렴하고 누가봐도 저렴하고 너무 저렴해서
                사긴가?싶을 정도로 저렴했으면 좋겠습니다
              </p>
            </div>
          </div>
        </div>

        <div className={style.contentBox}>
          <h2 className={style.contentTitle}>딜러 제안</h2>

          <div className={style.offerSection}>
            <AuctionContainer type="dealer" />
            <AuctionContainer type="dealer" />
            <AuctionContainer type="dealer" />
            <AuctionContainer type="dealer" />
          </div>
        </div>
      </div>
    </div>
  );
}
