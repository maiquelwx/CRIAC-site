import { EventCard } from "@/components/EventCard"
import events from "@/data/events.json"

export function EventsPage() {
	return (
		<main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-8 md:gap-8 md:px-6 md:py-10">
			<header className="flex w-full flex-col gap-4">
				<div>
					<h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
						I Workshop CRIEC
					</h1>
				</div>
				<p className="max-w-3xl text-sm text-muted-foreground md:text-base">
					Primeiro workshop "Eventos Climáticos e Desastres no RS:
					Caracterização e Predição com IA" de 13 a 16 de maio de 2026.
				</p>
			</header>

			<section id="events" className="w-full">
				<div className="rounded-4xl border-border/60 p-4">
					<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
						{events.map((event) => (
							<EventCard key={event.title} event={event} />
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export default EventsPage
