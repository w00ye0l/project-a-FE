interface Props {
  boardPk?: string | string[];
}

export const getArticleList = async ({ boardPk }: Props) => {
  const response = await fetch(
    boardPk
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/community?boardPk=${boardPk}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/community`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  return result;
};
