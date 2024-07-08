import { Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PageInfo } from "@/model/PageInfo";

interface Props {
  pageInfo: PageInfo;
  handlePageMove: (pageNumber: number) => void;
}

export default function ArticlePagination({ pageInfo, handlePageMove }: Props) {
  console.log(pageInfo);

  return (
    <Stack spacing={2}>
      <Pagination
        page={pageInfo.number + 1}
        count={pageInfo.totalPages}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        onChange={(_, page) => handlePageMove(page)}
      />
    </Stack>
  );
}
