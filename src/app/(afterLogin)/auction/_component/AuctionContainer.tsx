import Image from "next/image";
import style from "./auctionContainer.module.css";
import cx from "classnames";

export default function AuctionContainer({ type }: { type: string | null }) {
  return (
    <div className={style.auctionContainer}>
      <div className={style.productContainer}>
        {/* 상품 정보 */}
        <div className={cx(style.box, style.productBox)}>
          <p className={style.label}>상품 정보</p>

          <div className={style.content}>
            <div className={style.mainImage}></div>

            <div className={style.product}>
              <p className={style.trim}>
                [시그니처] 가솔린 터보 1.6 하이브리트 (9인승)
              </p>
              <p className={style.memo}>블랙박스 및 선팅 무료 제공</p>

              <div className={style.imageList}>
                <div className={style.subImage}></div>
                <div className={style.subImage}></div>
                <div className={style.subImage}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 옵션 정보 */}
        <div className={cx(style.box, style.optionBox)}>
          <p className={style.label}>옵션 정보</p>

          <div className={style.content}>
            <div className={style.options}>
              <p className={style.option}>스타일</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
            <div className={style.options}>
              <p className={style.option}>컴포트</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
            <div className={style.options}>
              <p className={style.option}>스마트 커넥트</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
            <div className={style.options}>
              <p className={style.option}>HUD + 빌트인 캠2</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
            <div className={style.options}>
              <p className={style.option}>드라이브 와이즈</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
            <div className={style.options}>
              <p className={style.option}>파킹 어시스트 플러스</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
            <div className={style.options}>
              <p className={style.option}>파킹 어시스트 플러스</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
            <div className={style.options}>
              <p className={style.option}>파킹 어시스트 플러스</p>
              <Image
                src="/icon/info_gray.png"
                width={14}
                height={14}
                alt="info"
              />
            </div>
          </div>
        </div>

        {/* 색상 정보 */}
        <div className={cx(style.box, style.colorBox)}>
          <p className={style.label}>색상 정보</p>

          <div className={style.content}>
            <div className={style.colors}>
              <p className={style.colorType}>외장</p>
              <div className={style.colorPreview}>
                <div className={style.color}></div>
                <p className={style.colorName}>오로라 블랙펄</p>
              </div>
            </div>
            <div className={style.colors}>
              <p className={style.colorType}>내장</p>
              <div className={style.colorPreview}>
                <div className={style.color}></div>
                <p className={style.colorName}>네이비 그레이</p>
              </div>
            </div>
          </div>
        </div>

        {/* 딜러 정보 */}
        <div className={cx(style.box, style.dealerBox)}>
          {type === "dealer" && (
            <>
              <p className={style.label}>딜러 정보</p>

              <div className={style.content}>
                <div className={style.dealerImage}></div>

                <div className={style.dealerInfo}>
                  <p className={style.dealerTitle}>
                    <span className={style.dealerName}>김미영</span>딜러님
                  </p>
                  <p className={style.dealerReview}>
                    평점 <span className={style.dealerPoint}>4.6</span>점
                  </p>
                </div>
              </div>
            </>
          )}
          {type === "capital" && (
            <>
              <p className={style.label}>금융사</p>

              <div className={cx(style.content, style.capital)}>
                <Image
                  className={style.capitalImage}
                  src="/test_capital.png"
                  width={60}
                  height={60}
                  alt="capital"
                />
                <p className={style.capitalName}>M 캐피탈</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={cx(style.estimateContainer, style.box)}>
        {/* 총 합계 */}
        <p className={style.label}>총 합계</p>

        {type === "dealer" && (
          <div className={style.content}>
            <div className={style.estimatePrices}>
              <div className={style.estimatePrice}>
                <p className={style.estimateLabel}>차량가</p>
                <p className={style.normalPrice}>
                  48,500,000<span className={style.estimateUnit}>원</span>
                </p>
              </div>
              <div className={style.estimatePrice}>
                <p className={style.estimateLabel}>옵션가</p>
                <p className={style.normalPrice}>
                  8,500,000<span className={style.estimateUnit}>원</span>
                </p>
              </div>
              <div className={cx(style.estimatePrice, style.discountPrice)}>
                <p className={style.estimateLabel}>할인가</p>
                <p className={cx(style.normalPrice, style.discount)}>
                  -8,500,000
                  <span className={cx(style.estimateUnit, style.discountUnit)}>
                    원
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <p className={style.totalPrices}>
              <span className={style.totalPrice}>53,500,000</span>원
            </p>
            <button className={style.counselBtn}>빠른 상담 신청</button>
          </div>
        )}
        {type === "capital" && (
          <div className={style.content}>
            <div className={style.estimatePrices}>
              <div className={style.estimatePrice}>
                <p className={style.estimateLabel}>차량가</p>
                <p className={style.normalPrice}>
                  48,500,000<span className={style.estimateUnit}>원</span>
                </p>
              </div>
              <div className={style.estimatePrice}>
                <p className={style.estimateLabel}>계약기간</p>
                <p className={style.normalPrice}>
                  48<span className={style.estimateUnit}>개월</span>
                </p>
              </div>
              <div className={style.estimatePrice}>
                <p className={style.estimateLabel}>보증조건</p>
                <p className={style.normalPrice}>선납금 30%</p>
              </div>
            </div>

            <hr />

            <p className={style.totalPrices}>
              월<span className={style.totalPrice}>341,280</span>원
            </p>
            <button className={style.counselBtn}>빠른 상담 신청</button>
          </div>
        )}
      </div>
    </div>
  );
}
