import { TypeUser } from '../../../../interfaces/Login';
import { GoogleLogin } from '@react-oauth/google';

type PropsGoogle = {
  response: (data: {
    accessToken?: string;
    email?: string;
    password?: string;
    tipo: TypeUser;
  }) => void;
};

export const LoginWithGoogle = ({ response }: PropsGoogle) => {
  // useEffect(() => {
  //   gapi.load('client:auth2', () => {
  //     gapi.auth2.init({ clientId: String(process.env.REACT_APP_KEY_GOOGLE) });
  //   });
  // }, []);

  return (
    // <GoogleLogin
    //   clientId={
    //     '77647987925-k1b3meevc9cromf0bsd0nsrmrcoqkd5l.apps.googleusercontent.com'
    //   }
    //   buttonText="Login"
    //   onSuccess={(value: any) => {
    //     response({
    //       accessToken: value.accessToken,
    //       tipo: TypeUser.GOOGLE
    //     });
    //   }}
    //   onFailure={(value: any) => {
    //     response({
    //       accessToken: value.accessToken,
    //       tipo: TypeUser.GOOGLE
    //     });
    //   }}
    //   render={(renderProps) => (
    //     <GoogleLoginButton
    //       onClick={renderProps.onClick}
    //       text={'Iniciar con Google'}
    //     />
    //   )}
    //   cookiePolicy={'single_host_policy'}
    // />
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  );
};
