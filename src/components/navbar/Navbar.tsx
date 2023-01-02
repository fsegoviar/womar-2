import { AppBar, Toolbar } from '@mui/material';
import { Box, Container } from '@mui/system';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BtnSubmit } from '../../styles';
import { DialogLogin } from './login';
import { DialogRegister } from '../DialogRegister';
import { RegisterUser } from '../../interfaces';
import { AxiosError } from 'axios';
import { RegistrarUsuarioLocal } from '../../services';

export const Navbar = () => {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegisterLocal, setOpenRegisterLocal] = useState(false);

  const [proveedor, setProveedor] = useState('');
  const [openRegisterExternal, setOpenRegisterExternal] = useState(false);
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem('tokenWomar')
  );

  console.log('proveedor' + proveedor + ' open ' + openRegisterExternal);

  const handleCloseSession = () => {
    setIsLogged(false);
    localStorage.removeItem('tokenWomar');
  };

  const handleCloseDialogLogin = () => {
    setTimeout(() => {
      setOpenLogin(false);
    }, 500);
  };

  const handleOpenSession = (token: string) => {
    setIsLogged(true);
    localStorage.setItem('tokenWomar', token);
  };

  //* Methods register
  const onSubmitRegisterLocal = (data: RegisterUser) => {
    const { registerUserLocal } = RegistrarUsuarioLocal(data);
    registerUserLocal()
      .then(() => setOpenRegisterLocal(false))
      .catch((error: AxiosError) => console.log('Error =>', error));
  };

  const closeRegisterLocal = () => {
    setTimeout(() => {
      setOpenRegisterLocal(false);
    }, 500);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#E0E0E2' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo Womar */}
            <Box
              className="bg-center bg-no-repeat bg-contain my-2 cursor-pointer"
              sx={{
                flexGrow: 1,
                backgroundImage: `url(${require('../../assets/images/logo-womar-2.png')})`,
                height: '70px'
              }}
              onClick={() => navigate('/')}
            ></Box>
            {localStorage.getItem('tokenWomar') && (
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                {/* <ButtonSubmit
                  onClick={() => navigate('/publicar')}
                  sx={{ boxShadow: 'inset 0 0 0 2px #FFFFFF', mx: 3 }}
                >
                  Mis publicaciones
                </ButtonSubmit> */}
              </Box>
            )}
            {/* Barra de busqueda */}
            <Box
              sx={{
                flexGrow: 3,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <SearchBar />
            </Box>
            {/* Botones de ingresar y registrarse */}
            <Box sx={{ flexGrow: 1 }}>
              {!isLogged ? (
                <>
                  <BtnSubmit
                    onClick={() => setOpenLogin(true)}
                    sx={{
                      boxShadow: 'inset 0 0 0 2px #FFFFFF',
                      marginRight: '10px'
                    }}
                  >
                    Ingresa
                  </BtnSubmit>
                  <BtnSubmit
                    onClick={() => setOpenRegisterLocal(true)}
                    sx={{ boxShadow: 'inset 0 0 0 2px #FFFFFF' }}
                  >
                    Registrate
                  </BtnSubmit>
                </>
              ) : (
                // Boton de menu usuario para editar perfil y cerrar sesión
                <UserMenu handleCloseSession={handleCloseSession} />
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {openLogin && (
        <DialogLogin
          open={openLogin}
          handleClose={handleCloseDialogLogin}
          handleOpenSession={handleOpenSession}
          setProveedor={setProveedor}
          isOpenRegisterExternal={setOpenRegisterExternal}
        />
      )}
      {openRegisterLocal && (
        <DialogRegister
          open={openRegisterLocal}
          handleClose={closeRegisterLocal}
          onSubmit={onSubmitRegisterLocal}
        />
      )}
    </>
  );
};
