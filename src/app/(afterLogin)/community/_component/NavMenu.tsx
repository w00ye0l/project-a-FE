"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none", gap: "10px" }}>
        <li>
          <Link href="/community/DH">
            {segment === "DH" ? <b>커뮤니티(동현)</b> : "커뮤니티(동현)"}
          </Link>
        </li>
        <li>
          <Link href="/community/HS">
            {segment === "HS" ? <b>커뮤니티(현성)</b> : "커뮤니티(현성)"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
