import { Suspense } from "react";
import MainNav from "./_component/MainNav";
import SubNav from "./_component/SubNav";
import style from "./admin.module.css";
import { auth } from "@/auth";
import { CustomUser } from "@/model/CustomUser";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session as CustomUser;

  // console.log(user.nickname);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className={style.main}>
        <aside className={style.left}>
          <h1>ADMIN</h1>

          <div className={style.profile}>
            <div className={style.profileImg}>
              {user.profileImage && (
                <Image
                  src={user.profileImage}
                  width={40}
                  height={40}
                  alt="프로필 이미지"
                />
              )}
            </div>
            <p>{user.nickname}님</p>
          </div>

          <MainNav />
        </aside>

        <section className={style.right}>
          <SubNav />

          {children}
        </section>
      </main>
    </Suspense>
  );
}
