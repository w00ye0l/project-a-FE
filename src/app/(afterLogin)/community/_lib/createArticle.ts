"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

interface ArticleData {
  title: string;
  content: string;
  originContent: string;
}

interface Props {
  boardName: string;
  ArticleData: ArticleData;
}

export const createArticle = async ({ boardName, ArticleData }: Props) => {
  const session = await auth();

  // session 객체를 CustomUser 타입으로 캐스팅
  const user = session as CustomUser;

  // 게시글 작성 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/${boardName}`,
    {
      method: "POST",
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
