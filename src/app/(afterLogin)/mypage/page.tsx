import LogoutButton from "@/app/_component/LogoutButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserInfo from "./_component/UserInfo";
import style from "./page.module.css";
import cx from "classnames";
import Footer from "@/app/_component/Footer";
import Image from "next/image";
import { CustomUser } from "@/model/CustomUser";

export default async function MyPage() {
  const session = await auth();
  const user = session as CustomUser;

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className={style.main}>
      <UserInfo me={session} />

      <div className={style.content}>
        {/* 왼쪽 메뉴들 */}
        <div className={style.left}>
          {/* <div className={style.nicknameBox}>
            <h2 className={style.nickname}>{user.nickname}님</h2>
            <button>수정</button>
          </div> */}

          {/* 메뉴 */}
          <div className={style.menuSection}>
            <div className={style.menuContainer}>
              <h3 className={cx(style.head, style.menu)}>차량 관리</h3>
              <p className={style.menu}>최근 본 차량</p>
              <p className={style.menu}>관심 차량</p>
              <p className={style.menu}>내 차 관리</p>
            </div>
            <div className={style.menuContainer}>
              <h3 className={cx(style.head, style.menu)}>옥션</h3>
              <p className={style.menu}>상담 신청 내역</p>
              <p className={style.menu}>받은 제안 내역</p>
              <p className={style.menu}>등록한 견적 내역</p>
            </div>
            <div className={style.menuContainer}>
              <h3 className={cx(style.head, style.menu)}>커뮤니티</h3>
              <p className={style.menu}>작성 내역</p>
              <p className={style.menu}>스크랩</p>
              <p className={style.menu}>차단 관리</p>
            </div>
            <div className={style.menuContainer}>
              <h3 className={cx(style.head, style.menu)}>내 정보</h3>
              <p className={style.menu}>내 정보 수정</p>
              <p className={style.menu}>포인트 사용내역</p>
            </div>
            <div className={style.menuContainer}>
              <h3 className={cx(style.head, style.menu)}>고객센터</h3>
              <p className={style.menu}>1:1 문의하기</p>
              <p className={style.menu}>자주 묻는 질문(FAQ)</p>
            </div>
          </div>

          <LogoutButton me={session} />
        </div>

        {/* 오른쪽 메인 컨텐츠 */}
        <div className={style.right}>
          <h3 className={style.contentTitle}>관심 차량</h3>

          <div className={style.selectSection}>
            <div className={style.selectAllBox}>
              <input type="checkbox" name="carChk" id="all" />
              <label htmlFor="all">전체선택</label>
            </div>

            <hr />

            <p>선택삭제</p>
          </div>

          {/* 전체 목록 */}
          <div className={style.carList}>
            {/* 차 하나 */}
            <div className={style.carContainer}>
              {/* 체크박스 */}
              <div className={style.carBox}>
                <input type="checkbox" name="carChk" id="" />
                {/* 차량정보 */}
                {/* 차 이미지 */}
                <div className={style.carImage}></div>
                {/* 차 정보 */}
                <div className={style.carInfo}>
                  <div className={style.brandBox}>
                    <Image
                      className={style.brandImage}
                      src="/brand/현대.jpg"
                      width={90}
                      height={60}
                      alt="브랜드"
                    />
                    <p className={style.brand}>현대</p>
                  </div>
                  <p className={style.model}>더 뉴 팰리세이드</p>
                  <div className={style.priceBox}>
                    <p className={style.price}>
                      3,453<span className={style.priceUnit}>만원</span>
                    </p>
                    <p className={style.realPrice}>4,500만원</p>
                  </div>
                </div>
              </div>

              <div className={style.discountBox}>
                <p className={style.discount}>
                  최대 할인 <span className={style.discountPrice}>89만원</span>
                </p>
                <p className={style.percent}>12%</p>
              </div>

              <button className={style.estimateButton}>
                견적
                <br />
                내기
              </button>
            </div>
            {/* 차 하나 */}
            <div className={style.carContainer}>
              {/* 체크박스 */}
              <div className={style.carBox}>
                <input type="checkbox" name="carChk" id="" />
                {/* 차량정보 */}
                {/* 차 이미지 */}
                <div className={style.carImage}></div>
                {/* 차 정보 */}
                <div className={style.carInfo}>
                  <div className={style.brandBox}>
                    <Image
                      className={style.brandImage}
                      src="/brand/현대.jpg"
                      width={90}
                      height={60}
                      alt="브랜드"
                    />
                    <p className={style.brand}>현대</p>
                  </div>
                  <p className={style.model}>더 뉴 팰리세이드</p>
                  <div className={style.priceBox}>
                    <p className={style.price}>
                      3,453<span className={style.priceUnit}>만원</span>
                    </p>
                    <p className={style.realPrice}>4,500만원</p>
                  </div>
                </div>
              </div>

              <div className={style.discountBox}>
                <p className={style.discount}>
                  최대 할인 <span className={style.discountPrice}>89만원</span>
                </p>
                <p className={style.percent}>12%</p>
              </div>

              <button className={style.estimateButton}>
                견적
                <br />
                내기
              </button>
            </div>
            {/* 차 하나 */}
            <div className={style.carContainer}>
              {/* 체크박스 */}
              <div className={style.carBox}>
                <input type="checkbox" name="carChk" id="" />
                {/* 차량정보 */}
                {/* 차 이미지 */}
                <div className={style.carImage}></div>
                {/* 차 정보 */}
                <div className={style.carInfo}>
                  <div className={style.brandBox}>
                    <Image
                      className={style.brandImage}
                      src="/brand/현대.jpg"
                      width={90}
                      height={60}
                      alt="브랜드"
                    />
                    <p className={style.brand}>현대</p>
                  </div>
                  <p className={style.model}>더 뉴 팰리세이드</p>
                  <div className={style.priceBox}>
                    <p className={style.price}>
                      3,453<span className={style.priceUnit}>만원</span>
                    </p>
                    <p className={style.realPrice}>4,500만원</p>
                  </div>
                </div>
              </div>

              <div className={style.discountBox}>
                <p className={style.discount}>
                  최대 할인 <span className={style.discountPrice}>89만원</span>
                </p>
                <p className={style.percent}>12%</p>
              </div>

              <button className={style.estimateButton}>
                견적
                <br />
                내기
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
