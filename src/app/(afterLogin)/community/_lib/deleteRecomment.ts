"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

export const deleteRecomment = async ({
  recommentPk,
}: {
  recommentPk: string;
}) => {
  const session = await auth();
  const user = session as CustomUser;

  // 대댓글 삭제 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/recomment/${recommentPk}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
