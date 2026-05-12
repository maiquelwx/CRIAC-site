import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ExternalLink } from "lucide-react"
import { Globe } from "lucide-react"
import { LattesIcon } from "@/components/icons/academicons-lattes"
import { FaGithub, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa"

export interface Member {
	name: string
	institution: string
	role: string
	area?: string
	description?: string
	imgPath?: string
	links: {
		lattes?: string
		linkedin?: string
		github?: string
		instagram?: string
		youtube?: string
		website?: string
	}
}

function getInitials(name: string) {
	if (!name) return ""
	return name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((w) => w[0].toUpperCase())
		.join("")
}

function MemberImage({ imageUrl, name }: { imageUrl?: string; name: string }) {
	const [hasImageError, setHasImageError] = useState(false)
	const initials = getInitials(name)

	if (!imageUrl || hasImageError) {
		return (
			<div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-card font-heading text-8xl font-semibold tracking-tighter text-secondary/70">
				{initials}
			</div>
		)
	}

	return (
		<img
			src={imageUrl}
			alt={name}
			className="aspect-square w-full rounded-2xl object-cover"
			loading="lazy"
			onError={() => setHasImageError(true)}
		/>
	)
}

function MemberLinks({ links }: { links?: Member["links"] }) {
	const memberLinkDefinitions = {
		lattes: LattesIcon,
		linkedin: FaLinkedin,
		github: FaGithub,
		instagram: FaInstagram,
		youtube: FaYoutube,
		website: Globe,
	} as const

	return (
		<div className="flex w-full flex-wrap gap-2">
			{Object.entries(memberLinkDefinitions).map(([key, IconComponent]) => {
				const url = links?.[key as keyof Member["links"]]

				if (!url) return null

				return (
					<HoverCard key={key}>
						<HoverCardTrigger asChild>
							<Button
								asChild
								variant="outline-1"
								size="icon-lg"
								className="rounded-full"
							>
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={key}
								>
									<IconComponent className="size-7" />
								</a>
							</Button>
						</HoverCardTrigger>
						<HoverCardContent className="w-fit px-2 py-1 text-sm">
							<div className="flex items-center gap-2">
								<span className="max-w-[18rem] truncate">{url}</span>
								<ExternalLink className="size-4 opacity-80" />
							</div>
						</HoverCardContent>
					</HoverCard>
				)
			})}
		</div>
	)
}

export function MemberCard({ member }: { member: Member }) {
	const imageUrl = member.imgPath

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					className="group flex flex-col items-center gap-3 transition-all duration-200"
					role="button"
					tabIndex={0}
				>
					<MemberImage imageUrl={imageUrl} name={member.name} />
					<div className="w-4/5 rounded-md bg-muted p-2 text-center font-heading text-lg leading-tight font-medium duration-200 group-hover:-translate-y-10 group-hover:shadow-xl">
						{member.name}
					</div>
				</div>
			</DialogTrigger>

			<DialogContent className="flex max-h-4/5 w-3/4 max-w-5/6! flex-col">
				<div className="grid h-full min-h-0 flex-1 gap-6 overflow-hidden md:grid-cols-[320px_auto] lg:items-start">
					<MemberImage imageUrl={imageUrl} name={member.name} />
					<div className="flex flex-col space-y-5 overflow-hidden">
						<DialogHeader className="space-y-3 text-left">
							<DialogTitle className="text-3xl md:text-4xl">
								{member.name}
							</DialogTitle>
							<div className="flex flex-wrap gap-2">
								<Badge variant="outline-1" className="w-fit text-sm">
									{member.institution}
								</Badge>
								{member.area ? (
									<Badge variant="outline" className="w-fit text-sm">
										{member.area}
									</Badge>
								) : null}
							</div>
						</DialogHeader>

						<DialogDescription className="no-scrollbar max-h-60 space-y-4 overflow-y-auto pr-1 text-base leading-relaxed text-foreground/80">
							<p>{member.description || "Sem descrição disponível."}</p>
						</DialogDescription>
					</div>
				</div>

				{Object.values(member.links ?? {}).some(Boolean) ? (
					<DialogFooter className="flex shrink-0 border-t border-border/70 pt-5">
						<MemberLinks links={member.links} />
					</DialogFooter>
				) : null}
			</DialogContent>
		</Dialog>
	)
}
