import axios from 'axios';
import { RegisterUser } from '../interfaces';

export const LoginLocal = (data: { email: string; password: string }) => {
  const fetchData = async () => {
    let error = false;
    let result: any = null;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Usuarios/LoginLocal`,
        data,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { fetchData };
};
/**
 * Result:
 *  {
 *    data:{
 *      id
 *      role
 *      token
 *      urlImg
 *      userName
 *    },
 *    error: true | false
 *  }
 */
export const LoginGoogle = (accessToken: string) => {
  const fetchData = async () => {
    let error = false;
    let result: any = null;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Usuarios/LoginGoogle`,
        {
          accessToken
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { fetchData };
};

/**
 * * Result:
 *  {
 *    data:{
 *      id
 *      role
 *      token
 *      urlImg
 *      userName
 *    },
 *    error: true | false
 *  }
 */
export const LoginFacebook = (accessToken: string) => {
  const fetchData = async () => {
    let error = false;
    let result: any = null;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Usuarios/LoginFacebook`,
        {
          accessToken
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { fetchData };
};

export const RegistrarUsuarioLocal = (data: RegisterUser) => {
  const registerUserLocal = async () => {
    await axios.post(
      `${process.env.REACT_APP_URL_BACKEND}/Usuarios/RegistrarUsuarioLocal`,
      data,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  };
  return { registerUserLocal };
};
