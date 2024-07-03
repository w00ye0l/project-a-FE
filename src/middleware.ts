import { NextResponse } from "next/server";
// auth가 로그인했는지 안했는지 판단해줌
import { auth } from "./auth";

// 미들웨어를 통해서 config에 정의된 페이지에 접근할 시 세션 검사
// 세션이 없으면 로그인 페이지로 리다이렉트
export async function middleware() {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/login`);
  }
}

// 미들웨어를 적용할 라우트
// 로그인을 해야 접근 가능한 페이지
export const config = {
  matcher: ["/mypage"],
};
