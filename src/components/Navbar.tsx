import { Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu"

function DeskNav() {
	return (
		<NavigationMenu
			viewport={false}
			className="hidden items-center gap-1 md:flex"
		>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link to="/">Home</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>Atividades</NavigationMenuTrigger>
					<NavigationMenuContent className="min-w-56 p-2">
						<NavigationMenuLink asChild>
							<Link to="/atividades/i-workshop-criec">I Workshop CRIEC</Link>
						</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem hidden>
					<NavigationMenuLink asChild>
						<Link to="/publicacoes">Publicações</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem hidden>
					<NavigationMenuTrigger>Linhas de Pesquisa</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink asChild>
							<Link to="/linhas/previsoes">Previsões</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link to="/linhas/desastres">Desastres</Link>
						</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuLink asChild>
					<Link to="/equipe">Equipe</Link>
				</NavigationMenuLink>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export function Navbar() {
	const { theme, setTheme } = useTheme()

	return (
		<header className="sticky top-4 z-40 mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/75 px-4 py-2 shadow-sm backdrop-blur md:px-6">
			<Button asChild variant="ghost" className="h-auto">
				<Link to="/" className="flex items-center gap-2">
					<img src="/Logo-solido.svg" alt="CRIEC" className="h-10 w-10" />
					<p className="font-heading text-base font-semibold tracking-tight">
						CRIEC
					</p>
				</Link>
			</Button>

			{/* Desktop */}
			<DeskNav />

			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="icon-sm"
					className="rounded-full"
					aria-label="Alternar tema"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				>
					{theme === "dark" ? (
						<Sun className="size-4" />
					) : (
						<Moon className="size-4" />
					)}
				</Button>
			</div>
		</header>
	)
}
