import React from 'react';
import ReactDOM from 'react-dom/client';
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
  ShipSectionPage
} from './pages';
import { PublishPage } from './pages/publish-section';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/perfil/:userId'} element={<ProfilePage />} />
      <Route path={'/naves'} element={<ShipSectionPage />} />
      <Route path={'/personal_maritimo'} element={<MaritimePersonnelPage />} />
      <Route path={'/otros_servicios'} element={<OtherServicesPage />} />
      <Route path={'naves/detalle/:id'} element={<DetailServicePage />} />
      <Route path={'/administrador'} element={<AdminPage />} />
      <Route path={'/publicar'} element={<PublishPage />} />
      <Route path={'*'} element={<h1>Pagina no encontrada</h1>} />
    </Routes>
  </BrowserRouter>
);
