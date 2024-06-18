interface Props {
  boardName?: string | string[];
}

export const getArticleList = async ({ boardName }: Props) => {
  const response = await fetch(
    boardName
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/community?boardName=${boardName}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/community`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
