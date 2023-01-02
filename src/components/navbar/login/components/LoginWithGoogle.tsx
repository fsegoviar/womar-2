import GoogleLogin from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';

type PropsGoogle = {
  response: (value: any) => void;
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
      onSuccess={response}
      onFailure={response}
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
