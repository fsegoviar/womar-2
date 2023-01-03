import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { DetailService } from '../interfaces';

export const ObtenerPublicacionPorCategoria = (nombre: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publish, setPublish] = useState<DetailService[]>([]);

  const fetchData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_URL_API}/Publicaciones/ObtenerPublicacionPorCategoria`,
        {
          nombreCategoria: nombre
        }
      )
      .then((response: any) => {
        setPublish(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { publish, loading, error };
};

export const ObtenerPublicacionDeUsuario = (id: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publishUser, setPublishUser] = useState<DetailService[]>([]);

  const fetchData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL_API}/Publicaciones/ObtenerPublicacionDeUsuario/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => {
        setPublishUser(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { publishUser, loading, error };
};

export const EditarPublicacion = (data: any, token: string) => {
  const fetchData = async () => {
    await axios.put(
      `${process.env.REACT_APP_URL_API}/Publicaciones/EditarPublicacion`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  return { fetchData };
};
