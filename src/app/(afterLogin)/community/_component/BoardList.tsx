"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BoardList() {
  const [boardName, setBoardName] = useState("");
  const [boardList, setBoardList] = useState([]);

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

  const handleBoardCreate = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/community/board`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardName,
        }),
      }
    );

    const result = await response.json();

    if (result.statusCode !== 201) {
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
            <p>전체 게시판</p>
          </li>
        </Link>

        {boardList.map((board: { boardPk: number; boardName: string }) => (
          <Link href={`/community/${board.boardPk}`} key={board.boardPk}>
            <li key={board.boardPk}>
              <p>
                {board.boardPk}: {board.boardName}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
