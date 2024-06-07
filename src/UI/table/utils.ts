/* eslint-disable @typescript-eslint/no-explicit-any */
export const setDirection = (
  column: { sortcol: any },
  orderBy: any,
  order: any
) => {
  if (orderBy === column.sortcol) {
    return order;
  }
  return "asc";
};

const deleteduplicateFilters = (filters: any[]) => {
  const newFilters: any[] = [];
  filters.forEach((filter: { name: any }) => {
    if (!newFilters.some((item) => item.name === filter.name)) {
      newFilters.push(filter);
    }
  });
  return newFilters;
};

export const resolveFilter = ({
  res,
  setCurrentPage,
  setResetTablePagination,
  setParams,
  copyParams,
  cb,
  filtersAdded,
  filterProps,
  setFiltersAdded,
  multipleFilters = false,
}) => {
  if (!res.payload) {
    return;
  }
  setCurrentPage(0);
  setResetTablePagination(true);

  setParams(copyParams);
  if (cb) {
    cb(true);
  }
  let filtersArray = [...filtersAdded];
  const filterColExists = [...filtersArray].find(
    (item) => item.filtercol === filterProps.filtercol
  );

  const filterCustomName = filterProps.customName || filterProps.value;
  if (filterColExists && !multipleFilters) {
    filtersArray = [...filtersArray].map((item) => {
      if (item.filtercol === filterProps.filtercol) {
        item.name = filterCustomName;
      }
      return item;
    });
  } else {
    filtersArray = [
      ...filtersArray,
      {
        filtercol: filterProps.filtercol,
        filterKey: filterProps.filterKey,
        name: filterCustomName,
      },
    ];
  }

  filtersArray = deleteduplicateFilters(filtersArray);

  setFiltersAdded(filtersArray);
};

export const handleRequestSort = ({
  property,
  orderBy,
  order,
  params,
  currentRowPage,
  setLoading,
  dispatch,
  getAllPendingRequets,
  setCurrentPage,
  setResetTablePagination,
  setParams,
  setOrder,
  setOrderBy,
}) => {
  const isAsc = orderBy === property && order === "asc";
  const orderQuery = isAsc ? "desc" : "asc";
  const reqParams = {
    ...params,
    rowpag: currentRowPage,
    sortcol: property,
    sorttype: orderQuery.toUpperCase(),
  };

  setLoading(true);
  dispatch(getAllPendingRequets(reqParams))
    .then((res: { payload: any }) => {
      if (!res.payload) {
        return;
      }
      setCurrentPage(0);
      setResetTablePagination(true);
      setParams(reqParams);
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    })
    .finally(() => setLoading(false));
};

export const nextPageHandle = async ({
  pageToSwitch,
  onTableSetPage,
  setLoading,
  dispatch,
  getAllPendingRequets,
  params,
  currentRowPage,
  setCurrentPage,
}) => {
  setLoading(true);
  dispatch(
    getAllPendingRequets({
      ...params,
      pagenum: pageToSwitch + 1,
      rowpag: currentRowPage,
    })
  )
    .then((res: { payload: any }) => {
      if (!res.payload) {
        return;
      }
      onTableSetPage(pageToSwitch);
      setCurrentPage(pageToSwitch);
    })
    .finally(() => setLoading(false));
};

export const rowsPerPageHandle = async ({
  onTableSetPage,
  onRowsPerPage,
  rowsPerPage,
  setLoading,
  dispatch,
  getAllPendingRequets,
  params,
  setCurrentRowPage,
}) => {
  setLoading(true);
  dispatch(getAllPendingRequets({ ...params, pagenum: 1, rowpag: rowsPerPage }))
    .then((res: { payload: any }) => {
      if (!res.payload) {
        return;
      }
      onTableSetPage(0);
      if (onRowsPerPage) {
        setCurrentRowPage(rowsPerPage);
        onRowsPerPage(rowsPerPage);
      }
    })
    .finally(() => setLoading(false));
};

export const rowClickHandle = (
  row: { requestId: any },
  urlParams: { userId: any },
  history: string[]
) => {
  const userId = urlParams.userId;
  if (userId) {
    history.push(`/belipp/${userId}/marketplace/${row.requestId}`);
  }
};
