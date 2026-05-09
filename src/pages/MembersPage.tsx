import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { MembersSection } from "@/components/sections/members-section"
import { Button } from "@/components/ui/button"

export function MembersPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:gap-8 md:px-6 md:py-10">
      <section className="rounded-4xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Equipe</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">Pesquisadores</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              Esta página reúne os pesquisadores do CRIEC em um espaço dedicado, para facilitar leitura, compartilhamento e futuras atualizações.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-full">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Voltar para a home
            </Link>
          </Button>
        </div>
      </section>

      <MembersSection />
    </main>
  )
}

export default MembersPage