import { createBrowserRouter } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"
import RouteErrorPage from "@/pages/RouteErrorPage"
import { publicRoutes } from "./publicRoutes"
import ProtectedRoute from "@/components/ProtectedRoute"
import privateRoutes from "./privateRoutes"

// TODO: Autenticacao mock apenas para testes locais.
// Substituir por verificacao real (token/sessao) antes de producao.
const isAuthenticated = true

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		ErrorBoundary: RouteErrorPage,

		children: [
			...publicRoutes,

			{
				element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
				children: privateRoutes,
			},
		],
	},
])
