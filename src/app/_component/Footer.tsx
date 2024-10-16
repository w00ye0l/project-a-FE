import style from "./footer.module.css";
import Notice from "./Notice";

export default function Footer() {
  return (
    <footer className={style.section}>
      <Notice />

      <div className={style.top}>
        <div className={style.container}>
          <p>개인정보처리방침</p>
          <p>이메일수집거부</p>
        </div>
      </div>

      <div className={style.bottom}>
        <div className={style.container}>
          <h1 className={style.title}>에이제로컴퍼니</h1>

          <div className={style.contentContainer}>
            <div className={style.contentBox}>
              <p>CEO. 신선호</p>
              <p>TEL. 1577-2744</p>
              <p>FAX. 02-702-7761</p>
              <p>TAX ID. 515-88-01310</p>
            </div>

            <div className={style.contentBox}>
              <p>ADD. 서울 송파구 충민로 66, (가든파이브라이프) 영관 8083호</p>
              <hr />
              <p>
                경기도 수원시 영통구 광교중앙로 170, 효성해링턴타워 A동 1312호
              </p>
            </div>
          </div>

          <p className={style.caption}>
            ⓒ 2024. 에이제로컴퍼니. ALL Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
