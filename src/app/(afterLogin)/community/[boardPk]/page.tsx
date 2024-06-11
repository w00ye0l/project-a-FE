"use client";

import { useParams } from "next/navigation";

///FIXME: zustand 상태 관리 라이브러리를 사용해야 함
export default function CommunityBoardPage() {
  // 동적 경로 매개변수
  const { boardPk } = useParams();

  return (
    <>
      <h1>{boardPk}번 게시판</h1>
    </>
  );
}
