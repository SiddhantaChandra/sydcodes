"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import logoLarge from '@/public/logo-large-opt.webp'
import logoShort from '@/public/logo-short.webp'
import menuIcon from '@/public/general-icons/mobile-nav-menu-icon.svg'
import closeIcon from '@/public/general-icons/x.svg'
import linkedinIcon from '@/public/general-icons/linkedin_icon.svg'
import githubIcon from '@/public/general-icons/github_icon.svg'
import resumeIcon from '@/public/general-icons/download_resume_icon.svg'

const Navbar = () => {
  const [active, setActive] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/siddhantachandra/',
    github: 'https://github.com/SiddhantaChandra',
    resume: '/SiddhantaChandra_CV.pdf',
  }

  useEffect(() => {
    const ids = ['home', 'experience', 'projects', 'expertise', 'contact']
    const sectionEntries = new Map()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => sectionEntries.set(entry.target.id, entry))

      const all = Array.from(sectionEntries.values()).filter(Boolean)
      if (all.length === 0) return

      const topThreshold = 500 // px
      if (window.scrollY <= topThreshold) {
        setActive('home')
        return
      }

      const visible = all.filter((e) => e.isIntersecting)
      if (visible.length > 0) {
        const best = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        setActive(best.target.id)
        return
      }

      const centerY = window.innerHeight / 2
      const best = all.reduce((a, b) => {
        const aRect = a.boundingClientRect
        const bRect = b.boundingClientRect
        const aCenter = (aRect.top + aRect.bottom) / 2
        const bCenter = (bRect.top + bRect.bottom) / 2
        return Math.abs(aCenter - centerY) < Math.abs(bCenter - centerY) ? a : b
      })
      setActive(best.target.id)
    }, { root: null, threshold: Array.from({ length: 101 }, (_, i) => i / 100) })

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 flex justify-center z-30 mt-2 px-3">
      {/* Desktop Navbar */}
      <nav aria-label="Main navigation" className="w-full max-w-6xl items-center justify-between px-6 py-2 bg-[#111111]/75 rounded-full backdrop-blur-sm border border-primary/20 shadow-none hidden lg:flex 2xl:max-w-7xl">
        <Image src={logoLarge} alt="Siddhanta Chandra logo" className="h-8 w-auto" />
        <div className="flex gap-1">
          {links.map((l) => {
            const isActive = active === l.id
            const base = 'text-center text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary/20'
            const state = isActive ? 'bg-primary text-black' : 'text-primary'
            return (
              <Link
                key={l.id}
                href={`#${l.id}`}
                className={`${base} ${state}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {l.label}
              </Link>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full text-white hover:text-accent transition-colors duration-200"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
            </svg>
          </Link>
          <Link
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full text-white hover:text-accent transition-colors duration-200"
          >
            <svg aria-hidden="true" viewBox="0 0 552.77 552.77" className="h-5 w-5 fill-current">
              <path d="M17.95 528.854h71.861c9.914 0 17.95-8.037 17.95-17.951V196.8c0-9.915-8.036-17.95-17.95-17.95H17.95C8.035 178.85 0 186.885 0 196.8v314.103c0 9.914 8.035 17.951 17.95 17.951zM17.95 123.629h71.861c9.914 0 17.95-8.036 17.95-17.95V41.866c0-9.914-8.036-17.95-17.95-17.95H17.95C8.035 23.916 0 31.952 0 41.866v63.813c0 9.914 8.035 17.95 17.95 17.95zM525.732 215.282c-10.098-13.292-24.988-24.223-44.676-32.791-19.688-8.562-41.42-12.846-65.197-12.846-48.268 0-89.168 18.421-122.699 55.27-6.672 7.332-11.523 5.729-11.523-4.186V196.8c0-9.915-8.037-17.95-17.951-17.95h-64.192c-9.915 0-17.95 8.035-17.95 17.95v314.103c0 9.914 8.036 17.951 17.95 17.951h71.861c9.915 0 17.95-8.037 17.95-17.951V401.666c0-45.508 2.748-76.701 8.244-93.574 5.494-16.873 15.66-30.422 30.488-40.649 14.83-10.227 31.574-15.343 50.24-15.343 14.572 0 27.037 3.58 37.393 10.741 10.355 7.16 17.834 17.19 22.436 30.104 4.604 12.912 6.904 41.354 6.904 85.33v132.627c0 9.914 8.035 17.951 17.949 17.951h71.861c9.914 0 17.949-8.037 17.949-17.951V333.02c0-31.445-1.982-55.607-5.941-72.48-3.96-16.873-11.904-31.959-22.008-45.258z" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="w-full lg:hidden">
        <div className="w-full items-center justify-between px-5 py-3 rounded-full border border-primary/20 flex bg-[#111111]/75 backdrop-blur-sm shadow-none">
          <Image src={logoShort} alt="Siddhanta Chandra logo" className="h-8 w-auto" />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            className="grid h-10 w-10 place-items-center rounded-xl  transition-colors duration-200"
          >
            <Image
              src={isMenuOpen ? closeIcon : menuIcon}
              alt=""
              aria-hidden="true"
              className="h-10 w-10"
            />
          </button>
        </div>

        <div
          className={`fixed inset-0 z-40 bg-accent transition-all duration-300 ease-out ${isMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
            }`}
        >
          <div className="flex h-full flex-col px-8 py-5">
            <div className="flex items-center justify-between">
              <Image src={logoShort} alt="Siddhanta Chandra logo" className="h-8 w-auto" />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
                className="grid h-10 w-10 place-items-center rounded-xl  transition-colors duration-200"
              >
                <Image src={closeIcon} alt="" aria-hidden="true" className="h-10 w-10" />
              </button>
            </div>

            <nav
              aria-label="Mobile navigation"
              className={`mt-16 flex flex-1 flex-col justify-center gap-4 transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
            >
              {links.map((l, idx) => {
                const isActive = active === l.id
                const base = 'block rounded-2xl px-5 py-4 text-3xl font-semibold tracking-wide transition-all duration-300'
                const state = isActive
                  ? 'bg-black text-primary translate-x-2'
                  : 'bg-black/10 text-black hover:bg-black/20'
                return (
                  <Link
                    key={l.id}
                    href={`#${l.id}`}
                    className={`${base} ${state}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-black/10 p-3">
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-12 w-12 place-items-center rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-200"
              >
                <Image src={linkedinIcon} alt="" aria-hidden="true" className="h-5 w-5" />
              </Link>
              <Link
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-12 w-12 place-items-center rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-200"
              >
                <Image src={githubIcon} alt="" aria-hidden="true" className="h-5 w-5" />
              </Link>
              <Link
                href={socialLinks.resume}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-black border border-black/20 hover:bg-primary/90 transition-colors duration-200"
              >
                <Image src={resumeIcon} alt="" aria-hidden="true" className="h-4 w-4" />
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
