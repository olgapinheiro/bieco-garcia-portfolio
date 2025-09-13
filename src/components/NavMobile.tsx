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
				onClick={() => {
					startTransition(() => {
						setIsOpen(true);
					});
				}}>
				<MenuHamburger />
			</button>
		)
	}

	return (
		<div
			className={`isolate fixed w-full h-full top-0 left-0 bg-white/98 dark:bg-black/98 items-center z-10 md:hidden transition-opacity duration-700 ${isPending ? 'opacity-0' : 'opacity-100'}`}
			role="navigation"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Escape'){
					e.preventDefault()
					startTransition(() => {
						setIsOpen(false)
					})
				}
			}}
		>
			<div className="flex flex-row justify-end p-4">
				<button
					onClick={() => {
						startTransition(() => {
							setIsOpen(false);
						});
					}}
				>
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
					href="/portfolio/outsides"
				>
					Outsides
				</Link>
				<Link
					onClick={() => {
						startTransition(() => {
							setIsOpen(false);
						});
					}}
					href="/portfolio/insides"
				>
					Insides
				</Link>
				<Link
					onClick={() => {
						startTransition(() => {
							setIsOpen(false);
						});
					}}
					href="/portfolio/foods-and-drinks"
				>
					Foods & Drinks
				</Link>
				<Link
					onClick={() => {
						startTransition(() => {
							setIsOpen(false);
						});
					}}
					href="/portfolio/lifestyle"
				>
					Lifestyle
				</Link>
				<Link
					onClick={() => {
						startTransition(() => {
							setIsOpen(false);
						});
					}}
					href="/portfolio/landscape-and-wildlife"
				>
					Landscape & Wildlife
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