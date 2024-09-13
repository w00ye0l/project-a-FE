export const getDetailModelImage = async ({
  detailModelPk,
}: {
  detailModelPk: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/detail-model/${detailModelPk}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
