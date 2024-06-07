import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { TableSortLabel } from '@material-ui/core'
import { setDirection } from './utils'

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%'
        },
        tableRow: (props) => ({
            '&:hover': props.isClickable && {
                cursor: 'pointer'
            },
            '&:active': props.isClickable && {
                opacity: '0.5'
            }
        }),
        thead: {
            backgroundColor: 'transparent',
            '& th:first-child': {
                borderRadius: '0'
            },
            '& th:last-child': {
                borderRadius: '0'
            }
        },
        container: {
            maxHeight: 580
            // minHeight: 400
        },
        stickyHeader: {
            backgroundColor: 'transparent',
            fontWeight: 'bold'
        },
        ammount: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }
    }
})

export default function CustomTable(props) {
    const {
        headers,
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
        onRowClick
    } = props
    const classes = useStyles({ isClickable: !!onRowClick })
    const [page, setPage] = React.useState(currentPage || 0)
    const [rowsPerPage, setRowsPerPage] = React.useState(currentRowPage || 5)

    const registries = onNextPage ? rows : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    useEffect(() => {
        if (resetTablePagination) {
            setPage(0)
            if (onResetTablePagination) {
                onResetTablePagination(false)
            }
        }
    }, [resetTablePagination, onResetTablePagination])

    const handleClick = (event, row) => {
        event.onClick(row)
    }

    const handleChangePage = (_, newPage) => {
        if (onNextPage) {
            return onNextPage(newPage, setPage)
        }
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        if (onRowsPerPage) {
            return onRowsPerPage(setPage, setRowsPerPage, +event.target.value)
        }
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    const clickRow = (row) => {
        if (onRowClick) {
            onRowClick(row)
        }
    }

    return (
        <div className={`table__base ${classes.root}`}>
            <TableContainer className={classes.container}>
                <Table aria-label="sticky table">
                    <TableHead classes={{ root: classes.thead }}>
                        <TableRow>
                            {headers.map((column) => (
                                <TableCell
                                    classes={{ stickyHeader: classes.stickyHeader }}
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={orderBy === column.sortcol ? order : false}
                                >
                                    {column.sortcol ? (
                                        <TableSortLabel
                                            active={true}
                                            direction={setDirection(column, orderBy, order)}
                                            onClick={createSortHandler(column.sortcol)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className="table__body">
                        {registries.map((row, index) => {
                            return (
                                <TableRow
                                    className={`table__row ${classes.tableRow}`}
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}
                                >
                                    {headers.map((column) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell
                                                style={{ whiteSpace: 'nowrap' }}
                                                key={column.id}
                                                align={column.align}
                                                onClick={() => clickRow(row)}
                                            >
                                                {column.isCurrency ? (
                                                    <div className={classes.ammount}>
                                                        <span>{column.sign}</span>
                                                        <span>{value}</span>
                                                    </div>
                                                ) : (
                                                    <span
                                                        className={(row.isAction && column.style) || ''}
                                                        onClick={() =>
                                                            column.onClick && row.isAction
                                                                ? handleClick(column, row)
                                                                : null
                                                        }
                                                        dangerouslySetInnerHTML={{ __html: value }}
                                                    ></span>
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {registries.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={totalRows || rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </div>
    )
}
