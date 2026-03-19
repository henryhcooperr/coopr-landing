import type { ReactNode } from "react";

interface BrowserWindowProps {
  url?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A realistic browser window chrome (Cult UI pattern).
 * Three traffic-light dots, a monospace URL bar, and a content area
 * that renders children.
 */
export function BrowserWindow({
  url = "app.getcoopr.com",
  children,
  className = "",
}: BrowserWindowProps) {
  return (
    <div
      className={className}
      style={{
        borderRadius: 12,
        border: "1px solid #E7E5E4",
        overflow: "hidden",
        boxShadow:
          "0 8px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        background: "#fff",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          background: "#F5F4F0",
          borderBottom: "1px solid #E7E5E4",
        }}
      >
        {/* Traffic light dots */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FF605C",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FFBD44",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#00CA4E",
            }}
          />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #E7E5E4",
            borderRadius: 6,
            padding: "5px 12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#78716C",
            userSelect: "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {url}
        </div>
      </div>

      {/* Content area */}
      <div style={{ background: "#fff" }}>{children}</div>
    </div>
  );
}

export default BrowserWindow;
