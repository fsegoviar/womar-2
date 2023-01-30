import axios from 'axios';
import { useEffect, useState } from 'react';

export const CantidadUsuario = () => {
  const [result, setResult] = useState<any>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_BACKEND}/Reporteria/CantidadUsuario`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
      setResult(response.data);
    } catch (_) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { result, error, loading };
};

export const PublicacionesPorCategoria = () => {
  const [result, setResult] = useState<any>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_BACKEND}/Reporteria/PublicacionesPorCategoria`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
      console.log('Response PublicacionesPorCategoria =>', response);
      setResult(response.data);
    } catch (_) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { result, error, loading };
};
