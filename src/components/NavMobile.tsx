'use client'
import Link from "next/link";
import { useState, useTransition } from "react";
import { MenuHamburger, XmarkIcon } from "./icons";
import SocialMediaIcons from "./SocialMediaIcons";

export default function NavMobile() {
	const [isOpen, setIsOpen] = useState(false)
	const [isPending, startTransition] = useTransition();

	if (!isOpen) {
		return (
			<button
				className="md:hidden"
				onClick={() => setIsOpen(!isOpen)}>
				<MenuHamburger />
			</button>
		)
	}

	return (
		<div
			className="isolate fixed w-full h-full top-0 left-0 bg-white/98 dark:bg-black/98 items-center z-10 md:hidden"
			role="navigation"
			tabIndex={0}
			onKeyDown={(e) => { if (e.key.toLowerCase() === 'escape') setIsOpen(false) }}
		>
			<div className="flex flex-row justify-end p-4">
				<button onClick={() => setIsOpen(false)}>
					<XmarkIcon />
				</button>
			</div>
			<div className="h-full flex flex-col md:hidden gap-8 flex-wrap items-center justify-center">
				<div className="flex flex-col md:hidden gap-3 flex-wrap items-center justify-center">
					<Link
						onClick={() => {
								startTransition(() => {
									setIsOpen(false);
								});
							}}
						className=""
						href="/portfolio"
					>
						Work
					</Link>

					<Link
						onClick={() => {
								startTransition(() => {
									setIsOpen(false);
								});
							}}
						className=""
						href="/about"
					>
						About
					</Link>

				</div>

				<SocialMediaIcons />
			</div>
		</div>
	)
}