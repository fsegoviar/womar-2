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

const filterOptions = [
  {
    value: 'capitan',
    label: 'Capitanes'
  },
  {
    value: 'tripulacion',
    label: 'Tripulación'
  },
  {
    value: 'rating',
    label: 'Ordenar por Rating'
  },
  {
    value: 'precio_mayor',
    label: 'Ordenar por precio mayor'
  },
  {
    value: 'precio_menor',
    label: 'Ordenar por precio menor'
  }
];

export const MaritimePersonnelPage = () => {
  const { publish: listPublish } = ObtenerPublicacionPorCategoria([2]);
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<DetailService>();
  const navigate = useNavigate();

  const openModalContact = (service: DetailService) => {
    setOpenModal(true);
    setServiceSelected(service);
  };

  const handleSelectFilter = (event: any) => {
    console.log(`Event Selected => `, event);
  };

  const contactPage = (service: DetailService) => {
    navigate('detalle', {
      state: {
        service
      }
    });
  };

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '90vh',
          position: 'relative',
          mt: 5
        }}
      >
        <Grid container>
          <Grid item xs={3}>
            <Card elevation={5} sx={{ mr: 4, p: 1, mt: 8 }}>
              <FilterSections
                listFilter={filterOptions}
                actionFilter={handleSelectFilter}
              />
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Grid container sx={{ my: 5 }} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Personal Marítimo
                </Typography>
                <Divider />
              </Grid>
              {listPublish!.length > 0 ? (
                listPublish!.map((publish, index) => (
                  <Grid item xs={12} key={index} lg={6}>
                    <SmartPreviewService
                      key={index}
                      title={publish.titulo}
                      price={publish.precio}
                      direccion={publish.direccion}
                      urlImgCover={publish.urlImagenPrincipal}
                      openContact={() => openModalContact(publish)}
                    />
                  </Grid>
                ))
              ) : (
                <h1>No existen publicaciones para esta sección</h1>
              )}
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  my: 5
                }}
              >
                <ContainCategories />
              </Grid>
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
              sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
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
