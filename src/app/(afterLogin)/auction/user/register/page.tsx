import style from "./page.module.css";
import cx from "classnames";

export default function AuctionUserRegisterPage() {
  return (
    <div className={style.main}>
      <div>
        <p>견적 등록하기</p>
        <h1>MASTERCAR</h1>
      </div>

      <div>
        <ul className={style.tabs}>
          <li className={style.tab}>
            <h2 className={style.step}>01.</h2>
            <p className={style.stepName}>차종 · 색상 · 옵션 선택</p>
          </li>

          <li className={style.tab}>
            <h2 className={style.step}>02.</h2>
            <p className={style.stepName}>구매방법 · 견적여부 · 지역 선택</p>
          </li>

          <li className={style.tab}>
            <h2 className={style.step}>03.</h2>
            <p className={style.stepName}>내용 상세 설명</p>
          </li>
        </ul>

        <form className={style.formSection} action="">
          <div className={style.content}>
            <label className={cx(style.contentName, style.required)} htmlFor="">
              차량종류
            </label>
            <div className={style.optionContainer}>
              <select className={style.optionBox} name="" id="">
                <option value="">브랜드1</option>
                <option value="">브랜드2</option>
                <option value="">브랜드3</option>
                <option value="">브랜드4</option>
              </select>
              <select className={style.optionBox} name="" id="">
                <option value="">세부모델</option>
              </select>
              <select className={style.optionBox} name="" id="">
                <option value="">연료타입</option>
              </select>
            </div>
          </div>

          <div className={style.content}>
            <label className={cx(style.contentName, style.required)} htmlFor="">
              색상선택
            </label>
            <div className={style.optionContainer}>
              <select className={style.optionBox} name="" id="">
                <option value="">외장색상</option>
              </select>
              <select className={style.optionBox} name="" id="">
                <option value="">내장색상</option>
              </select>
            </div>
          </div>

          <div className={style.content}>
            <label className={cx(style.contentName, style.required)} htmlFor="">
              세부옵션
            </label>
            <div className={style.optionContainer}>
              <select className={style.optionBox} name="" id="">
                <option value="">기본옵션</option>
              </select>
              <select className={style.optionBox} name="" id="">
                <option value="">튜닝/악세서리</option>
              </select>
            </div>
          </div>

          <div className={style.content}>
            <label className={cx(style.contentName, style.required)} htmlFor="">
              구매방법
            </label>
            <div className={style.optionContainer}>
              <input type="checkbox" name="buyType" id="cash" />
              <label
                className={cx(style.optionBox, style.input)}
                htmlFor="cash"
              >
                현금
              </label>
              <input type="checkbox" name="buyType" id="monthly" />
              <label
                className={cx(style.optionBox, style.input)}
                htmlFor="monthly"
              >
                할부
              </label>
              <input type="checkbox" name="buyType" id="lease" />
              <label
                className={cx(style.optionBox, style.input)}
                htmlFor="lease"
              >
                리스
              </label>
              <input type="checkbox" name="buyType" id="rent" />
              <label
                className={cx(style.optionBox, style.input)}
                htmlFor="rent"
              >
                렌트
              </label>
              <input type="checkbox" name="buyType" id="all" />
              <label className={cx(style.optionBox, style.input)} htmlFor="all">
                상관없음
              </label>
            </div>
          </div>

          <div className={style.content}>
            <label className={cx(style.contentName, style.required)} htmlFor="">
              견적여부
            </label>
            <div className={style.optionContainer}>
              <input type="radio" name="estimate" id="estimateY" />
              <label
                className={cx(style.optionBox, style.input)}
                htmlFor="estimateY"
              >
                견적 받아본 적 있음
              </label>
              <input type="radio" name="estimate" id="estimateN" />
              <label
                className={cx(style.optionBox, style.input)}
                htmlFor="estimateN"
              >
                견적 받아본 적 없음
              </label>
            </div>
          </div>

          <div className={style.content}>
            <label className={cx(style.contentName, style.required)} htmlFor="">
              지역선택
            </label>
            <div className={style.optionContainer}>
              <select className={style.optionBox} name="" id="">
                <option value="">지역</option>
              </select>
              <select className={style.optionBox} name="" id="">
                <option value="">시군구 선택</option>
              </select>
            </div>
          </div>

          <div className={style.content}>
            <label className={style.contentName} htmlFor="">
              상세설명
            </label>
            <div className={style.optionContainer}>
              <textarea
                className={cx(style.optionBox, style.textarea)}
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="원하는 차량에 대한 설명을 자세히 할 수 있습니다."
              ></textarea>
            </div>
          </div>

          <button className={style.submitBtn}>
            등록하기
            <div className={style.arrowBox}>
              <div className={style.arrow}></div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
