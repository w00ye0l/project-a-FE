export const getCountryList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/country`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
