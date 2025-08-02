import SocialMediaIcons from "./SocialMediaIcons";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`w-full bg-white dark:bg-black flex flex-col gap-4 items-center justify-center py-4 px-10 ${className}`}>
      <SocialMediaIcons />
      <div className="flex gap-6 flex-wrap items-center justify-center text-xs">
        © 2025 BIECO GARCIA
      </div>
    </footer>
  );
}
