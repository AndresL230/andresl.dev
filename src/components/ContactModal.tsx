import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, PaperPlaneTilt } from '@phosphor-icons/react'

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

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 240)
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
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
          onClick={close}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px] glass rounded-[2px] p-7 md:p-9"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center text-muted hover:text-accent border border-line hover:border-accent transition-colors"
            >
              <X size={14} weight="bold" />
            </button>

            <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-accent">
              <span className="text-muted-2 mr-1">/</span>contact
            </span>
            <h3 className="mt-2 font-display font-medium text-text text-[1.7rem] md:text-[1.95rem] tracking-[-0.025em] leading-[1.05]">
              Drop me a line<span className="text-accent">.</span>
            </h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 border border-accent/30 bg-accent/5"
              >
                <p className="font-mono text-[0.86rem] text-accent">
                  message sent → I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-5">
                <Field label="name" error={errors.name}>
                  <input
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={set('name')}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field label="email" error={errors.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={set('email')}
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field label="message" error={errors.message}>
                  <textarea
                    rows={5}
                    value={fields.message}
                    onChange={set('message')}
                    className={`${inputClass(!!errors.message)} resize-none min-h-[120px]`}
                  />
                </Field>

                {status === 'error' && (
                  <p className="font-mono text-[0.74rem] text-[#e76b6b]">
                    something went wrong. try again?
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="self-start mt-2 inline-flex items-center gap-2 bg-accent text-accent-ink font-mono text-[0.74rem] tracking-[0.08em] uppercase px-5 py-3 hover:bg-accent/85 active:translate-y-[1px] transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'sending…' : 'send message'}
                  <PaperPlaneTilt size={13} weight="fill" />
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
  return `w-full bg-transparent border-b ${err ? 'border-[#e76b6b]' : 'border-line-strong'} focus:border-accent text-text font-mono text-[0.92rem] px-0 py-2.5 outline-none transition-colors placeholder:text-muted`
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted flex items-center justify-between">
        <span>{label}</span>
        {error && <span className="text-[#e76b6b] normal-case tracking-normal">{error}</span>}
      </span>
      {children}
    </label>
  )
}

export default ContactModal
