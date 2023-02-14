import { Grid } from '@mui/material';
import {
  ContainCategories,
  SmartPreviewService,
  DetailServiceComponent
} from '../../components';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade/Fade';
import Box from '@mui/material/Box/Box';
import { useNavigate } from 'react-router-dom';
import { PageBase } from '../../components/PageBase';
import { ObtenerPublicacionPorCategoria } from '../../services';
import { DetailService } from '../../interfaces';
import { SkeletonLoader } from './components/SkeletonLoader';

export const ShipSectionPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<DetailService>();
  const navigate = useNavigate();
  const { publish: listShips, loading } = ObtenerPublicacionPorCategoria([1]);

  console.log('Publish', loading);

  const openModalContact = (service: DetailService) => {
    setOpenModal(true);
    console.log('service', service);
    setServiceSelected(service);
  };

  const contactPage = (service: DetailService) => {
    setOpenModal(false);
    navigate(`detalle/${service.id}`);
  };

  return (
    <PageBase>
      <Box className="">
        <Grid container>
          <Grid
            item
            xs={12}
            className="w-full"
            sx={{
              height: '110px',
              background:
                'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
            }}
          ></Grid>
          <Grid item xs={12} md={12} className="px-10">
            <Grid container sx={{ my: 5 }} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Naves
                </Typography>
                <Divider />
              </Grid>
              {loading && (
                <Grid item xs={12}>
                  <SkeletonLoader />
                </Grid>
              )}
              {listShips!.length > 0 &&
                !loading &&
                listShips!.map((ship, index) => (
                  <Grid item xs={12} key={index} lg={4}>
                    <SmartPreviewService
                      key={index}
                      title={ship.titulo}
                      price={ship.precio}
                      direccion={ship.direccion}
                      urlImgCover={ship.urlImagenPrincipal}
                      openContact={() => openModalContact(ship)}
                    />
                  </Grid>
                ))}
              {listShips.length === 0 && !loading && (
                <h1>No existen publicaciones para esta sección</h1>
              )}
              <section className="my-10 flex flex-col justify-center items-center w-full md:flex-row ">
                <ContainCategories />
              </section>
            </Grid>
          </Grid>
        </Grid>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
        >
          <Fade timeout={400} in={openModal}>
            <Box
              className="flex justify-center items-center w-full"
              sx={{
                height: '100vh'
              }}
            >
              <Box>
                <DetailServiceComponent
                  service={serviceSelected!}
                  closeModal={setOpenModal}
                  contactPage={contactPage}
                />
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </PageBase>
  );
};
