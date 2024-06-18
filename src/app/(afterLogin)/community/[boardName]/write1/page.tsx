"use client";

import style from "./page.module.css";
import cx from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { createArticle } from "../../_lib/createArticle";

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

  const onSubmit = async () => {
    console.log({ boardName, title, content, originContent });

    // 게시글 작성 API 호출
    const result = await createArticle({
      boardName,
      ArticleData: {
        title,
        content,
        originContent,
      },
    });

    console.log({ result });
    setTitle("");
    setContent("");
    setOriginContent("");

    router.push(`/community/${boardName}`);
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <>
      <div className={style.buttonContainer}>
        <button onClick={onCancel}>뒤로 가기</button>
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
        </div>
      </div>
    </>
  );
}
