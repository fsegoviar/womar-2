import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  Divider,
  Fade,
  Slide,
  Typography
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { forwardRef, useState } from 'react';
import { LoginWithGoogle } from './components/LoginWithGoogle';
import { LoginWithFacebook } from './components/LoginWithFacebook';
import {
  FailResponse,
  SuccessResponse
} from '@greatsumini/react-facebook-login';
import { StandardLogin } from './components/StandardLogin';
import { LoginFacebook, LoginGoogle, LoginLocal } from '../../../services';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PropsLogin {
  open: boolean;
  handleClose: () => void;
  handleOpenSession: (value: string) => void;
  isOpenRegisterExternal: (value: boolean) => void;
  setProveedor: (value: string) => void;
}

export const DialogLogin = (props: PropsLogin) => {
  const [open, setOpen] = useState(props.open);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginStandard = async (data: { email: string; password: string }) => {
    const { fetchData } = LoginLocal(data);
    let response: any = null;

    setLoading(true);

    await fetchData()
      .then((res: any) => (response = res))
      .finally(() => setLoading(false));

    if (!response.error) {
      props.handleOpenSession(response.result.data.token);
      setOpen(false);
      props.handleClose();
    } else {
      setError(true);
    }
  };

  const loginGoogle = async (data: any) => {
    const { fetchData } = LoginGoogle(data.accessToken);
    let response: any = null;

    setLoading(true);
    await fetchData()
      .then((res: any) => (response = res))
      .finally(() => setLoading(false));

    responseDataLogin(response, 'GOOGLE');
  };

  const loginFacebookSuccess = async (data: SuccessResponse) => {
    const { fetchData } = LoginFacebook(data.accessToken);
    let response: any = null;

    setLoading(true);
    await fetchData()
      .then((res: any) => console.log('Response Facebook => ', res))
      .finally(() => setLoading(false));

    responseDataLogin(response, 'FACEBOOK');
  };

  const loginFacebookFailure = (data: FailResponse) => {
    console.log('Failure login =>', data);
    setError(true);
  };

  const responseDataLogin = (response: any, type: string) => {
    if (!response.error) {
      props.handleOpenSession(response.result.data.token);
      setOpen(false);
      props.handleClose();
    } else {
      props.handleClose();
      props.isOpenRegisterExternal(true);
      props.setProveedor(type);
    }
  };

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
      <Card
        className="flex flex-col items-center"
        style={{
          maxWidth: '400px',
          maxHeight: '500px'
        }}
      >
        <CardHeader
          sx={{ color: '#3c3c3c' }}
          title={
            <>
              <span className="font">Bienevenido a Womar!</span>
              <img
                src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png"
                alt={'closeModal'}
                onClick={handleClose}
                className="cursor-pointer float-right mt-1.5 ml-2"
                style={{
                  width: '20px'
                }}
              />
            </>
          }
        />
        <CardContent>
          <StandardLogin onSubmit={loginStandard} />
          {error && (
            <Fade in={error}>
              <Box className="flex justify-center items-center pt-2">
                <Typography variant="body1" color="red">
                  Usuario/Contraseña incorrecta
                </Typography>
              </Box>
            </Fade>
          )}
          <Divider className="pt-5" />
          <Box sx={{ my: 2 }}>
            <LoginWithGoogle response={loginGoogle} />
          </Box>
          <LoginWithFacebook
            success={loginFacebookSuccess}
            failure={loginFacebookFailure}
          />
        </CardContent>
      </Card>
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
