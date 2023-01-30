import { Container } from '@mui/system';
import { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { PageBase } from '../../components/PageBase';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { CardInfor } from './components/CardInfor';
// import { PieChart } from './components/PieChart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DialogDisabledUser } from './components/DialogDisabledUser';
import { CantidadUsuario } from '../../services/Reporteria';
export const AdminPage = () => {
  // const [pieData, setPieData] = useState();
  const [listUsers] = useState<any[]>([]);
  const [openModalDisabled, setOpenModalDisabled] = useState(false);
  const [userSelected, setUserSelected] = useState({
    id: '',
    state: ''
  });
  const { result: countUsers } = CantidadUsuario();
  // const { result: publishPerCategory } = PublicacionesPorCategoria();

  const handleDisabledUser = (user: any) => {
    setOpenModalDisabled(true);
    setUserSelected({
      id: String(user.id),
      state: String(user.estado)
    });
  };

  const actionDisabled = (rowData: any) => {
    if (rowData.estado === 'Activo') {
      return (
        <div style={{ display: 'flex' }}>
          <div style={{ margin: '0 5px' }}>
            <Button
              icon="pi pi-user-minus"
              className="p-button-rounded p-button-sm p-button-danger"
              onClick={() => handleDisabledUser(rowData)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex' }}>
          <div style={{ margin: '0 5px' }}>
            <Button
              icon="pi pi-user-plus"
              className="p-button-rounded p-button-outlined p-button-sm p-button-success"
              onClick={() => handleDisabledUser(rowData.id)}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '90vh',
          height: 'auto',
          position: 'relative',
          mt: 10
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 12 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CardInfor
            bgCard="#07BC77"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Usuarios Registrados'}
            numberData={countUsers}
          />
          {/* <Box>
            {publishPerCategory && (
              <>
                <Typography
                  variant="h6"
                  component={'div'}
                  style={{ fontWeight: 'bold' }}
                >
                  Nº Publicaciones por categoría
                </Typography>
                <PieChart pieData={publishPerCategory} />
              </>
            )}
          </Box> */}
        </Stack>
        <Divider sx={{ my: 4 }} />
        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'h4'} sx={{ mb: 2 }}>
              Administrador de Usuarios
            </Typography>
            {/* <GridUsers {...listUsers} /> */}
            <DataTable
              value={listUsers}
              responsiveLayout="stack"
              breakpoint="960px"
              dataKey="id"
              rows={15}
              style={{ padding: '30px 0' }}
            >
              <Column field="id" header={'Id'} sortable></Column>
              <Column field="nombreUsuario" header={'Nombre'} sortable></Column>
              <Column
                field="tipoCuenta"
                header={'Tipo de Cuenta'}
                sortable
              ></Column>
              <Column field="estado" header={'Estado'} sortable></Column>
              <Column
                body={actionDisabled}
                exportable={false}
                style={{ minWidth: '8rem' }}
              ></Column>
            </DataTable>
          </Grid>
        </Grid>
      </Container>
      <DialogDisabledUser
        open={openModalDisabled}
        closeModal={setOpenModalDisabled}
        info={userSelected}
      />
    </PageBase>
  );
};
