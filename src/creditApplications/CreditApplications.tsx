// src/CreditApplications.tsx
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CreditAplicationService } from "../api/creditApplication";

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

const columns: GridColDef[] = [
  { field: "destinoCredito", headerName: "Destino del Crédito", width: 200 },
  {
    field: "nombreSolicitante",
    headerName: "Nombre del Solicitante",
    width: 200,
  },
  { field: "numeroDocumento", headerName: "Número del Documento", width: 200 },
  {
    field: "numeroSolicitud",
    headerName: "Número de la Solicitud",
    width: 200,
  },
  {
    field: "valorSolicitado",
    headerName: "Valor Solicitado",
    type: "number",
    width: 150,
  },
  { field: "fechaSolicitud", headerName: "Fecha Solicitud", width: 150 },
  { field: "estado", headerName: "Estado", width: 150 },
];

const CreditApplications: React.FC = () => {
  const [applications, setApplications] = useState<CreditApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const serviceWellness = new CreditAplicationService();

        const response = await serviceWellness.getCreditApplications();

        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={applications}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default CreditApplications;
