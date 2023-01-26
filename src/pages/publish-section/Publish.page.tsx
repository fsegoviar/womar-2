import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/system';
import { PageBase } from '../../components/PageBase';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card/Card';
import { useState } from 'react';
import { CreatePublish } from './components/CreatePublish';
import { ObtenerPublicacionDeUsuario } from '../../services/Publicaciones';
import { DetailService } from '../../interfaces';
import { DialogEditPublish } from './components/DialogEditPublish';
import { DisabledPublish } from './components/DisabledPublish';
import { BtnSubmit } from '../../styles';
import { PublishComponent } from './components/PublishComponent';
import { useParams } from 'react-router-dom';
import { SkeletonLoader } from './components/SkeletonLoader';

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
                border: '2px solid #61dafb',
                display: 'flex',
                borderRadius: '20px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h4 className="text-2xl pb-3 md:text-[32px] ">
                Nueva publicación
              </h4>
              <BtnSubmit
                style={{
                  padding: '8px 40px',
                  fontSize: '16px',
                  marginTop: '10px'
                }}
                onClick={() => setOpenModal(true)}
              >
                Crear publicación
              </BtnSubmit>
            </Box>
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
              <Stack spacing={2} sx={{ width: '90%', margin: '0 auto' }}>
                {loading && <SkeletonLoader />}
                {publishUser.length > 0 &&
                  !loading &&
                  publishUser.map((publish) => (
                    <PublishComponent
                      key={publish.id}
                      publish={publish}
                      deletePublish={deletePublish}
                      editPublish={editPublish}
                    />
                  ))}
                {publishUser.length === 0 && !loading && (
                  <h1>No existen publicaciones para esta sección</h1>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <CreatePublish open={openModal} userId={userId!} close={closeModal} />
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
