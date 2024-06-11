import Link from "next/link";
import BoardList from "./_component/BoardList";
import NavMenu from "./_component/NavMenu";

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
          <NavMenu />
          {children}
        </div>
      </div>
    </>
  );
}
