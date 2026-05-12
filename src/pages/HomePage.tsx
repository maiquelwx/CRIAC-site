import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Marquee from "@/components/ui/marquee"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import partners from "@/data/partners.json"

function HeroSection() {
	return (
		<section
			id="hero"
			className="animate-in duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] zoom-in-95 fade-in"
		>
			<div className="overflow-hidden rounded-4xl">
				<div className="relative h-128 md:aspect-16/8 md:h-auto">
					<img src="/hero.webp" alt="Hero" className="size-full object-cover" />
					<div className="absolute inset-0 bg-linear-to-r from-background/70 via-background/40 to-transparent" />
					<div className="absolute top-5 right-8 flex items-center gap-2">
						<img src="/Logo-solido.svg" alt="logo" className="h-10 w-10" />
						<span className="font-heading font-medium text-background">
							CRIEC
						</span>
					</div>
					<div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 text-foreground md:p-10">
						<h1 className="max-w-sm font-heading text-3xl leading-tight font-semibold lg:max-w-2xl lg:text-5xl">
							Entender e prever
							<br />
							desastres climáticos.
						</h1>
						<p className="hidden max-w-xl text-foreground/75 md:block md:text-popover-foreground">
							Integrando dados meteorológicos, sociais e de desastres para
							mapear vulnerabilidades, identificar padrões e apoiar a
							resiliência climática no Rio Grande do Sul.
						</p>
						<Button className="w-fit rounded-full px-4" size="lg">
							Acessar painel
							<ArrowRight data-icon="inline-end" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

function SobreProjeto() {
	return (
		<section className="relative md:flex md:gap-3">
			<img
				src="/Logo-outline.svg"
				alt="Logo CRIEC outline"
				className="absolute top-1/2 left-1/2 max-h-full w-screen -translate-1/2 opacity-30 md:static md:translate-0 md:opacity-100"
			/>

			<div className="relative z-10 space-y-5 p-6 text-lg">
				<p>
					Eventos climáticos extremos, como enchentes, secas e ondas de calor,
					estão entre os maiores desafios atuais para a sociedade. No entanto,
					desastres não são causados apenas por esses eventos: eles resultam da
					combinação entre fenômenos climáticos intensos, a exposição de
					populações e infraestruturas ao risco e as vulnerabilidades sociais e
					territoriais existentes. Compreender essa interação é essencial para
					reduzir impactos e salvar vidas.
				</p>
				<p>
					Neste projeto, utilizamos técnicas de inteligência artificial e
					análise de dados para integrar informações meteorológicas, sociais e
					de desastres, com o objetivo de mapear vulnerabilidades, identificar
					padrões e prever riscos futuros, com foco no Rio Grande do Sul.
					Trata-se de uma iniciativa interdisciplinar, envolvendo professores e
					estudantes da UFRGS, UFPel e UFSM, além de colaborações com
					universidades internacionais. O projeto é financiado principalmente
					pela FAPERGS, no âmbito do edital CRIEC 2025, e busca contribuir
					diretamente para o desenvolvimento de políticas públicas mais eficazes
					de adaptação e resiliência climática.
				</p>
			</div>
		</section>
	)
}

function PartnersMarquee() {
	const { theme } = useTheme()
	const themeSuffix =
		theme === "system"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
			: theme

	return (
		<Marquee pauseOnHover fade className="py-4">
			{partners.map((partner) => {
				const [logoSrc, fallbackSrc] =
					themeSuffix === "dark"
						? [partner.darkPath, partner.lightPath]
						: [partner.lightPath, partner.darkPath]
				return (
					<div key={partner.name} className="flex">
						<HoverCard>
							<HoverCardTrigger asChild>
								<img
									src={logoSrc}
									alt={partner.name}
									onError={(event) => {
										const target = event.currentTarget
										target.onerror = null
										target.src = fallbackSrc
									}}
									className="h-36 rounded-2xl p-3 opacity-75 transition-opacity hover:bg-popover hover:opacity-100 md:mx-2"
								/>
							</HoverCardTrigger>
							<HoverCardContent className="w-fit px-3 py-2 font-heading">
								{partner.name}
							</HoverCardContent>
						</HoverCard>
					</div>
				)
			})}
		</Marquee>
	)
}

export function HomePage() {
	return (
		<main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:gap-8 md:px-6 md:py-10">
			<HeroSection />

			<PartnersMarquee />
			<Separator />

			<SobreProjeto />
		</main>
	)
}

export default HomePage
