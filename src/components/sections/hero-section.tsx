import { ArrowRight } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="hero" className="w-full">
      <div className="overflow-hidden rounded-4xl bg-card/90 py-0">
        <AspectRatio ratio={16 / 8}>
          <img src="/hero.webp" alt="Hero" className="size-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute right-6 top-6 flex items-center gap-3">
            <img src="/Logo-solido.svg" alt="logo" className="h-10 w-10" />
            <span className="text-white/90 font-medium">CRIEC</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 text-white md:p-10">
            <Badge className="w-fit rounded-full bg-primary/85 px-3">Monitoramento em tempo real</Badge>
            <h1 className="max-w-2xl font-heading text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
              Inteligência Artificial para Eventos Climáticos e Desastres.
            </h1>
            <p className="hidden max-w-xl text-sm text-white/85 md:block md:text-base">
              Caracterização e predição de desastres climáticos no Rio Grande do Sul usando IA, modelos numéricos e inteligência territorial para aumentar a resiliência local.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full px-6" size="lg">
                Acessar painel
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/40 bg-white/12 px-6 text-white hover:bg-white/20 hover:text-white">
                Relatorios recentes
              </Button>
            </div>
          </div>
        </AspectRatio>
      </div>
    </section>
  )
}
