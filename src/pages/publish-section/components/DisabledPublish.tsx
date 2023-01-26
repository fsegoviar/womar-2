import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import axios from 'axios';

type PropsDialog = {
  open: boolean;
  handleClose: () => void;
  idPublicacion: string;
};

export const DisabledPublish = ({
  open,
  handleClose,
  idPublicacion
}: PropsDialog) => {
  const handleDisabled = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ActualizarEstado`,
        { idPublicacion },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => console.log('Deshabilitar', response))
      .catch((error: any) => console.log('Error => ', error));
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
