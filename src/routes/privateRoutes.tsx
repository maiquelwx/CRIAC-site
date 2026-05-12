import DesignSystemPage from "@/pages/DesignSystemPage"

// TODO: Rotas privadas estao expostas
// para testes enquanto a autenticacao real nao e integrada.
const privateRoutes = [
	{
		path: "design-system",
		element: <DesignSystemPage />,
	},
]

export default privateRoutes
