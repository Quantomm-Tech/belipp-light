/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { Box, Button, Divider, Typography } from "@mui/material";

import { getCells, headers, sortedRows } from "./utils";
import classes from "./CreditApplications.module.scss";
import "./CreditApplications.scss";

import { CreditAplicationService } from "../../api/creditApplication";
import { useNavigate } from "react-router-dom";
import Loading from "../../UI/loading/Loading";
import LocalDataTable from "../../UI/table/LocalDataTable";

const CreditApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  const handleRockClick = (row: any) => {
    try {
      navigate(`/credit/detail/${row.requestsId}`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const compareByRequestedDate = (a: any, b: any) => {
    const parseDate = (dateString: string) => {
      const [datePart, timePart] = dateString.split(" ");
      const [day, month, year] = datePart.split("/").map(Number);
      const [hours, minutes, seconds] = timePart.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    const dateA = parseDate(a.requestedDate);
    const dateB = parseDate(b.requestedDate);

    return dateB.getTime() - dateA.getTime(); // Orden descendente
  };

  const refreshData = async () => {
    try {
      setLoadingRefresh(true);
      await fetchApplications();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoadingRefresh(false);
    }
  };
  const fetchApplications = async () => {
    try {
      const serviceWellness = new CreditAplicationService();

      const response = await serviceWellness.getCreditApplications();

      if (response.data.isSuccess) {
        const initialData = response.data.data;
        const sortedByDate = sortedRows(initialData, compareByRequestedDate);

        const dataFormated = getCells(sortedByDate);

        //@ts-ignore
        setTableData(dataFormated);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box className={`${classes.credit__applications} legalization__base`}>
          <Box className={classes.credit__applications__top}>
            <Typography variant="h1">
              Solicitudes pendientes de desembolso
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                refreshData();
              }}
            >
              Actualizar
            </Button>
          </Box>

          <Divider className="divider" />
          <Box style={{ marginTop: 20 }}>
            <LocalDataTable
              columns={headers}
              rows={tableData}
              onRowClick={(_row: any) => {
                handleRockClick(_row);
              }}
            />
          </Box>
        </Box>
      )}

      {loadingRefresh && <Loading />}
    </>
  );
};

export default CreditApplications;
