export const createCarImage = async ({
  detailModelPk,
  newMainImage,
  newNormalImages,
  newColorImages,
}: {
  detailModelPk: string;
  newMainImage?: File | null;
  newNormalImages?: File[];
  newColorImages?: File[];
}) => {
  const formData = new FormData();

  // detailModelPk는 항상 존재한다고 가정
  formData.append("detailModelPk", detailModelPk);

  // 새로운 메인 이미지를 추가 (옵셔널 처리)
  if (newMainImage) {
    formData.append("mainImage", newMainImage);
  }

  // 새로운 일반 이미지를 추가 (옵셔널 처리)
  if (newNormalImages && newNormalImages.length > 0) {
    newNormalImages.forEach((image, index) => {
      formData.append("normalImages", image);
    });
  }

  // 새로운 컬러 이미지를 추가 (옵셔널 처리)
  if (newColorImages && newColorImages.length > 0) {
    newColorImages.forEach((image, index) => {
      formData.append("colorImages", image);
    });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/car/detail-model/image/${detailModelPk}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  console.log(result);

  return result;
};
