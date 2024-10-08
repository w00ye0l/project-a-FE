"use server";

export const getCommentList = async ({ articlePk }: { articlePk: string }) => {
  // 댓글 목록 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/comment/${articlePk}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
