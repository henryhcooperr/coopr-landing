interface NicheDemoFrameProps {
  active?: boolean;
  className?: string;
}

/* ---------- geometry helpers ---------- */

// 6 vertices of a regular hexagon inscribed in a circle of radius r, centered at (cx, cy)
// Top vertex is at 12 o'clock (-90 deg start)
function hexPoints(cx: number, cy: number, r: number): [number, number][] {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (i * 60 - 90);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });
}

function pointsToString(pts: [number, number][]): string {
  return pts.map(([x, y]) => `${x},${y}`).join(" ");
}

/* ---------- static data ---------- */

const LABELS = [
  "Storytelling",
  "Visual",
  "Trends",
  "Education",
  "Community",
  "Authority",
] as const;

// "You" polygon — pushed out beyond average on most axes
const YOU_POINTS: [number, number][] = [
  [100, 28],
  [162, 55],
  [155, 148],
  [100, 172],
  [48, 142],
  [38, 60],
];

// Niche average polygon — closer to center
const AVG_POINTS: [number, number][] = [
  [100, 52],
  [143, 72],
  [140, 135],
  [100, 155],
  [60, 132],
  [57, 75],
];

// Center point (for animation origin)
const CENTER: [number, number] = [100, 100];
const CENTER_POLYGON = Array(6).fill(CENTER) as [number, number][];

/* ---------- label positions ---------- */

// Hand-tuned positions for each axis label around the hex
const LABEL_POSITIONS: { x: number; y: number; anchor: string }[] = [
  { x: 100, y: 14, anchor: "middle" },       // top: Storytelling
  { x: 176, y: 48, anchor: "start" },         // top-right: Visual
  { x: 176, y: 162, anchor: "start" },        // bottom-right: Trends
  { x: 100, y: 190, anchor: "middle" },       // bottom: Education
  { x: 24, y: 162, anchor: "end" },           // bottom-left: Community
  { x: 24, y: 48, anchor: "end" },            // top-left: Authority
];

/* ---------- component ---------- */

export default function NicheDemoFrame({
  active = false,
  className,
}: NicheDemoFrameProps) {
  // Concentric hexagon grid rings
  const rings = [30, 50, 70]; // radii
  const cx = 100;
  const cy = 100;

  // Axis lines from center to each outer vertex
  const outerVertices = hexPoints(cx, cy, 70);

  return (
    <div className={className}>
      {/* App Frame wrapper */}
      <div className="app-frame">
        {/* Title bar */}
        <div className="app-frame-bar">
          <span className="app-frame-dot" />
          <span className="app-frame-dot" />
          <span className="app-frame-dot" />
          <span
            style={{
              marginLeft: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-3)",
              letterSpacing: "0.04em",
              userSelect: "none",
            }}
          >
            COOPR / DNA / Niche Position
          </span>
        </div>

        {/* Content */}
        <div className="app-frame-content" style={{ padding: 20 }}>
          {/* Radar Chart */}
          <svg
            viewBox="0 0 200 200"
            style={{
              width: "100%",
              maxWidth: 280,
              display: "block",
              margin: "0 auto",
            }}
          >
            {/* Grid rings — 3 concentric hexagons */}
            {rings.map((r) => (
              <polygon
                key={r}
                points={pointsToString(hexPoints(cx, cy, r))}
                fill="none"
                stroke="rgba(28,25,23,0.06)"
                strokeWidth={0.5}
              />
            ))}

            {/* Axis lines from center to each vertex */}
            {outerVertices.map(([vx, vy], i) => (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={vx}
                y2={vy}
                stroke="rgba(28,25,23,0.04)"
                strokeWidth={0.5}
              />
            ))}

            {/* Niche average polygon (amber, dashed) */}
            <polygon
              points={pointsToString(AVG_POINTS)}
              fill="rgba(245,158,11,0.06)"
              stroke="var(--amber)"
              strokeWidth={1}
              strokeDasharray="3 2"
            />

            {/* "You" polygon (teal, animated) */}
            <polygon
              points={pointsToString(active ? YOU_POINTS : CENTER_POLYGON)}
              fill="rgba(13,148,136,0.12)"
              stroke="var(--accent)"
              strokeWidth={1.5}
              style={{
                opacity: active ? 1 : 0,
                transformOrigin: `${cx}px ${cy}px`,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), points 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* SVG polygon points don't transition via CSS — use SMIL animate instead */}
              {active && (
                <animate
                  attributeName="points"
                  from={pointsToString(CENTER_POLYGON)}
                  to={pointsToString(YOU_POINTS)}
                  dur="0.8s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1"
                />
              )}
            </polygon>

            {/* Vertex dots for "You" polygon */}
            {YOU_POINTS.map(([px, py], i) => (
              <circle
                key={i}
                cx={active ? px : cx}
                cy={active ? py : cy}
                r={2.5}
                fill="var(--accent)"
                style={{
                  opacity: active ? 1 : 0,
                  transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.05}s, cx 0.8s cubic-bezier(0.16,1,0.3,1), cy 0.8s cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                {active && (
                  <>
                    <animate
                      attributeName="cx"
                      from={cx}
                      to={px}
                      dur="0.8s"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.16 1 0.3 1"
                    />
                    <animate
                      attributeName="cy"
                      from={cy}
                      to={py}
                      dur="0.8s"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.16 1 0.3 1"
                    />
                  </>
                )}
              </circle>
            ))}

            {/* Axis labels */}
            {LABELS.map((label, i) => (
              <text
                key={label}
                x={LABEL_POSITIONS[i].x}
                y={LABEL_POSITIONS[i].y}
                textAnchor={LABEL_POSITIONS[i].anchor}
                dominantBaseline="central"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  fill: "var(--text-3)",
                  userSelect: "none",
                }}
              >
                {label}
              </text>
            ))}
          </svg>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginTop: 16,
            }}
          >
            {/* You */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-3)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              You
            </div>

            {/* Niche avg */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-3)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  opacity: 0.5,
                }}
              />
              Niche avg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
