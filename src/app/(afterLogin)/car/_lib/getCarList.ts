interface Props {
  brandName: string | null;
  pageNumber?: number;
}

export const getCarList = async ({ brandName, pageNumber }: Props) => {
  if (pageNumber === undefined) {
    pageNumber = 0;
  }

  const response = await fetch(
    brandName
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/detail-models?brandName=${brandName}&page=${pageNumber}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/user-page/detail-models?page=${pageNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
