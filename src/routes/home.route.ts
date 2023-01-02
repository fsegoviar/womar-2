import React from "react";
import { IRoutes } from "./interface";
import { HomePage } from "../pages";

export const HomeRoute: IRoutes = {
    path: '/',
    element: React.createElement(HomePage)
  };