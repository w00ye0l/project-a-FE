"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

interface Props {
  boardName: string;
  formData: FormData;
}

export const createArticle = async ({ boardName, formData }: Props) => {
  const session = await auth();

  // session 객체를 CustomUser 타입으로 캐스팅
  const user = session as CustomUser;

  // 게시글 작성 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/${boardName}`,
    {
      method: "POST",
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
