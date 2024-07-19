export const getCarInfoList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/car`, {
    method: "GET",
  });

  const result = await response.json();

  console.log(result);

  return result;
};
