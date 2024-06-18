"use client";

import { useEffect, useState } from "react";
import { getArticleList } from "./_lib/getArticleList";
import Link from "next/link";
import { Article } from "@/model/Article";

export default function CommunityPage() {
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async () => {
    const result = await getArticleList({});

    console.log({ result });

    setArticleList(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>전체 글 목록</h1>

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
                <Link
                  href={`/community/${article.boardName}/${article.articlePk}`}
                >
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
