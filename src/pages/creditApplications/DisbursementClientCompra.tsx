import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { getMil } from "../../utils/utils";
import {
  LateralInformation,
  MainInformation,
  MerchantInformation,
} from "./CreditApplicationDetail";

interface DisbursementClientProps {
  mainInformation: MainInformation;
  lateralInformation: LateralInformation;
  merchantInformation?: MerchantInformation | null;
}

const DisbursementClientCompra: React.FC<DisbursementClientProps> = (props) => {
  const { mainInformation, lateralInformation, merchantInformation } = props;
  return (
    <div className="disbursement__detail">
      <Box mb={3}>
        <Typography variant="h2" mb={1} color={"primary"}>
          Datos ingresados por el cliente
        </Typography>
        <Divider />
      </Box>

      <section className="disbursement__detail__columns principal">
        <div className="row">
          <Typography variant="body1">Destino del crédito:</Typography>
          <Typography
            variant="subtitle2"
            className="status__grey"
            pl={1}
            pr={1}
          >
            {mainInformation.creditType}
          </Typography>
        </div>
        <div className="row">
          <Typography variant="body1">Valor solicitado:</Typography>
          <Typography variant="h2" color="secondary">
            {getMil(mainInformation.ammountRequested)}
          </Typography>
        </div>
        <div className="row">
          <Typography variant="body1">Estado de la solicitud:</Typography>
          <Typography variant="subtitle2" color="secondary">
            Aceptado - PD
          </Typography>
        </div>
      </section>

      <Typography variant="h2" mt={2} mb={2} color="primary">
        Datos del solicitante
      </Typography>
      <section className="disbursement__detail__columns">
        <div className="column__one">
          <div className="row">
            <Typography variant="body1">Nombre del beneficiario:</Typography>
            <Typography variant="subtitle2">
              {mainInformation.contactNames}
            </Typography>
          </div>
          <div className="row">
            <Typography variant="body1">Número de identificación:</Typography>
            <Typography variant="subtitle2">
              {lateralInformation.documentNumber}
            </Typography>
          </div>
          <div className="row">
            <Typography variant="body1">Teléfono:</Typography>
            <Typography variant="subtitle2">+57 3215050468 - PD</Typography>
          </div>
        </div>
        <div className="column__two">
          <div className="row">
            <Typography variant="body1">Correo electrónico:</Typography>
            <Typography variant="subtitle2">
              lizeth.rodriguez@quantomm.tech - PD
            </Typography>
          </div>

          <div className="row">
            <Typography variant="body1">Número de la solicitud: </Typography>
            <Typography variant="subtitle2">
              {mainInformation.requestsId}
            </Typography>
          </div>

          <div className="row">
            <Typography variant="body1">Fecha de la solicitud:</Typography>
            <Typography variant="subtitle2">
              {mainInformation.requestedDate}
            </Typography>
          </div>
        </div>
      </section>

      {merchantInformation && (
        <>
          <Typography variant="h2" mt={2} mb={2} color="primary">
            Datos del comercio
          </Typography>
          <section className="disbursement__detail__columns">
            <div className="column__one">
              <div className="row">
                <Typography variant="body1">Nombre del comercio:</Typography>
                <Typography variant="subtitle2">
                  {merchantInformation.merchantName}
                </Typography>
              </div>
              <div className="row">
                <Typography variant="body1">Código del producto:</Typography>
                <Typography variant="subtitle2">
                  {merchantInformation.merchantId}
                </Typography>
              </div>
              <div className="row">
                <Typography variant="body1">Teléfono:</Typography>
                <Typography variant="subtitle2">
                  {merchantInformation.phoneContact}
                </Typography>
              </div>
              <div className="row">
                <Typography variant="body1">Correo electrónico:</Typography>
                <Typography variant="subtitle2">
                  {merchantInformation.merchantMail}
                </Typography>
              </div>
            </div>
            <div className="column__two">
              <div className="row">
                <Typography variant="body1">Banco:</Typography>
                <Typography variant="subtitle2">
                  {merchantInformation.merchantBank}
                </Typography>
              </div>

              <div className="row">
                <Typography variant="body1">Número de cuenta: </Typography>
                <Typography variant="subtitle2">
                  {merchantInformation.merchantNumberBankAccount}
                </Typography>
              </div>

              <div className="row">
                <Typography variant="body1">Tipo de cuenta:</Typography>
                <Typography variant="subtitle2">
                  {merchantInformation.merchantTypeBankAccount}
                </Typography>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default DisbursementClientCompra;
