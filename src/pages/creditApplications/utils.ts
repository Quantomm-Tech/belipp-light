/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMil } from "../../utils/utils";

export const headers = [
  {
    id: "creditType",
    label: "Destino del crédito",
    sortcol: "DestinoCredito",
    align: "left",
  },
  {
    id: "debtorNames",
    label: "Nombre del solicitante",
    align: "left",
    sortcol: "Nombre",
  },
  {
    id: "documentNumber",
    label: "Número del documento",
    align: "right",
    sortcol: "NumeroDocumento",
  },
  {
    id: "requestsId",
    label: "Número de solicitud",
    align: "right",
    sortcol: "CodigoCredito",
  },
  {
    id: "ammountRequested",
    label: "Valor solicitado",
    align: "right",
    isCurrency: true,
    sortcol: "ValorPrestamo",
  },
  {
    id: "requestedDate",
    label: "Fecha solicitud",
    align: "center",
    sortcol: "FechaSolicitud",
  },

  {
    id: "requestStatus",
    label: "Estado solicitud",
    align: "center",
    sortcol: "EstadoDesembolso",
  },
];

export const rows = (args: {
  requestsId: any;
  debtorNames: any;
  ammountRequested: any;
  documentNumber: any;
  requestedDate: any;
  requestStatus: any;
  creditType: any;
}) => {
  const {
    requestsId,
    debtorNames,
    ammountRequested,
    documentNumber,
    creditType,
    requestedDate,
    requestStatus,
  } = args;
  return {
    requestsId,
    debtorNames,
    ammountRequested,
    documentNumber,
    creditType,
    requestedDate,
    requestStatus,
  };
};

export const getCells = (data: any[]) => {
  let cells: any[] = [];

  data.forEach(
    (element: {
      requestsId: any;
      debtorNames: any;
      ammountRequested: any;
      documentNumber: any;
      requestedDate: string;
      requestStatus: any;
      creditType: string;
    }) => {
      cells = [
        ...cells,
        rows({
          requestsId: element.requestsId,
          debtorNames: `<em>${element.debtorNames}</em>`,
          ammountRequested: getMil(element.ammountRequested),
          documentNumber: element.documentNumber,
          requestedDate: `${element.requestedDate.split(" ")[0]}`,
          requestStatus: element.requestStatus,
          creditType: `<div class='column__status ${getClassColorCreditDestination(
            element.creditType
          )}'>${element.creditType}</div>`,
        }),
      ];
    }
  );
  return cells;
};

export const getClassColorCreditDestination = (status: string) => {
  let className = "status__grey";
  if (status) {
    const colorCreditDestinations = [
      {
        creditDestinationId: 5,
        description: "Compra Activos",
        color: "status__green",
      },
      {
        creditDestinationId: 6,
        description: "Educacion",
        color: "status__yellow",
      },
      {
        creditDestinationId: 9,
        description: "Emprendimiento",
        color: "status__purple",
      },
      {
        creditDestinationId: 10,
        description: "Compra Cartera",
        color: "status__grey",
      },
    ];

    const classColor = colorCreditDestinations.filter((item) => {
      //@ts-ignore
      if (item.creditDestinationId === status || item.description === status) {
        return item.color;
      }
    });

    className = classColor[0]?.color || "status__grey";
  }
  return className;
};
