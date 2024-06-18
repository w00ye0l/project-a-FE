import Link from "next/link";
import BoardList from "./_component/BoardList";
import WriteNavMenu from "./_component/WriteNavMenu";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>커뮤니티</h1>

      <Link href="/">홈으로</Link>

      <div style={{ display: "flex", gap: "30px" }}>
        <BoardList />

        <div style={{ flex: "10" }}>
          <WriteNavMenu />
          {children}
        </div>
      </div>
    </>
  );
}
