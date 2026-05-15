import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import ContactModal from './ContactModal'

function Footer({ hidden = false }: { hidden?: boolean }) {
  const [contactOpen, setContactOpen] = useState(false)

  if (hidden) return null

  return (
    <>
      <footer id="contact" className="relative border-t border-line bg-bg overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 pt-24 md:pt-32 pb-12">
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-accent text-[0.7rem] tracking-[0.22em] uppercase">05</span>
              <span className="w-8 h-px bg-line-strong" />
              <span className="font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">contact</span>
            </div>

            <div>
              <motion.button
                onClick={() => setContactOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="block text-left"
              >
                <span className="inline-block font-display font-medium tracking-[-0.04em] leading-[0.95] text-text">
                  <span style={{ fontSize: 'clamp(2.8rem, 9vw, 6rem)' }}>
                    let&apos;s build
                  </span>
                  <br />
                  <span
                    style={{ fontSize: 'clamp(2.8rem, 9vw, 6rem)' }}
                    className="text-muted"
                  >
                    something<span className="text-accent">.</span>
                    <ArrowUpRight
                      size={48}
                      weight="light"
                      className="inline-block ml-3 -mt-2 text-accent"
                    />
                  </span>
                </span>
              </motion.button>

              <p className="mt-6 max-w-[460px] text-[0.95rem] text-text-dim leading-relaxed">
                Looking for Summer 2027 SWE internships in quant/fintech and developer tooling. Also open to trading notes on edge compute, AI/ML, or anything Cloudflare-shaped. The inbox is open.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-line">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">elsewhere</span>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <FooterLink href="https://github.com/AndresL230" icon={<GithubLogo size={14} weight="duotone" />}>
                    github
                  </FooterLink>
                  <FooterLink href="https://www.linkedin.com/in/andres-lopez23/" icon={<LinkedinLogo size={14} weight="duotone" />}>
                    linkedin
                  </FooterLink>
                  <FooterLink href="https://devpost.com/AndresL230">
                    devpost
                  </FooterLink>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="font-mono text-[0.78rem] text-text-dim inline-flex items-center gap-1.5"
                  >
                    email
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">colophon</span>
                <p className="font-mono text-[0.74rem] text-text-dim">
                  built with react + tailwind + framer · vercel · {new Date().getFullYear()}
                </p>
                <p className="font-mono text-[0.74rem] text-muted">© andres lopez</p>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute -bottom-[60%] left-1/2 -translate-x-1/2 w-[140%] aspect-square rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 0%, var(--color-accent), transparent 55%)' }}
        />
      </footer>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  )
}

function FooterLink({ href, icon, children }: { href: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-[0.78rem] text-text-dim inline-flex items-center gap-1.5"
    >
      {icon}
      {children}
    </a>
  )
}

export default Footer
