"use client";

import { useRouter } from "next/navigation";
import { CustomUser } from "../../model/CustomUser";
import logout from "../(beforeLogin)/auth/_lib/logout";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Session } from "@auth/core/types";
import style from "./logoutButton.module.css";

type Props = {
  me: Session;
};

export default function LogoutButton({ me }: Props) {
  const userInfo = me as CustomUser;
  const router = useRouter();

  const onLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      const response = await logout();

      if (response?.message === "LOGOUT_SUCCESS") {
        // signOut({ callbackUrl: "/" }); 로 대체 가능
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
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <button className={style.button} onClick={onLogout}>
      로그아웃
    </button>
  );
}
