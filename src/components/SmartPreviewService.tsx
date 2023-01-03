import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Rating from "@mui/material/Rating/Rating";

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
      sx={{
        display: "flex",
        border: "2px solid #0BAEDC",
        borderRadius: 3,
        width: "100%",
        cursor: "pointer",
        transition: "all 0.4s",
        "&:hover": {
          boxShadow: "1px 1px 24px grey",
          transform: "scale(1.05)",
        },
      }}
      onClick={props.openContact}
    >
      <Box
        sx={{
          width: "60%",
          height: "250px",
          backgroundImage: `url(${props.urlImgCover})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "40%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyConente: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="div"
            variant="h6"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            {props.title}
          </Typography>
          <Rating name="read-only" value={props.rating} readOnly />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ display: "flex", justifyContent: "center", my: 1 }}
          >
            <LocationOnIcon /> {props.address}
          </Typography>
          <Typography component="div" sx={{ textAlign: "center" }}>
            <Chip icon={<AttachMoneyIcon />} label={String(props.price)} />
          </Typography>
        </CardContent>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <Box>
            <ButtonSubmit onClick={props.openContact}>Contactar</ButtonSubmit>
          </Box>
        </Box> */}
      </Box>
    </Card>
  );
};
