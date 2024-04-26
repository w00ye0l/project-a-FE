// 프론트 서버에서 GET, POST 요청을 받으면
// http://localhost:3000/api/auth/[...nextauth]로 접근됨
// auth.ts에서 작성한 GET, POST (즉, next-auth의 handlers)를 사용함
export { GET, POST } from "@/auth";
