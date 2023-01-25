import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Card, Typography } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { PageBase } from '../../components/PageBase';
import { FormContact } from './components/FormContact';
import { useParams } from 'react-router-dom';
import { ObtenerPublicacion } from '../../services';
import { useEffect, useState } from 'react';
import { SkeletonLoader } from './components/SkeletonLoader';
export const DetailServicePage = () => {
  let { id } = useParams();
  const { detailService, loading } = ObtenerPublicacion(String(id));
  const [caruselImg, setCarruselImg] = useState([]);
  console.log(detailService);

  useEffect(() => {
    let imgUrls: any[] = [];
    if (detailService?.imagenes !== undefined) {
      console.log(detailService.imagenes);

      detailService.imagenes.forEach((imagen: any) => {
        imgUrls.push({
          original: imagen,
          thumbnail: imagen
        });
      });
      setCarruselImg(imgUrls as never[]);
    }
  }, [detailService]);

  return (
    <PageBase>
      <Container maxWidth={'xl'} sx={{ minHeight: '90vh', pt: 10 }}>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <Grid container sx={{ my: 5 }}>
            <Grid item xs={12} md={9}>
              <Grid item xs={12} md={10}>
                <ImageGallery
                  lazyLoad={true}
                  showPlayButton={false}
                  showNav={true}
                  thumbnailPosition={'left'}
                  showFullscreenButton={false}
                  items={caruselImg}
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
                  <h4 className="font p-4 text-[20px] font-medium">
                    Formulario de contacto
                  </h4>
                  <FormContact {...detailService} />
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </PageBase>
  );
};
