/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { Box, Divider, Typography } from "@mui/material";

import { getCells, headers } from "./utils";
import classes from "./CreditApplications.module.scss";
import "./CreditApplications.scss";

import { CreditAplicationService } from "../../api/creditApplication";
import { useNavigate } from "react-router-dom";
import Loading from "../../UI/loading/Loading";
import LocalDataTable from "../../UI/table/LocalDataTable";

const CreditApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  const handleRockClick = (row: any) => {
    try {
      navigate(`/credit/detail/${row.requestsId}`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const serviceWellness = new CreditAplicationService();

        const response = await serviceWellness.getCreditApplications();

        if (response.data.isSuccess) {
          const dataFormated = getCells(response.data.data);
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

    fetchApplications();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box className={`${classes.credit__applications} legalization__base`}>
          <Typography variant="h2">
            Solicitudes pendientes de desembolso
          </Typography>
          <Divider className="divider" />
          <Box style={{ marginTop: 20 }}>
            <LocalDataTable
              columns={headers}
              rows={tableData}
              order={""}
              orderBy={"desc"}
              onRowClick={(_row: any) => {
                handleRockClick(_row);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CreditApplications;
