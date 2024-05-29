import { getSession } from "next-auth/react";

const logout = async () => {
  const session = await getSession();

  if (session) {
    const accessToken = session.accessToken;
    const refreshToken = session.refreshToken as string;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
          },
        }
      );

      // **소셜 로그인 테스트를 위해 잠시 주석 처리
      // 에러 발생 시 처리
      // if (!response.ok) {
      //   return { message: "LOGOUT_FAILED" };
      // }

      // 성공
      return { message: "LOGOUT_SUCCESS" };
    } catch (error) {
      console.error(error);
      // throw new Error("로그아웃에 실패했습니다.");

      return { message: "LOGOUT_FAILED" };
    }
  }
};

export default logout;
