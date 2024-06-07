import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";

import classes from "./CreditApplications.module.scss";

import { CreditAplicationService } from "../../api/creditApplication";
import { useParams } from "react-router-dom";
import DisbursementClient from "./DisbursementClient";

import "./CreditApplications.scss";

const CreditApplicationDetail: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { requestId } = useParams<{ requestId: string }>();
  console.log(loading);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const serviceWellness = new CreditAplicationService();

        if (requestId) {
          const response = await serviceWellness.getCreditApplicationDetail(
            requestId
          );

          if (response.data.isSuccess) {
            console.log(response.data);
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
  }, []);

  // Datos de prueba
  const disbursementClientData = {
    documentNumber: "12345678",
    names: "Juan",
    surnames: "Pérez",
    accountTypeName: "Ahorros",
    creditDestinationId: 5,
    creditDestination: "Compra de vivienda",
    disbursementValue: 50000000,
    legalizationDate: "2024-06-01T00:00:00Z",
    entityName: "Banco Nacional",
    productNumber: "9876543210",
    entityNit: "999999999",
    loanTypeName: "Hipotecario",
  };

  const disbursementDetail = {
    detail: {
      names: "Juan",
      surnames: "Pérez",
      creditNumber: "12345678",
      documentNumber: "87654321",
      creditDestination: "Compra de vivienda",
      disbursementValue: 50000000,
      legalizationDate: "2024-06-01T00:00:00Z",
      entityName: "Banco Nacional",
      productNumber: "9876543210",
      entityNit: "999999999",
      loanTypeName: "Hipotecario",
    },
    debtorInformation: {
      phone: "5551234",
      cellPhone: "5555678",
      mailInformation: {
        emailAddress: "juan.perez@example.com",
      },
    },
    flowLegalization: [], // Aquí deberías agregar la estructura de datos que espera `FlowClientStepper`
    logs: [], // Aquí deberías agregar la estructura de datos que espera `TabsLegalizations`
  };

  return (
    <Box className={`${classes.credit__detail} detail__disburment`}>
      <div className="detail__base__disburment">
        <div className="fixed__information">
          <section className="client__identity section__rounded">
            <img
              src="https://dyokle9isyhc1.cloudfront.net/AvatarCustomer.png"
              alt="Avatar"
              className="client__identity--avatar"
            />

            <p className="client__identity--names">
              {`${disbursementDetail.detail.names} ${disbursementDetail.detail.surnames}`}
            </p>
            <p className="client__identity--code">
              {disbursementDetail.detail.creditNumber}
            </p>
            <p className="client__identity--document">
              Número documento:{" "}
              <strong>{disbursementDetail.detail.documentNumber}</strong>
            </p>
          </section>
          <section className="client__credit section__rounded">
            <h3 className="section__title">Información de contacto</h3>
            {disbursementDetail.debtorInformation.phone && (
              <div className="row">
                <p>Teléfono fijo:</p>
                <p>{disbursementDetail.debtorInformation.phone}</p>
              </div>
            )}

            <div className="row">
              <p>Teléfono celular:</p>
              <p>{disbursementDetail.debtorInformation.cellPhone}</p>
            </div>
            <div className="row">
              <p>Correo electrónico:</p>
              <p>
                {
                  disbursementDetail.debtorInformation.mailInformation
                    .emailAddress
                }
              </p>
            </div>
          </section>
          <section className="client__credit__detail section__rounded">
            <h3 className="section__title">Flujo del cliente</h3>
            {/* <FlowClientStepper flowLegalization={flowLegalization} /> */}
          </section>
        </div>

        <div className="detail__informaiton">
          <DisbursementClient disbursementClientData={disbursementClientData} />
        </div>
      </div>
    </Box>
  );
};

export default CreditApplicationDetail;
