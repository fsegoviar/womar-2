import { Container, Grid } from '@mui/material';
import {
  ContainCategories,
  SmartPreviewService,
  DetailServiceComponent
} from '../../components';
import { useState } from 'react';
import { FilterSections } from '../../components/FilterSections';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card/Card';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade/Fade';
import Box from '@mui/material/Box/Box';
import { useNavigate } from 'react-router-dom';
import { PageBase } from '../../components/PageBase';
import { ObtenerPublicacionPorCategoria } from '../../services';
import { DetailService } from '../../interfaces';
import { filterShips } from '../../utils';
import { SkeletonLoader } from './components/SkeletonLoader';

export const ShipSectionPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<DetailService>();
  const navigate = useNavigate();
  const { publish: listShips, loading } = ObtenerPublicacionPorCategoria();

  console.log('Publish', loading);

  const openModalContact = (service: DetailService) => {
    setOpenModal(true);
    setServiceSelected(service);
  };

  const handleSelectFilter = (event: any) => {
    console.log(`Event Selected => `, event);
  };

  const contactPage = (service: DetailService) => {
    setOpenModal(false);
    navigate(`detalle/${service.id}`);
  };

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '90vh'
        }}
      >
        <Grid container>
          <Grid item xs={12} md={3}>
            <Card elevation={5} sx={{ mr: 4, p: 1, mt: 8 }}>
              <FilterSections
                listFilter={filterShips}
                actionFilter={handleSelectFilter}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
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
                  <Grid item xs={12} key={index} lg={6}>
                    <SmartPreviewService
                      key={index}
                      title={ship.titulo}
                      address={ship.locacion}
                      price={ship.precio}
                      urlImgCover={ship.urlImagenPrincipal}
                      rating={ship.puntuacion}
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
      </Container>
    </PageBase>
  );
};
