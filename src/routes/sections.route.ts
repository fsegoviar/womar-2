import React from 'react';
import { IRoutes } from './interface';
import {
  MaritimePersonnelPage,
  OtherServicesPage,
  ShipSectionPage
} from '../pages';

export const SectionsRoutes: IRoutes[] = [
  {
    path: '/naves',
    element: React.createElement(ShipSectionPage)
  },
  {
    path: '/personal_maritimo',
    element: React.createElement(MaritimePersonnelPage)
  },
  {
    path: '/otros_servicios',
    element: React.createElement(OtherServicesPage)
  }
];
