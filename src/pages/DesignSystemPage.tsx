// DesignSystemPage.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const surfaces = [
	{
		name: "background",
		bg: "bg-background",
		text: "text-foreground",
	},
	{
		name: "card",
		bg: "bg-card",
		text: "text-card-foreground",
	},
	{
		name: "popover",
		bg: "bg-popover",
		text: "text-popover-foreground",
	},
	{
		name: "muted",
		bg: "bg-muted",
		text: "text-muted-foreground",
	},
	{
		name: "primary",
		bg: "bg-primary",
		text: "text-primary-foreground",
	},
	{
		name: "secondary",
		bg: "bg-secondary",
		text: "text-secondary-foreground",
	},
	{
		name: "accent",
		bg: "bg-accent",
		text: "text-accent-foreground",
	},
	{
		name: "destructive",
		bg: "bg-destructive",
		text: "text-white",
	},
]

const charts = [
	"bg-chart-1",
	"bg-chart-2",
	"bg-chart-3",
	"bg-chart-4",
	"bg-chart-5",
]

function ThemePreview({ dark = false }: { dark?: boolean }) {
	return (
		<div className={dark ? "dark" : "light"}>
			<div className="min-h-screen bg-background text-foreground">
				<div className="space-y-12 p-8">
					{/* HEADER */}
					<section className="space-y-2">
						<h1 className="font-heading text-5xl font-bold">
							{dark ? "Dark Theme" : "Light Theme"}
						</h1>

						<p className="max-w-xl text-muted-foreground">
							Visualização completa das cores, contraste, tipografia e
							componentes do tema.
						</p>
					</section>

					{/* SURFACES */}
					<section className="space-y-4">
						<h2 className="font-heading text-2xl font-semibold">
							Surface Colors
						</h2>

						<div className="grid gap-4 md:grid-cols-2">
							{surfaces.map((surface) => (
								<div
									key={surface.name}
									className={`${surface.bg} ${surface.text} rounded-2xl p-6`}
								>
									<div className="space-y-4">
										<div>
											<p className="font-heading text-2xl font-bold capitalize">
												{surface.name}
											</p>

											<p className="text-sm opacity-80">
												Lorem ipsum dolor sit amet consectetur.
											</p>
										</div>

										<div className="space-y-2">
											<p className="text-4xl font-bold">Aa</p>

											<p className="text-lg">
												The quick brown fox jumps over the lazy dog.
											</p>

											<p className="text-sm opacity-70">0123456789</p>
										</div>

										<div className="flex flex-wrap gap-2">
											<Badge variant="secondary">Secondary</Badge>

											<Badge variant="outline">Outline</Badge>

											<Button size="sm">Button</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* CHART COLORS */}
					<section className="space-y-4">
						<h2 className="font-heading text-2xl font-semibold">
							Chart Colors
						</h2>

						<div className="grid grid-cols-5 gap-4">
							{charts.map((chart, index) => (
								<div
									key={chart}
									className={`${chart} flex aspect-square items-center justify-center rounded-2xl text-lg font-bold text-black`}
								>
									{index + 1}
								</div>
							))}
						</div>
					</section>

					{/* TYPOGRAPHY */}
					<section className="space-y-6">
						<h2 className="font-heading text-2xl font-semibold">Typography</h2>

						<div className="space-y-3">
							<h1 className="font-heading text-6xl font-bold">Heading 1</h1>

							<h2 className="font-heading text-5xl font-bold">Heading 2</h2>

							<h3 className="font-heading text-4xl font-semibold">Heading 3</h3>

							<h4 className="font-heading text-3xl font-semibold">Heading 4</h4>

							<p className="max-w-2xl text-lg">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
								pariatur.
							</p>

							<p className="max-w-2xl text-muted-foreground">
								Muted foreground text for secondary information and
								descriptions.
							</p>
						</div>
					</section>

					{/* BUTTONS */}
					<section className="space-y-4">
						<h2 className="font-heading text-2xl font-semibold">Buttons</h2>

						<div className="flex flex-wrap gap-4">
							<Button>Default</Button>

							<Button variant="secondary">Secondary</Button>

							<Button variant="outline">Outline</Button>

							<Button variant="ghost">Ghost</Button>

							<Button variant="destructive">Destructive</Button>
						</div>
					</section>

					{/* BADGES */}
					<section className="space-y-4">
						<h2 className="font-heading text-2xl font-semibold">Badges</h2>

						<div className="flex flex-wrap gap-4">
							<Badge>Default</Badge>

							<Badge variant="secondary">Secondary</Badge>

							<Badge variant="outline">Outline</Badge>

							<Badge variant="destructive">Destructive</Badge>
						</div>
					</section>
					{/* 
          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold">
              Inputs
            </h2>

            <div className="max-w-md space-y-4">
              <Input placeholder="Type something..." />

              <Input disabled placeholder="Disabled input" />
            </div>
          </section> */}

					{/* CARDS */}
					<section className="space-y-4">
						<h2 className="font-heading text-2xl font-semibold">Cards</h2>

						<div className="grid gap-6 md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle>Default Card</CardTitle>
								</CardHeader>

								<CardContent>
									<p className="text-muted-foreground">
										Card using your current variables.
									</p>
								</CardContent>
							</Card>

							<Card className="bg-primary text-primary-foreground">
								<CardHeader>
									<CardTitle>Primary Card</CardTitle>
								</CardHeader>

								<CardContent>
									<p className="opacity-90">
										Primary foreground contrast preview.
									</p>
								</CardContent>
							</Card>
						</div>
					</section>

					{/* RADII */}
					<section className="space-y-4">
						<h2 className="font-heading text-2xl font-semibold">
							Border Radius
						</h2>

						<div className="flex flex-wrap items-end gap-6">
							<div className="size-16 rounded-sm bg-primary" />

							<div className="size-16 rounded-md bg-primary" />

							<div className="size-16 rounded-lg bg-primary" />

							<div className="size-16 rounded-xl bg-primary" />

							<div className="size-16 rounded-2xl bg-primary" />

							<div className="size-16 rounded-3xl bg-primary" />

							<div className="size-16 rounded-4xl bg-primary" />
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default function DesignSystemPage() {
	return (
		<div className="grid min-h-screen grid-cols-1 xl:grid-cols-2">
			<ThemePreview />

			<ThemePreview dark />
		</div>
	)
}
