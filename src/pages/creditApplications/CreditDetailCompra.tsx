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
import { getCellsComments, headersCommentLog } from "./utils";
import { MerchantInformation } from "./CreditApplicationDetail";

interface CreditDetailNominaProps {
  lateralInformation: {
    contactNames: string;
    documentNumber: string;
    // otros campos que necesites
  };
  mainInformation: {
    requestsId: string;
    // otros campos que necesites
  };
  merchantInformation: MerchantInformation | null;
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
      const dummyComments = [
        {
          date: "24/08/2024",
          state: "Procesando tu pedido",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed leo in justo dapibus semper. Proin eu felis volutpat, porta mi sed, tempor leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam lobortis a purus non egestas. Donec faucibus sapien dui, ac ultricies nisi scelerisque nec. Fusce ultricies leo nec turpis tincidunt tincidunt. Maecenas lacus ante, luctus sit amet consequat ut, mollis in libero. Ut et commodo nibh, posuere luctus eroswe.",
        },
        {
          date: "26/08/2024",
          state: "Producto en camino",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed leo in justo dapibus semper. Proin eu felis volutpat, porta mi sed, tempor leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam lobortis a purus non egestas. Donec faucibus sapien dui, ac ultricies nisi scelerisque nec. Fusce ultricies leo nec turpis tincidunt tincidunt. Maecenas lacus ante, luctus sit amet consequat ut, mollis in libero. Ut et commodo nibh, posuere luctus eroswe.",
        },
      ];

      const dataFormated = getCellsComments(dummyComments);

      //@ts-ignore
      setTableData(dataFormated);

      // try {
      //   const serviceWellness = new CreditAplicationService();

      //   const response = await serviceWellness.getCreditApplications();

      //   if (response.data.isSuccess) {
      //     const dataFormated = getCells(response.data.data);
      //     //@ts-ignore

      //     console.log("dataFormated: ", dataFormated);
      //     setTableData(dataFormated);
      //   }
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   // setLoading(false);
      // } finally {
      //   // setLoading(false);
      // }
    };

    fetchApplications();
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
            <Tab
              label="Log comentarios"
              sx={{
                textTransform: "initial",
                fontSize: 16,
                fontWeight: tabIndex === 1 ? "700" : "500",
              }}
            />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            {/* Contenido de la pestaña "Datos de la compra" */}
            <DisbursementClientCompra
              mainInformation={mainInformation}
              lateralInformation={lateralInformation}
              merchantInformation={merchantInformation}
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
                  value="procesando"
                  control={<Radio />}
                  label={
                    <Typography variant="subtitle1">
                      Procesando tu pedido
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="encamino"
                  control={<Radio />}
                  label={
                    <Typography variant="subtitle1">
                      Producto en camino
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="entregado"
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

            <Box className="disbursement__action" mt={2} mb={4}>
              <Button variant="outlined" color="primary" onClick={handleBack}>
                Regresar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={action === "" ? true : false}
              >
                Confirmar
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            {/* Contenido de la pestaña "Log comentarios" */}

            <Box style={{ marginTop: 20 }}>
              <LocalDataTable
                columns={headersCommentLog}
                rows={tableData}
                order={""}
                orderBy={"desc"}
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

function TabPanel(props: TabPanelProps) {
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
