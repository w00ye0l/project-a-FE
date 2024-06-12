"use client";

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

import { useEffect, useState } from "react";
import { getArticleList } from "./_lib/getArticleList";

export default function CommunityPage() {
  const [articleList, setArticleList] = useState([] as IArticle[]);

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
