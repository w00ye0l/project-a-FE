"use client";

import { Suspense } from "react";
import ArticleList from "./_component/ArticleList";

export default function CommunityPage() {
  return (
    <Suspense>
      <h1>전체 글 목록</h1>

      <ArticleList boardName={""} />
    </Suspense>
  );
}
