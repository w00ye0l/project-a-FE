"use client";

import { useParams } from "next/navigation";
import { getArticleList } from "../_lib/getArticleList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Article } from "@/model/Article";

export default function CommunityBoardPage() {
  // 동적 경로 매개변수
  const { boardName } = useParams();
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async ({ boardName }: { boardName: string | string[] }) => {
    const result = await getArticleList({ boardName });

    // console.log({ result });

    setArticleList(result.data);
  };

  useEffect(() => {
    getData({ boardName });
  }, [boardName]);

  return (
    <>
      <h1>{boardName} 게시판</h1>

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
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {articleList.map((article) => (
            <tr key={article.articlePk}>
              <td>{article.boardName}</td>
              <td>{article.articlePk}</td>
              <td>
                <Link href={`/community/${boardName}/${article.articlePk}`}>
                  {article.title}
                </Link>
              </td>
              <td>{article.content}</td>
              <td>{article.readCount}</td>
              <td>{article.likeCount}</td>
              <td>{article.createdAt}</td>
              <td>{article.nickname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
