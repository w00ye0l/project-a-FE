import { Article } from "@/model/Article";
import Link from "next/link";
import cx from "classnames";
import DOMPurify from "isomorphic-dompurify";

export default function Article({ article }: { article: Article }) {
  // iframe 태그 허용
  const sanitizeHtml = (dirty: string) => {
    return DOMPurify.sanitize(dirty, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  };

  return (
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
  );
}
