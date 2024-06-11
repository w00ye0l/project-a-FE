"use client";

import { CustomUser } from "@/model/User";
import { Session } from "@auth/core/types";
import { useCallback, useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { toast } from "sonner";
import Link from "next/link";

type Props = {
  me: Session;
};

export default function UserInfo({ me }: Props) {
  const [userInfo, setUserInfo] = useState<CustomUser | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const preUserInfo = me as CustomUser;

  // 유저 정보 가져오는 함수
  // getUserInfo 함수를 useCallback으로 메모이제이션하여 의존성 배열 문제 해결
  const getUserInfo = useCallback(async () => {
    console.log("getUserInfo called");
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

    // 유저 정보 가져오는 것 실패
    if (!response.ok) {
      console.error("유저 정보를 가져오는데 실패했습니다.");
      toast.error("유저 정보를 가져오는데 실패했습니다.");
      return;
    }

    // 유저 정보를 state에 저장
    setUserInfo({ ...result.data });
  }, [preUserInfo.userPk, preUserInfo.accessToken]);

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
    <>
      {/* 프로필 이미지 업로드 성공 시 호출되는 콜백 함수 전달 */}
      <ProfileImage
        imageProp={userInfo?.profileImage!}
        onImageUploadSuccess={handleImageUploadSuccess}
      />

      <button onClick={handleImageDelete}>이미지 삭제</button>

      <div>
        <h2>유저 정보</h2>
        <p>{userInfo?.userPk}</p>
        <p>{userInfo?.name}</p>
        <p>{userInfo?.email}</p>
        {/* <p>{userInfo?.profileImage}</p> */}
        <p>{userInfo?.registerBy}</p>
        <p>{userInfo?.userType}</p>
        <p>{userInfo?.point}</p>
        <p>{userInfo?.cash}</p>
        <p>{userInfo?.eventPoint}</p>

        {userInfo?.registerBy === "HOME" && (
          <Link href="/user/change/pw">비밀번호 변경</Link>
        )}
      </div>
    </>
  );
}
