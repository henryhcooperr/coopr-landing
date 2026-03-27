import { motion, type Variants } from "motion/react";
import { MorphingText } from "@/components/ui/morphing-text";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { BlurFade } from "@/components/ui/blur-fade";
import { BrowserWindow } from "@/components/ui/browser-window";
import ChatDemoFrame from "@/components/demos/ChatDemoFrame";

/* ---------- Motion Variants ---------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---------- Static Data ---------- */

const MORPH_WORDS = ["CREATE.", "FILM.", "POST.", "SHARE."];

const AVATAR_URLS = [
  { imageUrl: "https://i.pravatar.cc/80?img=12", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/80?img=32", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/80?img=44", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/80?img=57", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/80?img=65", profileUrl: "#" },
];

/* ---------- Component ---------- */

interface HeroSectionProps {
  onCTAClick?: () => void;
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="hero-wrapper relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="hero-mesh-bg" aria-hidden="true" />

      {/* Warm aurora overlay */}
      <div className="hero-aurora" aria-hidden="true" />

      {/* Top spacer for nav clearance */}
      <div className="h-16 shrink-0" />

      {/* Staggered content */}
      <motion.div
        className="relative z-[1] flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="hero-badge">
            <AnimatedGradientText
              colorFrom="#d97706"
              colorTo="#f59e0b"
              speed={1.5}
            >
              Now in Early Access
            </AnimatedGradientText>
          </span>
        </motion.div>

        {/* Headline — two lines, both centered */}
        <motion.div variants={item} className="mt-8 w-full text-center">
          <h1 className="hero-h1">KNOW WHAT TO</h1>
          <div className="hero-morph-line">
            <MorphingText
              texts={MORPH_WORDS}
              className="hero-morph-text"
            />
          </div>
        </motion.div>

        {/* Subheadline */}
        <motion.p variants={item} className="hero-subtitle mt-6 max-w-[520px]">
          COOPR learns your creative voice, maps your niche, and tells you what
          will work&nbsp;&mdash; before you film.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemScale} className="mt-8">
          <ShimmerButton
            onClick={onCTAClick}
            background="oklch(0.62 0.16 65)"
            shimmerColor="rgba(255, 255, 255, 0.4)"
            shimmerSize="0.04em"
            borderRadius="12px"
            className="hero-cta-btn"
          >
            <span className="hero-cta-label">
              Request Early Access
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="ml-1"
              >
                <path
                  d="M3.333 8h9.334M8.667 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </ShimmerButton>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={item}
          className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <AvatarCircles
            avatarUrls={AVATAR_URLS}
            numPeople={84}
            className="hero-avatars"
          />
          <span className="hero-social-proof-text">
            creators on the waitlist
          </span>
        </motion.div>
      </motion.div>

      {/* Spacer */}
      <div className="h-12 shrink-0" />

      {/* Browser Frame with Chat Demo */}
      <BlurFade delay={0.9} duration={0.8} offset={40} direction="up">
        <div className="hero-browser-container">
          <BrowserWindow url="app.getcoopr.com/chat" className="hero-browser">
            <div className="hero-browser-content">
              <ChatDemoFrame />
            </div>
          </BrowserWindow>
        </div>
      </BlurFade>

      {/* Bottom breathing room */}
      <div className="h-20 shrink-0" />
    </section>
  );
}
