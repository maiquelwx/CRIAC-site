import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { DashboardMap } from "./map/DashboardMap"
import { LayerMenu } from "./map/LayerMenu"
import { obterPeriodosCadUnico } from "@/services/dataService"

const CONFIG = {
  clima: {
    label: "Clima",
    camadasIniciais: ["bacias"],
  },
  vulnerabilidade: {
    label: "Vulnerabilidade",
    camadasIniciais: ["municipios", "cadunico"],
  },
  desastres: {
    label: "Desastres",
    camadasIniciais: ["municipios", "area_afetada_2024"],
  },
} as const

type ViewKey = keyof typeof CONFIG

export function DashboardPage() {
  const [searchParams] = useSearchParams()
  const view = (searchParams.get("view") ?? "clima") as ViewKey
  const config = CONFIG[view] ?? CONFIG.clima

  const [slots, setSlots] = useState<string[]>([...config.camadasIniciais])
  const [opacidadeCamadas, setOpacidadeCamadas] = useState(0.5)
  const [periodoCadUnico, setPeriodoCadUnico] = useState(
    () => obterPeriodosCadUnico()[0].id
  )

  function setSlot(slot: number, id: string) {
    setSlots((ant) => {
      const novo = [...ant]
      novo[slot] = id
      return novo
    })
  }

  function limparSlot(slot: number) {
    setSlots((ant) => {
      const novo = [...ant]
      novo[slot] = ""
      return novo
    })
  }

  return (
    <div className="flex h-svh flex-col">

      {/* Cabeçalho da página — título da view ativa (clima, vulnerabilidade, desastres) */}
      <header className="flex items-center gap-4 z-[1000] border-b px-6 py-3">
      </header>

      {/* Área de trabalho — mapa ocupa o espaço restante, menu flutua sobre ele */}
      <main className="relative flex-1 isolate">
        <DashboardMap
          camadas={slots.filter(Boolean)}
          opacidade={opacidadeCamadas}
          periodoCadUnico={periodoCadUnico}
        />
        <LayerMenu
          slots={slots}
          onSetSlot={setSlot}
          onLimparSlot={limparSlot}
          opacidade={opacidadeCamadas}
          onOpacityChange={setOpacidadeCamadas}
          periodoCadUnico={periodoCadUnico}
          periodosCadUnico={obterPeriodosCadUnico()}
          onPeriodoCadUnicoChange={setPeriodoCadUnico}
        />
      </main>

    </div>
  )
}

export default DashboardPage