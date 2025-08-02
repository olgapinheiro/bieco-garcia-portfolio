import Link from "next/link";
import SocialMediaIcons from "./SocialMediaIcons";


export default function NavDesktop() {
	return (
		<div className="hidden md:flex gap-6 flex-wrap items-center justify-between">
			<div className="hidden md:flex gap-6 flex-no-wrap items-center justify-between">
				<Link
					className=""
					href="/about"
				>
					About
				</Link>
				<Link
					className=""
					href="/portfolio"
				>
					Work
				</Link>
			</div>

			<SocialMediaIcons />
		</div>
	)
}