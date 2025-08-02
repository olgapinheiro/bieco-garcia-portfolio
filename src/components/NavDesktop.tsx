import Link from "next/link";
import SocialMediaIcons from "./SocialMediaIcons";


export default function NavDesktop() {
	return (
		<div className="hidden md:flex gap-8 flex-wrap items-center justify-between">
			<div className="hidden md:flex gap-3 flex-no-wrap items-center justify-between">
				<Link
					className="hover:opacity-70 transition-opacity"
					href="/portfolio"
				>
					Work
				</Link>
				<Link
					className="hover:opacity-70 transition-opacity"
					href="/about"
				>
					About
				</Link>
			</div>

			<SocialMediaIcons />
		</div>
	)
}