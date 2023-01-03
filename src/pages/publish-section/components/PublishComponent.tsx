import { Card, Box, CardContent, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DetailService } from '../../../interfaces';
import { BtnSubmit } from '../../../styles';

type PropsPublish = {
  publish: DetailService;
  editPublish: (publish: DetailService) => void;
  deletePublish: (idPublish: number) => void;
};

export const PublishComponent = (props: PropsPublish) => {
  return (
    <Card
      sx={{
        display: 'flex',
        border: '2px solid #0BAEDC',
        borderRadius: 3,
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '60%',
          height: '250px',
          backgroundImage: `url(${props.publish.urlImagenPrincipal})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '40%'
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyConente: 'center',
            alignItems: 'center'
          }}
        >
          <Typography
            component="div"
            variant="h6"
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {props.publish.titulo}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', my: 1 }}
          >
            <LocationOnIcon /> {props.publish.locacion}
          </Typography>
          <Typography component="div" sx={{ textAlign: 'center' }}>
            <Chip
              icon={<AttachMoneyIcon />}
              label={String(props.publish.precio)}
            />
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pl: 1,
            pb: 1
          }}
        >
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <BtnSubmit onClick={() => props.deletePublish(props.publish.id)}>
              Dar de baja
            </BtnSubmit>
            <BtnSubmit onClick={() => props.editPublish(props.publish)}>
              Editar
            </BtnSubmit>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
