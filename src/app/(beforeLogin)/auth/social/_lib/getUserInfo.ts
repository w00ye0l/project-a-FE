export const getUserInfo = async (accessToken: string, pk: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/${pk}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const user = await response.json();

  console.log({ user });
  return user;
};
