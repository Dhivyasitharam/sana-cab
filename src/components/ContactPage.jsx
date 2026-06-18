export default function ContactPage({ onNav }) {
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#111100,#0d0d0d)", borderBottom:"1px solid rgba(255,214,0,.1)", padding:"64px 24px 52px", textAlign:"center" }}>
        <div className="section-label">Reach Out</div>
        <h1 className="section-title" style={{ marginBottom:12 }}>Contact Us</h1>
        <p style={{ color:"rgba(255,255,255,.45)", fontSize:15, maxWidth:480, margin:"0 auto" }}>We're available 24/7. Call, message, or email — we'll respond fast.</p>
      </div>

      <div className="section" style={{ background:"#0d0d0d" }}>
        <div className="section-inner">
          <div className="grid-2" style={{ gap:32, alignItems:"start" }}>
            <div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:1, marginBottom:28 }}>Get In Touch</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[
                  { icon:"📞", label:"Phone / WhatsApp", value:"+91 97905 82382", href:"tel:+919790582382", color:"#34d399" },
                  { icon:"📧", label:"Email", value:"kumarsandhiya561@gmail.com", href:"mailto:kumarsandhiya561@gmail.com", color:"#60a5fa" },
                  { icon:"📍", label:"Base Location", value:"Chennai, Tamil Nadu, India", color:"#FFD600" },
                  { icon:"🕐", label:"Availability", value:"24 / 7 — Always Available", color:"#f472b6" },
                  { icon:"🌏", label:"Service Area", value:"All Over India", color:"#a78bfa" },
                ].map(c => (
                  <div key={c.label} style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:14, padding:"18px 20px", display:"flex", gap:16, alignItems:"center" }}>
                    <div style={{ width:48, height:48, borderRadius:12, background:`${c.color}15`, border:`1px solid ${c.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.8, color:"rgba(255,255,255,.3)", marginBottom:3 }}>{c.label}</div>
                      {c.href ? <a href={c.href} style={{ color:c.color, fontWeight:700, fontSize:15, textDecoration:"none" }}>{c.value}</a> : <div style={{ color:c.color, fontWeight:700, fontSize:15 }}>{c.value}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ background:"#FFD600", borderRadius:20, padding:"36px 32px", textAlign:"center", marginBottom:20 }}>
                <div style={{ fontSize:52, marginBottom:16 }}>🚕</div>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#0d0d0d", letterSpacing:1, marginBottom:10 }}>Need a Cab Right Now?</h3>
                <p style={{ color:"rgba(0,0,0,.6)", fontSize:14, marginBottom:24, lineHeight:1.6 }}>Call us directly for instant booking or use our online form.</p>
                <a href="tel:+919790582382" className="btn" style={{ background:"#0d0d0d", color:"#FFD600", width:"100%", justifyContent:"center", fontSize:16, padding:"13px", display:"flex", textDecoration:"none" }}>📞 Call +91 97905 82382</a>
              </div>
              <button className="btn btn-outline" style={{ width:"100%", justifyContent:"center", padding:"13px" }} onClick={() => onNav("booking")}>
                📋 Book Online Instead →
              </button>
              <div style={{ marginTop:20, background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:14, padding:20 }}>
                <h4 style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>🗺️ We Cover</h4>
                {["Local trips within Chennai","Airport transfers (all airports)","Outstation — any state","Long-distance pan-India routes","Family & group tours","Corporate travel"].map(s => (
                  <div key={s} style={{ display:"flex", gap:10, alignItems:"center", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,.05)", fontSize:13, color:"rgba(255,255,255,.55)" }}>
                    <span style={{ color:"#FFD600" }}>✓</span> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
