import { useState, useRef, useEffect } from 'react'

const RESPONSES = [
  "I'm fully powered by AI* (*a JavaScript array of 10 strings).",
  "Interesting. Tell me more. Just kidding, I don't actually process anything.",
  "I don't have access to that information, but I do have this pre-written response.",
  "Error 404: meaningful answer not found.",
  "My training data consisted entirely of this one website.",
  "I've thought about it for 0.9 seconds and I have no idea.",
  "According to my highly advanced reasoning: ¯\\_(ツ)_/¯",
  "That's a great point. Anyway.",
  "I'm going to need you to be more specific. Or don't, it won't change my answer.",
  "Classified. Also I don't know.",
  "Have you tried turning it off and on again? That's all I've got.",
  "That feature is out of scope.",
  "Works on my machine.",
  "I looked that up and got distracted. Anyway.",
  "Please open a GitHub issue. I'll close it as 'won't fix'.",
  "According to Stack Overflow circa 2011, the answer is no longer relevant.",
  "I've filed that under 'not my problem'.",
  "I'd help but I'm running low on memory.",
  "git blame yourself.",
]

export default function FakeChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Andre's AI assistant. Ask me anything." },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  function send() {
    const text = input.trim()
    if (!text || thinking) return
    setInput('')
    if (text === '/clear') {
      setMessages([])
      return
    }
    setMessages((m) => [...m, { from: 'user', text }])
    setThinking(true)
    setTimeout(() => {
      const reply = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
      setMessages((m) => [...m, { from: 'bot', text: reply }])
      setThinking(false)
    }, 1000 + Math.random() * 4000)
  }

  function handleKey(e) {
    if (e.key === 'Enter') send()
  }

  return (
    <div className="fc-wrap">
      {open && (
        <div className="fc-window">
          <div className="fc-header">
            <span className="fc-title">andres_ai<span className="fc-blink">_</span></span>
            <button className="fc-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="fc-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`fc-msg fc-msg--${msg.from}`}>
                <span className="fc-prefix">{msg.from === 'bot' ? '>' : '$'}</span>
                {msg.text}
              </div>
            ))}
            {thinking && (
              <div className="fc-msg fc-msg--bot fc-msg--thinking">
                <span className="fc-prefix">{'>'}</span>
                <span className="fc-dots"><span>.</span><span>.</span><span>.</span></span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="fc-input-row">
            <span className="fc-input-prefix">$</span>
            <input
              className="fc-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="ask me anything..."
              autoFocus
            />
            <button className="fc-send" onClick={send} disabled={thinking}>send</button>
          </div>
        </div>
      )}
      <button className="fc-fab" onClick={() => setOpen((o) => !o)} aria-label="Chat">
        {open ? '✕' : '>_'}
      </button>
    </div>
  )
}
