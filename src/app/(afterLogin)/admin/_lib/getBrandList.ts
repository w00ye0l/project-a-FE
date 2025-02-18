export const getBrandList = async ({
  countryName,
}: {
  countryName: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/brand?countryName=${countryName}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
