/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import "./css/Table.scss";
import Paginator from "./Paginator";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#355D78;",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5FBFF",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function NewTable(props: {
  columns: any;
  rows: any;
  currentPage: any;
  totalRows: any;
  order: any;
  orderBy: any;
  resetTablePagination: any;
  currentRowPage: any;
  onNextPage: any;
  onRowsPerPage: any;
  onResetTablePagination: any;
  onRequestSort: any;
  onRowClick: any;
  showPaginator?: boolean | undefined;
}) {
  const {
    columns,
    rows,
    currentPage,
    totalRows,
    order,
    orderBy,
    resetTablePagination,
    currentRowPage,
    onNextPage,
    onRowsPerPage,
    onResetTablePagination,
    onRequestSort,
    onRowClick,
    showPaginator = true,
  } = props;
  const [page, setPage] = React.useState(currentPage || 0);
  const [rowsPerPage, setRowsPerPage] = React.useState(currentRowPage || 5);

  const items = onNextPage
    ? rows
    : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    if (resetTablePagination) {
      setPage(0);
      if (onResetTablePagination) {
        onResetTablePagination(false);
      }
    }
  }, [resetTablePagination, onResetTablePagination]);

  const handleChangePage = (_: any, newPage: any) => {
    if (onNextPage) {
      return onNextPage(newPage, setPage);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: string | number };
  }) => {
    if (onRowsPerPage) {
      return onRowsPerPage(setPage, setRowsPerPage, +event.target.value);
    }
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
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

  const clickRow = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <>
      <TableContainer className="custom-table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map(
                (column: {
                  id: React.Key | null | undefined;
                  align: string | undefined;
                  minWidth: any;
                  sortcol: any;
                  label:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined;
                }) => (
                  <StyledTableCell
                    key={column.id}
                    //@ts-ignore
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.sortcol ? order : false}
                  >
                    {column.sortcol ? (
                      <TableSortLabel
                        active={true}
                        // direction={setDirection(column, orderBy, order)}
                        onClick={createSortHandler(column.sortcol)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </StyledTableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(
              (
                item: { [x: string]: any; isAction: any },
                index: React.Key | null | undefined
              ) => {
                return (
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
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {items.length > 0 && showPaginator && (
        <Paginator
          totalRows={totalRows}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
        />
      )}
    </>
  );
}
