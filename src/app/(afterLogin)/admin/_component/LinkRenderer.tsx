import { ICellEditorParams } from "ag-grid-community";
import Link from "next/link";

export const LinkRenderer = (params: ICellEditorParams) => {
  return (
    <Link href={`/admin/car/default/image?dmp=${params.data.detailModelPk}`}>
      이미지 설정
    </Link>
  );
};
