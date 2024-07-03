"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

export const createRecomment = async ({
  articlePk,
  commentPk,
  recomment,
}: {
  articlePk: string;
  commentPk: number;
  recomment: string;
}) => {
  const session = await auth();

  const user = session as CustomUser;

  // 대댓글 작성 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/recomment/${articlePk}/${commentPk}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        content: recomment,
      }),
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
