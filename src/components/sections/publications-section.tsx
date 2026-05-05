import { PublicationCard, type Publication } from "@/components/publication-card"

const publications: Publication[] = [
  {
    title: "Predicao de precipitacao extrema com redes neurais em multiplas escalas",
    description: "Avaliacao de arquitetura hibrida para previsao de chuva intensa com dados de satelite, estacoes e reanalise.",
    authors: "A. Garcez, M. Perez, R. Nunes",
    year: 2026,
    journal: "Revista Brasileira de Meteorologia",
    category: "ML Climatico",
    doi: "10.1000/rbm.2026.001",
  },
  {
    title: "Caracterizacao de ciclones extratropicais no sul do Brasil (1980-2025)",
    description: "Serie historica com tipificacao sinotica e analise de impactos em infraestrutura urbana e agricola.",
    authors: "F. Silva, C. Praia, D. Buske",
    year: 2025,
    journal: "Climate Dynamics",
    category: "Ciclones",
    doi: "10.1000/cdyn.2025.127",
  },
  {
    title: "Indice composto para monitoramento de seca meteorologica e hidrologica",
    description: "Proposta de indice multivariado para monitoramento continuo de seca com foco em tomada de decisao local.",
    authors: "B. Bulcao, J. Machado, C. Brito",
    year: 2026,
    journal: "Water Resources Management",
    category: "Seca",
    doi: "10.1000/wrm.2026.044",
  },
  {
    title: "Nowcasting de inundacoes urbanas com fusao de radar e IoT",
    description: "Modelo de curto prazo para alerta antecipado de transbordamento em bacias urbanas de Porto Alegre.",
    authors: "R. Gava, A. Antonioli, F. Silva",
    year: 2026,
    journal: "Natural Hazards",
    category: "Precipitacao extrema",
    doi: "10.1000/nhaz.2026.078",
  },
]

export function PublicationsSection() {
  return (
    <section id="publications" className="w-full">
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-lg font-heading">Publicacoes (sessao de teste)</h2>
          <p className="text-sm text-muted-foreground">
            Cartoes de publicacoes para validacao visual do layout. Conteudo ficticio usado apenas para avaliacao.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {publications.map((publication) => (
            <PublicationCard key={publication.title} publication={publication} />
          ))}
        </div>
      </div>
    </section>
  )
}