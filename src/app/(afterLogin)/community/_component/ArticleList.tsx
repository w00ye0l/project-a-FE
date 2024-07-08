import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getArticleList } from "../_lib/getArticleList";
import { PageInfo } from "@/model/PageInfo";
import cx from "classnames";
import ArticleActionButtonBox from "./ArticleActionButtonBox";
import ArticlePagination from "./ArticlePagination";
import { Article } from "@/model/Article";
import CArticle from "../../community/_component/Article";

export default function ArticleList({ boardName }: { boardName: string | "" }) {
  const [articleList, setArticleList] = useState([] as Article[]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 게시글 목록 가져오기
  const getData = async ({ boardName }: { boardName: string | "" }) => {
    // 페이지네이션
    let page = 0;
    if (searchParams.has("page")) {
      page = Number(searchParams.get("page")) - 1;
    }
    const result = await getArticleList({ boardName, pageNumber: page });

    if (result.data !== null) {
      setArticleList(result.data.content);
      setPageInfo({
        number: result.data.number,
        totalElements: result.data.totalElements,
        totalPages: result.data.totalPages,
        first: result.data.first,
        size: result.data.size,
        last: result.data.last,
      });
    }
  };

  // 페이지네이션 핸들러
  const handlePageMove = async (pageNumber: number) => {
    const result = await getArticleList({
      boardName: "",
      pageNumber: pageNumber - 1,
    });
    console.log(pageNumber);
    console.log(result.data.content);

    setArticleList(result.data.content);
    setPageInfo({
      number: result.data.number,
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      first: result.data.first,
      size: result.data.size,
      last: result.data.last,
    });

    // 스크롤을 상단으로 이동
    window.scrollTo({ top: 0, left: 0 });

    /// url에 page 쿼리 추가
    // url 객체 생성
    const params = new URLSearchParams(searchParams);

    // page 쿼리 추가
    params.set("page", pageNumber.toString());

    // url 변경
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    getData({ boardName });
  }, []);

  return (
    <>
      {articleList && articleList.length > 0 ? (
        articleList.map((article) => (
          <div className={cx("box", "articleBox")} key={article.articlePk}>
            <CArticle article={article} />

            <ArticleActionButtonBox
              articlePk={article.articlePk}
              boardName={article.boardName}
              reactionCount={
                article.likeCount + article.neutralCount + article.dislikeCount
              }
              reactions={article.reactions}
              commentCount={article.commentCount}
              scrapCount={article.scrapCount}
              scraps={article.scraps}
            />
          </div>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}

      {pageInfo && (
        <div
          style={{
            width: "800px",
            padding: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ArticlePagination
            handlePageMove={handlePageMove}
            pageInfo={pageInfo}
          />
        </div>
      )}
    </>
  );
}
