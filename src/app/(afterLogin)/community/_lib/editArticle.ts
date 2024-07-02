"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

interface Props {
  articlePk: number;
  formData: FormData;
}

export const editArticle = async ({ articlePk, formData }: Props) => {
  const session = await auth();
  const user = session as CustomUser;

  // 게시글 수정 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/${articlePk}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: formData,
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
