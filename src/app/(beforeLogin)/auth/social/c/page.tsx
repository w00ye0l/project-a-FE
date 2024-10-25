"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SocialRedirectPage() {
  const searchParams = useSearchParams();
  const { status } = useSession();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const pk = searchParams.get("pk");
  const router = useRouter();

  // 상태가 'unauthenticated'일 때 로그인 시도
  useEffect(() => {
    if (status === "unauthenticated" && accessToken && refreshToken) {
      signIn("social-login", { redirect: false, accessToken, refreshToken, pk })
        .then((result) => {
          console.log({ result });
          if (result?.error) {
            console.log(result.error);
            toast.error("로그인에 실패했습니다.");
          }
        })
        .then(() => {
          router.replace("/");
          router.refresh();
          toast.info("로그인 성공!");
        })
        .catch((error) => {
          toast.error("로그인에 실패했습니다.");
        });
    }
  });

  return <div>로그인 중...</div>;
}
