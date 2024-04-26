"use client";

import { Session } from "@auth/core/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  me: Session;
};

export default function LogoutButton({ me }: Props) {
  const router = useRouter();

  const onLogout = () => {
    signOut({ redirect: false })
      .then(() => {
        router.replace("/");
        router.refresh();
      })
      .then(() => {
        toast.info("로그아웃 되었습니다.");
      });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <div>
      <div>{me?.user?.email}</div>
      <div>{me?.user?.name}</div>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
}
