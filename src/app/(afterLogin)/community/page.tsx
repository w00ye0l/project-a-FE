"use client";

import { useEffect, useState } from "react";
import { getArticleList } from "./_lib/getArticleList";
import Link from "next/link";
import { Article } from "@/model/Article";
import ArticleActionButtonBox from "./_component/ArticleActionButtonBox";

export default function CommunityPage() {
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async () => {
    const result = await getArticleList({});

    console.log({ result });

    setArticleList(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>전체 글 목록</h1>

      {articleList.map((article) => (
        <div className="box" key={article.articlePk}>
          <Link
            style={{ color: "black", textDecoration: "none" }}
            href={`/community/${article.boardName}/${article.articlePk}`}
          >
            <p>
              [{article.boardName} 게시판] {article.articlePk}번 글 [닉네임:{" "}
              {article.user.nickname}] 조회수: {article.readCount}
            </p>
            <p style={{ fontSize: "20px" }}>{article.title}</p>
            <p className="box">{article.content}</p>
            <p>작성일: {article.createdAt}</p>
          </Link>

          <ArticleActionButtonBox
            articlePk={article.articlePk}
            boardName={article.boardName}
            reactionCount={
              article.likeCount + article.neutralCount + article.dislikeCount
            }
            reactions={article.reactions}
            scrapCount={article.scrapCount}
            scraps={article.scraps}
          />
        </div>
      ))}
    </>
  );
}
