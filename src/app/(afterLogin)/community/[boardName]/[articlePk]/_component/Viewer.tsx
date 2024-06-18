import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export default function ViewerComponent({
  originContent,
}: {
  originContent: string;
}) {
  return (
    <>
      <h2>미리보기</h2>

      <Viewer viewer="true" initialValue={originContent} />
    </>
  );
}
