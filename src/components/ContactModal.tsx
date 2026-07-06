import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from '@phosphor-icons/react'

const ENDPOINT = 'https://formspree.io/f/xnjborqw'

type ContactModalProps = {
  onClose: () => void
}

type Fields = {
  name: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

function ContactModal({ onClose }: ContactModalProps) {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [visible, setVisible] = useState(true)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 240)
  }, [onClose])

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, textarea, a[href]',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [close])

  function validate(): FieldErrors {
    const e: FieldErrors = {}
    if (!fields.name.trim()) e.name = 'required'
    if (!fields.email.trim()) e.email = 'required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'invalid email'
    if (!fields.message.trim()) e.message = 'required'
    return e
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setStatus('success')
        setTimeout(close, 2200)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  function set(field: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-text/70"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full max-w-[460px] bg-bg border border-line-strong shadow-soft rounded-[2px] p-7 md:p-9"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 md:top-5 md:right-5 w-11 h-11 inline-flex items-center justify-center text-text border border-line-strong hover:border-accent hover:text-accent transition-colors"
            >
              <X size={16} weight="bold" />
            </button>

            <h3
              id="contact-title"
              className="font-display font-medium text-text text-[1.7rem] md:text-[1.95rem] tracking-[-0.025em] leading-[1.05]"
            >
              Contact me<span className="text-accent">.</span>
            </h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                className="mt-10 pt-6 border-t border-line"
              >
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-accent">
                  message sent
                </p>
                <p className="mt-3 font-display text-[1.05rem] leading-[1.7] text-text-dim">
                  I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-6">
                <Field label="name" error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={fields.name}
                    onChange={set('name')}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field label="email" error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={set('email')}
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field label="message" error={errors.message}>
                  <textarea
                    rows={4}
                    name="message"
                    value={fields.message}
                    onChange={set('message')}
                    className={`${inputClass(!!errors.message)} resize-none min-h-[104px]`}
                  />
                </Field>

                {status === 'error' && (
                  <p className="font-mono text-[0.74rem] text-error">
                    something went wrong. try again?
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="self-end mt-2 rounded-md bg-accent text-accent-ink font-mono text-[0.78rem] tracking-[0.06em] uppercase px-6 py-3 hover:bg-accent/90 active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'sending…' : 'send message'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function inputClass(err: boolean) {
  return `w-full bg-transparent rounded-none border-b ${err ? 'border-error' : 'border-line-strong'} focus:border-accent text-text font-display text-[1.02rem] px-0 pt-1.5 pb-1.5 outline-none transition-colors`
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted flex items-center justify-between">
        <span>{label}</span>
        {error && <span className="text-error normal-case tracking-normal">{error}</span>}
      </span>
      {children}
    </label>
  )
}

export default ContactModal
