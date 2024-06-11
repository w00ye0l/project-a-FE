import dynamic from "next/dynamic";

const TuiEditor = dynamic(() => import("./_component/TuiEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CommunityWritePage() {
  return (
    <>
      <TuiEditor />
    </>
  );
}
