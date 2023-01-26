import { Box, Container, Stack } from '@mui/system';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BtnSubmit, InputForm } from '../../../styles';

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
      `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/CrearNotificacion`,
      {
        publicacionId: state.service.id,
        observaciones: data.message
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
          <InputForm
            error={!!errors.names}
            id="name"
            label="Nombres *"
            variant="outlined"
            {...register('names', { required: true })}
          />
          <InputForm
            error={!!errors.surname}
            id="surname1"
            label="Apellidos *"
            variant="outlined"
            {...register('surname', { required: true })}
          />
        </Stack>
        <InputForm
          id="phone"
          fullWidth
          type={'number'}
          sx={{ mb: 1, width: '100% !important' }}
          label="Telefono (opcional)"
          variant="outlined"
          {...register('phone')}
        />
        <InputForm
          error={!!errors.email}
          id="email"
          type={'email'}
          fullWidth
          sx={{ mb: 1, width: '100% !important' }}
          label="Correo electrónico *"
          variant="outlined"
          {...register('email', { required: true })}
        />
        <InputForm
          error={!!errors.message}
          id="message"
          type={'message'}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 1, width: '100% !important' }}
          label="Mensaje"
          variant="outlined"
          {...register('message', { required: true })}
        />
        <BtnSubmit
          sx={{ mt: 1, mb: 2 }}
          type={'submit'}
          fullWidth
          variant="contained"
        >
          Enviar
        </BtnSubmit>
      </Container>
    </Box>
  );
};
