/* eslint-disable @typescript-eslint/no-unused-vars */
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
