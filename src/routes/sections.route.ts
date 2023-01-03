import React from 'react';
import { IRoutes } from './interface';
import {
  DetailServicePage,
  MaritimePersonnelPage,
  OtherServicesPage,
  ShipSectionPage
} from '../pages';

export const SectionsRoutes: IRoutes[] = [
  {
    path: '/naves',
    element: React.createElement(ShipSectionPage),
    children: [
      {
        path: 'detalle',
        element: React.createElement(DetailServicePage)
      }
    ]
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
