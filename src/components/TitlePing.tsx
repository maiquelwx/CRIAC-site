function TitlePing({ title }: { title: string }) {
	return (
		<div className="flex items-center gap-2 px-2">
			<span className="relative flex size-6 items-center justify-center">
				<span className="absolute size-5 animate-ping rounded-full bg-secondary/20" />
				<span className="relative size-3 rounded-full bg-primary brightness-120" />
			</span>
			<h2 className="font-heading text-4xl font-semibold">{title}</h2>
		</div>
	)
}

export default TitlePing
