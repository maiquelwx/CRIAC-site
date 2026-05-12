import { CAMADAS_DISPONIVEIS } from "@/services/dataService"

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface CadUnicoPeriodo {
  id: string
  label: string
}

interface LayerMenuProps {
  slots: string[]                          // array de até 3 ids, ex: ["municipios", "bacias", ""]
  onSetSlot: (slot: number, id: string) => void
  onLimparSlot: (slot: number) => void
  opacidade: number
  onOpacityChange: (value: number) => void
  periodoCadUnico: string
  periodosCadUnico: CadUnicoPeriodo[]
  onPeriodoCadUnicoChange: (periodo: string) => void
}

// Subcomponentes
/** Slider de transparência global das camadas */
function OpacitySlider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>Transparência</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <input
        type="range"
        min={0.2}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  )
}

/** Seletor de período temporal para a camada CadÚnico */
function CadUnicoPeriodSelector({
  value,
  options,
  onChange,
  disabled,
}: {
  value: string
  options: CadUnicoPeriodo[]
  onChange: (v: string) => void
  disabled: boolean
}) {
  return (
    <div className="mb-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>Período CadÚnico</span>
        <span className="text-[11px] text-slate-600">
          {disabled ? "inativo" : "ativo"}
        </span>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        {options.map((periodo) => (
          <option key={periodo.id} value={periodo.id}>
            {periodo.label}
          </option>
        ))}
      </select>
      <p className="text-[11px] text-slate-500">
        Selecione o ano dos dados do CadÚnico para visualizar.
      </p>
    </div>
  )
}

// Camadas de base (slot 0) — divisões territoriais e relevo
const IDS_BASE = ["municipios", "bacias", "curvas_nivel"]

/** 3 selects de camada — slot 0 só mostra bases, slots 1-2 mostram as demais */
function LayerSelects({
  slots,
  onSet,
  onLimpar,
}: {
  slots: string[]
  onSet: (slot: number, id: string) => void
  onLimpar: (slot: number) => void
}) {
  const todasCamadas = Object.values(CAMADAS_DISPONIVEIS)
  const camadasBase      = todasCamadas.filter((c) =>  IDS_BASE.includes(c.id))
  const camadasTematicas = todasCamadas.filter((c) => !IDS_BASE.includes(c.id))

  return (
    <div className="mb-4 flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        Camadas
      </p>
      {[0, 1, 2].map((slot) => {
        const valorAtual = slots[slot] ?? ""
        const outrosSlots = slots.filter((_, i) => i !== slot)

        // Slot 0 → só bases; slots 1-2 → só temáticas
        const pool = slot === 0 ? camadasBase : camadasTematicas
        const opcoesFiltradas = pool.filter((c) => !outrosSlots.includes(c.id))

        const corAtual = valorAtual
          ? ((CAMADAS_DISPONIVEIS[valorAtual]?.estilo as any)?.color ?? "#94a3b8")
          : "#e2e8f0"

        return (
          <div key={slot} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full transition-colors"
              style={{ backgroundColor: corAtual }}
            />
            <select
              value={valorAtual}
              onChange={(e) => {
                if (e.target.value === "") onLimpar(slot)
                else onSet(slot, e.target.value)
              }}
              className="flex-1 rounded-lg border border-slate-200 bg-white/90 px-2 py-1.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">— nenhuma —</option>
              {opcoesFiltradas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        )
      })}
    </div>
  )
}

// Componente principal do menu lateral de camadas 
export function LayerMenu({
  slots,
  onSetSlot,
  onLimparSlot,
  opacidade,
  onOpacityChange,
  periodoCadUnico,
  periodosCadUnico,
  onPeriodoCadUnicoChange,
}: LayerMenuProps) {
  const cadunicoAtivo = slots.includes("cadunico")

  return (
    <aside className="absolute bottom-8 right-4 z-[1000] w-72 rounded-xl border bg-background/95 p-3 shadow-md backdrop-blur">

      {/* 1. Seleção de camadas — 3 slots */}
      <section aria-label="Camadas">
        <LayerSelects
          slots={slots}
          onSet={onSetSlot}
          onLimpar={onLimparSlot}
        />
      </section>

      {/* 2. Controle de opacidade global */}
      <section aria-label="Opacidade das camadas">
        <OpacitySlider value={opacidade} onChange={onOpacityChange} />
      </section>

      {/* 3. Seleção de período para a camada CadÚnico */}
      <section aria-label="Período CadÚnico">
        <CadUnicoPeriodSelector
          value={periodoCadUnico}
          options={periodosCadUnico}
          onChange={onPeriodoCadUnicoChange}
          disabled={!cadunicoAtivo}
        />
      </section>

    </aside>
  )
}