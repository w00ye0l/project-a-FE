import Link from "next/link";

export default function CommunityPage() {
  return (
    <>
      <h1>커뮤니티</h1>

      <Link href="/community/write">게시글 작성</Link>
    </>
  );
}
