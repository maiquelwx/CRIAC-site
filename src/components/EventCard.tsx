import { CalendarDays, MapPin } from "lucide-react"
import { AddToCalendarButton } from "add-to-calendar-button-react"
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog"

export interface Event {
	title: string
	date: string // ISO 8601 string
	location: string // Local "Informal" (ex: Anfiteatro)
	address: string // Endereço completo
	image?: string
	tags?: string[]
	description?: string
	coordinators?: string[]
}

interface EventCardProps {
	event: Event
}

export function EventCard({ event }: EventCardProps) {
	const responsavelLabel =
		event.coordinators?.length === 1 ? "Responsável:" : "Responsáveis:"
	const ISOdate = new Date(event.date)

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-sm">
					<CardHeader>
						<span className="inline-flex items-center gap-1 text-lg text-muted-foreground">
							<CalendarDays data-icon="inline-start" className="size-4.5" />
							{ISOdate.toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "2-digit",
							})}
						</span>
						{event.tags?.[0] && (
							<CardAction>
								<Badge variant="outline-2">{event.tags[0]}</Badge>
							</CardAction>
						)}
					</CardHeader>

					<CardContent>
						<CardTitle className="text-lg">{event.title}</CardTitle>
					</CardContent>

					<CardFooter className="text-muted-foreground">
						<span className="inline-flex items-center gap-1">
							<MapPin className="size-4" />
							{event.location}
						</span>
					</CardFooter>
				</Card>
			</DialogTrigger>

			<DialogContent className="max-w-lg lg:max-w-xl">
				<DialogHeader>
					<DialogTitle>{event.title}</DialogTitle>
				</DialogHeader>
				<div>
					<DialogDescription>
						<div className="text-md space-y-4">
							<div>
								<p className="font-semibold text-foreground">Data:</p>
								<p>
									{ISOdate.toLocaleString("pt-BR", {
										dateStyle: "full",
										timeStyle: "short",
									})}
								</p>
							</div>
							<div>
								<p className="font-semibold text-foreground">Endereço:</p>
								<p>{event.address}</p>
							</div>
							{event.description && (
								<div>
									<p className="font-semibold text-foreground">Descrição:</p>
									<p>{event.description}</p>
								</div>
							)}
							{event.coordinators && event.coordinators.length > 0 && (
								<div>
									<p className="font-semibold text-foreground">
										{responsavelLabel}
									</p>
									<ul className="list-inside list-disc">
										{event.coordinators.map((coordinator) => (
											<li key={coordinator}>{coordinator}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</DialogDescription>
				</div>

				<DialogFooter>
					<div className="mx-auto">
						<AddToCalendarButton
							name={event.title}
							description={event.description}
							// A suécia formata a data de uma forma conveniente.
							// O botão não corrige fuso, então se tentar corrigir vai dar errado
							// Deixar assim funciona!
							startDate={ISOdate.toLocaleString("sv-SE").replace(" ", "T")}
							timeZone="currentBrowser"
							location={event.address}
							label="Adicionar à Agenda"
							buttonStyle="simple"
							listStyle="dropup-static"
							lightMode="bodyScheme"
							pastDateHandling="disable"
							hideBranding
							hideBackground
							options={[
								"Google",
								"Apple",
								"iCal",
								"Outlook.com",
								"Microsoft365",
								"MicrosoftTeams",
								"Yahoo",
							]}
						/>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
