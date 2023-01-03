import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Card, CardHeader, Typography } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { PageBase } from '../../components/PageBase';
import { FormContact } from './components/FormContact';
import { useParams } from 'react-router-dom';
import { ObtenerPublicacion } from '../../services';
export const DetailServicePage = () => {
  let { id } = useParams();
  const { detailService } = ObtenerPublicacion(String(id));

  console.log(detailService);

  const images = [
    {
      original:
        'https://www.seabookings.com/photos/original/971-you-even-encounter-some-friendly-dolphins-1575397384-jpg',
      thumbnail:
        'https://www.seabookings.com/photos/original/971-you-even-encounter-some-friendly-dolphins-1575397384-jpg'
    },
    {
      original:
        'https://thumbs.dreamstime.com/b/spring-summer-land%E2%80%A6ountryside-grass-poland-water-leaves-58070004.jpg',
      thumbnail:
        'https://thumbs.dreamstime.com/b/spring-summer-land%E2%80%A6ountryside-grass-poland-water-leaves-58070004.jpg'
    },
    {
      original:
        'https://thumbs.dreamstime.com/b/sailing-boat-wide-angle-view-sea-instagram-toning-50855721.jpg',
      thumbnail:
        'https://thumbs.dreamstime.com/b/sailing-boat-wide-angle-view-sea-instagram-toning-50855721.jpg'
    }
  ];

  return (
    <PageBase>
      <Container maxWidth={'xl'} sx={{ minHeight: '90vh', pt: 10 }}>
        <Grid container sx={{ my: 5 }}>
          <Grid item xs={12} md={9}>
            <Grid item xs={12} md={10}>
              <ImageGallery
                lazyLoad={true}
                showPlayButton={false}
                showNav={true}
                thumbnailPosition={'left'}
                showFullscreenButton={false}
                items={images}
              />
            </Grid>
            <Grid item xs={12} md={10} sx={{ mt: 2 }}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ display: 'flex', alignItems: 'center', m: 0 }}
              >
                {detailService?.titulo}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                ${detailService?.precio}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {detailService?.descripcion}
              </Typography>
            </Grid>
          </Grid>
          {detailService && (
            <Grid item xs={12} md={3} className="pt-10 md:p-0">
              <Card>
                <CardHeader title={'Formulario de contacto'} />
                <FormContact {...detailService} />
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </PageBase>
  );
};
