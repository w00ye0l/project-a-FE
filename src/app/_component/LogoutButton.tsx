"use client";

import { useRouter } from "next/navigation";
import { CustomUser } from "../model/User";
import logout from "../(beforeLogin)/auth/_lib/logout";
import { toast } from "sonner";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  me: Session;
};

export default function LogoutButton({ me }: Props) {
  const userInfo = me as CustomUser;
  const router = useRouter();

  const onLogout = async () => {
    const response = await logout();

    console.log({ response });

    if (response?.message === "LOGOUT_SUCCESS") {
      // auth.js의 signOut 함수 호출
      signOut({ redirect: false })
        .then(() => {
          // 로그아웃 후 페이지 이동
          router.replace("/");
          // 캐시 데이터 제거
          router.refresh();
        })
        .then(() => {
          toast.info("로그아웃 되었습니다.");
        });
    } else {
      toast.error("로그아웃에 실패했습니다.");
    }
  };

  if (!userInfo) {
    return null;
  }

  return <button onClick={onLogout}>로그아웃</button>;
}
