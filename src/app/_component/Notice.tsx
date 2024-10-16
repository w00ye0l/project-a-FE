"use client";

import { useEffect, useState } from "react";
import style from "./notice.module.css";
import TextTransition, { presets } from "react-text-transition";
import { useRouter } from "next/navigation";
import { Article } from "@/model/Article";
import { getArticleList } from "../(afterLogin)/community/_lib/getArticleList";

export default function Notice() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [articleList, setArticleList] = useState([] as Article[]);

  const getData = async () => {
    const result = await getArticleList({ boardName: "notice", pageNumber: 0 });

    if (result.data !== null) {
      setArticleList(result.data.content);
    }
  };

  const handleNotice = (article: Article) => {
    router.push(`/community/notice/${article.articlePk}`);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      5000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <section className={style.section}>
      <div className={style.content}>
        <p className={style.title}>공지사항</p>

        {articleList && articleList.length > 0 && (
          <TextTransition delay={5000} springConfig={presets.gentle}>
            <p
              className={style.notice}
              onClick={() =>
                handleNotice(articleList[index % articleList.length])
              }
            >
              <span className={style.new}>[NEW]</span>
              {articleList[index % articleList.length].title}
              <span className={style.date}>
                {new Date(articleList[index % articleList.length].createdAt)
                  .toISOString()
                  .slice(0, 10)}
              </span>
            </p>
          </TextTransition>
        )}
      </div>
    </section>
  );
}
