"use client";

import style from "./page.module.css";
import cx from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { createArticle } from "../../_lib/createArticle";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";

interface VideoFile extends File {
  preview: string;
}

const QuillEditor = dynamic(() => import("./_component/QuillEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CommunityWritePage() {
  const router = useRouter();
  const pathname = usePathname();
  const boardName = pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originContent, setOriginContent] = useState("");
  const [videos, setVideos] = useState<VideoFile[]>([]);

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

  // 게시글 작성 버튼 클릭
  const onSubmit = async () => {
    console.log({ boardName, title, content, originContent, videos });

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("originContent", originContent);
    videos.forEach((video, index) => {
      formData.append("videos", video);
    });

    // 게시글 작성 API 호출
    const result = await createArticle({
      boardName,
      formData,
    });

    console.log({ result });

    router.push(`/community/${boardName}`);
  };

  // 뒤로가기 버튼 클릭
  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <>
      <div className={style.buttonContainer}>
        <button onClick={handleBackButtonClick}>뒤로 가기</button>
        <button onClick={onSubmit}>작성하기</button>
      </div>

      <div className={style.main}>
        <div className={style.editorContainer}>
          <h2>글쓰기</h2>

          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className={style.editor}>
            <QuillEditor
              value={originContent}
              onOriginChange={setOriginContent}
              onChange={setContent}
            />
          </div>

          <div className={style.videoUploadContainer}>
            <h2>비디오 업로드</h2>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={cx("box")} style={{ height: "100px" }}>
                비디오를 업로드하려면 클릭하거나 파일을 끌어오세요.
              </div>
            </div>
          </div>
        </div>

        <div className={style.previewContainer}>
          <h2>미리보기</h2>
          <p>제목: {title}</p>
          <div
            className={cx(style.preview, "ql-content")}
            dangerouslySetInnerHTML={{
              // __html: DOMPurify.sanitize(originContent),
              __html: originContent,
            }}
          />
          <div
            className={cx("box", style.videoPreviewContainer)}
            style={{ display: "flex" }}
          >
            {videos.map((video, index) => (
              <div
                key={index}
                className={style.videoPreview}
                style={{ display: "inline-block" }}
              >
                <p>
                  {video.name}
                  <button onClick={() => removeVideo(index)}>제거</button>
                </p>
                <video src={video.preview} controls width="50%" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
