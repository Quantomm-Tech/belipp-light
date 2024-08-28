/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Button,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./CreditApplications.module.scss";
import DisbursementClientCompra from "./DisbursementClientCompra";
import LocalDataTable from "../../UI/table/LocalDataTable";
import {
  getCellsComments,
  headersCommentLog,
  transformAnalystComments,
} from "./utils";
import {
  LateralInformation,
  MainInformation,
  MerchantInformation,
  StatusCreditInformation,
} from "./CreditApplicationDetail";

interface CreditDetailNominaProps {
  lateralInformation: LateralInformation;
  mainInformation: MainInformation;
  merchantInformation?: MerchantInformation | null;
  statusCreditInformation: StatusCreditInformation;
  action: string;
  handleActionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBack: () => void;
  handleSubmit: () => void;
  comments: string;
  handleCommentsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreditDetailCompra: React.FC<CreditDetailNominaProps> = ({
  lateralInformation,
  mainInformation,
  merchantInformation,
  statusCreditInformation,
  action,
  handleActionChange,
  handleBack,
  handleSubmit,
  comments,
  handleCommentsChange,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const [tableData, setTableData] = useState([]);

  const handleTabChange = (_event: any, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const dataComments = transformAnalystComments(
          // @ts-ignore
          statusCreditInformation.analystComments
        );

        const dataFormated = getCellsComments(dataComments);

        //@ts-ignore
        setTableData(dataFormated);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={`${classes.credit__detail} detail__disburment`}>
      <Box className="detail__base__disburment">
        <Box className="fixed__information">
          <Box className="client__identity section__rounded">
            <AccountCircleIcon style={{ fontSize: 50 }} />

            <Box className="row" mt={2} mb={1}>
              <Typography variant="subtitle2">
                {lateralInformation?.contactNames}
              </Typography>
            </Box>
            <Box className="row" mb={1}>
              <Typography variant="body2">Número del crédito:</Typography>
              <Typography variant="subtitle2">
                {mainInformation?.requestsId}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="detail__informaiton">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="Credit Details Tabs"
          >
            <Tab
              label="Datos de la compra"
              sx={{
                textTransform: "initial",
                fontSize: 16,
                fontWeight: tabIndex === 0 ? "700" : "500",
              }}
            />
            {tableData.length > 0 && (
              <Tab
                label="Log comentarios"
                sx={{
                  textTransform: "initial",
                  fontSize: 16,
                  fontWeight: tabIndex === 1 ? "700" : "500",
                }}
              />
            )}
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            {/* Contenido de la pestaña "Datos de la compra" */}
            <DisbursementClientCompra
              mainInformation={mainInformation}
              lateralInformation={lateralInformation}
              merchantInformation={merchantInformation}
              statusCreditInformation={statusCreditInformation}
            />

            <Box className="disbursement__state" mt={4}>
              <Typography variant="h2" color={"primary"}>
                Estado de la compra
              </Typography>
              <Divider />
              <RadioGroup
                value={action}
                onChange={handleActionChange}
                className="disbursement__radio"
              >
                <FormControlLabel
                  value="Procesando tu pedido"
                  control={<Radio />}
                  label={
                    <Typography variant="subtitle1">
                      Procesando tu pedido
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Producto en camino"
                  control={<Radio />}
                  label={
                    <Typography variant="subtitle1">
                      Producto en camino
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Producto entregado"
                  control={<Radio />}
                  label={
                    <Typography variant="subtitle1">
                      Producto entregado
                    </Typography>
                  }
                />
              </RadioGroup>
            </Box>

            <Box className="comments">
              <Typography variant="h2" mt={2} mb={1} color="primary">
                Comentarios
              </Typography>
              <Divider />
              <Box mt={2}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  placeholder="Escribe aquí los comentarios del estado de compra..."
                  value={comments}
                  onChange={handleCommentsChange}
                />
              </Box>
            </Box>

            <Box className="disbursement__action" mt={2} mb={4}>
              <Button variant="outlined" color="primary" onClick={handleBack}>
                Regresar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={action === ""}
              >
                Confirmar
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <Box style={{ marginTop: 20 }}>
              <LocalDataTable
                columns={headersCommentLog}
                rows={tableData}
                onRowClick={() => {
                  console.log("onClick");
                }}
              />
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default CreditDetailCompra;
