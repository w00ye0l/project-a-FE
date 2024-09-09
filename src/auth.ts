import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CustomUser } from "./model/CustomUser";

interface ExtendedUser extends CustomUser {
  id: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  emailVerified: Date | null; // AdapterUser에서 요구하는 필드 추가
}

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
      id: "default-login",
      name: "DefaultLogin",
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

        const user = await authResponse.json();

        if (user.statusCode === 400) {
          console.log({ user });
          throw new Error(user);
        }

        // JWT 토큰을 헤더에서 추출
        const accessToken = authResponse.headers.get("accessToken");
        const refreshToken = authResponse.headers.get("refreshToken");

        // JWT를 유저 객체에 포함하여 반환
        // return user;
        return { ...user.data, accessToken, refreshToken };
      },
    }),
    Credentials({
      id: "social-login",
      name: "SocialLogin",
      credentials: {
        accessToken: { label: "Access Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        pk: { label: "User PK", type: "text" },
      },
      authorize: async (credentials) => {
        const { accessToken, refreshToken, pk } = credentials;

        // console.log({ accessToken, refreshToken, pk });

        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/${pk}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const user = await authResponse.json();

        if (user.statusCode === 400) {
          console.log({ user });
          throw new Error(user);
        }

        if (user.data && user.data.email) {
          return { ...user.data, accessToken, refreshToken };
        } else {
          throw new Error("Authentication failed!");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, trigger, user, session }) {
      // console.log("jwt callback", token, account, user);

      // 타입 단언 사용
      const extendedUser = user as ExtendedUser;

      if (account && extendedUser) {
        // token에 유저 정보, JWT 정보 추가
        token = { ...token, ...account, ...extendedUser };
      }

      // 세션 정보 업데이트 시
      if (trigger === "update" && session) {
        token = { ...token, ...session };
        return token;
      }

      // console.log("jwt token", token);
      return token;
    },
    async session({ session, user, token }) {
      // console.log("session callback", session, user, token);

      // 세션의 사용자 객체에 대한 타입 단언
      session.user = session.user as ExtendedUser;

      if (token) {
        // 세션에 유저 정보, JWT 정보 추가
        session = { ...session, ...token };
      }
      // console.log("session", session);
      return session;
    },
  },
});
