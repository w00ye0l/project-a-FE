"use client";

import style from "./page.module.css";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { createArticle } from "../_lib/createArticle";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";
import DotSpinner from "@/app/_component/DotSpinner";

interface IBoard {
  boardPk: number;
  boardName: string;
}

interface VideoFile extends File {
  preview: string;
}

const QuillEditor = dynamic(() => import("./_component/QuillEditor"), {
  ssr: false,
  loading: () => <DotSpinner size={20} />,
});

export default function CommunityWritePage() {
  const router = useRouter();
  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [boardName, setBoardName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originContent, setOriginContent] = useState("");
  const [videos, setVideos] = useState<VideoFile[]>([]);

  // 게시판 목록 조회
  const getBoardList = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/community/boardlist`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    setBoardList(result.data);
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

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.titleContainer}>
        <h2 className={style.title}>게시글 작성</h2>

        <select
          className={cx(style.container, style.boardContainer)}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setBoardName(e.target.value)
          }
        >
          <option value="">게시판을 선택하세요.</option>
          {boardList.map((board) => (
            <option key={board.boardPk} value={board.boardName}>
              {board.boardName}
            </option>
          ))}
        </select>
      </div>

      <input
        className={cx(style.container, style.titleInput)}
        type="text"
        value={title}
        placeholder="제목을 입력하세요."
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
        <h2 className={style.subTitle}>파일 첨부</h2>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={style.videoSection}>
            비디오를 업로드하려면 클릭하거나 파일을 끌어오세요.
          </div>
        </div>
      </div>

      <div className={style.previewContainer}>
        {videos && videos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {videos.map((video, index) => (
              <div key={index} style={{ display: "inline-block" }}>
                <p>
                  {video.name}
                  <button onClick={() => removeVideo(index)}>제거</button>
                </p>
                <video src={video.preview} controls width="300px" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={style.buttonContainer}>
        <button
          className={cx(style.btn, style.outlineBtn)}
          onClick={handleBackButtonClick}
        >
          뒤로 가기
        </button>
        <button className={style.btn} onClick={onSubmit}>
          작성하기
        </button>
      </div>
    </div>
  );
}
