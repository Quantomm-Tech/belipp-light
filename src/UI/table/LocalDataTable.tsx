/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  styled,
  tableCellClasses,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

interface DataTableProps {
  columns: any;
  rows: any[];
  order: any;
  orderBy: string;
  onRowClick: any;
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#355D78",
    color: "white",
    fontSize: 16,
    fontWeight: 700,
    "&:hover": {
      color: "white",
    },
    "& > span": {
      color: "white",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    curson: "pointer",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  cursor: "pointer",
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5FBFF",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LocalDataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  onRowClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a: any, b: any, orderBy: string) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order: "asc" | "desc", orderBy: string) => {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };

  const sortedRows = (array: any[], comparator: (a: any, b: any) => number) => {
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [any, number]
    );
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const clickRow = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleClick = (
    event: {
      id?: React.Key | null | undefined;
      align?: string | undefined;
      onClick: any;
    },
    row: any
  ) => {
    event.onClick(row);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {columns.map(
              (column: {
                id: any;
                align: any;
                minWidth: any;
                sortcol: any;
                label: any;
              }) => (
                <StyledTableCell
                  key={column.id}
                  //@ts-ignore
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <span style={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              )
            )}
          </TableHead>
          <TableBody>
            {sortedRows(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  onClick={() => clickRow(item)}
                >
                  {columns.map(
                    (column: {
                      id: React.Key | null | undefined;
                      align: string | undefined;
                      onClick: any;
                    }) => {
                      //@ts-ignore
                      const value = item[column.id];

                      return (
                        <StyledTableCell
                          style={{ whiteSpace: "nowrap" }}
                          key={column.id}
                          // align={column.align}
                          onClick={() => {
                            return column.onClick && item.isAction
                              ? handleClick(column, item)
                              : null;
                          }}
                        >
                          <div
                            className={`table__cell ${column.align}`}
                            dangerouslySetInnerHTML={{ __html: value }}
                          ></div>
                        </StyledTableCell>
                      );
                    }
                  )}
                </StyledTableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from} - ${to} de ${count}`
        }
      />
    </Paper>
  );
};

export default LocalDataTable;
