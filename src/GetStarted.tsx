import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

// Dev bypass — lets you skip invite code locally or with ?dev=true
const isDev = window.location.hostname === 'localhost' ||
  new URLSearchParams(window.location.hash.split('?')[1] || '').get('dev') === 'true'

function GetStarted() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid' | 'dev'>('idle')
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Check URL for invite code
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
    const urlCode = params.get('code')
    if (urlCode) {
      setCode(urlCode)
      validateCode(urlCode)
    } else if (isDev) {
      setStatus('dev')
    }
  }, [])

  async function validateCode(inviteCode: string) {
    if (!supabase) {
      // No supabase = dev mode, just let through
      setStatus('dev')
      return
    }
    setStatus('checking')
    const { data, error } = await supabase
      .from('waitlist')
      .select('email, invite_code')
      .eq('invite_code', inviteCode.trim())
      .single()

    if (error || !data) {
      setStatus('invalid')
    } else {
      setEmail(data.email)
      setStatus('valid')
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code) validateCode(code)
  }

  function launchApp() {
    // This is where you'd redirect to the actual app
    // For now, show a message — replace with real URL when app is deployed
    window.location.href = 'https://app.getcoopr.com'
  }

  // Dev bypass screen
  if (status === 'dev') {
    return (
      <div className="min-h-screen bg-[hsl(220,20%,99%)] flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-10 h-10 rounded-xl bg-[hsl(220,20%,10%)] flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-sm font-semibold">C</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[hsl(220,20%,10%)] mb-2">Dev Mode</h1>
          <p className="text-[15px] text-[hsl(220,10%,46%)] mb-8">You're in dev bypass — no invite code needed.</p>
          <Button onClick={launchApp}
            className="w-full h-11 rounded-xl bg-[hsl(220,20%,10%)] hover:bg-[hsl(220,20%,18%)] text-[15px] font-medium">
            Launch Coopr
          </Button>
        </div>
      </div>
    )
  }

  // Valid invite
  if (status === 'valid') {
    return (
      <div className="min-h-screen bg-[hsl(220,20%,99%)] flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-[hsl(145,50%,42%)] flex items-center justify-center mx-auto mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[hsl(220,20%,10%)] mb-2">You're in</h1>
          <p className="text-[15px] text-[hsl(220,10%,46%)] mb-8">
            Welcome{email ? ` — we sent your invite to ${email}` : ''}. Ready to start?
          </p>
          <Button onClick={launchApp}
            className="w-full h-11 rounded-xl bg-[hsl(220,20%,10%)] hover:bg-[hsl(220,20%,18%)] text-[15px] font-medium">
            Launch Coopr
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="ml-2"><path d="M3 8h10M9 3l5 5-5 5"/></svg>
          </Button>
        </div>
      </div>
    )
  }

  // Code entry / validation
  return (
    <div className="min-h-screen bg-[hsl(220,20%,99%)] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="w-10 h-10 rounded-xl bg-[hsl(220,20%,10%)] flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-sm font-semibold">C</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[hsl(220,20%,10%)] mb-2">Enter your invite code</h1>
        <p className="text-[15px] text-[hsl(220,10%,46%)] mb-8">Coopr is invite-only right now. Check your email for an access code.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Paste your invite code"
            value={code}
            onChange={(e) => { setCode(e.target.value); setStatus('idle') }}
            className="h-11 rounded-xl border-[hsl(220,10%,88%)] bg-white text-center text-[15px] font-mono tracking-wide placeholder:text-[hsl(220,10%,60%)] placeholder:font-sans placeholder:tracking-normal focus-visible:ring-[hsl(220,20%,10%)] focus-visible:ring-1"
          />
          {status === 'invalid' && (
            <p className="text-[13px] text-[hsl(0,65%,50%)] animate-fade-in">
              That code doesn't look right. Double check your invite email.
            </p>
          )}
          <Button type="submit" disabled={!code || status === 'checking'}
            className="w-full h-11 rounded-xl bg-[hsl(220,20%,10%)] hover:bg-[hsl(220,20%,18%)] text-[15px] font-medium disabled:opacity-40">
            {status === 'checking' ? 'Checking...' : 'Continue'}
          </Button>
        </form>

        <p className="mt-8 text-[13px] text-[hsl(220,10%,60%)]">
          Don't have a code? <a href="#/" className="text-[hsl(220,20%,10%)] underline underline-offset-2 hover:no-underline">Join the waitlist</a>
        </p>
      </div>
    </div>
  )
}

export default GetStarted
