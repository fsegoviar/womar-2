import axios from 'axios';
import { useState } from 'react';

// export const Login = ({}) => {
//   const [responseLogin, setResponseLogin] = useState();

//   const fetchData = async () => {
//     await axios
//       .post(`${process.env.REACT_APP_URL_BACKEND}/Security/Login`, {
//         nombreCategoria: nombre
//       })
//       .then((response: any) => {
//         setPublish(response.data);
//       })
//       .catch((error: AxiosError) => {
//         console.log(error);
//         setError(true);
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return { publish, loading, error };
// };
