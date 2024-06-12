interface ArticleData {
  title: string;
  content: string;
  originContent: string;
}

interface Props {
  boardPk: number;
  ArticleData: ArticleData;
}

export const createArticle = async ({ boardPk, ArticleData }: Props) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/${boardPk}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ArticleData),
    }
  );

  const result = await response.json();

  return result;
};
