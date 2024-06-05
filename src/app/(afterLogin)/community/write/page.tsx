"use client";

import style from "./page.module.css";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("./_component/QuillEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CommunityWritePage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [textContent, setTextContent] = useState("");

  const onSubmit = () => {
    console.log(content);
    console.log(textContent);
  };

  const onCancel = () => {
    router.push("/community");
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.editorContainer}>
          <h1>글쓰기</h1>
          <div className={style.editor}>
            <QuillEditor
              value={content}
              onChange={setContent}
              onTextChange={setTextContent}
            />
          </div>
        </div>

        <div className={style.previewContainer}>
          <h1>미리보기</h1>
          <div
            className={cx(style.preview, "ql-content")}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      <button onClick={onCancel}>뒤로 가기</button>

      <button onClick={onSubmit}>작성하기</button>
    </>
  );
}
