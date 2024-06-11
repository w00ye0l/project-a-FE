"use client";

import { CustomUser } from "@/model/User";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import style from "./profileImage.module.css";

type ProfileImageProps = {
  imageProp: string;
  // 이미지 업로드 성공 시 호출될 콜백 함수 타입 정의
  onImageUploadSuccess: (imageUrl: string) => void;
};

export default function ProfileImage({
  imageProp,
  onImageUploadSuccess,
}: ProfileImageProps) {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 초기 이미지를 props로 설정
  const [image, setImage] = useState<string>(imageProp || "");

  const user = session as CustomUser;

  useEffect(() => {
    // imageProp이 변경될 때마다 image 상태를 업데이트
    setImage(imageProp || "");
  }, [imageProp]);

  // console.log({ imageProp });

  if (!session) {
    return null;
  }

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      // 선택된 파일을 상테에 저장
      setSelectedFile(file);
      // console.log(file);
    }
  };

  // 이미지 업로드 함수
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // 선택된 파일이 없을 경우 에러 메시지 출력
    if (!selectedFile) {
      toast.error("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user.userPk}/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: formData,
        }
      );

      // 이미지 업로드 실패 시 에러 메시지 출력
      if (!response.ok) {
        toast.error("이미지 업로드에 실패했습니다.");
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      const result = await response.json();

      // console.log(result);
      toast.success("이미지 업로드 성공");

      // 업로드된 이미지 URL을 상태에 저장
      setImage(result.data.imageUrl);
      // 부모 컴포넌트의 상태를 업데이트하는 콜백 함수 호출
      onImageUploadSuccess(result.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>프로필 이미지</h2>

      {image !== "NoImage" && image && (
        <Image
          src={image}
          width={200}
          height={200}
          className={style.profileImage}
          alt="profileImage"
        />
      )}

      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImageUpload} />
        <button type="submit">업로드</button>
      </form>
    </>
  );
}
