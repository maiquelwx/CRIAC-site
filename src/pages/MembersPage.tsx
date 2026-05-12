import { MemberCard } from "@/components/MemberCard"
import TitleDivider from "@/components/TitleDivider"
import members from "@/data/members.json"

type RoleKey =
	| "professor"
	| "pos-doutorando"
	| "doutorando"
	| "mestrando"
	| "ic"

const sections: Array<{ key: RoleKey; label: string }> = [
	{ key: "professor", label: "Professores" },
	{ key: "pos-doutorando", label: "Pós-Doutorandos" },
	{ key: "doutorando", label: "Doutorandos" },
	{ key: "mestrando", label: "Mestrandos" },
	{ key: "ic", label: "Alunos de IC" },
]

function isRoleKey(role: string): role is RoleKey {
	return sections.some((section) => section.key === role)
}

export function MembersPage() {
	return (
		<main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 md:gap-10 md:px-6 md:py-10">
			<header className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
				<p className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
					Equipe CRIEC
				</p>
				<h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
					Pesquisadores
				</h1>
			</header>

			<div className="space-y-10">
				{sections.map((section) => {
					const sectionMembers = members.filter(
						(member) => isRoleKey(member.role) && member.role === section.key
					)

					if (sectionMembers.length === 0) {
						return null
					}

					return (
						<section key={section.key} className="space-y-5">
							<TitleDivider title={section.label} />
							<div className="flex flex-wrap justify-center gap-6 md:gap-8">
								{sectionMembers.map((member) => (
									<div
										key={member.name}
										className="w-full max-w-68 md:max-w-76"
									>
										<MemberCard member={member} />
									</div>
								))}
							</div>
						</section>
					)
				})}
			</div>
		</main>
	)
}

export default MembersPage
