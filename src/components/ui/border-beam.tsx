import { useId } from "react";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

/**
 * An animated light beam that travels around a container's border.
 * Place inside a `position: relative; overflow: hidden` parent.
 *
 * Uses a CSS `conic-gradient` rotated via `@property`-backed animation
 * so the GPU handles the work — zero JS per frame.
 */
export function BorderBeam({
  size = 200,
  duration = 15,
  delay = 0,
  colorFrom = "#0D9488",
  colorTo = "#7C3AED",
  className = "",
}: BorderBeamProps) {
  const id = useId();
  const safeId = id.replace(/:/g, "");
  const propName = `--border-beam-angle-${safeId}`;
  const animName = `border-beam-${safeId}`;

  return (
    <>
      <style>{`
        @property ${propName} {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes ${animName} {
          from { ${propName}: 0deg; }
          to   { ${propName}: 360deg; }
        }
      `}</style>
      <div
        className={className}
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: "inherit",
          padding: 2,
          pointerEvents: "none",
          // Mask: show only the 2px border ring
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          background: `conic-gradient(
            from var(${propName}, 0deg),
            transparent,
            transparent 50%,
            ${colorFrom} 72%,
            ${colorTo} 88%,
            transparent
          )`,
          backgroundSize: `${size}% ${size}%`,
          backgroundPosition: "center",
          animation: `${animName} ${duration}s linear ${delay}s infinite`,
        }}
      />
    </>
  );
}

export default BorderBeam;
