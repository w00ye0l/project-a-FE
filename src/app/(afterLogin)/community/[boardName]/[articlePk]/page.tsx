"use client";

import { usePathname, useRouter } from "next/navigation";
import { getArticleDetail } from "../../_lib/getArticleDetail";
import { useEffect, useState } from "react";
import { Article } from "@/model/Article";
import { deleteArticle } from "../../_lib/deleteArticle";
import cx from "classnames";
import { getCommentList } from "../../_lib/getCommentList";
import { createComment } from "../../_lib/createComment";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/model/CustomUser";
import { deleteComment } from "../../_lib/deleteComment";
import DOMPurify from "isomorphic-dompurify";

export default function ArticleDetailPage() {
  const { data: session } = useSession();
  const user = session as CustomUser;
  const pathname = usePathname();
  const articlePk = pathname.split("/")[3];
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([] as any[]);

  // 게시글 상세 API 호출
  const getArticleData = async () => {
    try {
      const result = await getArticleDetail({ articlePk });
      setArticle(result.data);
    } catch (error) {
      console.error("Error fetching article details:", error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 목록 API 호출
  const getCommentListData = async () => {
    try {
      const result = await getCommentList({ articlePk });
      console.log({ result });
      setCommentList(result.data);
    } catch (error) {
      console.error("Error fetching comment list:", error);
    }
  };

  // 뒤로가기 버튼 클릭
  const handleBackButtonClick = () => {
    router.push(`/community/${article?.boardName}`);
  };

  // 수정 버튼 클릭
  const handleEditButtonClick = () => {
    router.push(`/community/${article?.boardName}/${article?.articlePk}/edit`);
  };

  // 삭제 버튼 클릭
  const handleDeleteButtonClick = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // 삭제 API 호출
      console.log("삭제");
      deleteArticle({ articlePk });
      router.push(`/community/${article?.boardName}`);
    }
  };

  // 댓글 삭제 버튼 클릭
  const handleCommentDeleteButtonClick = (commentPk: any) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // 댓글 삭제 API 호출
      console.log("댓글삭제");
      deleteComment({ commentPk });
      getCommentListData();
    }
  };

  // 댓글 작성 버튼 클릭
  const handleCommentSubmitButtonClick = () => {
    console.log("댓글작성");
    createComment({ articlePk, content: comment });
    getCommentListData();
  };

  useEffect(() => {
    getArticleData();
    getCommentListData();
  }, []);

  return (
    <>
      <h1>게시글 상세</h1>

      {loading ? (
        <p>Loading...</p>
      ) : !article ? (
        <p>Article not found</p>
      ) : (
        <>
          <div>
            <button onClick={handleBackButtonClick}>뒤로가기</button>
            <button onClick={handleEditButtonClick}>수정</button>
            <button onClick={handleDeleteButtonClick}>삭제</button>
          </div>

          <div className="box">
            <p>게시글 번호: {article.articlePk}</p>
            <p>게시글 제목: {article.title}</p>

            <div className="box">
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
                  __html: DOMPurify.sanitize(article.originContent),
                }}
              />
            </div>

            <p>조회수: {article.readCount}</p>
            <p>좋아요 수: {article.likeCount}</p>
            <p>작성일: {article.createdAt}</p>
            <p>수정일: {article.updatedAt}</p>
          </div>

          <div className="box">
            <h2>댓글</h2>
            <div>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={handleCommentSubmitButtonClick}>댓글작성</button>
            </div>

            <div>
              {commentList &&
                commentList.length &&
                commentList.map((comment) => (
                  <div className="box" key={comment.commentPk}>
                    {comment.member.userPk === user.userPk && (
                      <button
                        onClick={() => {
                          handleCommentDeleteButtonClick(comment.commentPk);
                        }}
                      >
                        삭제
                      </button>
                    )}
                    <p>작성자: {comment.member.nickname}</p>
                    <p>댓글 내용: {comment.content}</p>
                    <p>댓글 작성일: {comment.createdAt}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
