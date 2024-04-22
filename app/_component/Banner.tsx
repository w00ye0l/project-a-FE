import style from "@/app/_component/banner.module.css";

export default function Banner({ children }: { children: React.ReactNode }) {
  return <div className={style.bannerContainer}>{children}</div>;
}
