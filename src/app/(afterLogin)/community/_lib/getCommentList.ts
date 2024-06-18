"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

export const getCommentList = async ({ articlePk }: { articlePk: string }) => {
  const session = await auth();
  const user = session as CustomUser;

  // 댓글 목록 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/comment/${articlePk}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
