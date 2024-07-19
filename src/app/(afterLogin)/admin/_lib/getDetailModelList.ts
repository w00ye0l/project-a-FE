export const getDetailModelList = async ({
  modelName,
}: {
  modelName: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/detail-model?modelName=${modelName}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
