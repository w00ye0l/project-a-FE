interface Props {
  carPk: string;
  totalPrice: number;
  prePrice: number;
  depositPrice: number;
}

export const getMonthlyPrice = async ({
  carPk,
  totalPrice,
  prePrice,
  depositPrice,
}: Props) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/calculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carPk,
        totalPrice,
        prePrice,
        depositPrice,
      }),
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
