import { ICellRendererParams } from "ag-grid-community";
import Image from "next/image";

export const CarImageRenderer = (params: ICellRendererParams) => {
  if (!params.value) {
    return null; // 또는 placeholder 이미지나 텍스트를 반환할 수 있습니다.
  }

  return <Image src={params.value} width={160} height={90} alt="Car Image" />;
};
