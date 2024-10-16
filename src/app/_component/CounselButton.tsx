"use client";

import { useState } from "react";
import style from "./counselButton.module.css";
import cx from "classnames";
import Image from "next/image";

export default function CounselButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal); // 토글 기능 추가
  };

  return (
    <div className={style.counselBtnWrapper}>
      <div className={style.counselBtn} onClick={handleOpenModal}>
        <Image
          className={style.icon}
          src="/icon/counsel.png"
          alt="Counsel Icon"
          width={36}
          height={54.27}
        />

        <div className={style.dot}></div>
      </div>

      {openModal && (
        <div className={style.modal}>
          <p className={style.modalTitle}>도움이 필요하세요 ?</p>

          <div className={style.modalContent}>
            <div className={style.top}>
              <div className={style.box}>
                <label htmlFor="car">차량</label>
                <input type="text" id="car" />
              </div>
            </div>
            <div className={style.top}>
              <div className={style.box}>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" />
              </div>
              <div className={style.box}>
                <label htmlFor="time">상담 가능 시간</label>
                <select name="time" id="time">
                  <option value="" disabled>
                    시간설정
                  </option>
                  <option value="09">09시~10시</option>
                  <option value="10">10시~11시</option>
                  <option value="12">11시~12시</option>
                  <option value="13">13시~14시</option>
                  <option value="14">14시~15시</option>
                  <option value="15">15시~16시</option>
                  <option value="16">16시~17시</option>
                  <option value="17">17시~18시</option>
                  <option value="18">18시~19시</option>
                  <option value="19">19시~20시</option>
                  <option value="20">20시~21시</option>
                  <option value="21">21시~22시</option>
                </select>
              </div>
            </div>
            <div className={style.box}>
              <label htmlFor="phone">휴대폰번호</label>
              <input type="tel" id="phone" placeholder="'-'없이 숫자만 입력" />
            </div>

            <div className={style.btnSection}>
              <button
                className={cx(style.btn, style.outline)}
                onClick={handleOpenModal}
              >
                취소
              </button>
              <button className={style.btn}>상담하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
