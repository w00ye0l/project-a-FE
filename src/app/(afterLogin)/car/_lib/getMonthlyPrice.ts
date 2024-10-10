interface Props {
  carPk: string;
  totalPrice: number;
  prePrice: number;
  depositPrice: number;
  buyType: string;
  month: number;
  km: number;
  buyerType: string;
  areaType: string;
}

export const getMonthlyPrice = async ({
  carPk,
  totalPrice,
  prePrice,
  depositPrice,
  buyType,
  month,
  km,
  buyerType,
  areaType,
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
        buyType,
        month,
        km,
        buyerType,
        areaType,
      }),
    }
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
