import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { BrandBanner, BrandMark } from '@/components/shared/Brand'

// Dev bypass — lets you skip invite code locally or with ?dev=true
const isDev = window.location.hostname === 'localhost' ||
  new URLSearchParams(window.location.hash.split('?')[1] || '').get('dev') === 'true'

function GetStarted() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid' | 'dev'>('idle')
  const [email, setEmail] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
    const urlCode = params.get('code')
    if (urlCode) {
      setCode(urlCode)
      validateCode(urlCode)
    } else if (isDev) {
      setStatus('dev')
    }
  }, [])

  // Stagger the "You're in" content for delight
  useEffect(() => {
    if (status === 'valid') {
      const timer = setTimeout(() => setShowContent(true), 400)
      return () => clearTimeout(timer)
    }
  }, [status])

  async function validateCode(inviteCode: string) {
    if (!supabase) {
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
    window.location.href = 'https://app.getcoopr.com'
  }

  // Dev bypass screen
  if (status === 'dev') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <BrandMark className="h-14 mx-auto mb-4" />
          <BrandBanner className="h-4 mx-auto mb-6 opacity-85" />
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground mb-2">Dev Mode</h1>
          <p className="text-[15px] text-muted-foreground mb-8">You're in dev bypass — no invite code needed.</p>
          <Button onClick={launchApp}
            className="w-full h-11 rounded-xl bg-primary hover:bg-coopr-hover text-[15px] font-medium">
            Launch Coopr
          </Button>
        </div>
      </div>
    )
  }

  // Valid invite — celebration screen
  if (status === 'valid') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--coopr-success)/0.06),transparent_70%)]" />

        <div className="max-w-sm w-full text-center relative z-10">
          {/* Animated check mark */}
          <div className="relative mx-auto mb-4 w-[72px] h-[72px]">
            <div className="absolute inset-0 rounded-2xl bg-coopr-success/10 animate-[ping_1s_ease-out_1]" />
            <BrandMark className="relative h-[72px] w-auto mx-auto animate-fade-in" />
          </div>
          <BrandBanner className="h-4 mx-auto mb-6 opacity-85" />
          <div className="absolute left-1/2 top-[50px] -translate-x-1/2 translate-x-[26px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-coopr-success">
                <path d="M20 6 9 17l-5-5" className="animate-[draw_0.5s_ease-out_0.3s_both]" style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: 'draw 0.5s ease-out 0.3s forwards' }} />
              </svg>
          </div>

          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-foreground mb-2 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            You're in
          </h1>

          <div className={`transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <p className="text-[15px] text-muted-foreground mb-3">
              {email ? `Welcome — we sent your invite to ${email}` : 'Welcome to Coopr'}
            </p>

            <div className="rounded-xl border border-border bg-white p-4 mb-6 text-left">
              <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-3">What's waiting for you</p>
              <div className="space-y-2.5">
                {[
                  'Your Creative DNA profile',
                  'Performance predictions on every post',
                  'Competitor analysis for your niche',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[14px] text-coopr-body">
                    <div className="w-5 h-5 rounded-md bg-coopr-success-soft flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-coopr-success">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={launchApp}
              className="w-full h-11 rounded-xl bg-primary hover:bg-coopr-hover text-[15px] font-medium">
              Launch Coopr
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="ml-2">
                <path d="M3 8h10M9 3l5 5-5 5"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Code entry / validation
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <BrandMark className="h-14 mx-auto mb-4" />
        <BrandBanner className="h-4 mx-auto mb-6 opacity-85" />
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground mb-2">Enter your invite code</h1>
        <p className="text-[15px] text-muted-foreground mb-8">Coopr is invite-only right now. Check your email for an access code.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Paste your invite code"
            value={code}
            onChange={(e) => { setCode(e.target.value); setStatus('idle') }}
            className="h-11 rounded-xl border-input bg-white text-center text-[15px] font-mono tracking-wide placeholder:text-coopr-soft placeholder:font-sans placeholder:tracking-normal focus-visible:ring-ring focus-visible:ring-1"
          />
          {status === 'invalid' && (
            <p className="text-[13px] text-destructive animate-fade-in">
              That code doesn't look right. Double check your invite email.
            </p>
          )}
          <Button type="submit" disabled={!code || status === 'checking'}
            className="w-full h-11 rounded-xl bg-primary hover:bg-coopr-hover text-[15px] font-medium disabled:opacity-40">
            {status === 'checking' ? 'Checking...' : 'Continue'}
          </Button>
        </form>

        <p className="mt-8 text-[13px] text-coopr-soft">
          Don't have a code? <a href="#/" className="text-foreground underline underline-offset-2 hover:no-underline">Join the waitlist</a>
        </p>
      </div>
    </div>
  )
}

export default GetStarted
