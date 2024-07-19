export const getModelList = async ({ brandName }: { brandName: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/model?brandName=${brandName}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
