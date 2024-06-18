export const getArticleDetail = async ({
  articlePk,
}: {
  articlePk: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/${articlePk}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  return result;
};
