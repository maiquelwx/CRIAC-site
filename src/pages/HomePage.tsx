import { EventsSection } from "@/components/sections/events-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PublicationsSection } from "@/components/sections/publications-section";

export function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:gap-8 md:px-6 md:py-10">
      <HeroSection />
      <EventsSection />
      <PublicationsSection />
    </main>
  )
};

export default HomePage;