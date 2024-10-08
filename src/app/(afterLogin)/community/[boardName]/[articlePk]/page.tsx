"use client";

import { usePathname, useRouter } from "next/navigation";
import { getArticleDetail } from "../../_lib/getArticleDetail";
import { useEffect, useRef, useState } from "react";
import { Article } from "@/model/Article";
import { deleteArticle } from "../../_lib/deleteArticle";
import style from "./page.module.css";
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
import DotSpinner from "@/app/_component/DotSpinner";
import ArticleActionButtonBox from "../../_component/ArticleActionButtonBox";
import Image from "next/image";
import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";

dayjs.extend(relativeTime);
dayjs.locale("ko");

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
  const [isOptionOpen, setIsOptionOpen] = useState(false); // optionContainer 상태
  const optionRef = useRef<HTMLDivElement | null>(null); // optionContainer를 참조하는 ref
  const imageRef = useRef<HTMLImageElement | null>(null); // Image 요소 참조

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

      if (result.data) {
        setCommentList(result.data.content);
      }
    } catch (error) {
      console.error("Error fetching comment list:", error);
    }
  };

  // 대댓글 목록 API 호출
  const getRecommentListData = async (commentPk: number) => {
    try {
      const result = await getRecommentList({ articlePk });
      console.log({ result });

      if (result.data) {
        const recommentList = result.data.filter(
          (recomment: any) => recomment.commentPk === commentPk
        );

        setRecommentList(recommentList);
      }

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
      router.refresh();
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
    if (comment.length === 0) {
      toast.warning("댓글을 입력해주세요.");

      return;
    }
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

  // more_article.png 이미지 클릭 핸들러
  const toggleOptionContainer = () => {
    setIsOptionOpen((prev) => !prev); // 열고 닫기 토글
  };

  // 문서 외부 클릭 시 optionContainer 닫기
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (
      optionRef.current &&
      !optionRef.current.contains(target) &&
      target !== imageRef.current // 클릭한 요소가 이미지가 아니면 닫기
    ) {
      setIsOptionOpen(false); // 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    // 문서 클릭 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {loading ? (
        <DotSpinner size={40} />
      ) : !article ? (
        <p>게시글을 찾을 수 없습니다.</p>
      ) : (
        <div className={style.main}>
          <div className={style.writerContainer}>
            {article.user.profileImage !== "NoImage" ? (
              <Image
                className={style.writerProfileImage}
                src={article.user.profileImage}
                width={40}
                height={40}
                alt="profileImage"
              />
            ) : (
              <div
                className={cx(style.writerProfileImage, style.defaultImage)}
              ></div>
            )}
            <div className={style.writerInfo}>
              <p>{article.user.nickname}</p>
              <p>Lv. {article.user.exp}</p>
            </div>
          </div>

          <hr className={style.hr} />

          <div>
            <div className={style.titleContainer}>
              <h1 className={style.title}>{article.title}</h1>
              <Image
                ref={imageRef} // Image 태그 참조 추가
                className={style.optionImage}
                src="/icon/more_article.png"
                width={24}
                height={24}
                alt="option"
                onClick={toggleOptionContainer}
              />
              {user && article.user.userPk === user.userPk && isOptionOpen && (
                <div ref={optionRef} className={style.optionContainer}>
                  <button className={style.btn} onClick={handleEditButtonClick}>
                    수정
                  </button>
                  <button
                    className={style.btn}
                    onClick={handleDeleteButtonClick}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>

            <div className={style.content}>
              {article.videos &&
                article.videos.length > 0 &&
                article.videos.map((videoUrl, index) => (
                  <div key={index} className="video-container">
                    <video src={videoUrl} controls width="100%" />
                  </div>
                ))}
              <div
                className={cx("ql-content")}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(article.originContent),
                }}
              />
            </div>

            <hr className={style.hr} />

            <div className={style.actionContainer}>
              <ArticleActionButtonBox
                articlePk={article.articlePk}
                boardName={article.boardName}
                reactionCount={
                  article.likeCount +
                  article.neutralCount +
                  article.dislikeCount
                }
                reactions={article.reactions}
                commentCount={article.commentCount}
                scrapCount={article.scrapCount}
                scraps={article.scraps}
              />

              <p>조회수 {article.readCount}회</p>
            </div>
          </div>

          <div className={style.commentSection}>
            <p>댓글 {commentList.length}개</p>

            {user ? (
              <div className={style.commentInputContainer}>
                {user.profileImage !== "NoImage" ? (
                  <Image
                    className={style.commentProfile}
                    src={user.profileImage}
                    width={30}
                    height={30}
                    alt="profile"
                  />
                ) : (
                  <div className={style.commentProfile}></div>
                )}
                <div className={style.commentInputBox}>
                  <input
                    className={style.commentInput}
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="댓글을 입력해주세요."
                  />
                  <Image
                    className={style.commentBtn}
                    onClick={handleCommentSubmitButtonClick}
                    src="/icon/upload.png"
                    width={22}
                    height={22}
                    alt="send"
                  />
                </div>
              </div>
            ) : (
              <div className={style.notLoginSection}>
                <p>댓글 작성은 로그인이 필요한 서비스입니다.</p>
                <Link href="/auth/login">로그인</Link>
              </div>
            )}

            <div className={style.commentListSection}>
              {commentList &&
                commentList.length > 0 &&
                commentList.map((comment) => (
                  <div
                    className={style.commentContainer}
                    key={comment.commentPk}
                  >
                    <div className={style.commentUserContainer}>
                      {comment.user.profileImage !== "NoImage" ? (
                        <Image
                          className={style.commentProfile}
                          src={comment.user.profileImage}
                          width={30}
                          height={30}
                          alt="profile"
                        />
                      ) : (
                        <div className={style.commentProfile}></div>
                      )}
                      <div className={style.commentUserInfo}>
                        <p className={style.commentNickname}>
                          {comment.user.nickname}
                        </p>
                        <p className={style.commentLevelTime}>
                          Lv. {comment.user.exp}
                          {"  ·  "}
                          {dayjs(comment.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <p className={style.comment}>{comment.content}</p>

                    <div className={style.commentMenuSection}>
                      <div className={style.commentMenuContainer}>
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
                        {user &&
                          comment.user.userPk === user.userPk &&
                          !comment.deleteCheck && (
                            <button
                              onClick={() => {
                                handleCommentDeleteButtonClick(
                                  comment.commentPk
                                );
                              }}
                            >
                              삭제
                            </button>
                          )}
                      </div>

                      {showRecommentForm === comment.commentPk && (
                        <div className={style.commentInputBox}>
                          <input
                            className={style.commentInput}
                            type="text"
                            value={recomment}
                            onChange={(e) => setRecomment(e.target.value)}
                            placeholder="답글을 입력해주세요."
                          />
                          <Image
                            className={style.commentBtn}
                            onClick={() =>
                              handleRecommentSubmitButtonClick(
                                comment.commentPk
                              )
                            }
                            src="/icon/upload.png"
                            width={22}
                            height={22}
                            alt="send"
                          />
                        </div>
                      )}
                    </div>

                    <div className={style.recommentSection}>
                      {visibleRecomments === comment.commentPk &&
                        recommentList.map((recomment) => (
                          <div
                            className={style.recommentContainer}
                            key={recomment.recommentPk}
                          >
                            <div className={style.commentUserContainer}>
                              {recomment.user.profileImage !== "NoImage" ? (
                                <Image
                                  className={style.commentProfile}
                                  src={recomment.user.profileImage}
                                  width={30}
                                  height={30}
                                  alt="profile"
                                />
                              ) : (
                                <div className={style.commentProfile}></div>
                              )}
                              <div className={style.commentUserInfo}>
                                <p className={style.commentNickname}>
                                  {recomment.user.nickname}
                                </p>
                                <p className={style.commentLevelTime}>
                                  Lv. {recomment.user.exp}{" "}
                                  {dayjs(recomment.createdAt).fromNow()}
                                </p>
                              </div>
                            </div>

                            <p className={style.comment}>{recomment.content}</p>

                            <div className={style.recommentMenuContainer}>
                              {recomment.user.userPk === user.userPk && (
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
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
