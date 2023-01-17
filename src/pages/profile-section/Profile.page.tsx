import { PageBase } from '../../components/PageBase';
import { Box, Container } from '@mui/system';
import { ObtenerInfoUsuario } from '../../services';
import { FormProfile } from './components/FormProfile';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export const ProfilePage = () => {
  const { userId } = useParams();
  const [infoUser, setInfoUser] = useState<any>();
  const { fetchData } = ObtenerInfoUsuario(userId as string);

  useEffect(() => {
    const fetch = async () => {
      await fetchData().then((response: any) => {
        setInfoUser(response.result);
      });
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          position: 'relative',
          mt: 5,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {infoUser ? (
          <Box
            className="w-full md:w-5/12"
            sx={{
              backgroundColor: 'white',
              borderRadius: 10,
              p: 5,
              border: '2px solid #0bafdd'
            }}
          >
            {infoUser && <FormProfile {...infoUser} />}
          </Box>
        ) : (
          <Typography variant="h4" className="text-center">
            Usuario no encontrado
          </Typography>
        )}
      </Container>
    </PageBase>
  );
};
