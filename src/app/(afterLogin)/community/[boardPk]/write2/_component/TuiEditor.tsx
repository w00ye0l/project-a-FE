"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor, Viewer } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import type { Editor as IEditor } from "@toast-ui/react-editor";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createArticle } from "../../../_lib/createArticle";

const toolbarItems = [
  ["heading", "bold", "italic", "strike"],
  ["link", "image"],
  ["scrollSync"],
];

export default function TuiEditor() {
  const router = useRouter();
  const pathname = usePathname();
  const boardPk = pathname.split("/")[2];
  const editorRef = useRef<IEditor>(null);
  const [title, setTitle] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [content, setContent] = useState("");

  const onCancel = () => {
    router.back();
  };

  const extractTextFromHTML = (getHTML: string) => {
    // <p> 태그를 제거하고 줄바꿈 문자를 추가
    const withoutPTags = getHTML.replace(/<p[^>]*>(.*?)<\/p>/g, "$1\n");

    // 나머지 태그들 제거
    const withoutTags = withoutPTags.replace(/<[^>]*>/g, "");

    // &nbsp; 제거
    const withoutNBSP = withoutTags.replace(/&nbsp;/g, " ");

    // \n 제거
    const withoutLF = withoutNBSP.replace(/\n/g, " ");

    return withoutLF;
  };

  const handleChange = () => {
    const instance = editorRef.current?.getInstance();
    const getMarkdown = instance.getMarkdown();
    const getHTML = instance.getHTML();
    const content = extractTextFromHTML(getHTML);

    setMarkdownContent(getMarkdown);
    setHtmlContent(getHTML);
    setContent(content);
  };

  const onSubmit = async () => {
    console.log({ boardPk, title, htmlContent, content });

    // 게시글 작성 API 호출
    const result = await createArticle({
      boardPk: Number(boardPk),
      ArticleData: {
        title,
        content,
        originContent: htmlContent,
      },
    });

    console.log({ result });
    setTitle("");
    setContent("");
    setHtmlContent("");

    router.push(`/community/${boardPk}`);
  };

  return (
    <>
      <div>
        <button onClick={onCancel}>뒤로 가기</button>
        <button onClick={onSubmit}>작성하기</button>
      </div>

      <div>
        <h2>글쓰기</h2>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          initialValue=" "
          toolbarItems={toolbarItems}
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[colorSyntax]}
          ref={editorRef}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
