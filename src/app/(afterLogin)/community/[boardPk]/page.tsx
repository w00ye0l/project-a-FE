"use client";

import { useParams } from "next/navigation";
import { getArticleList } from "../_lib/getArticleList";
import { useEffect, useState } from "react";

interface IArticle {
  boardName: string;
  articlePk: number;
  title: string;
  content: string;
  originContent: string;
  readCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

///FIXME: zustand 상태 관리 라이브러리를 사용해야 함
/// boradName 상태를 전역으로 관리해야 함
export default function CommunityBoardPage() {
  // 동적 경로 매개변수
  const { boardPk } = useParams();
  const [articleList, setArticleList] = useState([] as IArticle[]);

  const getData = async ({ boardPk }: { boardPk: string | string[] }) => {
    const result = await getArticleList({ boardPk });

    // console.log({ result });

    setArticleList(result.data);
  };

  useEffect(() => {
    getData({ boardPk });
  }, [boardPk]);

  return (
    <>
      <h1>{boardPk}번 게시판</h1>

      <table>
        <thead>
          <tr>
            <th>게시판 이름</th>
            <th>게시글 번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>조회수</th>
            <th>좋아요 수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {articleList.map((article) => (
            <tr key={article.articlePk}>
              <td>{article.boardName}</td>
              <td>{article.articlePk}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.readCount}</td>
              <td>{article.likeCount}</td>
              <td>{article.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
