"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./countryFilter.module.css";
import cx from "classnames";

export default function CountryFilter() {
  const router = useRouter();
  const pathname = usePathname();

  console.log({ pathname });

  const onClickSubmit = () => {
    router.push("/auction/user/register");
  };

  return (
    <div className={style.main}>
      <ul className={style.tabs}>
        <li className={cx(style.tab)}>전체</li>
        <li className={cx(style.tab, style.active)}>국산차</li>
        <li className={cx(style.tab)}>수입차</li>
      </ul>

      {pathname.includes("user") && (
        <button onClick={onClickSubmit} className={style.submit}>
          등록하기
        </button>
      )}
    </div>
  );
}
