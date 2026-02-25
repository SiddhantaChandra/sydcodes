"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import logoLarge from '@/public/logo-large.webp'
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
    linkedin: '#',
    github: '#',
    resume: '/resume.pdf',
  }

  useEffect(() => {
    const ids = ['home', 'experience', 'projects', 'more']
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
    { id: 'more', label: 'More' },
  ]

  return (
    <div className="fixed inset-x-0 top-0 flex justify-center z-30 mt-2 px-3">
      {/* Desktop Navbar */}
      <div className="w-full max-w-4xl items-center justify-between px-6 py-2 bg-[#181212]/75 rounded-full backdrop-blur-sm border border-primary/20 hidden lg:flex 2xl:max-w-7xl">
        <Image src={logoLarge} alt="Description" className="h-8 w-auto" />
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
      </div>

      {/* Mobile Navbar */}
      <div className="w-full lg:hidden">
        <div className="w-full items-center justify-between px-5 py-3 rounded-full border border-primary/20 flex bg-[#181212]/75 backdrop-blur-sm">
          <Image src={logoShort} alt="Description" className="h-8 w-auto" />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            className="grid h-10 w-10 place-items-center rounded-xl  transition-colors duration-200"
          >
            <Image
              src={isMenuOpen ? closeIcon : menuIcon}
              alt="menu toggle"
              className="h-10 w-10"
            />
          </button>
        </div>

        <div
          className={`fixed inset-0 z-40 bg-accent transition-all duration-300 ease-out ${
            isMenuOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="flex h-full flex-col px-8 py-5">
            <div className="flex items-center justify-between">
              <Image src={logoShort} alt="Description" className="h-8 w-auto" />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
                className="grid h-10 w-10 place-items-center rounded-xl  transition-colors duration-200"
              >
                <Image src={closeIcon} alt="close menu" className="h-10 w-10" />
              </button>
            </div>

            <div
              className={`mt-16 flex flex-1 flex-col justify-center gap-4 transition-all duration-500 ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
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
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-black/10 p-3">
              <Link
                href={socialLinks.linkedin}
                aria-label="LinkedIn"
                className="grid h-12 w-12 place-items-center rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-200"
              >
                <Image src={linkedinIcon} alt="LinkedIn" className="h-5 w-5" />
              </Link>
              <Link
                href={socialLinks.github}
                aria-label="GitHub"
                className="grid h-12 w-12 place-items-center rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-200"
              >
                <Image src={githubIcon} alt="GitHub" className="h-5 w-5" />
              </Link>
              <Link
                href={socialLinks.resume}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-black border border-black/20 hover:bg-primary/90 transition-colors duration-200"
              >
                <Image src={resumeIcon} alt="Download resume" className="h-4 w-4" />
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar