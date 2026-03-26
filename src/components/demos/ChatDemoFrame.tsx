import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

type MessageRole = "user" | "coopr" | "thinking" | "block";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content?: string;
  typing?: boolean; // still being typed character-by-character
  block?: React.ReactNode;
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let _id = 0;
const uid = () => `msg-${++_id}`;

/* ─────────────────────────────────────────────
   Sub-components (blocks, sidebar, chrome)
   ───────────────────────────────────────────── */

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 py-2 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[6px] h-[6px] rounded-full"
          style={{
            background: "var(--teal, #0D9488)",
            animation: `think-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* --- Idea Evaluation Block --- */
function IdeaEvalBlock() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--bg-elevated, #fff)",
        border: "1px solid var(--border-v5, rgba(28,25,23,0.08))",
        borderLeft: "3px solid var(--teal, #0D9488)",
      }}
    >
      <div className="px-4 pt-3.5 pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="font-accent italic text-[13px]"
            style={{ color: "var(--teal, #0D9488)" }}
          >
            Idea Evaluation
          </span>
          <span
            className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "var(--teal-soft, rgba(13,148,136,0.08))",
              color: "var(--teal, #0D9488)",
            }}
          >
            Strong 8.2/10
          </span>
        </div>
        <p
          className="text-[12px] leading-relaxed mb-3"
          style={{ color: "var(--fg-2, #57534E)" }}
        >
          High search volume for this format. Your existing content style is a
          strong fit. Gap exists in short-form
          &ldquo;mistake reveal&rdquo; structure.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "Niche fit: 92%", color: "var(--teal, #0D9488)", bg: "var(--teal-soft, rgba(13,148,136,0.08))" },
            { label: "Gap: Medium", color: "var(--amber, #D97706)", bg: "var(--amber-soft, rgba(245,158,11,0.08))" },
            { label: "Strength: Process", color: "var(--violet, #7C3AED)", bg: "var(--violet-soft, rgba(124,62,237,0.08))" },
          ].map((tag) => (
            <span
              key={tag.label}
              className="font-mono text-[9px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: tag.bg, color: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Hook Cards Block --- */
function HookCardsBlock() {
  return (
    <div className="flex flex-col gap-2">
      {/* Hook 1 — highlighted */}
      <div
        className="rounded-xl px-3.5 py-3 hk-glow"
        style={{
          background: "var(--bg-elevated, #fff)",
          border: "1.5px solid var(--teal, #0D9488)",
          boxShadow: "0 0 0 1px var(--teal, #0D9488), 0 2px 12px rgba(13,148,136,0.1)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--fg, #1C1917)" }}>
              &ldquo;The one mistake everyone makes &mdash; and the tiny fix that
              changes everything&rdquo;
            </p>
          </div>
          <span
            className="font-mono text-[10px] font-semibold shrink-0 px-2 py-0.5 rounded-full"
            style={{
              background: "var(--teal-soft, rgba(13,148,136,0.08))",
              color: "var(--teal, #0D9488)",
            }}
          >
            84% hold
          </span>
        </div>
      </div>
      {/* Hook 2 — normal */}
      <div
        className="rounded-xl px-3.5 py-3"
        style={{
          background: "var(--bg-elevated, #fff)",
          border: "1px solid var(--border-v5, rgba(28,25,23,0.08))",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--fg, #1C1917)" }}>
              &ldquo;3 things silently hurting your results &mdash; most creators
              skip #2 entirely&rdquo;
            </p>
          </div>
          <span
            className="font-mono text-[10px] font-semibold shrink-0 px-2 py-0.5 rounded-full"
            style={{
              background: "var(--bg-warm, #F5F4F0)",
              color: "var(--fg-2, #57534E)",
            }}
          >
            76% hold
          </span>
        </div>
      </div>
      {/* Voice match */}
      <div className="flex items-center gap-1.5 pt-1 px-0.5">
        <span
          className="w-[5px] h-[5px] rounded-full"
          style={{ background: "var(--emerald, #16A34A)" }}
        />
        <span className="font-mono text-[9px]" style={{ color: "var(--fg-3, #A8A29E)" }}>
          Voice match: 94% &mdash; sounds like you
        </span>
      </div>
    </div>
  );
}

/* --- Research Report Block --- */
function ResearchReportBlock() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--bg-elevated, #fff)",
        border: "1px solid var(--border-v5, rgba(28,25,23,0.08))",
        borderLeft: "3px solid var(--blue, #2563EB)",
      }}
    >
      <div className="px-4 pt-3.5 pb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-display text-[13px] font-bold" style={{ color: "var(--fg, #1C1917)" }}>
            Niche Trend Analysis
          </span>
          <span
            className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "var(--blue-soft, rgba(37,99,235,0.08))",
              color: "var(--blue, #2563EB)",
            }}
          >
            High confidence
          </span>
        </div>
        <p className="font-mono text-[9px] mb-3" style={{ color: "var(--fg-3, #A8A29E)" }}>
          8 sources &middot; 63 posts scanned &middot; 4 min read
        </p>
        {/* Finding 1 */}
        <div className="mb-2.5">
          <p className="text-[11px] font-semibold mb-0.5" style={{ color: "var(--fg, #1C1917)" }}>
            1. Behind-the-process format surging
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--fg-2, #57534E)" }}>
            First-person &ldquo;how I made this&rdquo; Reels outperform
            polished showcase posts by 2.4x on saves.
          </p>
        </div>
        {/* Finding 2 */}
        <div>
          <p className="text-[11px] font-semibold mb-0.5" style={{ color: "var(--fg, #1C1917)" }}>
            2. Story-first hooks trending up
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--fg-2, #57534E)" }}>
            Opening with a personal failure or mistake before the reveal drives 38% higher
            share rate vs straight-to-value content.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- Creator Cards Block --- */
function CreatorCardsBlock() {
  const creators = [
    {
      name: "CreativeStudio",
      type: "Competitor",
      color: "var(--teal, #0D9488)",
      bg: "var(--teal-soft, rgba(13,148,136,0.08))",
      borderColor: "rgba(13,148,136,0.18)",
      stats: "82K \u00B7 4.8% eng",
      initial: "CS",
    },
    {
      name: "MakerPulse",
      type: "Inspiration",
      color: "var(--violet, #7C3AED)",
      bg: "var(--violet-soft, rgba(124,62,237,0.08))",
      borderColor: "rgba(124,62,237,0.18)",
      stats: "210K \u00B7 3.2% eng",
      initial: "MP",
    },
    {
      name: "ContentFlow",
      type: "Rising",
      color: "var(--amber, #D97706)",
      bg: "var(--amber-soft, rgba(245,158,11,0.08))",
      borderColor: "rgba(217,119,6,0.18)",
      stats: "31K \u00B7 7.1% eng",
      initial: "CF",
    },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      {creators.map((c) => (
        <div
          key={c.name}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2"
          style={{
            background: c.bg,
            border: `1px solid ${c.borderColor}`,
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
            style={{ background: c.color }}
          >
            {c.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold" style={{ color: "var(--fg, #1C1917)" }}>
              {c.name}
            </p>
            <p className="font-mono text-[9px]" style={{ color: c.color }}>
              {c.type}
            </p>
          </div>
          <span className="font-mono text-[9px] shrink-0" style={{ color: "var(--fg-2, #57534E)" }}>
            {c.stats}
          </span>
        </div>
      ))}
    </div>
  );
}

/* --- Sidebar --- */

interface SidebarConvo {
  label: string;
  sub: string;
  dotColor: string;
}

function Sidebar({ activeIndex }: { activeIndex: number }) {
  const convos: SidebarConvo[] = [
    { label: "Workout hook ideas", sub: "Working on hooks\u2026", dotColor: "var(--teal, #0D9488)" },
    { label: "Niche trend research", sub: "8 creators found", dotColor: "var(--blue, #2563EB)" },
  ];

  const pages = [
    { label: "DNA", color: "var(--violet, #7C3AED)" },
    { label: "Pulse", color: "var(--amber, #D97706)" },
    { label: "Studio", color: "var(--emerald, #16A34A)" },
    { label: "Library", color: "var(--rose, #E11D48)" },
  ];

  return (
    <div
      className="hidden md:flex flex-col shrink-0"
      style={{
        width: 210,
        background: "var(--bg-warm, #F5F4F0)",
        borderRight: "1px solid var(--border-v5, rgba(28,25,23,0.08))",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <div
          className="w-[22px] h-[22px] rounded-md flex items-center justify-center"
          style={{ background: "var(--fg, #1C1917)" }}
        >
          <span className="text-[10px] font-bold text-white font-display">C</span>
        </div>
        <span className="font-display text-[14px] font-bold tracking-tight" style={{ color: "var(--fg, #1C1917)" }}>
          COOPR
        </span>
        <span
          className="w-[7px] h-[7px] rounded-full ml-auto"
          style={{
            background: "var(--emerald, #16A34A)",
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Conversations */}
      <div className="px-3 pt-2">
        <p
          className="font-mono text-[9px] font-medium uppercase tracking-[0.1em] px-1 mb-2"
          style={{ color: "var(--fg-3, #A8A29E)" }}
        >
          Conversations
        </p>
        <div className="flex flex-col gap-0.5">
          {convos.map((c, i) => (
            <div
              key={c.label}
              className="flex items-center gap-2 px-2 py-2 rounded-md transition-colors duration-200"
              style={{
                background: i === activeIndex ? "rgba(255,255,255,0.7)" : "transparent",
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full shrink-0"
                style={{ background: c.dotColor }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-[11px] font-medium truncate"
                  style={{
                    color: i === activeIndex ? "var(--fg, #1C1917)" : "var(--fg-2, #57534E)",
                  }}
                >
                  {c.label}
                </p>
                <p className="font-mono text-[9px] truncate" style={{ color: "var(--fg-3, #A8A29E)" }}>
                  {c.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="mx-3 my-3" style={{ height: 1, background: "var(--border-v5, rgba(28,25,23,0.08))" }} />

      {/* Pages */}
      <div className="px-3">
        <p
          className="font-mono text-[9px] font-medium uppercase tracking-[0.1em] px-1 mb-2"
          style={{ color: "var(--fg-3, #A8A29E)" }}
        >
          Pages
        </p>
        <div className="flex flex-col gap-0.5">
          {pages.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md"
              style={{ cursor: "default" }}
            >
              <span
                className="w-[5px] h-[5px] rounded-sm shrink-0"
                style={{ background: p.color }}
              />
              <span className="text-[11px]" style={{ color: "var(--fg-2, #57534E)" }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Input Bar --- */
function InputBar({ text, typing }: { text: string; typing: boolean }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 mx-3 mb-3 rounded-lg"
      style={{
        background: "var(--bg-warm, #F5F4F0)",
        border: "1px solid var(--border-v5, rgba(28,25,23,0.08))",
      }}
    >
      {/* + button */}
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
        style={{
          border: "1px solid var(--border-v5, rgba(28,25,23,0.08))",
          color: "var(--fg-3, #A8A29E)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {/* Text area */}
      <div className="flex-1 min-w-0 relative">
        {text ? (
          <span className="text-[12px]" style={{ color: "var(--fg, #1C1917)" }}>
            {text}
            {typing && <span className="tcur tcur--dark" />}
          </span>
        ) : (
          <span className="text-[12px]" style={{ color: "var(--fg-3, #A8A29E)" }}>
            Message COOPR...
          </span>
        )}
      </div>
      {/* Mode badge */}
      <span
        className="font-mono text-[9px] font-medium px-2 py-0.5 rounded-full shrink-0"
        style={{
          background: "var(--teal-soft, rgba(13,148,136,0.08))",
          color: "var(--teal, #0D9488)",
        }}
      >
        Creative
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main ChatDemoFrame
   ───────────────────────────────────────────── */

export default function ChatDemoFrame() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [inputTyping, setInputTyping] = useState(false);
  const [activeConvo, setActiveConvo] = useState(0);
  const [toolCount, setToolCount] = useState(0);
  const [convoTitle, setConvoTitle] = useState("Workout hook ideas");
  /* Generation counter: increments on every mount. Async work checks its
     captured generation against the current ref — if they diverge, it means
     the effect was cleaned up (StrictMode remount or real unmount). */
  const genRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, inputText]);

  /* ── Helpers (all accept a `gen` token to check staleness) ── */

  const isCancelled = useCallback((gen: number) => genRef.current !== gen, []);

  const guardedSleep = useCallback(
    async (ms: number, gen: number) => {
      await sleep(ms);
      return isCancelled(gen);
    },
    [isCancelled],
  );

  const addMessage = useCallback(
    (msg: Omit<ChatMessage, "id">) => {
      const id = uid();
      setMessages((prev) => [...prev, { ...msg, id }]);
      return id;
    },
    [],
  );

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  /** Types text character-by-character into the input bar. Does NOT clear the
      input — the caller adds the user message first, then clears. */
  const typeInInput = useCallback(
    async (text: string, gen: number) => {
      setInputTyping(true);
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled(gen)) return;
        setInputText(text.slice(0, i));
        await sleep(30);
      }
      await sleep(200);
      if (isCancelled(gen)) return;
      setInputTyping(false);
    },
    [isCancelled],
  );

  const showThinking = useCallback(
    async (durationMs: number, gen: number) => {
      const id = addMessage({ role: "thinking" });
      await sleep(durationMs);
      if (!isCancelled(gen)) removeMessage(id);
    },
    [addMessage, removeMessage, isCancelled],
  );

  const typeAsCoopr = useCallback(
    async (text: string, gen: number) => {
      const id = uid();
      setMessages((prev) => [
        ...prev,
        { id, role: "coopr", content: "", typing: true },
      ]);
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled(gen)) return;
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, content: text.slice(0, i) } : m)),
        );
        await sleep(30);
      }
      // Remove typing indicator
      if (!isCancelled(gen)) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, typing: false } : m)),
        );
      }
    },
    [isCancelled],
  );

  /** Clear everything between scenarios so the next one starts fresh. */
  const resetChat = useCallback(async (gen: number) => {
    // Brief pause so the viewer registers the scenario is ending
    if (await guardedSleep(800, gen)) return;
    setMessages([]);
    setInputText("");
    setInputTyping(false);
    setToolCount(0);
    // Small pause with empty chat before the next scenario begins
    if (await guardedSleep(600, gen)) return;
  }, [guardedSleep]);

  /* ── Scenario 1: The Idea Test ── */
  const runScenario1 = useCallback(async (gen: number) => {
    if (isCancelled(gen)) return;
    setActiveConvo(0);
    setConvoTitle("Workout hook ideas");
    setToolCount(0);
    setMessages([]);
    setInputText("");

    // 1. User types in input
    await typeInInput(
      "I have an idea \u2014 workout mistakes most people make without realizing",
      gen,
    );
    if (isCancelled(gen)) return;

    // 2. User message bubble (add message, THEN clear input)
    addMessage({
      role: "user",
      content:
        "I have an idea \u2014 workout mistakes most people make without realizing",
    });
    setInputText("");
    if (await guardedSleep(400, gen)) return;

    // 3. Thinking
    setToolCount(2);
    await showThinking(1200, gen);
    if (isCancelled(gen)) return;

    // 4. Idea eval block
    addMessage({ role: "block", block: <IdeaEvalBlock /> });
    if (await guardedSleep(1600, gen)) return;

    // 5. User types second message
    await typeInInput("Love it. Work on hooks.", gen);
    if (isCancelled(gen)) return;

    // 6. Add user message, then clear input
    addMessage({ role: "user", content: "Love it. Work on hooks." });
    setInputText("");
    if (await guardedSleep(400, gen)) return;

    // 7. Thinking
    setToolCount(4);
    await showThinking(1200, gen);
    if (isCancelled(gen)) return;

    // 8. Hook cards
    addMessage({ role: "block", block: <HookCardsBlock /> });

    // 9. Pause to let viewer read
    if (await guardedSleep(5000, gen)) return;
  }, [addMessage, showThinking, typeInInput, isCancelled, guardedSleep]);

  /* ── Scenario 2: The Niche Scout ── */
  const runScenario2 = useCallback(async (gen: number) => {
    if (isCancelled(gen)) return;
    setActiveConvo(1);
    setConvoTitle("Niche trend research");
    setToolCount(0);
    setMessages([]);
    setInputText("");

    // 1. User types
    await typeInInput(
      "What\u2019s trending in my niche right now? Who should I watch?",
      gen,
    );
    if (isCancelled(gen)) return;

    // 2. User message
    addMessage({
      role: "user",
      content: "What\u2019s trending in my niche right now? Who should I watch?",
    });
    setInputText("");
    if (await guardedSleep(400, gen)) return;

    // 3. Thinking
    setToolCount(3);
    await showThinking(1500, gen);
    if (isCancelled(gen)) return;

    // 4. Research report
    addMessage({ role: "block", block: <ResearchReportBlock /> });
    setToolCount(5);
    if (await guardedSleep(1800, gen)) return;

    // 5. Creator cards
    addMessage({ role: "block", block: <CreatorCardsBlock /> });
    setToolCount(6);
    if (await guardedSleep(1200, gen)) return;

    // 6. COOPR types a response
    await typeAsCoopr(
      "Saved. ContentFlow is worth watching closely \u2014 7.1% engagement at 31K is exceptional.",
      gen,
    );
    if (isCancelled(gen)) return;

    // Pause to let viewer read
    if (await guardedSleep(5000, gen)) return;
  }, [addMessage, showThinking, typeInInput, typeAsCoopr, isCancelled, guardedSleep]);

  /* ── Main loop ── */
  useEffect(() => {
    const gen = ++genRef.current;

    const loop = async () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await resetChat(gen);
        if (isCancelled(gen)) break;
        await runScenario1(gen);
        if (isCancelled(gen)) break;
        await resetChat(gen);
        if (isCancelled(gen)) break;
        await runScenario2(gen);
        if (isCancelled(gen)) break;
      }
    };

    loop();

    return () => {
      // Incrementing gen makes all in-flight isCancelled(oldGen) return true
      genRef.current++;
    };
  }, [runScenario1, runScenario2, resetChat, isCancelled]);

  /* ── Render ── */
  return (
    <div
      className="flex w-full h-full overflow-hidden select-none"
      style={{ background: "var(--bg-page, #F4F3F0)", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* Sidebar */}
      <Sidebar activeIndex={activeConvo} />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 shrink-0"
          style={{
            borderBottom: "1px solid var(--border-v5, rgba(28,25,23,0.08))",
          }}
        >
          <span
            className="font-display text-[13px] font-bold tracking-tight"
            style={{ color: "var(--fg, #1C1917)" }}
          >
            {convoTitle}
          </span>
          {toolCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-mono text-[9px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: "var(--teal-soft, rgba(13,148,136,0.08))",
                color: "var(--teal, #0D9488)",
              }}
            >
              {toolCount} tools used
            </motion.span>
          )}
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-3 chat-demo-scroll"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {/* Hide webkit scrollbar on the scroll container */}
          <style>{`
            .chat-demo-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="flex flex-col gap-2.5">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* User bubble */}
                  {msg.role === "user" && (
                    <div className="flex justify-end">
                      <div
                        className="max-w-[80%] px-3.5 py-2.5 text-[12px] leading-relaxed"
                        style={{
                          background: "var(--fg, #1C1917)",
                          color: "#fff",
                          borderRadius: "16px 16px 4px 16px",
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  )}

                  {/* COOPR text response */}
                  {msg.role === "coopr" && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "var(--fg, #1C1917)" }}
                        >
                          <span className="text-[8px] font-bold text-white font-display">C</span>
                        </div>
                        <div>
                          <span
                            className="font-mono text-[9px] uppercase tracking-[0.08em] block mb-1"
                            style={{ color: "var(--teal, #0D9488)" }}
                          >
                            COOPR
                          </span>
                          <p className="text-[12px] leading-relaxed" style={{ color: "var(--fg, #1C1917)" }}>
                            {msg.content}
                            {msg.typing && <span className="tcur tcur--dark" />}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Thinking indicator */}
                  {msg.role === "thinking" && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "var(--fg, #1C1917)" }}
                        >
                          <span className="text-[8px] font-bold text-white font-display">C</span>
                        </div>
                        <ThinkingDots />
                      </div>
                    </div>
                  )}

                  {/* Block (rich content) */}
                  {msg.role === "block" && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[90%] w-full">
                        <div className="w-5 shrink-0" /> {/* spacer to align with avatar */}
                        <div className="flex-1 min-w-0">{msg.block}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Input bar */}
        <InputBar text={inputText} typing={inputTyping} />
      </div>
    </div>
  );
}
