import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  // NextAuth의 기본 로그인 페이지와 회원가입 페이지를 사용하지 않음
  // 커스텀한 페이지를 사용하기 위해 설정
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  providers: [
    Credentials({
      credentials: {
        userIdOrEmail: {},
        password: {},
      },
      authorize: async (credentials) => {
        const formData = new FormData();
        formData.append("userIdOrEmail", credentials.userIdOrEmail as string);
        formData.append("password", credentials.password as string);

        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await authResponse.json();

        if (!data) {
          throw new Error("User not found");
        }

        const user = data.member;
        console.log("user", user);

        return {
          name: user.nickname,
          email: user.email,
          image: user.profileImage,
          ...user,
        };
      },
    }),
  ],
});
