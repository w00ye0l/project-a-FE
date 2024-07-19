export const getCarColorOptionList = async ({ carPk }: { carPk: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/color-option?carPk=${carPk}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
