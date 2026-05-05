import { CalendarDays, MapPin } from "lucide-react"
import { AddToCalendarButton } from 'add-to-calendar-button-react';
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
  const responsavelLabel = event.coordinators?.length === 1 ? "Responsável:" : "Responsáveis:"
  const ISOdate = new Date(event.date)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm pt-0">
          {event.image && (
            <img src={event.image} alt={event.title} className="aspect-video w-full object-cover object-center" />
          )}
          <CardHeader className="gap-0">
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {ISOdate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit'
              })}
            </span>
            <CardAction>
              <div className="flex gap-1.5">
                {(event.tags?.length ? event.tags : ["Evento"]).map((tag) => (
                  <Badge key={tag} className="w-fit">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardAction>
          </CardHeader>

          <CardContent>
            <CardTitle className="text-sm leading-snug">{event.title}</CardTitle>
          </CardContent>

          <CardFooter className="pt-0 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {event.location}
            </span>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-lg lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {event.image && (
            <div className="hidden overflow-hidden rounded-2xl border border-border/60 bg-muted lg:block">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <DialogDescription>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-foreground">Data:</p>
                <p>
                  {ISOdate.toLocaleString('pt-BR', {
                    dateStyle: 'full',
                    timeStyle: 'short'
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
                  <p className="font-semibold text-foreground">{responsavelLabel}</p>
                  <ul className="list-disc list-inside">
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
              startDate={ISOdate.toLocaleString('sv-SE').replace(' ', 'T')}
              timeZone="currentBrowser"
              location={event.address}
              label="Adicionar à Agenda"
              buttonStyle="simple"
              listStyle="dropup-static"
              lightMode="bodyScheme"
              pastDateHandling="disable"
              hideBranding
              hideBackground
              options={["Google", "Apple", "iCal", "Outlook.com", "Microsoft365", "MicrosoftTeams", "Yahoo"]}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
