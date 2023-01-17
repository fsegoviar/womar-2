import axios, { AxiosError, AxiosResponse } from 'axios';
import { InfoUser, RegisterUser } from '../interfaces';
import { useEffect, useState } from 'react';

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
 *      tok
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
      `${process.env.REACT_APP_URL_API}/Usuarios/RegistrarUsuarioLocal`,
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

export const ActualizarInfoUsuario = (data: any, token: string) => {
  const actualizarInfoUsuario = async () => {
    await axios.patch(
      `${process.env.REACT_APP_URL_API}/Usuarios/ActualizarInfoUsuario`,
      data,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`
        }
      }
    );
  };
  return { actualizarInfoUsuario };
};

export const ObtenerInfoUsuario = (IdUser: string) => {
  let result: any = null;
  let error = false;

  const fetchData = async () => {
    // const { IdUser } = parseJwt();
    try {
      const response = await axios
        .get(
          `${process.env.REACT_APP_URL_API}/Usuarios/ObtenerInfoUsuario/${IdUser}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
            }
          }
        )
      result = response.data;
    } catch (_error) {
      error = true;
    }

    return { result, error };
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetchData };
};

export const CargarImagenUsuario = ({
  IdUsuario,
  Imagen
}: {
  IdUsuario: string;
  Imagen: Blob;
}) => {
  let formData = new FormData();
  formData.append('IdUsuario', IdUsuario);
  formData.append('Imagen', Imagen);
  let result: any = null;
  let error = false;

  const cargarImagenUsuario = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Usuarios/CargarImagenPerfil`,
        formData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { cargarImagenUsuario };
};
