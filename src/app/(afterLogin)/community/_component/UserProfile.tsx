"use client";

import { CustomUser } from "@/model/CustomUser";
import Image from "next/image";
import style from "./userProfile.module.css";
import { useCallback, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Session } from "@auth/core/types";

type Props = {
  me: Session;
};

export default function UserProfile({ me }: Props) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<CustomUser | null>(null);
  const preUserInfo = me as CustomUser;
  console.log({ preUserInfo });

  const getUserInfo = useCallback(async () => {
    console.log("getUserInfo called");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${preUserInfo.userPk}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${preUserInfo.accessToken}`,
          },
        }
      );

      const result = await response.json();

      // console.log({ result });

      if (result.statusCode === 403) {
        signOut({ redirect: false }).then(() => {
          // 로그아웃 후 페이지 이동
          router.replace("/");
          // 캐시 데이터 제거
          router.refresh();
        });

        return;
      }

      // 유저 정보를 state에 저장
      setUserInfo({ ...result.data });
    } catch (error) {
      // 유저 정보 가져오는 것 실패
      console.error("유저 정보를 가져오는데 실패했습니다.");
      toast.error("유저 정보를 가져오는데 실패했습니다.");
      signOut({ redirect: false }).then(() => {
        // 로그아웃 후 페이지 이동
        router.replace("/");
        // 캐시 데이터 제거
        router.refresh();
      });
      return;
    }
  }, [preUserInfo.userPk, preUserInfo.accessToken, router]);

  const handleWriteBtn = () => {
    router.push("/community/write");
  };

  useEffect(() => {
    console.log("useEffect called");
    getUserInfo();
    // getUserInfo 함수를 의존성 배열에 추가
  }, []);

  if (!userInfo) {
    return;
  }

  return (
    <div className={style.section}>
      <div className={style.infoContainer}>
        {userInfo.profileImage !== "NoImage" ? (
          <Image
            className={style.profileImage}
            src={userInfo.profileImage}
            width={40}
            height={40}
            alt="profileImage"
          />
        ) : (
          <div className={style.profileImage}></div>
        )}
        <div className={style.infoBox}>
          <div className={style.nicknameContainer}>
            <p className={style.nickname}>{userInfo.nickname}</p>
            <span className={style.sir}>님</span>
          </div>
          <div className={style.tabContainer}>
            <p className={style.tab}>보관함</p>
            <div className={style.divider}></div>
            <p className={style.tab}>포인트</p>
          </div>
        </div>

        <Image
          className={style.alarm}
          src="/icon/alarm.png"
          width={16}
          height={16}
          alt="alarm"
        />
      </div>

      <button className={style.writeBtn} onClick={handleWriteBtn}>
        <Image
          className={style.writeIcon}
          src="/icon/plus.png"
          width={14}
          height={14}
          alt="write"
        />
        새 글 작성하기
      </button>
    </div>
  );
}
