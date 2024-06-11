/* eslint-disable @typescript-eslint/no-explicit-any */

import { TablePagination } from "@mui/material";

const Paginator = (props: {
  totalRows: any;
  rows: any;
  rowsPerPage: any;
  page: any;
  handleChangeRowsPerPage: any;
  handleChangePage: any;
}) => {
  const {
    totalRows,
    rows,
    rowsPerPage,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
  } = props;
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20, 50]}
      component="div"
      count={totalRows || rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage={"Filas por página"}
    />
  );
};

export default Paginator;
