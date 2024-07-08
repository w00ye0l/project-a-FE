"use client";

import { useParams } from "next/navigation";
import WriteNavMenu from "../_component/WriteNavMenu";
import ArticleList from "../_component/ArticleList";

export default function CommunityBoardPage() {
  // 동적 경로 매개변수
  const { boardName }: { boardName: string } = useParams();

  return (
    <>
      <WriteNavMenu />

      <h1>{boardName} 게시판</h1>

      <ArticleList boardName={boardName} />
    </>
  );
}
