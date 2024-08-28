"use client";

import { Suspense } from "react";
import ArticleList from "./_component/ArticleList";
import style from "./page.module.css";
import BestArticleList from "./_component/BestArticleList";

export default function CommunityPage() {
  return (
    <div className={style.main}>
      <Suspense>
        {/* <ArticleList boardName={""} /> */}

        <h1 className={style.title}>커뮤니티</h1>

        <BestArticleList />
      </Suspense>
    </div>
  );
}
