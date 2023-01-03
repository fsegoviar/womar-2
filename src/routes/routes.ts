import { createBrowserRouter } from 'react-router-dom';
import { HomeRoute } from './home.route';
import { SectionsRoutes } from './sections.route';

export const routes = createBrowserRouter([HomeRoute, ...SectionsRoutes]);
