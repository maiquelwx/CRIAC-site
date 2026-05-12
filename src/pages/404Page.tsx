import { ArrowLeft, Home, SearchX } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
	return (
		<section className="mx-auto my-15 flex max-w-6xl flex-col gap-12 p-10 md:flex-row">
			<p className="my-auto font-heading text-8xl font-bold">404</p>
			<div className="flex flex-col gap-6">
				<Badge variant="destructive">
					<SearchX data-icon="inline-start" />
					Página não encontrada
				</Badge>

				<div className="space-y-3">
					<h1 className="font-heading text-3xl font-semibold md:text-5xl">
						O caminho que você tentou acessar não existe.
					</h1>
					<p className="text-muted-foreground md:text-lg">
						A página pode ter sido movida, removida ou o endereço foi digitado
						com algum erro.
					</p>
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
			</div>
		</section>
	)
}

export default NotFoundPage
