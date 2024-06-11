import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import classes from "./CreditApplications.module.scss";

import { CreditAplicationService } from "../../api/creditApplication";
import { useNavigate, useParams } from "react-router-dom";
import DisbursementClient from "./DisbursementClient";

import "./CreditApplications.scss";
import Loading from "../../UI/loading/Loading";
import CreditApplicationModal from "./CreditApplicationModal";

interface LateralInformation {
  contactNames: string;
  creditLimitId: string;
  documentNumber: string;
  companyName: string;
  NIT: string;
}

export interface MainInformation {
  creditType: string;
  ammountRequested: number;
  contactNames: string;
  documentNumber: string;
  requestedDate: string;
  banco: string;
  accountType: string;
  accountNumber: string;
}

const CreditApplicationDetail: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { requestId } = useParams<{ requestId: string }>();
  const [lateralInformation, setLateralInformation] =
    useState<LateralInformation | null>(null);
  const [mainInformation, setMainInformation] =
    useState<MainInformation | null>(null);

  const [action, setAction] = useState<string>("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAction((event.target as HTMLInputElement).value);
  };

  const handleBack = () => {
    navigate("/credit/application");
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    navigate("/credit/application");
  };

  const handleSubmit = async () => {
    if (action) {
      try {
        setLoading(true);
        const serviceWellness = new CreditAplicationService();

        const body = {
          requestId: parseInt(`${requestId}`),
          beneficiaryId: parseInt(`1${lateralInformation?.documentNumber}`),
          documentNumber: lateralInformation?.documentNumber,
          disbursementAmmount: mainInformation?.ammountRequested,
          paymentDuties: 214280,
          disbursementConfirmation: action === "aceptado" ? true : false,
        };

        const response = await serviceWellness.updateCreditApplication(body);

        if (response.data.isSuccess) {
          setShowUpdateModal(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Por favor, selecciona una acción.");
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const serviceWellness = new CreditAplicationService();

        if (requestId) {
          const response = await serviceWellness.getCreditApplicationDetail(
            requestId
          );

          if (response.data.isSuccess) {
            setMainInformation(response.data.data.mainInformation);
            setLateralInformation(response.data.data.lateralInformation);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}

      {lateralInformation && mainInformation && (
        <Box className={`${classes.credit__detail} detail__disburment`}>
          <Box className="detail__base__disburment">
            <Box className="fixed__information">
              <Box className="client__identity section__rounded">
                <img
                  src="https://dyokle9isyhc1.cloudfront.net/AvatarCustomer.png"
                  alt="Avatar"
                  className="client__identity--avatar"
                />
                <Box className="row" mt={2} mb={1}>
                  <Typography variant="subtitle2">
                    {lateralInformation.contactNames}
                  </Typography>
                </Box>
                <Box className="row" mb={1}>
                  <Typography variant="body2">Número del cupo:</Typography>
                  <Typography variant="subtitle2">
                    {lateralInformation.creditLimitId}
                  </Typography>
                </Box>
                <Box className="row">
                  <Typography variant="body2">Número documento:</Typography>
                  <Typography variant="subtitle2">
                    {lateralInformation.documentNumber}
                  </Typography>
                </Box>
              </Box>
              <Box className="client__credit section__rounded">
                <Typography variant="subtitle2" mb={1}>
                  Información de la empresa
                </Typography>

                <Box className="row" mb={1}>
                  <Typography variant="body2">Nombre de la empresa:</Typography>
                  <Typography variant="subtitle2">
                    {lateralInformation.companyName}
                  </Typography>
                </Box>
                <Box className="row" mb={1}>
                  <Typography variant="body2">Nit:</Typography>
                  <Typography variant="subtitle2">
                    {lateralInformation.NIT}
                  </Typography>
                </Box>
                <Box className="row" mb={1}>
                  <Typography variant="body2">Nombre de contacto:</Typography>
                  <Typography variant="subtitle2">
                    {lateralInformation.contactNames}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className="detail__informaiton">
              <DisbursementClient
                disbursementClientData={{
                  ...mainInformation,
                  documentNumber: lateralInformation.documentNumber,
                }}
              />

              <Box className="disbursement__state" mt={4}>
                <Typography variant="h2" color={"primary"}>
                  Estado del desembolso
                </Typography>
                <Divider />
                <RadioGroup
                  value={action}
                  onChange={handleActionChange}
                  className="disbursement__radio"
                >
                  <FormControlLabel
                    value="aceptado"
                    control={<Radio />}
                    label={
                      <Typography variant="subtitle1">Aceptado</Typography>
                    }
                  />
                  <FormControlLabel
                    value="rechazado"
                    control={<Radio />}
                    label={
                      <Typography variant="subtitle1">Rechazado</Typography>
                    }
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Box>

          <Box className="disbursement__action">
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
        </Box>
      )}

      <CreditApplicationModal
        open={showUpdateModal}
        onSuccess={() => {
          handleCloseModal();
        }}
      />
    </>
  );
};

export default CreditApplicationDetail;
