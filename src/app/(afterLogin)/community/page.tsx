"use client";

import { useEffect, useState } from "react";
import { getArticleList } from "./_lib/getArticleList";
import Link from "next/link";
import { Article } from "@/model/Article";
import ArticleActionButtonBox from "./_component/ArticleActionButtonBox";
import cx from "classnames";
import DOMPurify from "isomorphic-dompurify";
import ArticlePagination from "./_component/ArticlePagination";
import { PageInfo } from "@/model/PageInfo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CommunityPage() {
  const [articleList, setArticleList] = useState([] as Article[]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 게시글 목록 가져오기
  const getData = async () => {
    // 페이지네이션
    let page = 0;
    if (searchParams.has("page")) {
      page = Number(searchParams.get("page")) - 1;
    }
    const result = await getArticleList({ pageNumber: page });

    setArticleList(result.data.content);
    setPageInfo({
      number: result.data.number,
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      first: result.data.first,
      size: result.data.size,
      last: result.data.last,
    });
  };

  // iframe 태그 허용
  const sanitizeHtml = (dirty: string) => {
    return DOMPurify.sanitize(dirty, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  };

  // 페이지네이션 핸들러
  const handlePageMove = async (pageNumber: number) => {
    const result = await getArticleList({
      boardName: "",
      pageNumber: pageNumber - 1,
    });
    console.log(pageNumber);
    console.log(result.data.content);

    setArticleList(result.data.content);
    setPageInfo({
      number: result.data.number,
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      first: result.data.first,
      size: result.data.size,
      last: result.data.last,
    });

    // 스크롤을 상단으로 이동
    window.scrollTo({ top: 0, left: 0 });

    /// url에 page 쿼리 추가
    // url 객체 생성
    const params = new URLSearchParams(searchParams);

    // page 쿼리 추가
    params.set("page", pageNumber.toString());

    // url 변경
    replace(`${pathname}?${params.toString()}`);
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
              commentCount={article.commentCount}
              scrapCount={article.scrapCount}
              scraps={article.scraps}
            />
          </div>
        ))}

      {pageInfo && (
        <div
          style={{
            width: "800px",
            padding: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ArticlePagination
            handlePageMove={handlePageMove}
            pageInfo={pageInfo}
          />
        </div>
      )}
    </>
  );
}
