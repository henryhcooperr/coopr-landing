import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Privacy from './Privacy.tsx'
import Terms from './Terms.tsx'
import DataDeletion from './DataDeletion.tsx'
import GetStarted from './GetStarted.tsx'

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
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
