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
import { createRecomment } from "../../_lib/createRecomment";
import { getRecommentList } from "../../_lib/getRecommentList";
import { deleteRecomment } from "../../_lib/deleteRecomment";

export default function ArticleDetailPage() {
  const { data: session } = useSession();
  const user = session as CustomUser;
  const pathname = usePathname();
  const articlePk = pathname.split("/")[3];
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [recomment, setRecomment] = useState("");
  const [commentList, setCommentList] = useState([] as any[]);
  const [recommentList, setRecommentList] = useState([] as any[]);
  const [showRecommentForm, setShowRecommentForm] = useState<number | null>(
    null
  );
  const [visibleRecomments, setVisibleRecomments] = useState<number | null>(
    null
  );

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
      setCommentList(result.data.content);
    } catch (error) {
      console.error("Error fetching comment list:", error);
    }
  };

  // 대댓글 목록 API 호출
  const getRecommentListData = async (commentPk: number) => {
    try {
      const result = await getRecommentList({ articlePk, commentPk });
      console.log({ result });
      const recommentList = result.data.filter(
        (recomment: any) => recomment.commentPk === commentPk
      );

      setRecommentList(recommentList);

      console.log({ recommentList });
    } catch (error) {
      console.error("Error fetching recomment list:", error);
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
  const handleCommentDeleteButtonClick = (commentPk: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // 댓글 삭제 API 호출
      console.log("댓글삭제");
      deleteComment({ commentPk });
      setVisibleRecomments(null);
      getCommentListData();
    }
  };

  // 대댓글 삭제 버튼 클릭
  const handleRecommentDeleteButtonClick = (recommentPk: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // 대댓글 삭제 API 호출
      console.log("대댓글삭제, recommentPk:", recommentPk);
      deleteRecomment({ recommentPk });
      setVisibleRecomments(null);
      getCommentListData();
    }
  };

  // 댓글 작성 버튼 클릭
  const handleCommentSubmitButtonClick = () => {
    console.log("댓글작성");
    createComment({ articlePk, content: comment });

    setComment("");
    getCommentListData();
  };

  // 대댓글 작성 버튼 클릭
  const handleRecommentSubmitButtonClick = (commentPk: number) => {
    console.log("대댓글작성");
    console.log({ articlePk, commentPk, recomment });

    createRecomment({ articlePk, commentPk, recomment });

    setRecomment("");
    setShowRecommentForm(null);
    setVisibleRecomments(null);
    getCommentListData();
  };

  // 대댓글 폼 토글
  const handleRecommentFormToggle = (commentPk: number) => {
    setShowRecommentForm((prev) => (prev === commentPk ? null : commentPk));
  };

  // 답글 보기/숨기기 토글
  const toggleRecommentsVisibility = async (commentPk: number) => {
    if (visibleRecomments === commentPk) {
      setVisibleRecomments(null);
    } else {
      await getRecommentListData(commentPk);
      setVisibleRecomments(commentPk);
    }
  };

  // iframe 태그 허용
  const sanitizeHtml = (dirty: string) => {
    return DOMPurify.sanitize(dirty, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  };

  useEffect(() => {
    getArticleData();
    getCommentListData();
  }, []);

  if (!session) {
    return;
  }

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
            {article.user.userPk === user.userPk && (
              <>
                <button onClick={handleEditButtonClick}>수정</button>
                <button onClick={handleDeleteButtonClick}>삭제</button>
              </>
            )}
          </div>

          <div className={cx("box", "articleBox")}>
            <p>게시글 번호: {article.articlePk}</p>
            <p>게시글 제목: {article.title}</p>

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

            <p>조회수: {article.readCount}</p>
            <p>좋아요 수: {article.likeCount}</p>
            <p>작성일: {article.createdAt}</p>
            <p>수정일: {article.updatedAt}</p>
          </div>

          <div className={cx("box", "articleBox")}>
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
                commentList.length > 0 &&
                commentList.map((comment) => (
                  <div className="box" key={comment.commentPk}>
                    {comment.member.userPk === user.userPk &&
                      !comment.deleteCheck && (
                        <button
                          onClick={() => {
                            handleCommentDeleteButtonClick(comment.commentPk);
                          }}
                        >
                          삭제
                        </button>
                      )}
                    <p>작성자: {comment.member.nickname}</p>
                    <p>댓글 작성일: {comment.createdAt}</p>
                    <p>댓글 내용: {comment.content}</p>

                    {comment.recommentCount > 0 && (
                      <button
                        onClick={() =>
                          toggleRecommentsVisibility(comment.commentPk)
                        }
                      >
                        {visibleRecomments === comment.commentPk
                          ? "답글 숨기기"
                          : `답글 보기 (${comment.recommentCount}개)`}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleRecommentFormToggle(comment.commentPk)
                      }
                    >
                      답글 달기
                    </button>
                    {showRecommentForm === comment.commentPk && (
                      <div>
                        <input
                          type="text"
                          value={recomment}
                          onChange={(e) => setRecomment(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            handleRecommentSubmitButtonClick(comment.commentPk)
                          }
                        >
                          답글 작성
                        </button>
                      </div>
                    )}

                    {visibleRecomments === comment.commentPk &&
                      recommentList.map((recomment) => (
                        <div key={recomment.recommentPk} className="box">
                          <p>작성자: {recomment.member.nickname}</p>
                          <p>답글 작성일: {recomment.createdAt}</p>
                          <p>답글 내용: {recomment.content}</p>

                          {recomment.member.userPk === user.userPk && (
                            <button
                              onClick={() => {
                                handleRecommentDeleteButtonClick(
                                  recomment.recommentPk
                                );
                              }}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
