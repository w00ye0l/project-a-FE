"use client";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Quill from "quill";
import { ImageResize } from "quill-image-resize-module-ts";
import { useMemo } from "react";

Quill.register("modules/imageResize", ImageResize);

interface QuillEditorProps {
  value: string;
  onOriginChange: (content: string) => void;
  // 순수 텍스트만 추출하기 위한 콜백 함수
  onChange: (text: string) => void;
}

export default function QuillEditor({
  value,
  onOriginChange,
  onChange,
}: QuillEditorProps) {
  // Quill 모듈 설정
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [
            {
              color: [
                "#000000",
                "#ffffff",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#00e600",
                "#0000ff",
                "#9900ff",
                "#ff00ff",
              ],
            },
            {
              background: [
                "#000000",
                "#ffffff",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#00e600",
                "#0000ff",
                "#9900ff",
                "#ff00ff",
              ],
            },
            "clean",
          ],
          ["link", "image", "video"],
        ],
      },
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    // 태그 포함 텍스트 추출
    onOriginChange(content);

    // 순수 텍스트 추출
    let text = editor.getText();
    text = text.replace(/\n/g, " ");
    onChange(text);
  };

  return (
    <ReactQuill
      style={{ height: "calc(100% - 42px)" }}
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={modules}
    />
  );
}
