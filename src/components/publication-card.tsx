import { CalendarDays, ExternalLink, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface Publication {
  title: string
  description: string
  authors: string
  year: number
  journal?: string
  category?: string
  doi?: string
}

interface PublicationCardProps {
  publication: Publication
}

export function PublicationCard({ publication }: PublicationCardProps) {

  return (
    <Card className="group h-88 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          {publication.category && (
            <Badge className="rounded-full px-2.5 py-0.5 text-[11px]">
              {publication.category}
            </Badge>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {publication.year}
          </span>
        </div>

        <CardTitle className="text-sm leading-snug">{publication.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <CardDescription className="line-clamp-5 flex-1 overflow-hidden text-sm leading-relaxed">
          {publication.description}
        </CardDescription>
        <p className="inline-flex items-start gap-1.5 text-xs text-muted-foreground">
          <Users className="mt-0.5 size-3.5 shrink-0" />
          {publication.authors}
        </p>
      </CardContent>

      <CardFooter className="mt-auto border-t border-border/60 p-5! pb-0! flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="truncate">{publication.journal ?? "Preprint em avaliacao"}</span>
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/80"
          >
            DOI
            <ExternalLink className="size-3" />
          </a>
        )}
      </CardFooter>
    </Card>
  )
}