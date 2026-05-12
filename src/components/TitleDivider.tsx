function TitleDivider({ title }: { title: string }) {
	return (
		<div className="flex w-full items-center gap-3 px-2">
			<h2 className="font-heading text-4xl font-semibold">{title}</h2>
			<div className="rounding-full h-0.5 grow bg-primary/45" />
		</div>
	)
}

export default TitleDivider
