"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function WriteNavMenu() {
  const pathname = usePathname();
  const { boardName } = useParams();

  console.log(pathname);
  console.log(boardName);

  return (
    <>
      {boardName && (
        <nav>
          <ul style={{ display: "flex", listStyleType: "none", gap: "10px" }}>
            <li>
              <Link href={`/community/${boardName}/write1`}>
                {pathname.endsWith("write1") ? (
                  <b>글 쓰기(v1)</b>
                ) : (
                  "글 쓰기(v1)"
                )}
              </Link>
            </li>
            <li>
              <Link href={`/community/${boardName}/write2`}>
                {pathname.endsWith("write2") ? (
                  <b>글 쓰기(v2)</b>
                ) : (
                  "글 쓰기(v2)"
                )}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
