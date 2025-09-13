import Link from "next/link";
import SocialMediaIcons from "./SocialMediaIcons";


export default function NavDesktop() {
	return (
		<div className="hidden md:flex gap-8 flex-wrap items-center justify-between">
			<div className="hidden md:flex gap-4 flex-no-wrap items-center justify-between">
				<Link
					className="hover:opacity-90 hover:text-base text-sm opacity-50 transition-all duration-300 ease-out"
					href="/portfolio/outsides"
				>
					Outsides
				</Link>
				<Link
					className="hover:opacity-90 hover:text-base text-sm opacity-50 transition-all duration-300 ease-out"
					href="/portfolio/insides"
				>
					Insides
				</Link>
				<Link
					className="hover:opacity-90 hover:text-base text-sm opacity-50 transition-all duration-300 ease-out"
					href="/portfolio/foods-and-drinks"
				>
					Foods & Drinks
				</Link>
				<Link
					className="hover:opacity-90 hover:text-base text-sm opacity-50 transition-all duration-300 ease-out"
					href="/portfolio/lifestyle"
				>
					Lifestyle
				</Link>
				<Link
					className="hover:opacity-90 hover:text-base text-sm opacity-50 transition-all duration-300 ease-out"
					href="/portfolio/landscape-and-wildlife"
				>
					Landscape & Wildlife
				</Link>
				<Link
					className="hover:opacity-90 hover:text-base text-sm opacity-50 transition-all duration-300 ease-out"
					href="/about"
				>
					About
				</Link>
			</div>

			<SocialMediaIcons />
		</div>
	)
}