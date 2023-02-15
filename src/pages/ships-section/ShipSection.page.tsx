import { Grid } from '@mui/material';
import {
  ContainCategories,
  SmartPreviewService,
  DetailServiceComponent
} from '../../components';
import { useState } from 'react';
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
          {/* Filtros */}
          <Grid
            item
            xs={12}
            className="w-full"
            sx={{
              height: '110px',
              background:
                'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
            }}
          >
            <Grid container className="h-full">
              <Grid item xs={3}>
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-3xl font-thin pr-5 text-white">Filtros</p>
                  <Box
                    className="rounded-full bg-white"
                    style={{ border: '1px solid #000aff' }}
                  >
                    <button className="text-[#000aff] px-10 py-1 text-xl bg-[#00e9ba] rounded-full">
                      Buscan
                    </button>
                    <button className="text-[#000aff] px-10 py-1 text-xl rounded-full">
                      Ofrecen
                    </button>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={6} className="h-full flex">
                <div className="flex flex-col h-full justify-center">
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Default checkbox
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Checked state
                    </label>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-center ml-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Default checkbox
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Checked state
                    </label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-white font-bold text-3xl">Embarcaciones</p>
                  <div
                    className="bg-cover bg-no-repeat bg-center w-16 h-16 ml-2"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/ico-embarcaciones-blanco.png')})`
                    }}
                  ></div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} className="px-10">
            <Grid container sx={{ my: 5 }} spacing={2}>
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
