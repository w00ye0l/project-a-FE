"use client";

import { FormEventHandler, useState } from "react";
import style from "./uploadButtons.module.css";
import cx from "classnames";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function UploadButtons() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [selectedFileName, setSelectedFileName] = useState<string | null>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleExcelOpen = () => {
    console.log("handleExcelOpen");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFileName(null);
      setSelectedFile(null);
    }
  };

  // 엑셀 업로드
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("onSubmit");
    const uploadConfirm = confirm(
      `[${selectedFileName}] 엑셀 파일 업로드를 진행하시겠습니까?`
    );

    if (uploadConfirm) {
      try {
        if (!selectedFile) {
          toast.error("파일을 선택해주세요.");
          return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log(formData);

        let url = "";
        if (tab === "country") {
          url = "/country/excel-upload";
        } else if (tab === "brand") {
          url = "/brand/excel-upload";
        } else if (tab === "model") {
          url = "/model/excel-upload";
        } else if (tab === "detailModel") {
          url = "/detail-model/excel-upload";
        } else if (tab === "basicOption") {
          url = "/basic-option-define/excel-upload";
        } else if (tab === "carInfo") {
          url = "/excel-upload";
        } else if (tab === "carSpec") {
          url = "/spec/excel-upload";
        } else if (tab === "carBasicOption") {
          url = "/basic-option/excel-upload";
        } else if (tab === "carChoiceOption") {
          url = "/choice-option/excel-upload";
        } else if (tab === "carColorOption") {
          url = "/color-option/excel-upload";
        } else {
          toast.error("올바르지 않은 탭입니다.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/car${url}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          location.reload();
        } else {
          toast.error("엑셀 업로드 실패");
        }
      } catch (e) {
        console.error(e);
        toast.error("업로드 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={style.buttonSection}>
      <form className={style.excelButtonSection} onSubmit={onSubmit}>
        <input
          type="file"
          id="excelFile"
          onClick={handleExcelOpen}
          onChange={handleFileChange}
          accept=".xlsx, .xls, .csv, .xlsm"
        />
        <span className={style.excelFile}>
          {selectedFileName || "선택된 파일이 없습니다."}
        </span>
        <label
          className={cx(style.button, style.excelOpen)}
          htmlFor="excelFile"
        >
          엑셀 열기
        </label>

        <button className={cx(style.button, style.excelUpload)}>
          엑셀 업로드
        </button>
      </form>
    </div>
  );
}
