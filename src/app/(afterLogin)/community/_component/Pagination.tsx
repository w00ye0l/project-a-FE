import { Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PageInfo } from "@/model/PageInfo";

interface Props {
  pageInfo: PageInfo;
  handlePageMove: (pageNumber: number) => void;
}

export default function CPagination({ pageInfo, handlePageMove }: Props) {
  console.log(pageInfo);
  const main = {
    "& .Mui-selected": {
      bgcolor: "#121212 !Important",
      color: "#fff !Important",
    },
    "& .MuiPaginationItem-root": {
      borderRadius: "0px",
    },
  };

  return (
    <Stack spacing={2}>
      <Pagination
        page={pageInfo.number + 1}
        count={pageInfo.totalPages}
        // variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            // slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        onChange={(_, page) => handlePageMove(page)}
        sx={main}
      />
    </Stack>
  );
}
