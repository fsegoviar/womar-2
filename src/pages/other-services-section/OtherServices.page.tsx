import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { PageBase } from '../../components/PageBase';
import { Category } from './components/Category';
export const OtherServicesPage = () => {
  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            component={'div'}
            variant={'h3'}
            sx={{
              m: 4,
              textAlign: 'center',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            Te ofrecemos explorar otros servicios
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Category
              title={'Servicio de buceo'}
              img={require('../../assets/images/buceo.png')}
            />
          </Grid>
        </Grid>
      </Container>
    </PageBase>
  );
};
