"use client";

import { useRouter, useSearchParams } from "next/navigation";
import style from "./page.module.css";
import { getDetailModelImage } from "../../../_lib/getDetailModelImage";
import { useEffect, useState } from "react";
import { DetailModel } from "@/model/car/DetailModel";
import { toast } from "sonner";
import Image from "next/image";
import { createCarImage } from "../../../_lib/createCarImage";

export default function ModelImagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dmp = searchParams.get("dmp");
  console.log(dmp);
  const [detailModel, setDetailModel] = useState<DetailModel>();
  const [newMainImage, setNewMainImage] = useState<File | null>(null);
  const [newColorImages, setNewColorImages] = useState<File[]>([]);
  const [newNormalImages, setNewNormalImages] = useState<File[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [normalImagePreviews, setNormalImagePreviews] = useState<string[]>([]);
  const [colorImagePreviews, setColorImagePreviews] = useState<string[]>([]);

  const getImageData = async () => {
    const result = await getDetailModelImage({ detailModelPk: dmp! });

    console.log({ result });

    setDetailModel(result.data);
  };

  useEffect(() => {
    if (!dmp) {
      toast.error("세부 모델 페이지에서 '등록하기'를 눌러주세요.");
      router.replace("/admin/car/default?tab=detailModel");
      return;
    } else {
      getImageData();
    }
  }, [dmp]);

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setNewMainImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNormalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setNewNormalImages(Array.from(files));

      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setNormalImagePreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleColorImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setNewColorImages(Array.from(files));

      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setColorImagePreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleBackButton = () => {
    router.back();
  };

  const handleSubmitButton = async () => {
    const result = await createCarImage({
      detailModelPk: dmp!,
      newMainImage,
      newNormalImages,
      newColorImages,
    });

    console.log({ result });

    if (result.statusCode === 200) {
      toast.success("이미지가 저장되었습니다.");
      router.back();
    } else {
      toast.error("이미지 저장에 실패했습니다.");
    }
  };

  return (
    <div className={style.mainSection}>
      {detailModel && (
        <>
          <div className={style.titleSection}>
            <h1 className={style.title}>
              [{detailModel.detailModelPk}] {detailModel.detailModelName} 이미지
              등록
            </h1>

            <div className={style.buttonContainer}>
              <button className={style.backButton} onClick={handleBackButton}>
                뒤로가기
              </button>
              <button
                className={style.submitButton}
                onClick={handleSubmitButton}
              >
                이미지 저장
              </button>
            </div>
          </div>

          <div>
            <div className={style.imageSection}>
              <div className={style.imageTitleContainer}>
                <h2>메인 이미지</h2>
                <label className={style.label} htmlFor="mainImage">
                  메인 이미지 추가
                </label>
              </div>
              <div className={style.imageContainer}>
                {detailModel.mainImage && (
                  <Image
                    className={style.nowImage}
                    src={detailModel.mainImage}
                    width={320}
                    height={180}
                    alt="detailModelImage"
                  />
                )}
                <input
                  className={style.input}
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                />
                {mainImagePreview ? (
                  <Image
                    className={style.newImage}
                    src={mainImagePreview}
                    width={320}
                    height={180}
                    alt="메인 이미지 미리보기"
                  />
                ) : (
                  <div className={style.newImage}>미리보기</div>
                )}
              </div>
            </div>

            <div className={style.imageSection}>
              <div className={style.imageTitleContainer}>
                <h2>일반 이미지</h2>
                <label className={style.label} htmlFor="normalImage">
                  일반 이미지 추가
                </label>
              </div>
              <div className={style.imageListContainer}>
                <div className={style.nowImage}>
                  {detailModel.normalImages.length > 0 ? (
                    detailModel.normalImages.map((image, index) => (
                      <Image
                        className={style.oneImage}
                        key={index}
                        src={image}
                        width={320}
                        height={180}
                        alt={`현재 일반 이미지 ${index + 1}`}
                      />
                    ))
                  ) : (
                    <div>기존 이미지 없음</div>
                  )}
                </div>
                <input
                  className={style.input}
                  id="normalImage"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNormalImagesUpload}
                />
                {normalImagePreviews.length > 0 ? (
                  <div className={style.newImage}>
                    {normalImagePreviews.map((preview, index) => (
                      <Image
                        className={style.oneImage}
                        key={index}
                        src={preview}
                        width={320}
                        height={180}
                        alt={`일반 이미지 미리보기 ${index + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={style.newImage}>미리보기</div>
                )}
              </div>
            </div>

            <div className={style.imageSection}>
              <div className={style.imageTitleContainer}>
                <h2>색상 이미지</h2>
                <label className={style.label} htmlFor="colorImage">
                  색상 이미지 추가
                </label>
              </div>
              <div className={style.imageListContainer}>
                <div className={style.nowImage}>
                  {detailModel.colorImages.length > 0 ? (
                    detailModel.colorImages.map((image, index) => (
                      <Image
                        className={style.oneImage}
                        key={index}
                        src={image}
                        width={320}
                        height={180}
                        alt={`현재 색상 이미지 ${index + 1}`}
                      />
                    ))
                  ) : (
                    <div>기존 이미지 없음</div>
                  )}
                </div>
                <input
                  className={style.input}
                  id="colorImage"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleColorImagesUpload}
                />
                {colorImagePreviews.length > 0 ? (
                  <div className={style.newImage}>
                    {colorImagePreviews.map((preview, index) => (
                      <Image
                        className={style.oneImage}
                        key={index}
                        src={preview}
                        width={320}
                        height={180}
                        alt={`색상 이미지 미리보기 ${index + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={style.newImage}>미리보기</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
