import { ReactNode } from 'react';

export interface IRoutes {
  path: string;
  element: ReactNode;
  children?: IRoutes[];
}
