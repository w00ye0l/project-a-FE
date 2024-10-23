"use client";

import { useState } from "react";
import style from "./counselButton.module.css";
import cx from "classnames";
import Image from "next/image";
import { toast } from "sonner";

export default function CounselButton() {
  const [openModal, setOpenModal] = useState(false);
  const [carName, setCarName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [callTime, setCallTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOpenModal = () => {
    setOpenModal(!openModal); // 토글 기능 추가
  };

  const handleCounselButton = async () => {
    console.log({ carName, customerName, callTime, phoneNumber });

    if (
      carName === "" ||
      customerName === "" ||
      callTime === "" ||
      phoneNumber === ""
    ) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }

    if (phoneNumber.startsWith("010") === false || phoneNumber.length !== 11) {
      toast.error("휴대폰 번호를 확인해주세요.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/car/ask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carName, customerName, callTime, phoneNumber }),
      }
    );

    const result = await response.json();

    console.log(result);

    if (result.statusCode === 200) {
      toast.success("상담 신청이 완료되었습니다.");

      setOpenModal(false);
      setCarName("");
      setCustomerName("");
      setCallTime("");
      setPhoneNumber("");
    } else {
      toast.error("다시 시도해주세요.");
    }
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
                <input
                  type="text"
                  id="car"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                />
              </div>
            </div>
            <div className={style.top}>
              <div className={style.box}>
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className={style.box}>
                <label htmlFor="time">상담 가능 시간</label>
                <select
                  name="time"
                  id="time"
                  value={callTime}
                  onChange={(e) => setCallTime(e.target.value)}
                >
                  <option value="" disabled>
                    시간설정
                  </option>
                  <option value="09시~10시">09시~10시</option>
                  <option value="10시~11시">10시~11시</option>
                  <option value="11시~12시">11시~12시</option>
                  <option value="13시~14시">13시~14시</option>
                  <option value="14시~15시">14시~15시</option>
                  <option value="15시~16시">15시~16시</option>
                  <option value="16시~17시">16시~17시</option>
                  <option value="17시~18시">17시~18시</option>
                  <option value="18시~19시">18시~19시</option>
                  <option value="19시~20시">19시~20시</option>
                  <option value="20시~21시">20시~21시</option>
                  <option value="21시~22시">21시~22시</option>
                </select>
              </div>
            </div>
            <div className={style.box}>
              <label htmlFor="phone">휴대폰번호</label>
              <input
                type="tel"
                id="phone"
                placeholder="'-'없이 숫자만 입력"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className={style.btnSection}>
              <button
                className={cx(style.btn, style.outline)}
                onClick={handleOpenModal}
              >
                취소
              </button>
              <button className={style.btn} onClick={handleCounselButton}>
                상담하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
