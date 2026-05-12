import DesignSystemPage from "@/pages/DesignSystemPage"
import DashboardPage from "@/pages/dashboard"

// TODO: Rotas privadas estao expostas
// para testes enquanto a autenticacao real nao e integrada.
const privateRoutes = [
  {
    path: "design-system",
    element: <DesignSystemPage />,
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
  },
]

export default privateRoutes
