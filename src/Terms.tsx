import { Button } from '@/components/ui/button'
import { BrandLockup, BrandMark } from '@/components/shared/Brand'

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2">
            <BrandLockup />
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
            Terms of Service
          </h1>
          <p className="text-[14px] text-coopr-subtle mb-10">
            Last updated: March 10, 2026
          </p>

          <div className="space-y-8 text-[15px] leading-relaxed text-coopr-body">
            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Agreement to terms</h2>
              <p>
                By accessing or using Coopr ("the Service"), operated by Lensofcoop LLC ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Description of service</h2>
              <p>
                Coopr is a content strategy platform that analyzes your social media content, provides performance predictions, and generates personalized recommendations. The Service integrates with third-party platforms such as Instagram through their official APIs.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Eligibility</h2>
              <p>
                You must be at least 13 years of age to use the Service. By using the Service, you represent that you meet this requirement. If you are under 18, you must have the consent of a parent or legal guardian.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Your account</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Your content and data</h2>
              <p>
                You retain all ownership rights to your content. By connecting your social media accounts, you grant us a limited, non-exclusive license to access, analyze, and process your content solely for the purpose of providing the Service. We do not claim ownership of your content, creative identity profile, or generated recommendations. You may revoke access to your social media accounts at any time.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Acceptable use</h2>
              <p>
                You agree not to: reverse engineer, decompile, or attempt to extract the source code or algorithms of the Service; use the Service to develop a competing product; share account credentials with third parties; use automated means to access the Service beyond the intended interface; or use the Service for any unlawful purpose.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Third-party integrations</h2>
              <p>
                The Service integrates with third-party platforms including Instagram and Meta. Your use of these integrations is also subject to the terms and policies of those platforms. We are not responsible for changes to third-party APIs, terms, or availability that may affect the Service.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Recommendations disclaimer</h2>
              <p>
                The Service generates recommendations, predictions, and analysis. These outputs are provided for informational purposes and should not be relied upon as guarantees of performance. Actual results may vary. You are solely responsible for decisions made based on the Service's recommendations.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, Lensofcoop LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, arising from your use of the Service. Our total liability for any claim arising from these terms shall not exceed the amount you paid us in the twelve months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Disclaimer of warranties</h2>
              <p>
                The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that predictions or recommendations will be accurate.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Termination</h2>
              <p>
                We may suspend or terminate your access to the Service at any time for violation of these terms or for any other reason at our discretion. You may terminate your account at any time by contacting us. Upon termination, your right to use the Service ceases immediately, and we will delete your data in accordance with our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Changes to terms</h2>
              <p>
                We may update these terms from time to time. We will notify you of material changes by posting the updated terms on this page. Your continued use of the Service after changes constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Governing law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any disputes arising from these terms shall be resolved in the courts of San Francisco County, California.
              </p>
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">Contact</h2>
              <p>
                Questions about these terms? Contact us at{' '}
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
            <BrandMark className="h-5 w-5" />
            <span className="text-[13px] text-muted-foreground">Coopr by Lensofcoop LLC</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#/privacy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <span className="text-[13px] text-foreground font-medium">Terms</span>
            <a href="mailto:henry@getcoopr.com" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Terms
