"use client";

import { usePathname, useRouter } from "next/navigation";
import { getArticleDetail } from "../../_lib/getArticleDetail";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Article } from "@/model/Article";

const ViewerComponent = dynamic(() => import("./_component/Viewer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function ArticleDetailPage() {
  const pathname = usePathname();
  const articlePk = pathname.split("/")[3];
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // 게시글 상세 API 호출
  const getData = async () => {
    try {
      const result = await getArticleDetail({ articlePk });
      setArticle(result.data);
    } catch (error) {
      console.error("Error fetching article details:", error);
    } finally {
      setLoading(false);
    }
  };

  // 뒤로가기 버튼 클릭
  const handleBackButtonClick = () => {
    router.back();
  };

  // 수정 버튼 클릭
  const handleEditButtonClick = () => {
    router.push(`/community/${article?.boardName}/${article?.articlePk}/edit`);
  };

  useEffect(() => {
    getData();
  }, []);

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
            <button onClick={handleEditButtonClick}>수정</button>
            <button>삭제</button>
          </div>

          <div>
            <p>게시글 번호: {article.articlePk}</p>
            <p>게시글 제목: {article.title}</p>
            <p>게시글 내용: {article.content}</p>
            <p>게시글 내용 원본: {article.originContent}</p>
            <p>조회수: {article.readCount}</p>
            <p>좋아요 수: {article.likeCount}</p>
            <p>작성일: {article.createdAt}</p>
            <p>수정일: {article.updatedAt}</p>
          </div>

          <ViewerComponent originContent={article.originContent} />
        </>
      )}
    </>
  );
}
