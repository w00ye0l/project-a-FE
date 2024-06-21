"use server";

import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";

export const createReaction = async ({
  articlePk,
  reactionType,
}: {
  articlePk: number;
  reactionType: string;
}) => {
  const session = await auth();
  const user = session as CustomUser;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/reaction/${articlePk}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ reactionType }),
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
