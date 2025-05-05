import { TablePagination } from "@mui/material";

export default function TablePaginationFooter({
  todos,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) {
  return (
    <>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={todos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelDisplayedRows={({ from, to, count }) =>
          `${from} - ${to} out of ${count}`
        }
      />
    </>
  );
}
