"use client";

import { CustomUser } from "@/model/CustomUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  const [boardName, setBoardName] = useState("");
  const [boardList, setBoardList] = useState([]);
  const { data: session } = useSession();
  const user = session as CustomUser;

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

  // 게시판 생성
  const handleBoardCreate = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/community/board`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          boardName,
          boardAuthType: 2,
        }),
      }
    );

    const result = await response.json();

    console.log({ result });

    if (result.statusCode !== 201) {
      console.log(result);
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    getBoardList();
  };

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div className={style.main}>
      {/* <div>
        <label htmlFor="boardName">게시판 이름</label>
        <input
          id="boardName"
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />

        <button onClick={handleBoardCreate}>게시판 생성</button>
      </div> */}

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
