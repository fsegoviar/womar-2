import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  Paper,
  Slide,
  Stack
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterUser } from '../interfaces';
import { useEffect } from 'react';
import { ObtenerComunas, RegistrarUsuarioLocal } from '../services';
import {
  BtnSubmit,
  InputForm,
  SelectForm,
  ButtonSubmitOutlined
} from '../styles';
import { AxiosError } from 'axios';
import Typography from '@mui/material/Typography';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PropsRegister {
  open: boolean;
  handleClose: () => void;
  setOpenRegisterLocal: (value: boolean) => void;
}

export const DialogRegister = (props: PropsRegister) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RegisterUser>();
  const [open, setOpen] = useState(props.open);
  const { comunas } = ObtenerComunas();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue('role', 'Cliente');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const onSubmitRegisterLocal = (data: RegisterUser) => {
    const { registerUserLocal } = RegistrarUsuarioLocal(data);
    setLoading(true);
    registerUserLocal()
      .then(() => props.setOpenRegisterLocal(false))
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth={'md'}
      PaperProps={{
        sx: {
          border: '3px solid #0BAEDC',
          borderRadius: '20px'
        }
      }}
    >
      <Paper elevation={3} style={{ width: '400px' }}>
        <h1
          style={{ textAlign: 'center' }}
          className="font text-xl mt-5 font-bold"
        >
          Registrar usuario{' '}
        </h1>
        <Box component={'form'} onSubmit={handleSubmit(onSubmitRegisterLocal)}>
          <Container>
            <InputForm
              className="font"
              error={!!errors.nombre}
              id="name"
              style={{ margin: '10px 0', width: '100%' }}
              placeholder="Nombres *"
              {...register('nombre', { required: true })}
            />
            <Stack
              direction="row"
              sx={{ mb: 1, justifyContent: 'space-around' }}
              spacing={2}
            >
              <InputForm
                error={!!errors.apellidoPaterno}
                style={{ margin: '10px 0', width: '49%' }}
                id="surname1"
                placeholder="Apellido Paterno *"
                {...register('apellidoPaterno', { required: true })}
              />
              <InputForm
                error={!!errors.apellidoMaterno}
                style={{ margin: '10px 0', width: '49%' }}
                placeholder="Apellido Materno *"
                {...register('apellidoMaterno', { required: true })}
              />
            </Stack>
            <SelectForm
              style={{ width: '100%' }}
              placeholder="Dirección (opcional)"
              onChange={(evnt) => {
                if (evnt.target.value) {
                  setValue('comunaId', Number(evnt.target.value));
                }
              }}
            >
              <option value={''}>Dirección (opcional)</option>
              {comunas.map((comuna) => (
                <option key={comuna.id} value={comuna.id}>
                  {comuna.nombre}
                </option>
              ))}
            </SelectForm>
            <Stack
              direction="row"
              sx={{ my: 1, justifyContent: 'space-around' }}
              spacing={2}
            >
              <InputForm
                id="dni"
                placeholder="Rut (opcional)"
                style={{ margin: '10px 0', width: '49%' }}
                onChange={(e: any) => {
                  setValue('rut', e.target.value);
                }}
              />
              <InputForm
                id="phone"
                type={'number'}
                style={{ margin: '10px 0', width: '49%' }}
                placeholder="Telefono (opcional)"
                {...register('telefono')}
              />
            </Stack>
            <InputForm
              error={!!errors.email}
              type={'email'}
              style={{ marginBottom: '10px', width: '100%' }}
              placeholder="Correo electrónico *"
              {...register('email', { required: true })}
            />
            <InputForm
              error={!!errors.password}
              type={'password'}
              style={{ margin: '10px 0', width: '100%' }}
              placeholder="Contraseña *"
              {...register('password', { required: true })}
            />
            <Box sx={{ float: 'right', '& > :not(style)': { m: 1 }, py: 1 }}>
              <ButtonSubmitOutlined onClick={handleClose}>
                Cancelar
              </ButtonSubmitOutlined>
              <BtnSubmit type={'submit'} variant="contained">
                Registrar
              </BtnSubmit>
            </Box>
          </Container>
        </Box>
      </Paper>
      {loading && (
        <Box
          className="flex flex-col justify-center items-center absolute top-0 left-0"
          sx={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: '100%'
          }}
        >
          <CircularProgress color="primary" value={25} />
          <Typography>Cargando...</Typography>
        </Box>
      )}
    </Dialog>
  );
};
