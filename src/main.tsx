import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'motion/react'
import './index.css'
import App from './App.tsx'
import Privacy from './Privacy.tsx'
import Terms from './Terms.tsx'
import DataDeletion from './DataDeletion.tsx'
import GetStarted from './GetStarted.tsx'
import Features from './Features.tsx'
import Devlog from './Devlog.tsx'

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

function PageTransition({ children, routeKey }: { children: React.ReactNode; routeKey: string }) {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Router() {
  const [path, setPath] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setPath(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const basePath = path.split('?')[0]

  return (
    <AnimatePresence mode="wait">
      {basePath === '#/privacy' && (
        <PageTransition routeKey="privacy">
          <Privacy />
        </PageTransition>
      )}
      {basePath === '#/terms' && (
        <PageTransition routeKey="terms">
          <Terms />
        </PageTransition>
      )}
      {basePath === '#/data-deletion' && (
        <PageTransition routeKey="data-deletion">
          <DataDeletion />
        </PageTransition>
      )}
      {basePath === '#/get-started' && (
        <PageTransition routeKey="get-started">
          <GetStarted />
        </PageTransition>
      )}
      {basePath === '#/features' && (
        <PageTransition routeKey="features">
          <Features />
        </PageTransition>
      )}
      {basePath === '#/devlog' && (
        <PageTransition routeKey="devlog">
          <Devlog />
        </PageTransition>
      )}
      {!['#/privacy', '#/terms', '#/data-deletion', '#/get-started', '#/features', '#/devlog'].includes(basePath) && (
        <PageTransition routeKey="home">
          <App />
        </PageTransition>
      )}
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
