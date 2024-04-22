import style from "./page.module.css";

export default function SignUpPage() {
  return (
    <div className={style.main}>
      <form action="" className={style.signupForm}>
        <div className={style.infoSection}>
          <div className={style.infoTab}>
            <label className={style.infoLabel} htmlFor="id">
              아이디
            </label>
            <input
              className={style.infoInput}
              type="text"
              id="id"
              placeholder="영문 4자 이상, 최대 20자"
            />
          </div>

          <div className={style.infoTab}>
            <label className={style.infoLabel} htmlFor="pw">
              비밀번호
            </label>
            <input
              className={style.infoInput}
              type="password"
              id="pw"
              placeholder="숫자, 영문, 특수문자 포함 최소 8자 이상"
            />
          </div>

          <div className={style.infoTab}>
            <label className={style.infoLabel} htmlFor="pwChk">
              비밀번호 확인
            </label>
            <input
              className={style.infoInput}
              type="password"
              id="pwChk"
              placeholder="비밀번호 한 번 더 입력"
            />
          </div>

          <div className={style.infoTab}>
            <label className={style.infoLabel} htmlFor="emailId">
              이메일 주소
            </label>
            <div className={style.infoEmailTab}>
              <input
                className={style.infoInput}
                type="text"
                id="emailId"
                placeholder="이메일 주소 입력"
              />
              @
              <select className={style.infoInput} id="emailAddress">
                <option value="" hidden>
                  선택해주세요.
                </option>
                <option value="">naver.com</option>
                <option value="">gmail.com</option>
                <option value="">hanmail.com</option>
              </select>
            </div>
            <p className={style.infoTabSub}>
              아이디/비밀번호 찾기 시 사용되니 정확한 이메일을 입력해주세요.
            </p>
          </div>
        </div>

        <hr className={style.hr} />

        <div className={style.agreement}>
          <div className={`${style.agreementOption} ${style.agreementAll}`}>
            <input type="checkbox" />
            <label htmlFor="">
              약관 전체 동의<span className={style.optionSub}>(선택 포함)</span>
            </label>
          </div>
          <div className={style.agreementOption}>
            <input type="checkbox" />
            <label htmlFor="">
              만 14세 이상입니다.
              <span className={`${style.optionSub} ${style.optionRequired}`}>
                (필수)
              </span>
            </label>
          </div>
          <div className={style.agreementOption}>
            <input type="checkbox" />
            <label htmlFor="">
              서비스 이용 약관
              <span className={`${style.optionSub} ${style.optionRequired}`}>
                (필수)
              </span>
            </label>
          </div>
          <div className={style.agreementOption}>
            <input type="checkbox" />
            <label htmlFor="">
              개인정보 수집 및 이용
              <span className={`${style.optionSub} ${style.optionRequired}`}>
                (필수)
              </span>
            </label>
          </div>
        </div>

        <button className={style.signupBtn}>회원가입</button>
      </form>
    </div>
  );
}
