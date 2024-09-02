"use client";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Quill from "quill";
import { ImageResize } from "quill-image-resize-module-ts";
import { useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/model/CustomUser";

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
  const { data: session } = useSession();
  const user = session as CustomUser;
  const quillRef = useRef<ReactQuill | null>(null);

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
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute(
              "accept",
              "image/jpg, image/jpeg, image/png, image/gif, image/webp"
            );
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              console.log(file);

              if (file) {
                const formData = new FormData();
                formData.append("images", file);

                console.log(formData);

                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/community/article/image`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${user.accessToken}`,
                    },
                    body: formData,
                  }
                );

                const result = await response.json();

                console.log({ result });

                const imageUrl = result.data.imageUrls[0];
                const editor = quillRef.current?.getEditor();

                if (editor) {
                  const range = editor.getSelection(true);

                  const img = new Image();
                  img.src = imageUrl;
                  img.onload = () => {
                    const maxWidth = 500;

                    let { width, height } = img;

                    if (width > maxWidth) {
                      height = Math.round((maxWidth * height) / width);
                      width = maxWidth;
                    }

                    const imageHtml = `<img src="${imageUrl}" width="${width}" height="${height}" />`;
                    editor.clipboard.dangerouslyPasteHTML(
                      range.index,
                      imageHtml
                    );
                    editor.setSelection(range.index + 1, 0);
                  };
                }
              }
            };
          },
        },
      },
      // imageResize: {
      //   modules: ["Resize", "DisplaySize"],
      // },
    }),
    []
  );

  // 텍스트 변경 시 호출되는 콜백 함수
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
      ref={quillRef}
    />
  );
}
