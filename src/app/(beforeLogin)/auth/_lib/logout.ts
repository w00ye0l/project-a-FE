import { getSession } from "next-auth/react";

const logout = async () => {
  const session = await getSession();

  if (session) {
    const accessToken = session.accessToken;
    const refreshToken = session.refreshToken;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `Bearer ${refreshToken}`,
        },
      });

      return { message: "LOGOUT_SUCCESS" };
    } catch (error) {
      console.error(error);
      // throw new Error("로그아웃에 실패했습니다.");

      return { message: "LOGOUT_FAILED" };
    }
  }
};

export default logout;
