import { Bell, MoonStar, Search, Settings2, SunMedium } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-4 z-40 mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/85 px-4 py-2 shadow-sm backdrop-blur md:px-6">
      <Button asChild variant="ghost" className="h-auto rounded-full px-2 py-1 hover:bg-transparent">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img src="/Logo-solido.svg" alt="CRIEC" className="h-9 w-9" />
          <p className="font-heading text-base font-semibold tracking-tight">CRIEC</p>
        </Link>
      </Button>

      <nav className="hidden items-center gap-1 md:flex">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link to="/equipe">Equipe</Link>
        </Button>
      </nav>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label="Alternar tema"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
        </Button>
        <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Buscar">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Notificacoes">
          <Bell className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Configuracoes">
          <Settings2 className="size-4" />
        </Button>
        <Button size="sm" className="ml-1 rounded-full px-4">
          Entrar
        </Button>
      </div>
    </header>
  )
}
