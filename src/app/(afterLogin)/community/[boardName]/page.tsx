"use client";

import { useParams } from "next/navigation";
import { getArticleList } from "../_lib/getArticleList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Article } from "@/model/Article";
import ArticleActionButtonBox from "../_component/ArticleActionButtonBox";
import WriteNavMenu from "../_component/WriteNavMenu";
import cx from "classnames";
import DOMPurify from "isomorphic-dompurify";

export default function CommunityBoardPage() {
  // 동적 경로 매개변수
  const { boardName } = useParams();
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async ({ boardName }: { boardName: string | string[] }) => {
    const result = await getArticleList({ boardName });

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
    getData({ boardName });
  }, [boardName]);

  return (
    <>
      <WriteNavMenu />

      <h1>{boardName} 게시판</h1>

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
