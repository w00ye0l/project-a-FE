"use client";

import { useParams } from "next/navigation";
import ArticleList from "../_component/ArticleList";
import style from "./page.module.css";

const BoardName: { [key: string]: string } = {
  best: "인기글",
  carinfo: "차량 정보",
  free: "자유",
  mycar: "출고",
  humor: "유머",
  enter: "연예",
  idol: "아이돌",
  sports: "스포츠",
  event: "이벤트",
  notice: "공지사항",
  qna: "건의사항",
  adult: "성인",
};

export default function CommunityBoardPage() {
  // 동적 경로 매개변수
  const { boardName }: { boardName: string } = useParams();

  return (
    <div className={style.main}>
      {/* <WriteNavMenu /> */}

      <h1 className={style.title}>{BoardName[boardName]} 게시판</h1>

      <ArticleList boardName={boardName} />
    </div>
  );
}
