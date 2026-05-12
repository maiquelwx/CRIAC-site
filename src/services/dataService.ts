import type { GeoJsonObject, FeatureCollection } from "geojson"

// Camadas disponíveis 
export interface CamadaConfig {
  id: string
  label: string
  estilo: object
  temporal?: boolean
}

export interface CadUnicoPeriodo {
  id: string
  label: string
  fonte: string
}

export const CAMADAS_DISPONIVEIS: Record<string, CamadaConfig> = {
  municipios: {
    id: "municipios",
    label: "Municípios",
    estilo: {
      color: "#3b82f6",
      weight: 1,
      fillOpacity: 0.15,
    },
  },
  bacias: {
    id: "bacias",
    label: "Bacias Hidrográficas",
    estilo: {
      color: "#10b981",
      weight: 2,
      fillOpacity: 0.2,
    },
  },
  cadunico: {
    id: "cadunico",
    label: "CadÚnico",
    temporal: true,
    estilo: {
      color: "#f59e0b",
      weight: 1,
      fillOpacity: 0.15,
    },
  },
  // Em CAMADAS_DISPONIVEIS, registrar cada uma:
curvas_nivel: {
  id: "curvas_nivel",
  label: "Curvas de Nível",
  estilo: {
    color: "#8b5cf6",
    weight: 1,
    opacity: 0.6,
  },
},
localidades: {
  id: "localidades",
  label: "Localidades",
  estilo: {
    color: "#f43f5e",
    weight: 1,
    fillOpacity: 0.8,
  },
},
area_afetada_2024: {
  id: "area_afetada_2024",
  label: "Área Afetada 2024",
  estilo: {
    color: "#f59e0b",
    weight: 1,  
    fillOpacity: 0.3,
  },
},
}

const CADUNICO_PERIODOS: CadUnicoPeriodo[] = Array.from(
  { length: new Date().getFullYear() - 2012 + 1 },
  (_, i) => {
    const ano = String(new Date().getFullYear() - i)
    return {
      id: ano,
      label: ano,
      fonte: "/data/CadUnico_RS_Completo.geojson",
    }
  }
)

// Em FONTES_LOCAIS, adicionar os novos arquivos .json
const FONTES_LOCAIS: Record<string, string> = {
  municipios:     "/data/Divisão_Municipal_RS.geojson",
  bacias:         "/data/Regiões_Hidrográficas_RS.geojson",
  curvas_nivel:   "/data/curvas_nivel_preview.json",      // MultiLineString
  localidades:    "/data/loc_cidade_p.json",     // Point
  area_afetada_2024: "/data/area_diretamente_atingida_2024.json",   // Polygon
}

// Essa é a única função q o mapa chama
// Quando o DuckDB estiver pronto tem q trocar o fetch por uma chamada API aqui

export function obterPeriodosCadUnico() {
  return CADUNICO_PERIODOS
}

function obterFonteCadUnico(periodo: string) {
  return (
    CADUNICO_PERIODOS.find((item) => item.id === periodo)?.fonte ??
    CADUNICO_PERIODOS[0].fonte
  )
}

export async function fetchCamada(
  id: string,
  periodoCadUnico = CADUNICO_PERIODOS[0].id
): Promise<GeoJsonObject> {
  const url =
    id === "cadunico"
      ? obterFonteCadUnico(periodoCadUnico)
      : FONTES_LOCAIS[id]
  if (!url) throw new Error(`Camada "${id}" não encontrada`)

  // PARA:
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro ao carregar camada "${id}": ${res.status}`)

  const json: FeatureCollection = await res.json()

  // Curvas de nível são muito pesadas — limitando para não travar o browser
  if (id === "curvas_nivel") {
    console.warn(`curvas_nivel: ${json.features.length} features — limitando a 1000 para preview`)
    return { ...json, features: json.features.slice(0, 100) }
  }

  // Para CadÚnico, filtra por ano baseado no atributo "Referencia" (formato "MM/YYYY")
  let filtrado = json
  if (id === "cadunico") {
    filtrado = {
      ...json,
      features: json.features.filter((feature) => {
        const referencia = feature.properties?.Referencia as string
        if (!referencia) return false

        // Extrai o ano do formato "MM/YYYY"
        const ano = referencia.split("/")[1]
        return ano === periodoCadUnico
      }),
    }
    console.log(`CadÚnico ${periodoCadUnico}: ${json.features.length} features → ${filtrado.features.length} filtradas`)
  } else {
    console.log(`Camada "${id}": ${json.features.length} features carregadas`)
  }

  return filtrado
}

