import { auth } from "@/auth";
import BoardList from "./_component/BoardList";
import UserProfile from "./_component/UserProfile";
import style from "./layout.module.css";
import cx from "classnames";
import LoginPanel from "./_component/LoginPanel";
import Image from "next/image";
import NoticeList from "./_component/NoticeList";

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className={style.layout}>
      <BoardList />

      <div className={style.main}>{children}</div>

      <div className={style.infoPanel}>
        {session?.user ? <UserProfile me={session} /> : <LoginPanel />}

        <NoticeList />

        <div className={style.adSection}>
          <div className={cx(style.adContainer, style.smallAd)}>
            <Image
              className={style.smallAdImage}
              src="/ad/440x120.png"
              width={440}
              height={120}
              alt="ad"
            />
          </div>
          <div className={cx(style.adContainer, style.smallAd)}>
            <Image
              className={style.smallAdImage}
              src="/ad/440x120.png"
              width={440}
              height={120}
              alt="ad"
            />
          </div>
        </div>

        <div className={cx(style.adContainer, style.bigAd)}>
          <Image src="/ad/260x300.png" width={260} height={300} alt="ad" />
        </div>
      </div>
    </div>
  );
}
