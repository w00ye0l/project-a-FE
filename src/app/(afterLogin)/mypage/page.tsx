import LogoutButton from "@/app/_component/LogoutButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserInfo from "./_component/UserInfo";
import Link from "next/link";

export default async function MyPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <h1>마이 페이지</h1>

      <Link href="/">홈으로</Link>

      <div>
        <UserInfo me={session} />
      </div>

      <LogoutButton me={session} />
    </>
  );
}
