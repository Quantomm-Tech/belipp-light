import { formatDate, getMil } from "../../utils/utils";

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
    label: "Número del crédito",
    align: "right",
    sortcol: "CodigoCredito",
  },
  {
    id: "ammountRequested",
    label: "Valor del crédito",
    align: "right",
    isCurrency: true,
    sortcol: "ValorPrestamo",
  },
  {
    id: "requestedDate",
    label: "Fecha legalizado",
    align: "center",
    sortcol: "FechaSolicitud",
  },

  {
    id: "requestStatus",
    label: "Estado de desembolso",
    align: "center",
    sortcol: "EstadoDesembolso",
  },
];

export const rows = (args) => {
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

export const getCells = (data) => {
  let cells = [];

  data.forEach((element) => {
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
  });
  return cells;
};

export const getClassColorCreditDestination = (status) => {
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
      if (item.creditDestinationId === status || item.description === status) {
        return item.color;
      }
    });

    className = classColor[0]?.color || "status__grey";
  }
  return className;
};
