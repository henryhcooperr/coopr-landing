import { useEffect } from 'react'

/**
 * Legacy route handler for #/get-started.
 * Redirects to the app's register page, passing through any ?code= param.
 * Invite validation now happens at app.getcoopr.com/register (single source).
 */
function GetStarted() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
    const code = params.get('code')
    const target = code
      ? `https://app.getcoopr.com/register?code=${encodeURIComponent(code)}`
      : 'https://app.getcoopr.com/register'
    window.location.href = target
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-[15px] text-muted-foreground">Redirecting to Coopr...</p>
    </div>
  )
}

export default GetStarted
