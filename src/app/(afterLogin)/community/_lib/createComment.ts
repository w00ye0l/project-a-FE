"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

export const createComment = async ({
  articlePk,
  content,
}: {
  articlePk: string;
  content: string;
}) => {
  const session = await auth();
  const user = session as CustomUser;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/comment/${articlePk}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ content }),
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
