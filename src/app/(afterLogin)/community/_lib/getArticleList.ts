interface Props {
  boardName?: string;
  pageNumber?: number;
}

export const getArticleList = async ({ boardName, pageNumber }: Props) => {
  if (pageNumber === undefined) {
    pageNumber = 0;
  }

  const response = await fetch(
    boardName
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/community?boardName=${boardName}&page=${pageNumber}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/community?page=${pageNumber}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
