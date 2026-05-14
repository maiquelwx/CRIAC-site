import { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import { useMap } from "react-leaflet"
import type { GeoJsonObject, FeatureCollection } from "geojson"
import { fetchCamada, CAMADAS_DISPONIVEIS } from "@/services/dataService"
import L from "leaflet"

interface DashboardMapProps {
  camadas: string[]
  opacidade: number
  periodoCadUnico: string
}

// Legenda para CadÚnico
const LegendaCadUnico = () => (
  <div className="absolute bottom-4 left-4 z-[1000] rounded-lg bg-background/90 p-3 shadow-md backdrop-blur">
    <div className="text-xs font-semibold text-muted-foreground mb-2">Faixa de Renda</div>
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <div className="w-4 h-3 rounded" style={{ backgroundColor: "#f3f4f6" }}></div>
        <span className="text-xs">Sem dados</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-3 rounded" style={{ backgroundColor: "#10b981" }}></div>
        <span className="text-xs">Baixa (&lt; 15%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-3 rounded" style={{ backgroundColor: "#f59e0b" }}></div>
        <span className="text-xs">Média (15-25%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-3 rounded" style={{ backgroundColor: "#ef4444" }}></div>
        <span className="text-xs">Alta (&gt; 25%)</span>
      </div>
    </div>
  </div>
)

export function DashboardMap({ camadas, opacidade, periodoCadUnico }: DashboardMapProps) {

const [dados, setDados] = useState<Record<string, GeoJsonObject>>({})
const [carregando, setCarregando] = useState<Record<string, boolean>>({})
const [erros, setErros] = useState<Record<string, boolean>>({})
const [renderKey, setRenderKey] = useState(0)

function carregarCamada(id: string, key: string) {
  setCarregando((ant) => ({ ...ant, [key]: true }))
  fetchCamada(id, periodoCadUnico)
    .then((json) => {
      setDados((ant) => ({ ...ant, [key]: json }))
    })
    .catch((err) => {
      console.error(`Erro ao carregar camada "${id}" (key="${key}"):`, err)
      setErros((ant) => ({ ...ant, [key]: true }))
    })
    .finally(() => {
      setCarregando((ant) => ({ ...ant, [key]: false }))
    })
}

useEffect(() => {
  // Carregar camadas visíveis
  camadas.forEach((id) => {
    const key = id === "cadunico" ? `${id}:${periodoCadUnico}` : id
    if (dados[key] || carregando[key] || erros[key]) return
    carregarCamada(id, key)
  })

  // Carregar municípios implicitamente se bacias + cadunico estão selecionadas
  if (camadas.includes("bacias") && camadas.includes("cadunico") && !dados["municipios"] && !carregando["municipios"] && !erros["municipios"]) {
    carregarCamada("municipios", "municipios")
  }

    // Se municipios + cadunico estão selecionadas, criar visualização combinada por município
    if (camadas.includes("municipios") && camadas.includes("cadunico")) {
      const keyMunicipios = "municipios"
      const keyCadUnico = `cadunico:${periodoCadUnico}`
      const keyCombinado = `combinado:${periodoCadUnico}`

      if (dados[keyMunicipios] && dados[keyCadUnico] && !dados[keyCombinado] && !carregando[keyCombinado]) {
        setCarregando((ant) => ({ ...ant, [keyCombinado]: true }))

        const municipios = dados[keyMunicipios] as FeatureCollection
        const cadunico = dados[keyCadUnico] as FeatureCollection

        // Criar mapa de CD_MUN para dados do CadÚnico para eficiência
        const cadUnicoMap: Record<string, any> = {}
        cadunico.features.forEach((feature: any) => {
          const cdMun = feature.properties?.codarea
          if (cdMun) {
            cadUnicoMap[String(cdMun)] = feature.properties
          }
        })

        // Combinar: geometria dos municípios com dados do CadÚnico
        const combinado: FeatureCollection = {
          type: "FeatureCollection",
          features: municipios.features
            .map((municipio: any) => {
              const cdMun = municipio.properties?.CD_MUN
              const dadosCadUnico = cadUnicoMap[String(cdMun)]
              return dadosCadUnico ? {
                ...municipio,
                properties: {
                  ...municipio.properties,
                  ...dadosCadUnico,
                },
              } : null
            })
            .filter(Boolean), // Remove nulls
        }

        setDados((ant) => ({ ...ant, [keyCombinado]: combinado }))
        setCarregando((ant) => ({ ...ant, [keyCombinado]: false }))
      }
    }

    // Se bacias + cadunico estão selecionadas, criar visualização combinada por bacia
    if (camadas.includes("bacias") && camadas.includes("cadunico")) {
      const keyBacias = "bacias"
      const keyMunicipios = "municipios"
      const keyCadUnico = `cadunico:${periodoCadUnico}`
      const keyCombinado = `bacias_combinado:${periodoCadUnico}`

      // Precisamos de municípios para fazer o mapeamento CadÚnico → Município → Bacia
      if (dados[keyBacias] && dados[keyMunicipios] && dados[keyCadUnico] && !dados[keyCombinado] && !carregando[keyCombinado]) {
        setCarregando((ant) => ({ ...ant, [keyCombinado]: true }))

        const bacias = dados[keyBacias] as FeatureCollection
        const municipios = dados[keyMunicipios] as FeatureCollection
        const cadunico = dados[keyCadUnico] as FeatureCollection

        // Função para verificar se um ponto está dentro de um polígono (ray casting)
        function pointInPolygon(point: [number, number], polygonCoords: any): boolean {
          // Para Polygon: coordinates = [[ring]]
          // Para MultiPolygon: coordinates = [[[ring1]], [[ring2]]]
          let rings: number[][][] = []
          if (Array.isArray(polygonCoords[0][0][0])) {
            // MultiPolygon
            rings = polygonCoords.flat()
          } else {
            // Polygon
            rings = polygonCoords
          }

          const [x, y] = point
          let inside = false
          for (const ring of rings) {
            let j = ring.length - 1
            for (let i = 0; i < ring.length; i++) {
              const [xi, yi] = ring[i]
              const [xj, yj] = ring[j]
              if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
                inside = !inside
              }
              j = i
            }
          }
          return inside
        }

        // Criar mapa: CD_MUN -> baciaNome
        const municipioBacia: Record<string, string> = {}
        municipios.features.forEach((mun: any) => {
          const cdMun = mun.properties?.CD_MUN
          if (!cdMun) return

          // Calcular centroide aproximado do município (média das coordenadas)
          const coords = mun.geometry?.coordinates
          if (!coords || coords.length === 0) return

          let totalLat = 0, totalLng = 0, count = 0
          const traverse = (arr: any) => {
            if (Array.isArray(arr[0]) && typeof arr[0][0] === 'number') {
              arr.forEach(([lng, lat]: [number, number]) => {
                totalLat += lat
                totalLng += lng
                count++
              })
            } else {
              arr.forEach(traverse)
            }
          }
          traverse(coords)

          if (count === 0) return
          const centroide: [number, number] = [totalLng / count, totalLat / count]

          // Verificar qual bacia contém o centroide
          for (const bacia of bacias.features) {
            const baciaCoords = bacia.geometry?.coordinates
            if (baciaCoords && pointInPolygon(centroide, baciaCoords)) {
              municipioBacia[cdMun] = bacia.properties?.regiao || 'Desconhecida'
              break
            }
          }
        })


        const estatisticasPorBacia: Record<string, any> = {}

        // Agrupar CadÚnico por município para evitar duplicação
        const cadunicoPorMunicipio: Record<string, any> = {}
        cadunico.features.forEach((feature: any) => {
          const cdMun = feature.properties?.codarea
          if (!cdMun || cadunicoPorMunicipio[cdMun]) return // Skip duplicatas
          cadunicoPorMunicipio[cdMun] = feature.properties
        })

        // Contar populações por bacia
        Object.entries(cadunicoPorMunicipio).forEach(([cdMun, props]: [string, any]) => {
          const baciaNome = municipioBacia[cdMun] || "Desconhecida"

          if (!estatisticasPorBacia[baciaNome]) {
            estatisticasPorBacia[baciaNome] = {
              municipios: 0,
              populacaoTotal: 0,
              faixa1Total: 0,
              faixa1e2Total: 0,
              taxas: []
            }
          }

          const stats = estatisticasPorBacia[baciaNome]
          stats.municipios += 1
          stats.populacaoTotal += props.Populacao || 0
          stats.faixa1Total += props.Faixa_1 || 0
          stats.faixa1e2Total += props.Faixa_1_e_2 || 0
          stats.taxas.push(props.Taxa_Faixa_1_e_2 || 0)
        })

        // Calcular médias por bacia
        Object.keys(estatisticasPorBacia).forEach(baciaNome => {
          const stats = estatisticasPorBacia[baciaNome]
          stats.taxaMediaFaixa1e2 = stats.taxas.length > 0 ? stats.taxas.reduce((a: number, b: number) => a + b, 0) / stats.taxas.length : 0
          stats.taxaFaixa1Media = stats.populacaoTotal > 0 ? (stats.faixa1Total / stats.populacaoTotal) * 100 : 0
        })

        // Combinar com geometria das bacias
        const combinado: FeatureCollection = {
          type: "FeatureCollection",
          features: bacias.features.map((bacia: any) => {
            const baciaNome = bacia.properties?.regiao
            const stats = estatisticasPorBacia[baciaNome] || {
              municipios: 0,
              populacaoTotal: 0,
              taxaMediaFaixa1e2: 0,
              faixa1Total: 0,
              faixa1e2Total: 0,
            }

            return {
              ...bacia,
              properties: {
                ...bacia.properties,
                municipios: stats.municipios,
                populacaoTotal: stats.populacaoTotal,
                taxaMediaFaixa1e2: stats.taxaMediaFaixa1e2,
                faixa1Total: stats.faixa1Total,
                faixa1e2Total: stats.faixa1e2Total,
              },
            }
          }),
        }

        setDados((ant) => ({ ...ant, [keyCombinado]: combinado }))
        setRenderKey(k => k + 1)
        setCarregando((ant) => ({ ...ant, [keyCombinado]: false }))
      }
    }
  }, [camadas, periodoCadUnico, dados, carregando])


function ZoomControl() {
  const map = useMap()

  return (
    <div className="absolute bottom-1/2 left-4 z-[1000] flex flex-col gap-1">
      <button
        onClick={() => map.zoomIn()}
        className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background/95 shadow-md backdrop-blur transition hover:bg-muted"
        aria-label="Aproximar"
      >
        <span className="text-base leading-none">+</span>
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background/95 shadow-md backdrop-blur transition hover:bg-muted"
        aria-label="Afastar"
      >
        <span className="text-base leading-none">−</span>
      </button>
    </div>
  )
}

  function estiloCamada(id: string, feature?: any): any {
  // Para CadÚnico ou visualização combinada, estilo baseado na taxa de pobreza
  if ((id === "cadunico" || id === "combinado" || id === "bacias_combinado") && feature?.properties) {
      const taxa = id === "bacias_combinado" ? feature.properties.taxaMediaFaixa1e2 : feature.properties.Taxa_Faixa_1_e_2

      // Se não há dados do CadÚnico, usar cor neutra
      if (taxa === undefined || taxa === null) {
        return {
          color: "#6b7280",
          weight: 0.5,
          fillColor: "#f3f4f6",
          fillOpacity: 0.3 * opacidade,
          opacity: opacidade,
        }
      }

      // Escala de cores baseada na taxa de pobreza
      let color = "#10b981" // verde baixa
      if (taxa >= 15 && taxa <= 25) color = "#f59e0b" // amarelo média
      if (taxa > 25) color = "#ef4444" // vermelho alta

      return {
        color: "#000000",
        weight: 0.5,
        fillColor: color,
        fillOpacity: 0.9 * opacidade,
        opacity: opacidade,
      }
    }

    // Estilo padrão para outras camadas
    const config = CAMADAS_DISPONIVEIS[id]
    if (!config) return {
      color: "#3388ff",
      weight: 0.5,
      fillOpacity: 0.3 * opacidade,
      opacity: opacidade,
    }

    const estilo = config.estilo as {
      color?: string
      weight?: number
      fillOpacity?: number
      opacity?: number
    }

    return {
      ...estilo,
      fillOpacity: (estilo.fillOpacity ?? 0.3) * opacidade,
      opacity: estilo.opacity ?? opacidade,
    }
  }

  const estaCarregando = Object.values(carregando).some(Boolean)
  const camadasComErro = Object.entries(erros).filter(([, v]) => v).map(([k]) => k)
  return (
    <div className="relative h-full w-full">

      {/* Toast de carregamento — flutuante, aparece enquanto GeoJSON carrega */}
      {estaCarregando && (
        <div className="absolute top-4 left-1/2 z-[1000] -translate-x-1/2 rounded-full bg-background/90 px-4 py-2 text-sm shadow-md">
          Carregando camadas...
        </div>
      )}
      
      
      {camadasComErro.length > 0 && (
        <div className="absolute top-14 left-1/2 z-[1000] -translate-x-1/2 rounded-full bg-red-500/90 px-4 py-2 text-sm text-white shadow-md">
          Erro ao carregar: {camadasComErro.join(", ")} — veja o console (F12)
        </div>
      )}

      {/* Legenda do CadÚnico — aparece quando a camada está ativa */}
      {camadas.includes("cadunico") && <LegendaCadUnico />}

      {/* Mapa Leaflet com camadas GeoJSON ativas */}
      <MapContainer
        center={[-30.0, -51.0]}
        zoom={7}
        className="h-full w-full border-0 outline-none"
        zoomControl={false}
      >
        <ZoomControl />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {camadas.includes("municipios") && camadas.includes("cadunico") ? (
          // Visualização combinada municípios + cadunico
          (() => {
            const keyCombinado = `combinado:${periodoCadUnico}`
            return dados[keyCombinado] ? (
              <GeoJSON
                key={keyCombinado}
                data={dados[keyCombinado]}
                style={(feature) => estiloCamada("cadunico", feature)}
                onEachFeature={(feature, layer) => {
                  if (feature.properties) {
                    const props = feature.properties
                    const municipioNome = props.NM_MUN || props.Municipio
                    const populacao = props.Populacao
                    const faixa1 = props.Faixa_1
                    const taxaFaixa1 = props.Taxa_Faixa_1
                    const faixa1e2 = props.Faixa_1_e_2
                    const taxaFaixa1e2 = props.Taxa_Faixa_1_e_2

                    let tooltip = `<b>${municipioNome}</b>`

                    if (populacao !== undefined) {
                      tooltip += `<br/>População: ${populacao.toLocaleString()}`
                    }

                    if (faixa1 !== undefined && taxaFaixa1 !== undefined) {
                      tooltip += `<br/>Faixa 1: ${faixa1} (${taxaFaixa1.toFixed(1)}%)`
                    }

                    if (faixa1e2 !== undefined && taxaFaixa1e2 !== undefined) {
                      tooltip += `<br/>Faixa 1+2: ${faixa1e2} (${taxaFaixa1e2.toFixed(1)}%)`
                    } else {
                      tooltip += `<br/><i>Sem dados do CadÚnico</i>`
                    }

                    layer.bindTooltip(tooltip)
                  }
                }}
              />
            ) : null
          })()
        ) : camadas.includes("bacias") && camadas.includes("cadunico") ? (
          // Visualização combinada bacias + cadunico
          (() => {
            const keyCombinado = `bacias_combinado:${periodoCadUnico}`
            return dados[keyCombinado] ? (
              <GeoJSON
                key={`${keyCombinado}-${renderKey}`}
                data={dados[keyCombinado]}
                style={(feature) => estiloCamada("bacias_combinado", feature)}
                onEachFeature={(feature, layer) => {
                  // Forçar aplicação do estilo após renderização
                  if (layer.setStyle) {
                    const estilo = estiloCamada("bacias_combinado", feature)
                    layer.setStyle(estilo)
                  }
                  
                  if (feature.properties) {
                    const props = feature.properties
                    const tooltip = `
                      <b>Bacia ${props.regiao}</b><br/>
                      Municípios: ${props.municipios || 0}<br/>
                      População total: ${(props.populacaoTotal || 0).toLocaleString()}<br/>
                      Taxa média pobreza: ${(props.taxaMediaFaixa1e2 || 0).toFixed(1)}%<br/>
                      Famílias Faixa 1+2: ${props.faixa1e2Total || 0}
                    `
                    layer.bindTooltip(tooltip)
                  }
                }}
              />
            ) : null
          })()
        ) : (
          // Visualização separada das camadas
          camadas.map((id) => {
            const key = id === "cadunico" ? `${id}:${periodoCadUnico}` : id
            return dados[key] ? (
              <GeoJSON
                key={key}
                data={dados[key]}
                style={(feature) => estiloCamada(id, feature)}
                pointToLayer={(feature, latlng) => {
                  // Renderiza pontos como círculos (estilizáveis via style())
                  return L.circleMarker(latlng, {
                    radius: 3,
                    ...estiloCamada(id, feature),
                  })
                }}
                onEachFeature={id === "cadunico" ? (feature, layer) => {
                  if (feature.properties) {
                    const props = feature.properties
                    const tooltip = `
                      <b>${props.Municipio}</b><br/>
                      População: ${props.Populacao?.toLocaleString()}<br/>
                      Faixa 1: ${props.Faixa_1} (${props.Taxa_Faixa_1?.toFixed(1)}%)<br/>
                      Faixa 1+2: ${props.Faixa_1_e_2} (${props.Taxa_Faixa_1_e_2?.toFixed(1)}%)
                    `
                    layer.bindTooltip(tooltip)
                  }
                } : undefined}
              />
            ) : null
          })
        )}
      </MapContainer>

    </div>
  )
}