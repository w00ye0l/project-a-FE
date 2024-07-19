export const getCarBasicOptionList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/basic-option`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
