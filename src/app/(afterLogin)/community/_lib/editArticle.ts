"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

interface ArticleData {
  title: string;
  content: string;
  originContent: string;
}

interface Props {
  articlePk: number;
  ArticleData: ArticleData;
}

export const editArticle = async ({ articlePk, ArticleData }: Props) => {
  const session = await auth();
  const user = session as CustomUser;

  // 게시글 수정 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/${articlePk}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(ArticleData),
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
