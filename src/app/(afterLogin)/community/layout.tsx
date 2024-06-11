import NavMenu from "./_component/NavMenu";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>커뮤니티</h1>
      <NavMenu />
      {children}
    </div>
  );
}
