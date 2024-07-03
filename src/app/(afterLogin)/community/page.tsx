"use client";

import { useEffect, useState } from "react";
import { getArticleList } from "./_lib/getArticleList";
import Link from "next/link";
import { Article } from "@/model/Article";
import ArticleActionButtonBox from "./_component/ArticleActionButtonBox";
import cx from "classnames";
import DOMPurify from "isomorphic-dompurify";

export default function CommunityPage() {
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async () => {
    const result = await getArticleList({});

    setArticleList(result.data.content);
  };

  // iframe 태그 허용
  const sanitizeHtml = (dirty: string) => {
    return DOMPurify.sanitize(dirty, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>전체 글 목록</h1>

      {articleList &&
        articleList.length > 0 &&
        articleList.map((article) => (
          <div className={cx("box", "articleBox")} key={article.articlePk}>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              href={`/community/${article.boardName}/${article.articlePk}`}
            >
              <p>
                [{article.boardName} 게시판] {article.articlePk}번 글 [닉네임:{" "}
                {article.user.nickname}] 조회수: {article.readCount}
              </p>
              <p>작성일: {article.createdAt}</p>

              <div className={cx("box")}>
                <h2 className="articleTitle">{article.title}</h2>
                <div className={cx("box", "contentBox")}>
                  {article.videos &&
                    article.videos.length > 0 &&
                    article.videos.map((videoUrl, index) => (
                      <div key={index} className="video-container">
                        <video src={videoUrl} controls width="20%" />
                      </div>
                    ))}
                  <div
                    className={cx("ql-content")}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(article.originContent),
                    }}
                  />
                </div>
              </div>
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
