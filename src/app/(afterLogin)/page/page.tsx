import LogoutButton from "@/app/_component/LogoutButton";
import { CustomUser } from "@/app/model/User";
import { auth } from "@/auth";
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
      </div>

      <LogoutButton me={session} />
    </>
  );
}
