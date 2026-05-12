import { PublicationCard } from "@/components/PublicationCard"

import publications from "@/data/publications.json"

export function PublicationsPage() {
	return (
		<main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-8 md:gap-8 md:px-6 md:py-10">
			<header className="flex w-full flex-col gap-4">
				<div>
					<h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
						Publicações
					</h1>
				</div>
				<p className="max-w-3xl text-sm text-muted-foreground md:text-base">
					Esta página reúne as publicações e pesquisas do CRIEC em um espaço
					dedicado, para facilitar leitura, compartilhamento e futuras
					atualizações.
				</p>
			</header>

			<section id="publications" className="w-full">
				<div className="rounded-4xl border-border/60 p-4">
					<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
						{publications.map((publication) => (
							<PublicationCard
								key={publication.title}
								publication={publication}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export default PublicationsPage
