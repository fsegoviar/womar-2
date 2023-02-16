import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/system';
import { PageBase } from '../../components/PageBase';
import Card from '@mui/material/Card/Card';
import { useState } from 'react';
import { ObtenerPublicacionDeUsuario } from '../../services/Publicaciones';
import { DetailService } from '../../interfaces';
import { DialogEditPublish } from './components/DialogEditPublish';
import { DisabledPublish } from './components/DisabledPublish';
import { PublishComponent } from './components/PublishComponent';
import { useParams } from 'react-router-dom';
import { SkeletonLoader } from './components/SkeletonLoader';
import { CreateNewPublish } from './components/CreateNewPublish';
import './styles.css';

export const PublishPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { userId } = useParams();
  const { publishUser, loading } = ObtenerPublicacionDeUsuario();
  const [publishSelected, setPublishSelected] = useState<DetailService>();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idPublishDelete, setIdPublishDelete] = useState('');

  const closeModal = () => setOpenModal(false);

  const editPublish = (publish: DetailService) => {
    setPublishSelected(publish);
    setOpenModalEdit(true);
  };

  const deletePublish = (idPublish: string) => {
    setOpenModalDelete(true);
    setIdPublishDelete(idPublish);
  };

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '90vh',
          height: 'auto',
          position: 'relative',
          mt: 15
        }}
      >
        <Grid
          container
          sx={{
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={11}>
            <Box
              sx={{
                width: '100%',
                height: '170px',
                display: 'flex',
                borderRadius: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': { m: 1 }
              }}
            >
              <p className="text-2xl pb-3 md:text-[24px] text-[#545454]">
                Nueva publicación
              </p>
              <button
                className="text-white rounded-full py-5 px-20 text-xl"
                style={{
                  marginTop: '10px',
                  background:
                    'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                }}
                onClick={() => setOpenModal(true)}
              >
                Crear publicación
              </button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <hr style={{ border: '1px solid #c1c1c1' }} />
          </Grid>
          <Grid item xs={11} sx={{ mt: 5 }}>
            <Card
              className="scroll-action"
              elevation={0}
              sx={{
                maxHeight: '60vh',
                paddingTop: '20px',
                overflowY: 'scroll',
                backgroundColor: '#f7f7f7'
              }}
            >
              <Grid container>
                {loading && <SkeletonLoader />}
                {publishUser.length > 0 &&
                  !loading &&
                  publishUser.map((publish) => (
                    <Grid item xs={4} className="px-3 py-2">
                      <PublishComponent
                        key={publish.id}
                        publish={publish}
                        deletePublish={deletePublish}
                        editPublish={editPublish}
                      />
                    </Grid>
                  ))}
                {publishUser.length === 0 && !loading && (
                  <h1>No existen publicaciones para esta sección</h1>
                )}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <CreateNewPublish open={openModal} userId={userId!} close={closeModal} />
      {openModalEdit && (
        <DialogEditPublish
          open={openModalEdit}
          close={setOpenModalEdit}
          publish={publishSelected!}
        />
      )}
      {openModalDelete && (
        <DisabledPublish
          open={openModalDelete}
          handleClose={() => setOpenModalDelete(false)}
          idPublicacion={idPublishDelete}
        />
      )}
    </PageBase>
  );
};
