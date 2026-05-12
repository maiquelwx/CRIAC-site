import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"

export function Footer() {
	const currentYear = new Date().getFullYear()

	// TODO: Ajustar links de navegação e organizar melhor as rotas
	const navigationLinks = [
		{ label: "Home", path: "/" },
		{ label: "Atividades", path: "/atividades" },
		{ label: "Equipe", path: "/equipe" },
		{ label: "Publicações", path: "/publicacoes" },
	]

	const partners = [
		{ name: "UFPEL", label: "Universidade Federal de Pelotas" },
		{
			name: "FAPERGS",
			label: "Fundação de Amparo à Pesquisa do Estado do Rio Grande do Sul",
		},
		{ name: "UFSM", label: "Universidade Federal de Santa Maria" },
		{ name: "UFRGS", label: "Universidade Federal do Rio Grande do Sul" },
	]

	return (
		<footer className="mt-16 border-t border-border/60 bg-background">
			<div className="mx-auto max-w-screen-2xl px-4 py-12 md:px-6">
				{/* Main Footer Content */}
				<div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
					{/* Logo Section */}
					<div className="flex flex-col gap-4 lg:col-span-1">
						<div className="flex items-center gap-2">
							<img src="/Logo-solido.svg" alt="CRIEC" className="h-8 w-8" />
							<p className="font-heading text-base font-semibold tracking-tight">
								CRIEC
							</p>
						</div>
						<p className="text-sm text-muted-foreground">
							Centro de Referência Internacional em Estudos Relacionados às
							Mudanças Climáticas
						</p>
					</div>

					{/* Navigation Links */}
					<div className="flex flex-col gap-3">
						<h3 className="text-sm font-semibold">Navegação</h3>
						<ul className="space-y-2">
							{navigationLinks.map((link) => (
								<li key={link.path}>
									<Link
										to={link.path}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div className="flex flex-col gap-3">
						<h3 className="text-sm font-semibold">Contato</h3>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
								<a
									href="mailto:contato@criec.edu.br"
									className="text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									contato@criec.edu.br
								</a>
							</li>
							<li className="flex items-start gap-2">
								<Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
								<a
									href="tel:+5553999999999"
									className="text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									+55 (53) 99999-9999
								</a>
							</li>
							<li className="flex items-start gap-2">
								<MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">
									Porto Alegre, RS
									<br />
									Brasil
								</p>
							</li>
						</ul>
					</div>

					{/* Partners */}
					<div className="flex flex-col gap-3">
						<h3 className="text-sm font-semibold">Parceiros</h3>
						<ul className="space-y-2">
							{partners.map((partner) => (
								<li key={partner.name}>
									<p
										className="cursor-default text-sm text-muted-foreground transition-colors hover:text-foreground"
										title={partner.label}
									>
										{partner.name}
									</p>
								</li>
							))}
						</ul>
					</div>

					{/* Social Links */}
					<div className="flex flex-col gap-3">
						<h3 className="text-sm font-semibold">Redes Sociais</h3>
						<div className="flex flex-wrap gap-3">
							<a
								href="#"
								className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-muted"
								aria-label="GitHub"
							>
								<FaGithub className="size-4" />
							</a>
							<a
								href="#"
								className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-muted"
								aria-label="Instagram"
							>
								<FaInstagram className="size-4" />
							</a>
							<a
								href="#"
								className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-muted"
								aria-label="LinkedIn"
							>
								<FaLinkedin className="size-4" />
							</a>
							<a
								href="#"
								className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-muted"
								aria-label="YouTube"
							>
								<FaYoutube className="size-4" />
							</a>
						</div>
					</div>

					{/* Legal */}
					<div className="flex flex-col gap-3">
						<h3 className="text-sm font-semibold">Legal</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/termos"
									className="text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									Termos de Serviço
								</Link>
							</li>
							<li>
								<Link
									to="/privacidade"
									className="text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									Política de Privacidade
								</Link>
							</li>
							<li>
								<Link
									to="/cookies"
									className="text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									Política de Cookies
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<Separator />

				{/* Bottom Footer */}
				<div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
					<p className="text-xs text-muted-foreground">
						© {currentYear} CRIEC. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	)
}
