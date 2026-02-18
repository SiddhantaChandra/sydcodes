'use client';

import { motion } from 'framer-motion';
import { GithubLogo, LinkedinLogo, FileText as ReadCvLogo } from 'phosphor-react';

const links = [
	{
		name: 'GitHub',
		href: 'https://github.com/siddhantachandra',
		icon: GithubLogo,
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/siddhantachandra',
		icon: LinkedinLogo,
	},
    {
		name: 'Resume',
		href: 'https://www.linkedin.com/in/siddhantachandra',
		icon: ReadCvLogo,
	},
];

export default function MobileLinks() {
	return (
		<div className="mt-4">
			<div className="pointer-events-auto flex items-center gap-3  px-4 py-2 backdrop-blur-[1px] md:hidden">
				{links.map((link) => {
					const Icon = link.icon;
					return (
					<motion.a
						key={link.name}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ scale: 1.06, y: -4 }}
						whileTap={{ scale: 0.98 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						aria-label={link.name}
						className="flex gap-2 items-center group relative rounded-full px-4 py-2 text-primary/85 transition-colors duration-200 hover:text-primary transform-gpu origin-center will-change-transform border border-primary/20 bg-transparent"
					>
						<Icon size={28} weight="fill" className="h-4 w-4" />
                        <span className="text-sm">{link.name}</span>
						<span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-transparent transition-all duration-300 ease-out group-hover:ring-accent/60" />
					</motion.a>
					);
				})}
			</div>
		</div>
	);
}
