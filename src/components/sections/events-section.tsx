import { EventCard, type Event } from "@/components/event-card"

const events: Event[] = [
  {
    title: "Desastres: Comunicação e IA em Sistemas de Alerta",
    date: "2026-05-13T14:00:00-03:00",
    location: "Campus do Vale",
    address: "Anfiteatro Antônio Cabral - IF/UFRGS - Campus do Vale",
    image: "/hero.webp",
    tags: ["Workshop"],
    description: "Apresentações sobre proposta de aprimoramento da comunicação em sistemas de alerta antecipado (EWS) e o papel da IA.",
    coordinators: [
      "Fernando Silva (UNESP e CEMADEN)",
      "Raí Nunes (UFRGS)",
      "Maitê Azambuja (UFRGS)",
    ],
  },
  {
    title: "TideSat: Monitoramento de Nível da Água",
    date: "2026-05-14T09:00:00-03:00",
    location: "Campus do Vale",
    address: "Anfiteatro Antônio Cabral - IF/UFRGS - Campus do Vale",
    image: "/hero.webp",
    tags: ["Workshop"],
    description: "Apresentação da empresa TideSat sobre monitoramento de nível da água e aplicações para apoio à previsão hidrológica.",
    coordinators: ["TideSat - empresa de monitoramento de nível da água"],
  },
  {
    title: "Predição do Nível da Água no Rio Guaíba",
    date: "2026-05-14T10:30:00-03:00",
    location: "Campus do Vale",
    address: "Anfiteatro Antônio Cabral - IF/UFRGS - Campus do Vale",
    image: "/hero.webp",
    tags: ["Workshop"],
    description: "Sessão sobre modelos de predição do nível da água e infraestrutura de processamento de dados para apoio à previsão hidrológica.",
    coordinators: [
      "Juliano Almeida Machado (UFRGS)",
      "Carlos Henrique Moraes Praia (UFPEL)",
      "Daniela Buske",
    ],
  },
  {
    title: "Modelos de Machine Learning para Temperatura e Precipitação",
    date: "2026-05-14T14:00:00-03:00",
    location: "Campus do Vale",
    address: "Anfiteatro Antônio Cabral - IF/UFRGS - Campus do Vale",
    image: "/hero.webp",
    tags: ["Workshop"],
    description: "Sessão dedicada à previsão de temperatura e precipitação com redes neurais e outros modelos de aprendizado de máquina.",
    coordinators: [
      "Marcos Perez (UFRGS)",
      "Ana Lúcia Antonioli (UFRGS)",
      "Renan Nunes (UFRGS)",
    ],
  },
  {
    title: "Eventos Climáticos Extremos e Dashboard",
    date: "2026-05-15T09:00:00-03:00",
    location: "Campus do Vale",
    address: "Anfiteatro Antônio Cabral - IF/UFRGS - Campus do Vale",
    image: "/hero.webp",
    tags: ["Workshop"],
    description: "Apresentações sobre eventos climáticos extremos, técnicas de detecção e demonstração do dashboard do projeto.",
    coordinators: [
      "Fernanda Batista da Silva (UFRGS)",
      "Amália Garcez (UFRGS)",
      "Bruno Coelho Bulcão (UFPEL)",
      "Ricardo Gava Jr",
    ],
  },
  {
    title: "Entre Muros: Desastres, Memórias e Águas",
    date: "2026-05-16T09:00:00-03:00",
    location: "Mercado Público",
    address: "Centro Histórico de Porto Alegre - Mercado Público",
    image: "/hero.webp",
    tags: ["Visita guiada"],
    description: "Percurso guiado pelo Centro Histórico de Porto Alegre sobre memória das enchentes, infraestrutura de contenção e leitura territorial da cidade.",
    coordinators: ["Raí Nunes dos Santos (Geógrafo, Dr. em Geografia - UFRGS)"],
  },
]

export function EventsSection() {
  return (
    <section id="events" className="w-full">
      <div className="rounded-4xl border-border/60 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-heading">Workshop CRIEC/FAPERGS</h2>
          <p className="text-sm text-muted-foreground">
            Primeiro workshop do projeto "Eventos Climáticos e Desastres no RS: Caracterização e Predição com IA" de 13 a 16 de maio de 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {events.map((event) => <EventCard key={event.title} event={event} />)}
        </div>
      </div>
    </section>
  )
}
