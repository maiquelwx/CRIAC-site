import { Bell, MoonStar, Search, Settings2, SunMedium } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

const navItems = [
  { label: "Eventos", href: "#events" },
  { label: "Publicacoes", href: "#publications" },
  { label: "Pesquisadores", href: "#members" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()

  const handleScroll = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-4 z-40 mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/85 px-4 py-2 shadow-sm backdrop-blur md:px-6">
      <button className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src="/Logo-solido.svg" alt="CRIEC" className="h-9 w-9" />
        <p className="font-heading text-base font-semibold tracking-tight">CRIEC</p>
      </button>

      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <Button key={item.label} variant="ghost" size="sm" className="rounded-full" onClick={() => handleScroll(item.href)}>
            {item.label}
          </Button>
        ))}
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
