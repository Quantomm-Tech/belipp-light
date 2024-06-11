import * as React from "react";
import { Divider, Typography } from "@mui/material";
import { getMil } from "../../utils/utils";
import { MainInformation } from "./CreditApplicationDetail";

interface DisbursementClientProps {
  disbursementClientData: MainInformation;
}

const DisbursementClient: React.FC<DisbursementClientProps> = ({
  disbursementClientData,
}) => {
  return (
    <div className="disbursement__detail">
      <Typography variant="h2" mb={1} color={"primary"}>
        Datos ingresados por el cliente para desembolso
      </Typography>
      <Divider />
      <section className="disbursement__detail__columns principal">
        <div className="row">
          <Typography variant="body1">Destino del crédito:</Typography>
          <Typography variant="subtitle2">
            {disbursementClientData.creditType}
          </Typography>
        </div>
        <div className="row">
          <Typography variant="body1">Valor desembolso:</Typography>
          <Typography variant="h2">
            {getMil(disbursementClientData.ammountRequested)}
          </Typography>
        </div>
      </section>
      <section className="disbursement__detail__columns">
        <div className="column__one">
          <div className="row">
            <Typography variant="body1">Nombre del beneficiario:</Typography>
            <Typography variant="subtitle2">
              {disbursementClientData.contactNames}
            </Typography>
          </div>
          <div className="row">
            <Typography variant="body1">Documento:</Typography>
            <Typography variant="subtitle2">
              {disbursementClientData.documentNumber}
            </Typography>
          </div>
          <div className="row">
            <Typography variant="body1">Fecha legalizado:</Typography>
            <Typography variant="subtitle2">
              {disbursementClientData.requestedDate}{" "}
            </Typography>
          </div>
        </div>
        <div className="column__two">
          <div className="row">
            <Typography variant="body1">Banco:</Typography>
            <Typography variant="subtitle2">
              {disbursementClientData.banco}
            </Typography>
          </div>

          <div className="row">
            <Typography variant="body1">Tipo de cuenta: </Typography>
            <Typography variant="subtitle2">
              {disbursementClientData.accountType}
            </Typography>
          </div>

          <div className="row">
            <Typography variant="body1">Número de cuenta:</Typography>
            <Typography variant="subtitle2">
              {disbursementClientData.accountNumber}
            </Typography>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisbursementClient;
