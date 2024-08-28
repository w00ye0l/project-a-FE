"use client";

import { Article } from "@/model/Article";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getArticleList } from "../_lib/getArticleList";
import Image from "next/image";
import style from "./noticeList.module.css";

export default function NoticeList() {
  const router = useRouter();
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async () => {
    const result = await getArticleList({ boardName: "notice", pageNumber: 0 });

    if (result.data !== null) {
      setArticleList(result.data.content);
    }
  };

  const handleMore = () => {
    router.push("/community/notice");
  };

  const handleNotice = (article: Article) => {
    router.push(`/community/notice/${article.articlePk}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.section}>
      <div className={style.titleContainer}>
        <Image src="/icon/notice.png" width={20} height={20} alt="notice" />
        <h3 className={style.title}>공지사항</h3>
        <p className={style.more} onClick={handleMore}>
          더보기
        </p>
      </div>

      {articleList.slice(0, 4).map((article) => (
        <p
          className={style.notice}
          onClick={() => handleNotice(article)}
          key={article.articlePk}
        >
          {article.title}
          {article.title}
        </p>
      ))}
    </div>
  );
}
