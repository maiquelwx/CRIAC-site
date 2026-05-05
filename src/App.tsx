import { EventsSection } from "@/components/sections/events-section"
import { HeroSection } from "@/components/sections/hero-section"
import { MembersSection } from "@/components/sections/members-section"
import { Navbar } from "@/components/sections/navbar"
import { PublicationsSection } from "@/components/sections/publications-section"

export function App() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-chart-2/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-chart-3/14 blur-3xl" />
      </div>

      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:gap-8 md:px-6 md:py-10">
        <HeroSection />
        <EventsSection />
        <PublicationsSection />
        <MembersSection />
      </main>
    </div>
  )
}

export default App
