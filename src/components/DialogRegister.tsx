import { Box, Container, Dialog, Paper, Slide, Stack } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterUser } from '../interfaces';
import { useEffect } from 'react';
import { ObtenerComunas } from '../services';
import {
  BtnSubmit,
  InputForm,
  SelectForm,
  ButtonSubmitOutlined
} from '../styles';

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
  onSubmit: (data: RegisterUser) => void;
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

  useEffect(() => {
    setValue('roleName', 'Cliente');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
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
        <h1 style={{ textAlign: 'center' }} className="font">
          Registrar usuario{' '}
        </h1>
        <Box component={'form'} onSubmit={handleSubmit(props.onSubmit)}>
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
    </Dialog>
  );
};
