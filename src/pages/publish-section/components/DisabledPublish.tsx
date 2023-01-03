import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import React from 'react';

type PropsDialog = {
  open: boolean;
  handleClose: () => void;
  id: number;
};

export const DisabledPublish = ({ open, handleClose, id }: PropsDialog) => {
  const handleDisabled = () => {
    axios
      .patch(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/CambiarEstadoPublicacion`,
        {
          idPublicacion: id,
          esActivada: false
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => console.log('Deshabilitada =>', response))
      .catch((error: AxiosError) => console.log('Error =>', error));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Deshabilitar Publicación'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro que desea deshabilitar su publicación?. Otros usuarios ya
          no podrán ver mas esto
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleDisabled} autoFocus>
          Deshabilitar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
