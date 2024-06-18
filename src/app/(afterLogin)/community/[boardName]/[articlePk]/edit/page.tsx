"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getArticleDetail } from "../../../_lib/getArticleDetail";

import dynamic from "next/dynamic";
import { editArticle } from "../../../_lib/editArticle";

const QuillEditor = dynamic(
  () => import("../../write1/_component/QuillEditor"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function ArticleEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originContent, setOriginContent] = useState("");

  const getData = async () => {
    try {
      const result = await getArticleDetail({
        articlePk: params.articlePk as string,
      });

      console.log({ result });

      setTitle(result.data.title);
      setContent(result.data.content);
      setOriginContent(result.data.originContent);
    } catch (error) {
      console.error("Error fetching article details:", error);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 수정
  const onSubmit = async () => {
    console.log({ title, content, originContent });

    // 게시글 수정 API 호출
    editArticle({
      articlePk: Number(params.articlePk),
      ArticleData: {
        title,
        content,
        originContent,
      },
    });

    router.push(`/community/${params.boardName}/${params.articlePk}`);
    router.refresh();
  };

  // 뒤로가기 버튼 클릭
  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>글 수정 페이지</h1>

      <div>
        <button onClick={handleBackButtonClick}>뒤로가기</button>
        <button onClick={onSubmit}>수정</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : !title && !originContent ? (
        <p>Article not found</p>
      ) : (
        <div>
          <label>게시글 제목: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <QuillEditor
            value={originContent}
            onOriginChange={(value) => setOriginContent(value)}
            onChange={(value) => setContent(value)}
          />
        </div>
      )}
    </>
  );
}
