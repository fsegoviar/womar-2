import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Rating from '@mui/material/Rating/Rating';

interface PropsPreview {
  title: string;
  address: string;
  price: number;
  urlImgCover: string;
  rating: number;
  openContact: () => void;
}

export const SmartPreviewService = (props: PropsPreview) => {
  return (
    <Card
      className="flex w-full cursor-pointer"
      sx={{
        border: '2px solid #0BAEDC',
        transition: 'all 0.4s',
        borderRadius: '1rem',
        '&:hover': {
          boxShadow: '1px 1px 24px grey',
          transform: 'scale(1.01)'
        }
      }}
      onClick={props.openContact}
    >
      <Box
        className="bg-center bg-no-repeat bg-cover w-7/12"
        sx={{
          height: '250px',
          backgroundImage: `url(${props.urlImgCover})`
        }}
      ></Box>
      <Box className="flex flex-col justify-center w-5/12">
        <CardContent className="flex flex-col justify-center items-center">
          <h6 className="text-center font-bold text-[20px]">{props.title}</h6>
          <Rating name="read-only" value={props.rating} readOnly />
          <Typography
            className="flex justify-center py-2"
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <LocationOnIcon /> {props.address}
          </Typography>
          <Typography component="div" className="text-center">
            <Chip icon={<AttachMoneyIcon />} label={String(props.price)} />
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
