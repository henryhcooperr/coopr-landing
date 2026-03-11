import { Button } from '@/components/ui/button'

function DataDeletion() {
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
            Data Deletion
          </h1>
          <p className="text-[14px] text-coopr-subtle mb-10">
            How to request deletion of your data from Coopr
          </p>

          <div className="space-y-8 text-[15px] leading-relaxed text-coopr-body">
            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Your right to deletion</h2>
              <p>
                You have the right to request deletion of all personal data and content data associated with your Coopr account at any time. This includes your profile information, connected social media data, content analysis results, creative DNA profile, and all generated recommendations.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">How to request data deletion</h2>
              <p className="mb-4">
                To request deletion of your data, send an email to{' '}
                <a href="mailto:henry@getcoopr.com?subject=Data%20Deletion%20Request" className="text-coopr-serif underline underline-offset-2 hover:text-foreground transition-colors">henry@getcoopr.com</a>{' '}
                with the subject line "Data Deletion Request" and include the email address associated with your account.
              </p>
              <p>
                You can also disconnect your Instagram account from Coopr at any time through your account settings, which will immediately stop all data collection from that account.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">What gets deleted</h2>
              <p>
                Upon receiving your request, we will delete: your account information and login credentials, all content data collected from your connected social media accounts, your creative DNA profile and preference data, all generated analysis and recommendations, conversation history with the Coopr assistant, and any other personal data associated with your account.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Timeline</h2>
              <p>
                We will process your deletion request within 30 days of receipt. You will receive a confirmation email once your data has been deleted. Some data may be retained for a limited period where required by law or for legitimate business purposes such as fraud prevention, after which it will also be deleted.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Facebook and Instagram data</h2>
              <p>
                If you signed up using Facebook Login or connected your Instagram account, you can also remove Coopr's access to your data through your Facebook Settings under Apps and Websites. Removing the app from Facebook will trigger an automatic data deletion request on our end.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Questions</h2>
              <p>
                If you have questions about data deletion, contact us at{' '}
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
            <a href="#/privacy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#/terms" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="mailto:henry@getcoopr.com" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DataDeletion
