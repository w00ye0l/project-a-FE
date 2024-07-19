export const getCarSpecList = async ({ carPk }: { carPk: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/spec?=carPk=${carPk}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
