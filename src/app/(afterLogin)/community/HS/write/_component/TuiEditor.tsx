"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor, Viewer } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import type { Editor as IEditor } from "@toast-ui/react-editor";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const toolbarItems = [
  ["heading", "bold", "italic", "strike"],
  ["link", "image"],
  ["scrollSync"],
];

export default function TuiEditor() {
  const editorRef = useRef<IEditor>(null);
  const router = useRouter();
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const onCancel = () => {
    router.push("/community/HS");
  };

  const extractTextFromHTML = (getHTML: string) => {
    // <p> 태그를 제거하고 줄바꿈 문자를 추가
    let withoutPTags = getHTML.replace(/<p[^>]*>(.*?)<\/p>/g, "$1\n");

    // 나머지 태그들 제거
    let withoutTags = withoutPTags.replace(/<[^>]*>/g, "");

    // &nbsp; 제거
    let withoutNBSP = withoutTags.replace(/&nbsp;/g, " ");

    // \n 제거
    let withoutLF = withoutNBSP.replace(/\n/g, " ");

    return withoutLF;
  };

  const handleChange = () => {
    const instance = editorRef.current?.getInstance();
    const getMarkdown = instance.getMarkdown();
    const getHTML = instance.getHTML();
    const originText = extractTextFromHTML(getHTML);
    setMarkdownContent(getMarkdown);
    setHtmlContent(getHTML);

    console.log({
      getMarkdown,
      getHTML,
      originText,
    });
  };

  return (
    <>
      <button onClick={onCancel}>뒤로 가기</button>
      <button onClick={handleChange}>작성하기</button>

      <Editor
        initialValue=" "
        toolbarItems={toolbarItems}
        previewStyle="vertical"
        height="400px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[colorSyntax]}
        ref={editorRef}
      />
    </>
  );
}
