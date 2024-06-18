"use client";

import { CustomUser } from "@/model/CustomUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IBoard {
  boardPk: number;
  boardName: string;
}

export default function BoardList() {
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
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div>
        <label htmlFor="boardName">게시판 이름</label>
        <input
          id="boardName"
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />

        <button onClick={handleBoardCreate}>게시판 생성</button>
      </div>

      <h3>게시판 목록</h3>

      <ul style={{ flex: "1", listStyle: "none" }}>
        <Link href="/community">
          <li>
            <p>전체</p>
          </li>
        </Link>

        {boardList.map((board: { boardPk: number; boardName: string }) => (
          <Link href={`/community/${board.boardName}`} key={board.boardPk}>
            <li>{board.boardName} 게시판</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
