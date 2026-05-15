import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { getProject } from '../data/projects'
import CaseStudy from '../components/CaseStudy'

export default function ProjectCase() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <Navigate to="/work" replace />

  return (
    <div className="pt-[64px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 pt-10">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={12} weight="bold" /> back to work
        </Link>
      </div>
      <CaseStudy project={project} />
    </div>
  )
}
