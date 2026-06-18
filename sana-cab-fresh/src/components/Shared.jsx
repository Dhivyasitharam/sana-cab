import { useState } from "react";

export function Alert({ type, msg, onClose }) {
  if (!msg) return null;
  const map = {
    success: { bg: "rgba(52,211,153,.1)", border: "rgba(52,211,153,.25)", color: "#34d399" },
    error:   { bg: "rgba(239,68,68,.1)",  border: "rgba(239,68,68,.25)",  color: "#ef4444" },
    info:    { bg: "rgba(255,214,0,.1)",  border: "rgba(255,214,0,.25)",  color: "var(--yellow)" },
  };
  const c = map[type] || map.info;
  return (
    <div style={{ padding:"12px 16px", borderRadius:10, marginBottom:16, background:c.bg, border:`1px solid ${c.border}`, color:c.color, fontWeight:600, fontSize:13, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span>{msg}</span>
      <span style={{ cursor:"pointer", marginLeft:12, opacity:.6 }} onClick={onClose}>✕</span>
    </div>
  );
}

export function Stars({ value, onChange, size = 22 }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display:"flex", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i}
          style={{ fontSize:size, cursor:onChange?"pointer":"default", color:i<=(hover||value)?"#FFD600":"#333", transition:"all .15s", lineHeight:1 }}
          onClick={() => onChange && onChange(i)}
          onMouseEnter={() => onChange && setHover(i)}
          onMouseLeave={() => onChange && setHover(0)}>★</span>
      ))}
    </div>
  );
}

export function Loader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"80vh", flexDirection:"column", gap:20 }}>
      <div style={{ width:48, height:48, border:"4px solid rgba(255,214,0,.15)", borderTop:"4px solid #FFD600", borderRadius:"50%", animation:"spin .8s linear infinite" }} />
      <p style={{ color:"rgba(255,255,255,.3)", fontSize:12, fontWeight:700, letterSpacing:3, textTransform:"uppercase" }}>Loading Sana Cab…</p>
    </div>
  );
}

export function MarqueeBanner() {
  const items = ["🚕 All Over India Cab Services","✦","Safe & Reliable","✦","24/7 Available","✦","Chennai Based","✦","Book Now","✦","Affordable Fares","✦","Airport Transfers","✦","Outstation Trips","✦","Family Tours","✦","Business Travel","✦"];
  const full = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {full.map((t, i) => (
          <span key={i} className="marquee-item">
            {t === "✦" ? <span style={{ color:"#FFD600" }}>✦</span> : t}
          </span>
        ))}
      </div>
    </div>
  );
}
