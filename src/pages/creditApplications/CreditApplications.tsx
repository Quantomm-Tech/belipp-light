/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { Box, Divider } from "@mui/material";

import { getCells, headers } from "./utils";
import classes from "./CreditApplications.module.scss";
import "./CreditApplications.scss";

import NewTable from "../../UI/table/NewTable";
import { CreditAplicationService } from "../../api/creditApplication";
import { useNavigate } from "react-router-dom";

interface CreditApplication {
  id: string;
  destinoCredito: string;
  nombreSolicitante: string;
  numeroDocumento: string;
  numeroSolicitud: string;
  valorSolicitado: number;
  fechaSolicitud: string;
  estado: string;
}

const CreditApplications: React.FC = () => {
  const [applications, setApplications] = useState<CreditApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentRowPage, setCurrentRowPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [params, setParams] = useState({
    pagenum: currentPage + 1,
    rowpag: currentRowPage,
  });
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [resetTablePagination, setResetTablePagination] = useState(false);
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
          setTableData(dataFormated);

          setTotalRows(response.data.data.length);
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
    <Box className={`${classes.credit__applications} legalization__base`}>
      <h2 className="legalization__title">
        Solicitudes pendientes de desembolso
      </h2>
      <Divider className="divider" />
      <Box style={{ marginTop: 20 }}>
        <NewTable
          columns={headers}
          rows={tableData}
          order={order}
          orderBy={orderBy}
          resetTablePagination={resetTablePagination}
          currentPage={currentPage}
          totalRows={totalRows}
          currentRowPage={currentRowPage}
          onNextPage={(_pageToSwitch: any, _onTableSetPage: any) => {
            console.log("Next page");
          }}
          onRowsPerPage={(
            _onTableSetPage: any,
            _onRowsPerPage: any,
            _rowsPerPage: any
          ) => {
            console.log("onRowsPerPage");
          }}
          onResetTablePagination={setResetTablePagination}
          onRequestSort={(_event: any, _property: any) => {
            console.log("onRequestSort");
          }}
          onRowClick={(_row: any) => {
            console.log("onRowClick");
            handleRockClick(_row);
          }}
          showPaginator={false}
        />
      </Box>
    </Box>
  );
};

export default CreditApplications;
