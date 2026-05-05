import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { MemberCard, type Member } from "@/components/member-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const members: Member[] = [
  { title: "Dra.", name: "Amália Garcez", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
  { title: "Dra.", name: "Ana Lúcia Antonioli", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
  { title: "Dra.", name: "Bruna Borba", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Bruno Bulcão", role: "Pesquisador", institution: "UFPEL", area: "A confirmar" },
  { title: "Dra.", name: "Carolina Brito", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Carlos Praia", role: "Pesquisador", institution: "UFPEL", area: "A confirmar" },
  { title: "Dra.", name: "Daniela Buske", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Fernando Silva", role: "Pesquisador", institution: "UNESP/CEMADEN", area: "A confirmar" },
  { title: "Dra.", name: "Fernanda Silva", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Juliano Machado", role: "Pesquisador", institution: "UFRGS", area: "A confirmar" },
  { title: "Dra.", name: "Maitê Azambuja", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Marco Idiart", role: "Pesquisador", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Marcos Perez", role: "Pesquisador", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Raí Nunes", role: "Pesquisador", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Renan Nunes", role: "Pesquisador", institution: "UFRGS", area: "A confirmar" },
  { title: "Dr.", name: "Ricardo Gava", role: "Pesquisador", institution: "UFRGS", area: "A confirmar" },
  { title: "Dra.", name: "Rita Alves", role: "Pesquisadora", institution: "UFRGS", area: "A confirmar" },
]

export function MembersSection() {
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 2800,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  return (
    <section id="members" className="w-full">
      <div className="rounded-4xl border-border/60 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-heading">Pesquisadores</h2>
          <p className="text-sm text-muted-foreground">
            Pesquisadores coordenadores e apresentadores do workshop CRIEC. Funções e áreas serão confirmadas em breve.
          </p>
        </div>
        <Carousel
          className="w-full"
          opts={{ loop: true, dragFree: true, align: "start" }}
          plugins={[autoplayPlugin.current]}
        >
          <CarouselPrevious className="left-2 md:-left-16" />
          <CarouselContent>
            {members.map((member) => (
              <CarouselItem key={member.name} className="basis-[46%] md:basis-[31%] lg:basis-[22%] xl:basis-[18%]">
                <MemberCard member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-background to-transparent md:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-background to-transparent md:w-12" />
          <CarouselNext className="right-2 md:-right-16" />
        </Carousel>
      </div>
    </section>
  )
}
