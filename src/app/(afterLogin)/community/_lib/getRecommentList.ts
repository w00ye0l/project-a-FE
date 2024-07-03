"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

export const getRecommentList = async ({
  articlePk,
  commentPk,
}: {
  articlePk: string;
  commentPk: number;
}) => {
  const session = await auth();
  const user = session as CustomUser;

  // 대댓글 목록 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/recomment/${articlePk}`,
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
