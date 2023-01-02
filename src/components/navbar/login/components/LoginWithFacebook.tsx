import FacebookLogin, {
  FailResponse,
  SuccessResponse
} from '@greatsumini/react-facebook-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

type PropsFacebook = {
  success: (response: SuccessResponse) => void;
  failure: (response: FailResponse) => void;
};

export const LoginWithFacebook = ({ success, failure }: PropsFacebook) => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_KEY_FACEBOOK as string}
      autoLoad={false}
      onSuccess={success}
      onFail={failure}
      onProfileSuccess={(response) => {
        console.log('Response Profile', response);
      }}
      render={(renderProps) => (
        <FacebookLoginButton
          onClick={renderProps.onClick}
          text={'Iniciar con Facebook'}
        />
      )}
    />
  );
};
