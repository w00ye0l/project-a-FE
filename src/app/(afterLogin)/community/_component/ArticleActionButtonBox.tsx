"use client";

import style from "./articleActionButton.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createReaction } from "../_lib/createReaction";
import { Reaction } from "@/model/Reaction";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/model/CustomUser";
import { Scrap } from "@/model/Scrap";
import { createScrap } from "../_lib/createScrap";

interface Props {
  articlePk: number;
  boardName: string;
  reactionCount: number;
  reactions: Reaction[];
  scrapCount: number;
  scraps: Scrap[];
}

export default function ArticleActionButtonBox({
  articlePk,
  boardName,
  reactionCount,
  reactions,
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
    const result = await createReaction({ articlePk, reactionType });

    if (result.responseCode === "REACTION_POST_SUCCESS") {
      // 리액션이 성공적으로 게시된 경우, 리액션 상태와 수 업데이트
      updateReactionsState(reactionType);
    } else if (result.responseCode === "REACTION_DELETE") {
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
    const result = await createScrap({ articlePk, scrapDisclosure: true });

    if (result.responseCode === "SCRAP_ADD_SUCCESS") {
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
            point: user.point,
            eventPoint: user.eventPoint,
            registeredAt: user.registeredAt,
            lastLogin: user.lastLogin,
          },
        },
      ]);
    } else if (result.responseCode === "SCRAP_DELETE_SUCCESS") {
      // 스크랩이 성공적으로 삭제된 경우, 스크랩 상태와 수 업데이트
      setScrapCountState((prev) => prev - 1);
      setScrapsState((prev) =>
        prev.filter((scrap) => scrap.user.userPk !== user.userPk)
      );
    }
  };

  return (
    <div>
      <div className={style.reactionUserContainer}>
        <div className={style.reactionUser}>따봉 {reactionCountState}</div>
        {reactionsState.length > 0 && (
          <div className={style.reactionUserList}>
            <p>감정표현 남긴 유저들</p>
            {reactionsState.map((reaction) => (
              <p key={reaction.user.userPk}>
                {reaction.reactionType} {reaction.user.nickname}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className={style.reactionUserContainer}>
        <div className={style.reactionUser}>스크랩 {scrapCountState}회</div>
        {scrapsState.filter((scrap) => scrap.scrapDisclosure === true).length >
          0 && (
          <div className={style.reactionUserList}>
            <p>스크랩한 유저들</p>
            {/* 스크랩 유저 목록
              스크랩 공개 여부에 따른 유저 닉네임 노출
            */}
            {scrapsState
              .filter((scrap) => scrap.scrapDisclosure === true)
              .map((scrap) => (
                <p key={scrap.user.userPk}>{scrap.user.nickname}</p>
              ))}
          </div>
        )}
      </div>

      <div className={style.reactionContainer}>
        <div className={style.reactionButton}>리액션</div>
        <div className={style.reactionActionList}>
          <button onClick={() => handleReactionButtonClick("LIKE")}>
            좋아요
          </button>
          <button onClick={() => handleReactionButtonClick("NEUTRAL")}>
            중립요
          </button>
          <button onClick={() => handleReactionButtonClick("DISLIKE")}>
            싫어요
          </button>
        </div>
      </div>

      <button onClick={handleCommentButtonClick}>댓글</button>
      <button onClick={handleScrapButtonClick}>스크랩</button>
    </div>
  );
}
