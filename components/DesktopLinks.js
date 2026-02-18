'use client';

import { motion } from 'framer-motion';
import { GithubLogo, LinkedinLogo } from 'phosphor-react';

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
];

export default function DesktopLinks() {
	return (
		<div className="pointer-events-none fixed right-5 top-[40%] z-40 hidden -translate-y-1/2 md:flex">
			<div className="pointer-events-auto flex flex-col items-center gap-3 rounded-full border border-primary/20 bg-transparent px-2 py-3 backdrop-blur-[1px]">
                <div className='w-[1px] h-24 bg-primary rounded-full'></div>
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
						className="group relative rounded-full p-2 text-primary/85 transition-colors duration-200 hover:text-primary transform-gpu origin-center will-change-transform"
					>
						<Icon size={24} weight="fill" className="h-6 w-6" />

						<span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-transparent px-3 py-1 text-sm text-primary/85 backdrop-blur-[1px] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out">
							{link.name}
						</span>
						<span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-transparent transition-all duration-300 ease-out group-hover:ring-accent/60" />
					</motion.a>
					);
				})}
			</div>
		</div>
	);
}
