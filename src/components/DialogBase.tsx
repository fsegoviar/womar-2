import { ReactElement, useState } from 'react';
import { LoginWithFacebook } from './navbar/login/components/LoginWithFacebook';
import { LoginWithGoogle } from './navbar/login/components/LoginWithGoogle';
import { TypeUser } from '../interfaces/Login';
import axios from 'axios';
import { FailResponse } from '@greatsumini/react-facebook-login';

type ChildrenElement = {
  children?: ReactElement;
};

export const DialogBase = ({ children }: ChildrenElement) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState('');

  const accessLogin = ({
    accessToken = '',
    email = '',
    password = '',
    tipo
  }: {
    accessToken?: string;
    email?: string;
    password?: string;
    tipo: TypeUser;
  }): void => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL_BACKEND}/Security/Login`, {
        accessToken,
        email,
        password,
        tipo
      })
      .then((response: any) => {
        /*props.handleOpenSession(response.data.token);
        setOpen(false);
        props.handleClose();*/
      })
      .catch((error: any) => {
        if (error.response.data) {
          setMsgError('Usuario no registrado');
        } else {
          setMsgError('Usuario/Contraseña incorrecta');
        }
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const loginFacebookFailure = (data: FailResponse) => {
    console.log('Failure login =>', data);
    setError(true);
  };

  return (
    <>
      {/* Fondo blanco */}
      <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 opacity-75"></div>
      {/* Contendor Dialog */}
      <div
        className="fixed top-0 left-0 w-full h-screen flex z-50 justify-center items-center"
        onClick={() => {
          console.log('Padre');
        }}
      >
        <div
          className="w-7/12 h-3/6 bg-white flex"
          style={{ borderRadius: '70px' }}
          onClick={() => {
            console.log('Hijo');
          }}
        >
          <div
            className="w-full h-full bg-no-repeat bg-center bg-cover rounded-[70px] flex justify-end"
            style={{
              backgroundImage: `url(${require('../assets/images/slider-womar1.jpg')})`
            }}
          >
            <div
              className="w-5/12 h-full border-2 border-[#000aff] bg-white p-10"
              style={{ borderRadius: '70px' }}
            >
              <p>Ingresa</p>
              <div className="grid gap-4 mt-10">
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  className="border-2 rounded-md p-2"
                />
                <input
                  type="text"
                  placeholder="Contraseña"
                  className="border-2 rounded-md p-2"
                />
              </div>
              <div className="mt-7 flex justify-center">
                <button
                  className="text-white py-2 px-10 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                  }}
                >
                  Acceder
                </button>
              </div>
              <hr className="mt-3" />
              <div className="grid gap-4">
                <LoginWithGoogle response={accessLogin} />
                <LoginWithFacebook
                  success={accessLogin}
                  failure={loginFacebookFailure}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
