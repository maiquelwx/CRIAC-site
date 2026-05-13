import { HomePage } from "@/pages/HomePage"
import { MembersPage } from "@/pages/MembersPage"
import { PublicationsPage } from "@/pages/PublicationsPage"
import { EventsPage } from "@/pages/EventsPage"
import { NotFoundPage } from "@/pages/404Page"
import DashboardPage from "@/pages/dashboard"

export const publicRoutes = [
	{
		index: true,
		element: <HomePage />,
	},
	{
		path: "atividades",
		children: [
			{
				path: "i-workshop-criec",
				element: <EventsPage />,
			},
		],
	},
	{
		path: "publicacoes",
		element: <PublicationsPage />,
	},
	{
		path: "linhas",
		children: [
			{
				path: "previsoes",
				element: <HomePage />,
			},
			{
				path: "desastres",
				element: <HomePage />,
			},
		],
	},
	{
		path: "equipe",
		element: <MembersPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
	{
		path:'dashboard',
		element: <DashboardPage />,
	},
]
