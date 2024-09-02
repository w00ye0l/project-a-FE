"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getArticleDetail } from "../../../_lib/getArticleDetail";
import { editArticle } from "../../../_lib/editArticle";
import dynamic from "next/dynamic";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";
import { toast } from "sonner";

interface VideoFile extends File {
  preview: string;
}

const QuillEditor = dynamic(
  () => import("../../../write/_component/QuillEditor"),
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
  const [videos, setVideos] = useState<VideoFile[]>([]);

  // 계시글 정보 조회
  const getData = async () => {
    try {
      const result = await getArticleDetail({
        articlePk: params.articlePk as string,
      });

      console.log({ result });

      setTitle(result.data.title);
      setContent(result.data.content);
      setOriginContent(result.data.originContent);
      // setVideos(result.data.videos);
    } catch (error) {
      console.error("Error fetching article details:", error);
    } finally {
      setLoading(false);
    }
  };

  // 파일 드랍 이벤트
  const onDrop = (acceptedFiles: File[]) => {
    const videoFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    ) as VideoFile[];
    setVideos((prevVideos) => [...prevVideos, ...videoFiles]);
  };

  // Dropzone 설정
  const {
    getRootProps,
    getInputProps,
  }: {
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
  } = useDropzone({
    accept: { "video/*": [] },
    onDrop,
  });

  // 비디오 제거
  const removeVideo = (index: number) => {
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

  // 게시글 수정
  const onSubmit = async () => {
    console.log({ title, content, originContent, videos });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("originContent", originContent);
    videos.forEach((video, index) => {
      formData.append("videos", video);
    });

    // 게시글 수정 API 호출
    const result = await editArticle({
      articlePk: Number(params.articlePk),
      formData,
    });

    console.log({ result });

    if (result.statusCode && result.statusCode === 201) {
      router.replace(`/community/${params.boardName}/${params.articlePk}`);
      router.refresh();
      toast.success("게시글이 수정되었습니다.");
    } else {
      toast.error("게시글 수정에 실패했습니다.");
    }
  };

  // 뒤로가기 버튼 클릭
  const handleBackButtonClick = () => {
    router.push(`/community/${params.boardName}/${params.articlePk}`);
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
          <label htmlFor="title">제목: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <QuillEditor
            value={originContent}
            onOriginChange={(value) => setOriginContent(value)}
            onChange={(value) => setContent(value)}
          />

          <div>
            <h2>비디오 업로드</h2>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="box" style={{ height: "100px" }}>
                비디오를 업로드하려면 클릭하거나 파일을 끌어오세요.
              </div>
            </div>
            {videos.length > 0 && (
              <div className="box" style={{ display: "flex" }}>
                {videos.map((video, index) => (
                  <div key={index} style={{ display: "inline-block" }}>
                    <p>{video.preview}</p>
                    <p>
                      {video.name}
                      <button onClick={() => removeVideo(index)}>제거</button>
                    </p>
                    <video src={video.preview} controls width="30%" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
