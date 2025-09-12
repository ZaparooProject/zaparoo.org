import React, { useState } from "react";
import QRCode from "react-qr-code";
import clsx from "clsx";

type QRCodeGeneratorProps = {
  className?: string;
};

export default function QRCodeGenerator({ className }: QRCodeGeneratorProps) {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);

  return (
    <div className={clsx("qr-code-generator", className)}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="zapscript-input" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Enter ZapScript:
        </label>
        <input
          id="zapscript-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., **launch.random:genesis"
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid var(--ifm-color-emphasis-300)",
            borderRadius: "4px",
            fontSize: "1rem"
          }}
        />
      </div>
      
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="size-slider" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Size: {size}px
        </label>
        <input
          id="size-slider"
          type="range"
          min="128"
          max="512"
          step="32"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      {text && (
        <div style={{ textAlign: "center", padding: "1rem", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "4px" }}>
          <QRCode value={text} size={size} />
        </div>
      )}
    </div>
  );
}