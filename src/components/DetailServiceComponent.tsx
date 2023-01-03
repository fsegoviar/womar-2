import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { FooterButton } from "./DetailServiceSubComponent/FooterButton";
import { CarouselImages } from "./DetailServiceSubComponent/CarouselImages";
import { DetailService } from "../interfaces";

type PropsComponent = {
  service: DetailService;
  closeModal: (value: boolean) => void;
  contactPage: (element: DetailService) => void;
};

export const DetailServiceComponent = ({
  service,
  closeModal,
  contactPage,
}: PropsComponent) => {
  return (
    <Card
      sx={{ maxWidth: 600 }}
      style={{
        border: "2px solid #0DA5D9",
        borderRadius: "20px",
        marginTop: "10px",
      }}
    >
      <CardMedia>
        <CarouselImages {...service.otrasImagenes} />
      </CardMedia>

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ display: "flex", alignItems: "center", m: 0 }}
        >
          {service.titulo}
          <Rating
            name="simple-controlled"
            sx={{ pl: 2 }}
            value={service.puntuacion}
            readOnly
          />
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          ${service.precio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.descripcion}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
