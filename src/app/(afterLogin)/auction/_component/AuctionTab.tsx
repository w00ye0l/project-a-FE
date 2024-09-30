"use client";

import Link from "next/link";
import style from "./auctionTab.module.css";
import cx from "classnames";
import { usePathname } from "next/navigation";

export default function AuctionTab() {
  const pathname = usePathname();

  return (
    <ul className={style.main}>
      <li>
        <Link
          className={cx(style.tab, {
            [style.active]: pathname.includes("/dealer"),
          })}
          href="/auction/dealer"
        >
          딜러옥션
        </Link>
      </li>
      <li>
        <Link
          className={cx(style.tab, {
            [style.active]: pathname.includes("/capital"),
          })}
          href="/auction/capital"
        >
          캐피탈
        </Link>
      </li>
      <li>
        <Link
          className={cx(style.tab, {
            [style.active]: pathname.includes("/user"),
          })}
          href="/auction/user"
        >
          유저옥션
        </Link>
      </li>
    </ul>
  );
}
