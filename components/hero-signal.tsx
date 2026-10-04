/** An abstract system diagram, not a visualization of measured project results. */
export function HeroSignal() {
  return (
    <div className="hero-signal" aria-hidden="true">
      <div className="signal-caption">
        <span>SIGNAL / SYSTEM / INSIGHT</span>
        <span>AP—01</span>
      </div>
      <svg viewBox="0 0 520 350" fill="none" className="signal-map">
        <defs>
          <pattern
            id="signal-grid"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 26 0 L 0 0 0 26" stroke="#243344" strokeWidth=".6" />
          </pattern>
          <linearGradient id="signal-line">
            <stop stopColor="#516d8c" />
            <stop offset=".52" stopColor="#b2d4ff" />
            <stop offset="1" stopColor="#6b8ca6" />
          </linearGradient>
        </defs>
        <rect width="520" height="350" fill="url(#signal-grid)" opacity=".5" />
        <g stroke="#364a61" strokeWidth="1.2">
          <path d="M36 87H125L205 175" />
          <path d="M36 175H205" />
          <path d="M36 263H125L205 175" />
          <path d="M315 175L391 87H480" />
          <path d="M315 175H480" />
          <path d="M315 175L391 263H480" />
        </g>
        <g
          className="signal-packets"
          stroke="url(#signal-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path pathLength="100" d="M36 87H125L205 175" />
          <path pathLength="100" d="M36 175H205" />
          <path pathLength="100" d="M36 263H125L205 175" />
          <path pathLength="100" d="M315 175L391 87H480" />
          <path pathLength="100" d="M315 175H480" />
          <path pathLength="100" d="M315 175L391 263H480" />
        </g>
        <g className="signal-orbit" stroke="#516d8c">
          <rect
            x="181"
            y="96"
            width="158"
            height="158"
            rx="31"
            transform="rotate(45 260 175)"
            strokeDasharray="3 9"
          />
        </g>
        <rect
          x="207"
          y="122"
          width="106"
          height="106"
          rx="18"
          fill="#14202e"
          stroke="#7c9fca"
        />
        <rect
          x="218"
          y="133"
          width="84"
          height="84"
          rx="12"
          fill="#101821"
          stroke="#334961"
        />
        <g className="signal-core" stroke="#bbd8ff" strokeWidth="1.5">
          <path d="M238 185V161h14v24h14v-24h16" />
          <path d="M238 196h44" stroke="#6c8daa" />
        </g>
        <g fill="#152234" stroke="#88a9cf">
          <circle cx="36" cy="87" r="5" />
          <circle cx="36" cy="175" r="5" />
          <circle cx="36" cy="263" r="5" />
          <circle cx="480" cy="87" r="5" />
          <circle cx="480" cy="175" r="5" />
          <circle cx="480" cy="263" r="5" />
        </g>
        <g
          fill="#aebfce"
          fontSize="11"
          fontFamily="monospace"
          letterSpacing="1"
        >
          <text x="35" y="65">
            DATA
          </text>
          <text x="35" y="153">
            CONTEXT
          </text>
          <text x="35" y="241">
            EVENTS
          </text>
          <text x="480" y="65" textAnchor="end">
            SOFTWARE
          </text>
          <text x="480" y="153" textAnchor="end">
            APPLIED AI
          </text>
          <text x="480" y="241" textAnchor="end">
            ANALYTICS
          </text>
        </g>
        <g stroke="#627e9d">
          <path d="M249 25h22M260 14v22M249 325h22M260 314v22" />
        </g>
      </svg>
      <div className="signal-footer">
        <span>Complex inputs.</span>
        <span>Useful systems.</span>
      </div>
    </div>
  );
}
