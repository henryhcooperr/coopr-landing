import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Privacy from './Privacy.tsx'
import Terms from './Terms.tsx'

function Router() {
  const [path, setPath] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setPath(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (path === '#/privacy') return <Privacy />
  if (path === '#/terms') return <Terms />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
