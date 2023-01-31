import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { BtnSubmit } from '../../../../styles';
import styled from '@emotion/styled';
import { TypeUser } from '../../../../interfaces/Login';
import { useEffect } from 'react';

const InputForm = styled.input<{ error: boolean }>`
  border: ${(props) => (props.error ? '1px solid red' : '1px solid #0BAFDD')};
  border-radius: 10px;
  padding: 8px 10px;
  width: 250px;
  font-size: 16px;
`;

type Inputs = {
  email: string;
  password: string;
  tipo: TypeUser;
};

type PropsLoginStandard = {
  onSubmit: (data: Inputs) => void;
};

export const StandardLogin = (props: PropsLoginStandard) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  useEffect(() => {
    setValue('tipo', TypeUser.LOCAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component={'form'}
      className="flex flex-col items-center"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Typography
        component={'label'}
        variant={'subtitle1'}
        className="font-medium"
        sx={{ color: '#3c3c3c' }}
      >
        Correo electrónico
      </Typography>
      <Box>
        <InputForm
          error={!!errors.email}
          id="email"
          type={'email'}
          className="font-medium"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <span
            style={{
              fontSize: '14px',
              color: 'red',
              display: 'block',
              paddingTop: '5px'
            }}
          >
            (*) Campo requerido
          </span>
        )}
      </Box>
      <Typography
        component={'label'}
        variant={'subtitle1'}
        className="font-medium"
        sx={{ color: '#3c3c3c', paddingTop: '10px' }}
      >
        Contraseña
      </Typography>
      <Box>
        <InputForm
          error={!!errors.password}
          id="password"
          type={'password'}
          className="font-medium"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <span
            style={{
              fontSize: '14px',
              color: 'red',
              display: 'block',
              padding: '5px 0'
            }}
          >
            (*) Campo requerido
          </span>
        )}
      </Box>
      <BtnSubmit
        type={'submit'}
        className="font-medium"
        style={{ marginTop: '20px' }}
      >
        Entrar
      </BtnSubmit>
    </Box>
  );
};
