import Box from "@mui/material/Box";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import RecentActorsRoundedIcon from "@mui/icons-material/RecentActorsRounded";
import { Button, styled } from "@mui/material";
import { DetailService } from "../../interfaces";

const ButtonsDetailService = styled(Button)`
  background-color: #0bafdd;
  color: #ffffff;
  font-size: 12px;
  border-radius: 50px;
  padding: 5px 15px;
  :hover {
    color: #0bafdd;
    box-shadow: inset 0 0 0 2px #0bafdd;
  }
`;

type PropsFooter = {
  onClose: (value: boolean) => void;
  contactPage: (element: DetailService) => void;
  service: DetailService;
};

export const FooterButton = ({
  onClose,
  contactPage,
  service,
}: PropsFooter) => {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <ButtonsDetailService onClick={() => onClose(false)}>
        <CancelRoundedIcon sx={{ mr: 1 }} />
        Cancelar
      </ButtonsDetailService>
      <ButtonsDetailService onClick={() => contactPage(service)}>
        <RecentActorsRoundedIcon sx={{ mr: 1 }} />
        Contactar
      </ButtonsDetailService>
    </Box>
  );
};
