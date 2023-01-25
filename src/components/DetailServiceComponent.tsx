import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FooterButton } from './DetailServiceSubComponent/FooterButton';
import { DetailService } from '../interfaces';
import { Box } from '@mui/system';
import ImageGallery from 'react-image-gallery';
import { useEffect, useState } from 'react';

type PropsComponent = {
  service: DetailService;
  closeModal: (value: boolean) => void;
  contactPage: (element: DetailService) => void;
};

type PropsCarrusel = {
  original: string;
  thumbnail: string;
};

export const DetailServiceComponent = ({
  service,
  closeModal,
  contactPage
}: PropsComponent) => {
  const [listCarrusel, setListCarrusel] = useState<PropsCarrusel[]>([]);

  useEffect(() => {
    service.imagenes.forEach((element: any) => {
      let newArray = listCarrusel;
      newArray.push({
        original: element,
        thumbnail: element
      });
      setListCarrusel(newArray);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      sx={{ maxWidth: 600 }}
      style={{
        border: '2px solid #0DA5D9',
        borderRadius: '20px',
        marginTop: '10px'
      }}
    >
      <CardMedia>
        <Box className="carousel-demo">
          <Box className="card" sx={{ p: 4 }}>
            <ImageGallery
              lazyLoad={true}
              showPlayButton={false}
              showNav={true}
              thumbnailPosition={'bottom'}
              showFullscreenButton={false}
              items={listCarrusel}
            />
          </Box>
        </Box>
      </CardMedia>

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ display: 'flex', alignItems: 'center', m: 0 }}
        >
          {service.titulo}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          ${service.precio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.descripcion}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <FooterButton
          onClose={() => closeModal(false)}
          contactPage={() => contactPage(service)}
          service={service}
        />
      </CardActions>
    </Card>
  );
};
