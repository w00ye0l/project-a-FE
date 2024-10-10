"use client";

import { Article } from "@/model/Article";
import { useEffect, useState } from "react";
import { getArticleList } from "../_lib/getArticleList";
import style from "./bestArticleList.module.css";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BestArticleList() {
  const router = useRouter();
  const [articleList, setArticleList] = useState([] as Article[]);
  const date = new Date();
  const amPm = date.getHours() < 12 ? "오전" : "오후";
  const now = date.getHours();
  const user = useSession();

  // console.log(user.status);

  // 게시글 목록 가져오기
  const getData = async () => {
    const result = await getArticleList({ boardName: "best", pageNumber: 0 });

    if (result.data !== null) {
      setArticleList(result.data.content);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 이미지 URL, width, height 추출
  const extractImageUrl = (content: string) => {
    const srcMatch = content.match(/src="([^"]+)"/);
    const widthMatch = content.match(/width="(\d+)"/);
    const heightMatch = content.match(/height="(\d+)"/);

    return {
      src: srcMatch ? srcMatch[1] : null,
      width: widthMatch ? parseInt(widthMatch[1], 10) : 100,
      height: heightMatch ? parseInt(heightMatch[1], 10) : 100,
    };
  };

  // 게시글 클릭 시 이벤트
  const handleArticleBox = (article: Article) => {
    if (user.status !== "authenticated") {
      router.push("/auth/login");
      return;
    }
    // console.log(article);
    router.push(`/community/${article.boardName}/${article.articlePk}`);
  };

  return (
    <>
      <h2 className={style.bestTitle}>
        <Image src="/icon/best_active.png" width={20} height={20} alt="best" />
        인기글{" "}
        <span className={style.time}>
          {amPm} {now % 12 || 12}시 기준
        </span>
      </h2>

      <div className={style.topArticleSection}>
        {articleList.slice(0, 3).map((article: Article) => {
          const { src, width, height } = extractImageUrl(article.originContent);

          return (
            <div
              className={style.topArticleContainer}
              onClick={() => handleArticleBox(article)}
              key={article.articlePk}
            >
              {src && width && height ? (
                <Image
                  className={style.articleImage}
                  style={{ objectFit: "cover" }}
                  src={src}
                  width={width}
                  height={height}
                  alt="image"
                />
              ) : (
                <Image
                  className={cx(style.articleImage, style.defaultImage)}
                  style={{ objectFit: "contain" }}
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt="image"
                />
              )}
              <div className={style.articleInfo}>
                <h3 className={style.articleTitle}>{article.title}</h3>
                <p className={style.articleBoard}>
                  [{article.boardName}] 게시판
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.subArticleSection}>
        {articleList.slice(3, 8).map((article: Article) => {
          const { src, width, height } = extractImageUrl(article.originContent);

          return (
            <div
              className={style.subArticleContainer}
              onClick={() => handleArticleBox(article)}
              key={article.articlePk}
            >
              <div className={style.articleInfo}>
                <h3 className={style.articleTitle}>{article.title}</h3>
                <div className={style.articleBoard}>
                  <p>[{article.boardName}] 게시판</p>

                  <div className={style.reactionContainer}>
                    <div className={style.reactionBox}>
                      <Image
                        src="/icon/like.png"
                        width={14}
                        height={14}
                        alt="like"
                      />
                      <p>{article.likeCount}</p>
                    </div>

                    <div className={style.reactionBox}>
                      <Image
                        src="/icon/comment.png"
                        width={14}
                        height={14}
                        alt="comment"
                      />
                      <p>{article.commentCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              {src && width && height ? (
                <Image
                  className={cx(style.articleImage, style.subImage)}
                  style={{ objectFit: "cover" }}
                  src={src}
                  width={width}
                  height={height}
                  alt="image"
                />
              ) : (
                <Image
                  className={cx(
                    style.articleImage,
                    style.subImage,
                    style.defaultImage
                  )}
                  style={{ objectFit: "contain" }}
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt="image"
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
