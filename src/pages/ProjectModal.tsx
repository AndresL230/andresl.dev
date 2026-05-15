import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { getProject } from '../data/projects'
import CaseStudy from '../components/CaseStudy'

export default function ProjectModal() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = slug ? getProject(slug) : undefined

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [navigate])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        key={slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[150] bg-bg overflow-y-auto"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <button
            onClick={() => navigate(-1)}
            aria-label="Close project"
            className="fixed top-5 right-5 md:top-7 md:right-8 z-[160] w-11 h-11 inline-flex items-center justify-center bg-bg/70 border border-line-strong backdrop-blur-md text-text hover:border-accent hover:text-accent transition-colors"
          >
            <X size={16} weight="bold" />
          </button>

          <CaseStudy project={project} onClose={() => navigate(-1)} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
