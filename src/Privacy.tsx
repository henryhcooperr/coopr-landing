import { Button } from '@/components/ui/button'

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-semibold tracking-tight">C</span>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">Coopr</span>
          </a>
          <Button variant="outline" size="sm"
            className="text-[13px] h-8 px-3 rounded-lg border-border hover:bg-secondary"
            onClick={() => { window.location.hash = '#/'; window.scrollTo(0, 0); }}>
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-[14px] text-coopr-subtle mb-10">
            Last updated: March 10, 2026
          </p>

          <div className="space-y-8 text-[15px] leading-relaxed text-coopr-body">
            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Who we are</h2>
              <p>
                Coopr is operated by Lensofcoop LLC ("we", "us", "our"). We provide a content strategy platform for creators. This policy explains how we collect, use, and protect your information.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Information we collect</h2>
              <p className="mb-3">
                <span className="font-medium">Account information.</span> When you sign up, we collect your email address and basic profile information. If you connect a social media account, we access your public profile, published content, and engagement metrics through official platform APIs.
              </p>
              <p className="mb-3">
                <span className="font-medium">Content data.</span> We analyze content you publish on connected social media accounts, including video frames, audio, captions, and engagement metrics. This data is used to generate personalized insights and recommendations.
              </p>
              <p className="mb-3">
                <span className="font-medium">Usage data.</span> We collect information about how you interact with Coopr, including features used, preferences set, and conversations with the assistant. This helps us improve the product.
              </p>
              <p>
                <span className="font-medium">Waitlist information.</span> If you join our waitlist, we collect your email address to notify you when access is available.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">How we use your information</h2>
              <p>
                We use your information to provide and improve the Coopr service, generate personalized content strategy recommendations, analyze content performance, communicate with you about your account and our service, and comply with legal obligations. We do not sell your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Your content stays yours</h2>
              <p>
                Your content data, creative preferences, and generated insights belong to you. We do not use your individual content data to train models for other users. Your creative DNA profile and strategy recommendations are private to your account.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Third-party services</h2>
              <p>
                We integrate with social media platforms (such as Instagram) through their official APIs to access your content and engagement data. We also use third-party services to power our analysis features, and cloud hosting providers to store and process your data. Each third-party service is bound by its own privacy policy and our data processing agreements.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Data security</h2>
              <p>
                We implement industry-standard security measures to protect your information, including encryption in transit and at rest, access controls, and regular security reviews. No system is perfectly secure, but we take the protection of your data seriously.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Data retention and deletion</h2>
              <p>
                We retain your data for as long as your account is active. You can request deletion of your account and associated data at any time by contacting us. Upon deletion, we remove your personal information and content data within 30 days, except where retention is required by law.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Your rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, or delete your personal information, object to or restrict certain processing, request data portability, and withdraw consent. To exercise any of these rights, contact us at the address below.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Children's privacy</h2>
              <p>
                Coopr is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Changes to this policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the "last updated" date above.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Contact us</h2>
              <p>
                If you have questions about this privacy policy or your data, contact us at{' '}
                <a href="mailto:henry@getcoopr.com" className="text-coopr-serif underline underline-offset-2 hover:text-foreground transition-colors">henry@getcoopr.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-[9px] font-bold">C</span>
            </div>
            <span className="text-[13px] text-muted-foreground">Coopr by Lensofcoop LLC</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[13px] text-foreground font-medium">Privacy Policy</span>
            <a href="#/terms" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="mailto:henry@getcoopr.com" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Privacy
