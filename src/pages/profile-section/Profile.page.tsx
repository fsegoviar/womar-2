import { PageBase } from '../../components/PageBase';
import { Box, Container } from '@mui/system';
import { ObtenerInfoUsuario } from '../../services';
import { FormProfile } from './components/FormProfile';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
export const ProfilePage = () => {
  const { userId } = useParams();
  const { infoUser } = ObtenerInfoUsuario(userId as string);

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
