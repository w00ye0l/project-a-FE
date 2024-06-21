"use client";

import { useParams } from "next/navigation";
import { getArticleList } from "../_lib/getArticleList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Article } from "@/model/Article";
import ArticleActionButtonBox from "../_component/ArticleActionButtonBox";
import WriteNavMenu from "../_component/WriteNavMenu";

export default function CommunityBoardPage() {
  // 동적 경로 매개변수
  const { boardName } = useParams();
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async ({ boardName }: { boardName: string | string[] }) => {
    const result = await getArticleList({ boardName });

    // console.log({ result });

    setArticleList(result.data);
  };

  useEffect(() => {
    getData({ boardName });
  }, [boardName]);

  return (
    <>
      <WriteNavMenu />

      <h1>{boardName} 게시판</h1>

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
