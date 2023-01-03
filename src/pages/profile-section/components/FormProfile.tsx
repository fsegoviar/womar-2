import { Box, Container } from '@mui/system';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '../../../styles/InputForm';
import { Stack } from '@mui/material';
import { SelectForm } from '../../../styles/SelectForm';
import { ActualizarInfoUsuario, ObtenerComunas } from '../../../services';
import { AxiosError } from 'axios';
import { InfoUser } from '../../../interfaces';
import { BtnSubmit } from '../../../styles';

type TypeForm = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  comunaId: string;
  telefono: string;
};

export const FormProfile = ({
  id,
  apellidoMaterno,
  apellidoPaterno,
  rut,
  comuna,
  telefono,
  nombre
}: InfoUser) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TypeForm>({
    defaultValues: {
      apellidoMaterno,
      apellidoPaterno,
      comunaId: String(comuna.id),
      nombre,
      rut: rut ?? '',
      telefono
    }
  });
  const { comunas } = ObtenerComunas();

  const onSubmit: SubmitHandler<TypeForm> = (data) => {
    const { actualizarInfoUsuario } = ActualizarInfoUsuario(
      { id, ...data },
      String(localStorage.getItem('tokenWomar'))
    );

    actualizarInfoUsuario()
      .then((response: any) => console.log('Datos guardados => ', response))
      .catch((error: AxiosError) => console.log('Error =>', error));
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <InputForm
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
        <Stack
          direction={'row'}
          sx={{ mb: 1, justifyContent: 'space-around' }}
          spacing={2}
        >
          <SelectForm
            style={{ width: '49%' }}
            placeholder="Dirección (opcional)"
            onChange={(evnt) => {
              if (evnt.target.value) {
                setValue('comunaId', evnt.target.value);
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
          <InputForm
            id="phone"
            type={'number'}
            style={{ margin: '10px 0', width: '49%' }}
            placeholder="Telefono (opcional)"
            {...register('telefono')}
          />
        </Stack>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
        <BtnSubmit
          type={'submit'}
          variant="contained"
          style={{
            fontSize: '18px',
            padding: '3px 50px'
          }}
        >
          Guardar
        </BtnSubmit>
      </Box>
    </Box>
  );
};
