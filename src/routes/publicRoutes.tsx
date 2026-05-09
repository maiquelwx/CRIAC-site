import { HomePage } from "@/pages/HomePage";
import { MembersPage } from "@/pages/MembersPage";

export const publicRoutes = [
	{
		index: true,
		element: <HomePage />,
	},
	{
		path: "equipe",
		element: <MembersPage />,
	},
];
