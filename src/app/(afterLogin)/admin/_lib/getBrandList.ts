export const getBrandList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/brand`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
