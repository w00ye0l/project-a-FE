"use client";

import { Article } from "@/model/Article";
import Link from "next/link";
import style from "./article.module.css";
import cx from "classnames";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { useEffect, useState } from "react";
import DotSpinner from "@/app/_component/DotSpinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Media = {
  src: string | null;
  width: number;
  height: number;
  mediaLength: number | undefined;
};

export default function CArticle({ article }: { article: Article }) {
  const [media, setMedia] = useState<Media>();
  const [loading, setLoading] = useState(true);

  // iframe 태그 허용
  const sanitizeHtml = (dirty: string) => {
    return DOMPurify.sanitize(dirty, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  };

  // 이미지 URL, width, height 추출
  const extractImageUrl = (content: string) => {
    const srcMatch = content.match(/img src="([^"]+)"/);
    const widthMatch = content.match(/width="(\d+)"/);
    const heightMatch = content.match(/height="(\d+)"/);
    const mediaLength = srcMatch?.length;

    setLoading(false);

    return {
      src: srcMatch ? srcMatch[1] : null,
      width: widthMatch ? parseInt(widthMatch[1], 10) : 100,
      height: heightMatch ? parseInt(heightMatch[1], 10) : 100,
      mediaLength,
    };
  };

  useEffect(() => {
    setMedia(extractImageUrl(article.originContent));
  }, []);

  return (
    <Link
      className={style.article}
      href={`/community/${article.boardName}/${article.articlePk}`}
    >
      <Image
        className={style.moreArticle}
        src="/icon/more_article.png"
        width={24}
        height={24}
        alt="article_option"
      />

      <div className={style.titleUserInfoSection}>
        <div>
          <h1 className={style.title}>{article.title}</h1>
          <p className={style.createdAt}>
            {dayjs(article.createdAt).fromNow()}
          </p>
        </div>

        <div className={style.userInfoContainer}>
          <div className={style.imageLevelContainer}>
            {article.user.profileImage !== "NoImage" ? (
              <Image
                className={style.writeProfileImage}
                src={article.user.profileImage}
                width={24}
                height={24}
                alt="profile_image"
              />
            ) : (
              <div className={style.writeProfileImage}></div>
            )}
            <p className={style.writeNickname}>{article.user.nickname}</p>
          </div>
          <div className={style.level}>
            <span className={style.levelTag}>Lv.</span>
            {article.user.exp}
          </div>
        </div>
      </div>

      <hr className={style.hr} />

      <div className={style.contentContainer}>
        <div
          className={cx("ql-content", style.content)}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(article.content.trim()),
          }}
        />

        {loading ? (
          <DotSpinner size={40} />
        ) : (
          <>
            {media?.src && media?.mediaLength !== 0 ? (
              // 이미지가 있을 경우
              <div className={style.mediaContainer}>
                <Image
                  className={style.articleImage}
                  src={media.src}
                  width={media.width}
                  height={media.height}
                  alt="image"
                />
              </div>
            ) : (
              article.videos &&
              article.videos.length > 0 && (
                // 이미지가 없을 경우 비디오 있는지 체크
                <div className={style.mediaContainer}>
                  <div className="video-container">
                    <video src={article.videos[0]} controls width="100%" />
                  </div>
                </div>
              )
            )}
          </>
        )}

        <div className={style.blurBox}></div>

        <div className={style.more}>자세히 보기</div>
      </div>

      <hr className={style.hr} />
    </Link>
  );
}
