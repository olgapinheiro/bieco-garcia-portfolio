import { EmailIcon, InstagramIcon, WhatsappIcon } from "./icons";
import { WHATSAPP_URL } from "@/lib/utils";

export default function SocialMediaIcons() {
	return (
		<div className="flex gap-3 items-center justify-center">
			<a
				href="https://www.instagram.com/bieco.garcia/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-black dark:text-white hover:opacity-70 transition-opacity"
				aria-label="Instagram"
			>
				<InstagramIcon />
			</a>
			<a
				href="mailto:garciabieco@gmail.com"
				className="text-black dark:text-white hover:opacity-70 transition-opacity"
				aria-label="Email"
			>
				<EmailIcon />
			</a>
			<a
				href={WHATSAPP_URL}
				target="_blank"
				rel="noopener noreferrer"
				className="text-black dark:text-white hover:opacity-70 transition-opacity"
				aria-label="Whatsapp"
			>
				<WhatsappIcon />
			</a>
		</div>
	)
}