"use client";

import { CustomUser } from "@/model/CustomUser";
import { Session } from "@auth/core/types";
import { useCallback, useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { toast } from "sonner";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import style from "./userInfo.module.css";

type Props = {
  me: Session;
};

export default function UserInfo({ me }: Props) {
  const [userInfo, setUserInfo] = useState<CustomUser | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const preUserInfo = me as CustomUser;
  const router = useRouter();

  // 유저 정보 가져오는 함수
  // getUserInfo 함수를 useCallback으로 메모이제이션하여 의존성 배열 문제 해결
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

      console.log({ result });

      if (result.statusCode === 403) {
        // 토큰 만료
        toast.error("로그인 세션이 만료되었습니다.");

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
      console.error("로그인 세션이 만료되었습니다.");
      toast.error("로그인 세션이 만료되었습니다.");
      signOut({ redirect: false }).then(() => {
        // 로그아웃 후 페이지 이동
        router.replace("/");
        // 캐시 데이터 제거
        router.refresh();
      });
      return;
    }
  }, [preUserInfo.userPk, preUserInfo.accessToken, router]);

  // 프로필 이미지 삭제 함수
  const handleImageDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/${preUserInfo.userPk}/image`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${preUserInfo.accessToken}`,
        },
      }
    );

    // 프로필 이미지 삭제 실패
    if (!response.ok) {
      console.error("이미지 삭제에 실패했습니다.");
      toast.error("이미지 삭제에 실패했습니다.");
      return;
    }

    toast.info("이미지가 삭제되었습니다.");

    // 이미지 삭제 후 유저 정보 다시 가져오기
    getUserInfo();
  };

  // 이미지 업로드 성공 시 호출되는 콜백 함수
  const handleImageUploadSuccess = (imageUrl: string) => {
    // 사용자 정보를 업데이트하여 최신 이미지 URL을 반영
    // 모든 정보를 가져오는 것이 아니라 이미지 URL만 업데이트
    setUserInfo((prevUserInfo) => ({
      ...preUserInfo!,
      profileImage: imageUrl,
    }));
  };

  // useEffect를 사용하여 컴포넌트가 마운트되면 유저 정보를 가져오도록 설정
  useEffect(() => {
    console.log("useEffect called");
    if (initialLoad) {
      getUserInfo();
      setInitialLoad(false);
    }
    // getUserInfo 함수를 의존성 배열에 추가
  }, [getUserInfo, initialLoad]);

  return (
    <div className={style.main}>
      {/* 프로필 이미지 업로드 성공 시 호출되는 콜백 함수 전달 */}
      <div className={style.titleSection}>
        <div className={style.profileImage}></div>
        <h1 className={style.title}>
          <span className={style.titleNickname}>{userInfo?.nickname}</span> 님,
          간편하게 <span className={style.highlight}>조회 차량</span>과{" "}
          <span className={style.highlight}>내 정보</span>를 확인해 보세요!
        </h1>
      </div>
      {/* <ProfileImage
        imageProp={userInfo?.profileImage!}
        onImageUploadSuccess={handleImageUploadSuccess}
      /> */}

      {/* <button onClick={handleImageDelete}>이미지 삭제</button> */}

      <div className={style.userInfo}>
        <div className={style.pointSection}>
          <div className={style.pointBox}>
            <p className={style.pointTitle}>활동 포인트</p>
            <p className={style.point}>
              {Number(userInfo?.point).toLocaleString()}
              <span className={style.pointUnit}>P</span>
            </p>
            <Link className={style.pointLink} href="/mypage">
              자세히 보기
            </Link>
          </div>
          <div className={style.pointBox}>
            <p className={style.pointTitle}>유료 포인트</p>
            <p className={style.point}>
              {Number(userInfo?.cash).toLocaleString()}
              <span className={style.pointUnit}>P</span>
            </p>
            <Link className={style.pointLink} href="/mypage">
              자세히 보기
            </Link>
          </div>
          <div className={style.pointBox}>
            <p className={style.pointTitle}>이벤트 포인트</p>
            <p className={style.point}>
              {Number(userInfo?.eventPoint).toLocaleString()}
              <span className={style.pointUnit}>P</span>
            </p>
            <Link className={style.pointLink} href="/mypage">
              자세히 보기
            </Link>
          </div>
        </div>

        <div className={style.unknownBox}></div>

        <div className={style.unknownBox}></div>
      </div>
    </div>
  );
}
