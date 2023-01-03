import { Button, TextField } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormContactType = {
  names: string;
  surname: string;
  email: string;
  phone: number;
  message: string;
};
export const FormContact = (state: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormContactType>();

  const onSubmit: SubmitHandler<FormContactType> = (data) => {
    console.log(data);

    axios.post(
      `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/EnviarFormularioContacto`,
      {
        idPublicacion: state.service.id,
        nombres: data.names,
        apellidos: data.surname,
        telefono: data.phone,
        correo: data.email,
        mensaje: data.message
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    );
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Stack direction="row" sx={{ mb: 1 }} spacing={2}>
          <TextField
            error={!!errors.names}
            id="name"
            label="Nombres *"
            variant="outlined"
            {...register('names', { required: true })}
          />
          <TextField
            error={!!errors.surname}
            id="surname1"
            label="Apellidos *"
            variant="outlined"
            {...register('surname', { required: true })}
          />
        </Stack>
        <TextField
          id="phone"
          fullWidth
          type={'number'}
          sx={{ mb: 1 }}
          label="Telefono (opcional)"
          variant="outlined"
          {...register('phone')}
        />
        <TextField
          error={!!errors.email}
          id="email"
          type={'email'}
          fullWidth
          sx={{ mb: 1 }}
          label="Correo electrónico *"
          variant="outlined"
          {...register('email', { required: true })}
        />
        <TextField
          error={!!errors.message}
          id="message"
          type={'message'}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 1 }}
          label="Mensaje"
          variant="outlined"
          {...register('message', { required: true })}
        />
        <Button
          sx={{ mt: 1, mb: 2 }}
          type={'submit'}
          fullWidth
          variant="contained"
        >
          Enviar
        </Button>
      </Container>
    </Box>
  );
};
