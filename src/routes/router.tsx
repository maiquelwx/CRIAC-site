import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { publicRoutes } from "./publicRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: publicRoutes,
  },
])
