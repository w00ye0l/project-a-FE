"use client";

import React from "react";
import AuctionTab from "./_component/AuctionTab";
import style from "./layout.module.css";
import { usePathname } from "next/navigation";

export default function AuctionPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("detail") && (
        <div className={style.banner}>
          <p className={style.subTitle}>Auction</p>
          <h1>마스터카만의 옥션</h1>
          <AuctionTab />
        </div>
      )}

      <section className={style.main}>{children}</section>
    </>
  );
}
