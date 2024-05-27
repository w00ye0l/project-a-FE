import LogoutButton from "@/app/_component/LogoutButton";
import { CustomUser } from "@/app/model/User";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const session = await auth();
  const userInfo = session as CustomUser;

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <div>My Page</div>
      <div>
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
        <p>{userInfo.userType}</p>
        <p>{userInfo.picture}</p>
        <p>{userInfo.point}</p>
        <p>{userInfo.cash}</p>
        <p>{userInfo.eventPoint}</p>
        <p>{userInfo.accessToken}</p>
        <p>{userInfo.refreshToken}</p>

        <Link href="/user/change/pw">비밀번호 변경</Link>
      </div>

      <LogoutButton me={session} />
    </>
  );
}
