import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { UserMenu } from './UserMenu';
import { BtnNavbar, BtnSubmit } from '../../styles';
import { parseJwt } from '../../utils';
import { DialogLogin } from './login';
import { DialogRegister } from '../DialogRegister';

export const Navbar = () => {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegisterLocal, setOpenRegisterLocal] = useState(false);
  const { IdUser } = parseJwt();
  const [proveedor, setProveedor] = useState('');
  const [openRegisterExternal, setOpenRegisterExternal] = useState(false);
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem('tokenWomar')
  );

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
    localStorage.setItem('tokenWomar', token);

    setIsLogged(true);
  };

  //* Methods register

  const closeRegisterLocal = () => {
    setTimeout(() => {
      setOpenRegisterLocal(false);
    }, 500);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#FFFFFF' }}
        className="h-24"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="h-24">
            {/* Logo Womar */}
            <Box
              className="bg-center bg-no-repeat bg-contain my-2 cursor-pointer w-56 h-14"
              sx={{
                flexGrow: 1,
                backgroundImage: `url(${require('../../assets/images/logo-womar-2.png')})`
              }}
              onClick={() => navigate('/')}
            ></Box>
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
            {/* Botones */}
            <Box sx={{ flexGrow: 1 }}>
              {!isLogged ? (
                <>
                  <BtnNavbar onClick={() => navigate(`/publicar/${IdUser}`)}>
                    Publicar
                  </BtnNavbar>
                  <BtnNavbar onClick={() => setOpenLogin(true)}>
                    Ingresa
                  </BtnNavbar>
                  <BtnNavbar onClick={() => setOpenRegisterLocal(true)}>
                    Registrate
                  </BtnNavbar>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' }
                    }}
                  >
                    <BtnNavbar onClick={() => navigate(`/publicar/${IdUser}`)}>
                      Mis publicaciones
                    </BtnNavbar>
                    <UserMenu handleCloseSession={handleCloseSession} />
                  </Box>
                </>
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
          setOpenRegisterLocal={setOpenRegisterLocal}
        />
      )}
    </>
  );
};
