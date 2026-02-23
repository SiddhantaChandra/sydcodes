"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logoLarge from '@/public/logo-large.webp'
import Link from 'next/link'

const Navbar = () => {
  const [active, setActive] = useState('home')

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

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'more', label: 'More' },
  ]

  return (
    <div className="fixed inset-x-0 top-0 flex justify-center z-30 mt-2">
      <div className="w-full max-w-4xl items-center justify-between px-6 py-2 bg-[#181212]/75 rounded-full backdrop-blur-sm border border-primary/20 hidden lg:flex">
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
    </div>
  )
}

export default Navbar