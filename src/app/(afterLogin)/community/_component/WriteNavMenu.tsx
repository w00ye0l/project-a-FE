"use client";

import { useParams, useRouter } from "next/navigation";

export default function WriteNavMenu() {
  const { boardName } = useParams();
  const router = useRouter();

  const handleWriteButtonClick = () => {
    router.push(`/community/${boardName}/write`);
  };

  return (
    <>
      {boardName && boardName != "best" && (
        <button onClick={handleWriteButtonClick}>게시글 작성</button>
      )}
    </>
  );
}
