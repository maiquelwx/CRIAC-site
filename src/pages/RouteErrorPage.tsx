import { AlertTriangle, ArrowLeft, Home, RotateCcw } from "lucide-react"
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card"

type StatusInfo = {
	title: string
	message: string
}

function getStatusInfoFromError(error: unknown): StatusInfo {
	if (isRouteErrorResponse(error)) {
		return {
			title: `${error.status} ${error.statusText}`,
			message:
				typeof error.data === "string"
					? error.data
					: "A resposta da rota retornou um erro.",
		}
	}

	if (error instanceof Error) {
		return {
			title: error.name,
			message: error.message,
		}
	}

	return {
		title: "Erro desconhecido",
		message: "Não foi possível identificar o erro com precisão.",
	}
}

export function RouteErrorPage({
	description = "A rota carregou, mas alguma etapa falhou durante o processo.",
}: {
	description?: string
}) {
	const error = useRouteError()
	const statusInfo = getStatusInfoFromError(error)

	return (
		<main className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-4xl items-center px-4 py-16 md:px-6">
			<Card className="w-full">
				<CardHeader>
					<Badge variant="destructive">
						<AlertTriangle data-icon="inline-start" />
						Algo deu errado
					</Badge>
					<CardTitle className="mt-6 text-3xl md:text-5xl">
						Não foi possível concluir
					</CardTitle>
					<CardDescription className="text-base md:text-lg">
						{description}
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="rounded-lg border border-border bg-muted p-4">
						<p className="font-medium">Detalhes</p>
						<p className="m-2 text-muted-foreground">{statusInfo.title}</p>
						<p className="m-2 text-muted-foreground">{statusInfo.message}</p>
						<Button
							variant="outline"
							size="sm"
							onClick={() => window.location.reload()}
							className="mt-2"
						>
							<RotateCcw data-icon="inline-start" />
							Recarregar
						</Button>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row">
						<Button
							variant="outline"
							size="lg"
							className="rounded-full"
							onClick={() => window.history.back()}
						>
							<ArrowLeft data-icon="inline-start" />
							Voltar
						</Button>
						<Button asChild size="lg" className="rounded-full">
							<Link to="/">
								<Home data-icon="inline-start" />
								Ir para a home
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}

export default RouteErrorPage
