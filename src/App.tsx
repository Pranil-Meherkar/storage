import { useEffect, useRef } from 'react'
import './App.css'

const frameStyle = { border: '1px solid #ccc', borderRadius: '8px' }

function App() {
  const credentiallessHost = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem('demo_key', 'written by the top-level page')
  }, [])

  console.log("main", localStorage)

  // `credentialless` must be set before the iframe navigates, and React has no
  // typed prop for it, so the iframe is created imperatively.
  useEffect(() => {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('credentialless', '')
    iframe.src = '/sample.html?label=credentialless'
    iframe.width = '250'
    iframe.height = '120'
    Object.assign(iframe.style, frameStyle)
    credentiallessHost.current?.appendChild(iframe)
    return () => iframe.remove()
  }, [])

  const port = window.location.port

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Storage partition demo</h2>
      <p>
        Open this page at <b>http://localhost:{port}</b>, then DevTools &gt; Application &gt; Local storage.
      </p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <strong>1. Same-origin iframe</strong>
          <p>Shares the top page's bucket (no new entry)</p>
          <iframe title="same-origin" src="/sample.html?label=same-origin" width="250" height="120" style={frameStyle} />
        </div>

        <div ref={credentiallessHost}>
          <strong>2. Credentialless iframe</strong>
          <p>Nonce in storage key → new localhost entry</p>
        </div>

        <div>
          <strong>3. localhost inside 127.0.0.1</strong>
          <p>Cross-site ancestor bit → another localhost entry</p>
          <iframe title="relay" src={`http://127.0.0.1:${port}/relay.html`} width="260" height="160" style={frameStyle} />
        </div>
      </div>
    </div>
  )
}

export default App
