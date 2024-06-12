"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();
  const { boardPk } = useParams();

  // console.log(pathname);

  return (
    <>
      {boardPk && (
        <nav>
          <ul style={{ display: "flex", listStyleType: "none", gap: "10px" }}>
            <li>
              <Link href={`/community/${boardPk}/write1`}>
                {pathname.endsWith("write1") ? (
                  <b>글 쓰기(v1)</b>
                ) : (
                  "글 쓰기(v1)"
                )}
              </Link>
            </li>
            <li>
              <Link href={`/community/${boardPk}/write2`}>
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
