/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Dialog, DialogContent, Button, Box, Typography } from "@mui/material";
import "./CreditApplications.scss";

interface InvitationModalProps {
  open: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  imageSrc?: string;
  onSuccess: () => void;
  onBack?: () => void;
}

const CreditApplicationModal: React.FC<InvitationModalProps> = ({
  open,
  onSuccess,
}) => {
  const handleSuccess = () => {
    onSuccess();
  };

  return (
    <Dialog
      className="notification__modal"
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "800px",
        },
      }}
    >
      <DialogContent className="notification__content">
        <Box className="notification__image">
          <img
            className="notification__modal--img"
            src={`${
              import.meta.env.VITE_CDN
            }/bel_confirmacion_estado_desembolso.png`}
            alt="Credito actualizado"
          />
        </Box>

        <Box className="notification__main">
          <Box className="notification__info" mt={3}>
            <Typography variant="h1" color="primary">
              El estado del desembolso ha sido actualizado con éxito.
            </Typography>
          </Box>

          <Box className="notification__modal--actions" mt={2}>
            <Button
              variant="contained"
              onClick={() => {
                handleSuccess();
              }}
            >
              Entendido
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreditApplicationModal;
