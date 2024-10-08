"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./boardList.module.css";
import cx from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface IBoard {
  boardPk: number;
  boardName: string;
}

export default function BoardList() {
  const pathname = usePathname();
  const [boardList, setBoardList] = useState([]);

  // 게시판 목록 조회
  const getBoardList = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/community/boardlist`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    setBoardList(result.data);
  };

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div className={style.main}>
      <ul className={style.menuSection}>
        <li>
          <Link
            className={cx(style.menu, {
              [style.activeMenu]: pathname === "/community",
            })}
            href="/community"
          >
            <Image
              className={style.menuIcon}
              src={
                pathname === "/community"
                  ? "/icon/home_active.png"
                  : "/icon/home.png"
              }
              width={22}
              height={22}
              alt="home"
            />
            커뮤니티홈
          </Link>
        </li>

        <li>
          <Link
            className={cx(style.menu, {
              [style.activeMenu]: pathname === "/community/best",
            })}
            href="/community/best"
          >
            <Image
              className={style.menuIcon}
              src={
                pathname === "/community/best"
                  ? "/icon/best_active.png"
                  : "/icon/best.png"
              }
              width={22}
              height={22}
              alt="best"
            />
            인기글
          </Link>
        </li>

        <hr className={style.hr} />

        {boardList.map((board: IBoard) => (
          <li key={board.boardPk}>
            <Link
              className={style.subMenu}
              href={`/community/${board.boardName}`}
            >
              {board.boardName} 게시판
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
