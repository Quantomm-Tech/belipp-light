import * as React from "react";
import { Divider } from "@mui/material";
import { getMil } from "../../utils/utils";

const DisbursementClient = ({ disbursementClientData }) => {
  disbursementClientData = {
    ...disbursementClientData,
    documentBeneficiary: disbursementClientData.documentNumber,
    nameBeneficiary: `${disbursementClientData.names} ${disbursementClientData.surnames}`,
    typeBeneficiaryLabel: "Tipo de cuenta: ",
    typeBeneficiary: disbursementClientData.accountTypeName,
  };

  if (disbursementClientData.creditDestinationId === 10) {
    disbursementClientData["documentBeneficiary"] =
      disbursementClientData.entityNit;
    disbursementClientData["nameBeneficiary"] =
      disbursementClientData.entityName;
    disbursementClientData["typeBeneficiaryLabel"] = "Tipo de crédito: ";
    disbursementClientData["typeBeneficiary"] =
      disbursementClientData.loanTypeName;
  }
  return (
    <div className="disbursement__detail">
      <h2>Datos ingresados por el cliente para desembolso</h2>
      <Divider />
      <section className="disbursement__detail__columns principal">
        <div className="row">
          <p className="key">Destino del crédito:</p>
          <p className="value">{disbursementClientData.creditDestination}</p>
        </div>{" "}
        <div className="row">
          <p className="key">Valor desembolso:</p>
          <p className="value amount">
            {getMil(disbursementClientData.disbursementValue)}
          </p>
        </div>
      </section>
      <section className="disbursement__detail__columns">
        <div className="column__one">
          <div className="row">
            <p className="key">Nombre del beneficiario:</p>
            <p className="value">{disbursementClientData.nameBeneficiary}</p>
          </div>
          <div className="row">
            <p className="key">Documento:</p>
            <p className="value">
              {disbursementClientData.documentBeneficiary}
            </p>
          </div>
          <div className="row">
            <p className="key">Fecha legalizado:</p>
            <p className="value">{disbursementClientData.legalizationDate} </p>
          </div>
        </div>
        <div className="column__two">
          <div className="row">
            <p className="key">Banco:</p>
            <p className="value">{disbursementClientData.entityName}</p>
          </div>

          <div className="row">
            <p className="key">{disbursementClientData.typeBeneficiaryLabel}</p>
            <p className="value">{disbursementClientData.typeBeneficiary}</p>
          </div>

          <div className="row">
            <p className="key">Número de cuenta:</p>
            <p className="value">{disbursementClientData.productNumber}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisbursementClient;
