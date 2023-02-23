import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import {
  AdminPage,
  DetailServicePage,
  HomePage,
  MaritimePersonnelPage,
  OtherServicesPage,
  ProfilePage,
  ResultSearch,
  ShipSectionPage
} from './pages';
import { PublishPage } from './pages/publish-section';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="77647987925-k1b3meevc9cromf0bsd0nsrmrcoqkd5l.apps.googleusercontent.com">
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/perfil/:userId'} element={<ProfilePage />} />
        <Route path={'/embarcaciones'} element={<ShipSectionPage />} />
        <Route
          path={'/personal_maritimo'}
          element={<MaritimePersonnelPage />}
        />
        <Route path={'/otros_servicios'} element={<OtherServicesPage />} />
        <Route path={'naves/detalle/:id'} element={<DetailServicePage />} />
        <Route path={'resultados_busqueda'} element={<ResultSearch />} />
        <Route path={'/administrador'} element={<AdminPage />} />
        <Route path={'/publicar/:userId'} element={<PublishPage />} />
        <Route path={'*'} element={<h1>Pagina no encontrada</h1>} />
      </Routes>
    </GoogleOAuthProvider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
