import { Box, Container } from '@mui/system';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '../../../styles/InputForm';
import { Stack } from '@mui/material';
import { SelectForm } from '../../../styles/SelectForm';
import { ActualizarInfoUsuario, ObtenerComunas } from '../../../services';
import { AxiosError } from 'axios';
import { InfoUser } from '../../../interfaces';
import { BtnSubmit } from '../../../styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  comunaId,
  telefono,
  imgPerfil,
  nombre
}: InfoUser) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<TypeForm>({
    defaultValues: {
      apellidoMaterno,
      apellidoPaterno,
      comunaId: String(comunaId),
      nombre,
      rut: rut ?? '',
      telefono: telefono ?? ''
    }
  });
  const [urlImage, setUrlImage] = useState('');
  const [fileChange, setFileChange] = useState<any>();
  const { comunas } = ObtenerComunas();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrlImage(imgPerfil);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<TypeForm> = async (data) => {
    console.log('Data', data);

    let formData = new FormData();
    formData.append('Nombre', data.nombre);
    formData.append('ApellidoPaterno', data.apellidoPaterno);
    formData.append('ApellidoMaterno', data.apellidoMaterno);
    formData.append('ComunaId', data.comunaId);
    formData.append('Telefono', data.telefono);
    formData.append('ImagenPerfil', fileChange);

    const { actualizarInfoUsuario } = ActualizarInfoUsuario(formData);
    setLoading(true);
    await actualizarInfoUsuario()
      .then(() => navigate('/'))
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

  const handleChangeImage = (e: any) => {
    setUrlImage(URL.createObjectURL(e.target.files[0]));
    setFileChange(e.target.files[0]);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      {/* Box loading */}
      <Container>
        {loading && (
          <div className="absolute top-0 mx-[50%] -translate-x-[50%] left-0 z-50 rounded-3xl w-full md:w-5/12 h-full bg-white opacity-80 flex justify-center items-center">
            <p className="text-xl">Cargando...</p>
          </div>
        )}

        <Box
          className="relative bg-center bg-cover bg-no-repeat my-5 rounded-full m-auto"
          sx={{
            backgroundImage: `url(${urlImage})`,
            width: '150px',
            height: '150px'
          }}
        >
          {!urlImage && (
            <p className="absolute top-0 left-0 cursor-pointer">
              Ingresa tu imagen de perfil aqui
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            className="w-full cursor-pointer opacity-0"
            style={{ height: '100%' }}
          />
        </Box>
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
            value={getValues('comunaId')}
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
