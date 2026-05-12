import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

function ScrollToTop() {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

export function MainLayout() {
	return (
		<div className="relative flex min-h-svh flex-col overflow-x-clip bg-background">
			<ScrollToTop />
			<Navbar />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default MainLayout
