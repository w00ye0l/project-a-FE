"use client";

import style from "./articleActionButton.module.css";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createReaction } from "../_lib/postReaction";
import { Reaction } from "@/model/Reaction";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/model/CustomUser";
import { Scrap } from "@/model/Scrap";
import { createScrap } from "../_lib/postScrap";
import Image from "next/image";

interface Props {
  articlePk: number;
  boardName: string;
  reactionCount: number;
  reactions: Reaction[];
  commentCount: number;
  scrapCount: number;
  scraps: Scrap[];
}

export default function ArticleActionButtonBox({
  articlePk,
  boardName,
  reactionCount,
  reactions,
  commentCount,
  scrapCount,
  scraps,
}: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session as CustomUser;

  // 리액션 수와 상태 관리
  const [reactionCountState, setReactionCountState] = useState(reactionCount);
  const [reactionsState, setReactionsState] = useState(reactions);

  // 스크랩 수와 상태 관리
  const [scrapCountState, setScrapCountState] = useState(scrapCount);
  const [scrapsState, setScrapsState] = useState(scraps);

  const reactionImageSrc = user
    ? reactionsState.find((reaction) => reaction.user.userPk === user.userPk)
      ? reactionsState.find((reaction) => reaction.user.userPk === user.userPk)
          ?.reactionType === "LIKE"
        ? "/icon/article/like.png"
        : reactionsState.find(
            (reaction) => reaction.user.userPk === user.userPk
          )?.reactionType === "NEUTRAL"
        ? "/icon/article/neutral.png"
        : "/icon/article/dislike.png"
      : "/icon/article/reaction.png"
    : "/icon/article/reaction.png";

  // 현재 사용자의 리액션 타입을 업데이트하는 함수
  const updateReactionsState = (reactionType: string) => {
    const userReaction = reactionsState.find(
      (reaction) => reaction.user.userPk === user.userPk
    );

    if (userReaction) {
      // 사용자가 이미 반응한 경우, 리액션 타입을 업데이트
      setReactionsState((prev) =>
        prev.map((reaction) =>
          reaction.user.userPk === user.userPk
            ? { ...reaction, reactionType }
            : reaction
        )
      );
    } else {
      // 사용자가 아직 반응하지 않은 경우, 새 리액션 추가
      setReactionCountState((prev) => prev + 1);
      setReactionsState((prev) => [
        ...prev,
        {
          reactionType,
          user: {
            userPk: user.userPk,
            nickname: user.nickname,
            profileImage: user.profileImage,
            postCount: user.postCount,
            commentCount: user.commentCount,
            exp: user.exp,
            point: user.point,
            eventPoint: user.eventPoint,
            registeredAt: user.registeredAt,
            lastLogin: user.lastLogin,
          },
        },
      ]);
    }
  };

  // 리액션 버튼 클릭 처리 함수
  const handleReactionButtonClick = async (reactionType: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const result = await createReaction({ articlePk, reactionType });

    if (result.statusCode === 200 && result.data !== null) {
      // 리액션이 성공적으로 게시된 경우, 리액션 상태와 수 업데이트
      updateReactionsState(reactionType);
    } else if (result.statusCode === 200 && result.data === null) {
      // 리액션이 성공적으로 삭제된 경우, 리액션 상태와 수 업데이트
      setReactionsState((prev) =>
        prev.filter((reaction) => reaction.user.userPk !== user.userPk)
      );
      setReactionCountState((prev) => prev - 1);
    }
  };

  // 댓글 버튼 클릭 처리 함수
  const handleCommentButtonClick = () => {
    router.push(`/community/${boardName}/${articlePk}`);
  };

  // 스크랩 버튼 클릭 처리 함수
  const handleScrapButtonClick = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const result = await createScrap({ articlePk, scrapDisclosure: true });

    if (result.statusCode === 200 && result.data !== null) {
      // 스크랩이 성공적으로 추가된 경우, 스크랩 상태와 수 업데이트
      setScrapCountState((prev) => prev + 1);
      setScrapsState((prev) => [
        ...prev,
        {
          scrapDisclosure: true,
          user: {
            userPk: user.userPk,
            nickname: user.nickname,
            profileImage: user.profileImage,
            postCount: user.postCount,
            commentCount: user.commentCount,
            exp: user.exp,
            point: user.point,
            eventPoint: user.eventPoint,
            registeredAt: user.registeredAt,
            lastLogin: user.lastLogin,
          },
        },
      ]);
    } else if (result.statusCode === 200 && result.data === null) {
      // 스크랩이 성공적으로 삭제된 경우, 스크랩 상태와 수 업데이트
      setScrapCountState((prev) => prev - 1);
      setScrapsState((prev) =>
        prev.filter((scrap) => scrap.user.userPk !== user.userPk)
      );
    }
  };

  return (
    <div className={style.section}>
      <div className={cx(style.actionSection, style.reaction)}>
        <div className={style.reactionContainer}>
          <Image
            className={style.actionButton}
            src={reactionImageSrc}
            width={24}
            height={24}
            alt="reaction"
          />

          <div className={style.reactionActionSection}>
            <div className={style.reactionActionList}>
              <button
                className={cx(style.reactionBtn, style.like)}
                onClick={() => handleReactionButtonClick("LIKE")}
              >
                <Image
                  src="/icon/article/like.png"
                  width={30}
                  height={30}
                  alt="like"
                />
              </button>
              <button
                className={cx(style.reactionBtn, style.neutral)}
                onClick={() => handleReactionButtonClick("NEUTRAL")}
              >
                <Image
                  src="/icon/article/neutral.png"
                  width={30}
                  height={30}
                  alt="neutral"
                />
              </button>
              <button
                className={cx(style.reactionBtn, style.dislike)}
                onClick={() => handleReactionButtonClick("DISLIKE")}
              >
                <Image
                  src="/icon/article/dislike.png"
                  width={30}
                  height={30}
                  alt="dislike"
                />
              </button>
            </div>
          </div>
        </div>

        <p>{reactionCountState}</p>
      </div>

      <div className={style.actionSection}>
        <button
          className={style.actionButton}
          onClick={handleCommentButtonClick}
        >
          <Image
            src="/icon/article/comment_active.png"
            width={24}
            height={24}
            alt="comment"
          />
        </button>
        <p>{commentCount}</p>
      </div>

      <div className={style.actionSection}>
        <button className={style.actionButton} onClick={handleScrapButtonClick}>
          <Image
            src={
              user
                ? scrapsState.find((scrap) => scrap.user.userPk === user.userPk)
                  ? "/icon/article/scrap_active.png"
                  : "/icon/article/scrap.png"
                : "/icon/article/scrap.png"
            }
            width={24}
            height={24}
            alt="scrap"
          />
        </button>

        <p>{scrapCountState}</p>
      </div>

      <div className={style.actionSection}>
        <button className={style.actionButton}>
          <Image
            src="/icon/article/social_active.png"
            width={24}
            height={24}
            alt="social"
          />
        </button>
      </div>
    </div>
  );
}
