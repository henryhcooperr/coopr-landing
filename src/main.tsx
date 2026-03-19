import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Privacy from './Privacy.tsx'
import Terms from './Terms.tsx'
import DataDeletion from './DataDeletion.tsx'
import GetStarted from './GetStarted.tsx'
import Features from './Features.tsx'
import Devlog from './Devlog.tsx'
import { Analytics } from '@vercel/analytics/react'

// Map of clean paths to hash routes — used to support both /privacy and #/privacy
const ROUTE_MAP: Record<string, string> = {
  '/privacy': '#/privacy',
  '/terms': '#/terms',
  '/data-deletion': '#/data-deletion',
  '/get-started': '#/get-started',
  '/features': '#/features',
  '/devlog': '#/devlog',
}

// On initial load, if we have a clean pathname (e.g. /privacy) but no hash,
// redirect to the hash equivalent so the router picks it up.
// This handles Vercel rewrites serving index.html for clean URLs.
function initCleanPathRedirect() {
  const { pathname, hash, search } = window.location
  if (!hash && pathname !== '/' && ROUTE_MAP[pathname]) {
    window.history.replaceState(null, '', '/' + search + ROUTE_MAP[pathname])
  }
}
initCleanPathRedirect()

function Router() {
  const [path, setPath] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setPath(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const basePath = path.split('?')[0]
  if (basePath === '#/privacy') return <Privacy />
  if (basePath === '#/terms') return <Terms />
  if (basePath === '#/data-deletion') return <DataDeletion />
  if (basePath === '#/get-started') return <GetStarted />
  if (basePath === '#/features') return <Features />
  if (basePath === '#/devlog') return <Devlog />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
    <Analytics />
  </StrictMode>,
)
