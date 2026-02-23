import { useState, useEffect, useCallback } from 'react'

const ENDPOINT = 'https://formspree.io/f/xnjborqw'

function ContactModal({ onClose }) {
  const [closing, setClosing] = useState(false)
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const close = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 220)
  }, [onClose])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [close])

  function validate() {
    const e = {}
    if (!fields.name.trim()) e.name = 'Required'
    if (!fields.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Invalid email'
    if (!fields.message.trim()) e.message = 'Required'
    return e
  }

  async function handleSubmit(e) {
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

  function set(field) {
    return (e) => {
      setFields((f) => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
    }
  }

  return (
    <div
      className={`cm-backdrop${closing ? ' cm-backdrop--out' : ''}`}
      onClick={close}
    >
      <div
        className={`cm${closing ? ' cm--out' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cm-close" onClick={close} aria-label="Close">✕</button>

        <p className="cm-tag">contact</p>
        <h2 className="cm-title">Get in touch.</h2>

        {status === 'success' ? (
          <p className="cm-success">Message sent. I&apos;ll get back to you soon.</p>
        ) : (
          <form className="cm-form" onSubmit={handleSubmit} noValidate>
            <div className="cm-field">
              <input
                className={`cm-input${errors.name ? ' cm-input--err' : ''}`}
                type="text"
                placeholder="name"
                value={fields.name}
                onChange={set('name')}
                autoComplete="name"
              />
              {errors.name && <span className="cm-err">{errors.name}</span>}
            </div>

            <div className="cm-field">
              <input
                className={`cm-input${errors.email ? ' cm-input--err' : ''}`}
                type="email"
                placeholder="email"
                value={fields.email}
                onChange={set('email')}
                autoComplete="email"
              />
              {errors.email && <span className="cm-err">{errors.email}</span>}
            </div>

            <div className="cm-field">
              <textarea
                className={`cm-input cm-textarea${errors.message ? ' cm-input--err' : ''}`}
                placeholder="message"
                value={fields.message}
                onChange={set('message')}
                rows={5}
              />
              {errors.message && <span className="cm-err">{errors.message}</span>}
            </div>

            {status === 'error' && (
              <p className="cm-err cm-err--global">Something went wrong. Please try again.</p>
            )}

            <button className="cm-submit" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'sending...' : 'send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContactModal
