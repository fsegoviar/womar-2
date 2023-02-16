import GoogleLogin from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { TypeUser } from '../../../../interfaces/Login';

type PropsGoogle = {
  response: (data: {
    accessToken?: string;
    email?: string;
    password?: string;
    tipo: TypeUser;
  }) => void;
};

export const LoginWithGoogle = ({ response }: PropsGoogle) => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: String(process.env.REACT_APP_KEY_GOOGLE),
        scope: 'email'
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  return (
    <GoogleLogin
      clientId={String(process.env.REACT_APP_KEY_GOOGLE)}
      buttonText="Login"
      onSuccess={(value: any) => {
        response({
          accessToken: value.accessToken,
          tipo: TypeUser.GOOGLE
        });
      }}
      onFailure={(value: any) => {
        response({
          accessToken: value.accessToken,
          tipo: TypeUser.GOOGLE
        });
      }}
      render={(renderProps) => (
        <GoogleLoginButton
          onClick={renderProps.onClick}
          text={'Iniciar con Google'}
        />
      )}
      cookiePolicy={'single_host_origin'}
    />
  );
};
