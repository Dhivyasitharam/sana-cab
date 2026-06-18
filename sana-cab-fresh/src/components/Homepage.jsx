import { MarqueeBanner } from "./Shared.jsx";

export default function Homepage({ onNav }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", padding:"80px 24px 60px" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#0d0d0d 0%,#111100 60%,#0d0d0d 100%)", zIndex:0 }} />
        <div style={{ position:"absolute", top:"15%", right:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,214,0,.08) 0%,transparent 70%)", zIndex:0 }} />
        <div style={{ position:"absolute", bottom:"5%", left:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,214,0,.05) 0%,transparent 70%)", zIndex:0 }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,214,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,214,0,.03) 1px,transparent 1px)", backgroundSize:"60px 60px", zIndex:0 }} />

        <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:700 }}>
            <div className="section-label fadeUp" style={{ animationDelay:".1s" }}>🚖 Chennai's Trusted Cab Service</div>
            <h1 className="fadeUp" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.8rem,7vw,6rem)", lineHeight:1.05, letterSpacing:2, marginBottom:20, animationDelay:".2s" }}>
              SANA CAB —<br />
              <span style={{ color:"#FFD600" }}>Reliable Cab</span><br />
              Service Across India
            </h1>
            <p className="fadeUp" style={{ color:"rgba(255,255,255,.55)", fontSize:17, lineHeight:1.75, marginBottom:36, maxWidth:520, animationDelay:".35s" }}>
              Safe, comfortable, and affordable cab services for local trips, outstation travel, airport transfers, family tours, and long-distance journeys across India.
            </p>
            <div className="fadeUp" style={{ display:"flex", gap:14, flexWrap:"wrap", animationDelay:".45s" }}>
              <button className="btn btn-yellow" onClick={() => onNav("booking")} style={{ fontSize:16, padding:"14px 34px", animation:"pulse 2.5s infinite" }}>
                🚕 Book Your Cab
              </button>
              <button className="btn btn-ghost" onClick={() => onNav("contact")}>
                📞 Contact Us
              </button>
            </div>
          </div>
          <div className="float hide-sm" style={{ position:"absolute", right:"0%", top:"10%", fontSize:160, opacity:.07, userSelect:"none", pointerEvents:"none" }}>🚖</div>
        </div>
      </div>

      <MarqueeBanner />

      {/* ABOUT OWNER */}
      <div className="section" style={{ background:"#111" }}>
        <div className="section-inner">
          <div style={{ display:"flex", gap:40, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ flex:"0 0 auto" }}>
              <div style={{ width:130, height:130, borderRadius:"50%", background:"linear-gradient(135deg,#FFD600,#E6C000)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:64, boxShadow:"0 0 0 8px rgba(255,214,0,.15)" }}>👨‍💼</div>
            </div>
            <div style={{ flex:1, minWidth:260 }}>
              <div className="section-label">Meet The Owner</div>
              <h2 className="section-title" style={{ marginBottom:6 }}>NAVEEN</h2>
              <p style={{ color:"#FFD600", fontWeight:700, fontSize:14, marginBottom:14, letterSpacing:.5 }}>Owner & Primary Driver · SANA CAB</p>
              <p style={{ color:"rgba(255,255,255,.6)", lineHeight:1.8, fontSize:15, maxWidth:580 }}>
                Naveen is the owner and primary driver of SANA CAB, currently working in Chennai. He is dedicated to providing safe, comfortable, reliable, and affordable cab services. With a customer-first approach and professional driving experience, he ensures a smooth and pleasant travel experience for every passenger.
              </p>
              <div style={{ display:"flex", gap:10, marginTop:20, flexWrap:"wrap" }}>
                {["✅ Safe & Reliable","🕐 24/7 Available","🇮🇳 Pan-India Service","💬 Customer-First"].map(b => (
                  <span key={b} style={{ background:"rgba(255,214,0,.08)", border:"1px solid rgba(255,214,0,.2)", color:"rgba(255,255,255,.7)", borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:600 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="section" style={{ background:"#0d0d0d" }}>
        <div className="section-inner" style={{ textAlign:"center" }}>
          <div className="section-label">What We Do</div>
          <h2 className="section-title" style={{ marginBottom:16 }}>All Over India Cab Services</h2>
          <p style={{ color:"rgba(255,255,255,.5)", fontSize:15, lineHeight:1.8, maxWidth:640, margin:"0 auto 48px" }}>
            We provide reliable cab services across India for local trips, outstation travel, family tours, business travel, airport transfers, and long-distance journeys.
          </p>
          <div className="grid-3">
            {[
              { icon:"✈️", title:"Airport Transfers", desc:"Punctual pick-up and drop for all flights across India.", color:"#60a5fa" },
              { icon:"🛣️", title:"Outstation Trips", desc:"Comfortable long-distance journeys to any destination.", color:"#34d399" },
              { icon:"👨‍👩‍👧‍👦", title:"Family Tours", desc:"Spacious, comfortable rides for your entire family.", color:"#FFD600" },
              { icon:"💼", title:"Business Travel", desc:"Professional, on-time service for corporate travelers.", color:"#f472b6" },
              { icon:"🏙️", title:"Local City Rides", desc:"Quick and affordable rides across Chennai and beyond.", color:"#a78bfa" },
              { icon:"🗺️", title:"Pan-India Routes", desc:"From Tamil Nadu to any state — we'll take you there.", color:"#fb923c" },
            ].map(s => (
              <div key={s.title} className="card" style={{ textAlign:"left", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-16, right:-16, width:72, height:72, borderRadius:"50%", background:`${s.color}12` }} />
                <div style={{ fontSize:36, marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:15, marginBottom:8, color:s.color }}>{s.title}</h3>
                <p style={{ color:"rgba(255,255,255,.45)", fontSize:13, lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VEHICLES */}
      <div className="section" style={{ background:"#111" }}>
        <div className="section-inner">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-label">Transport Fleet</div>
            <h2 className="section-title">Our Vehicles</h2>
            <p style={{ color:"rgba(255,255,255,.5)", fontSize:15, lineHeight:1.75, maxWidth:560, margin:"10px auto 0" }}>
              SANA CAB operates with the owner's personal car and a network of trusted friends' cars to provide reliable transportation services across India.
            </p>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:24, justifyContent:"center" }}>
            {[
              { emoji:"🚗", name:"Personal Sedan", desc:"Naveen's own well-maintained car — your primary ride.", tag:"Owner's Vehicle" },
              { emoji:"🚙", name:"Partner Vehicles", desc:"Carefully selected cars from trusted driver partners.", tag:"Network Fleet" },
            ].map(v => (
              <div key={v.name} className="card" style={{ flex:"1 1 280px", maxWidth:400, display:"flex", gap:20, alignItems:"center", borderLeft:"3px solid #FFD600" }}>
                <div style={{ fontSize:56 }}>{v.emoji}</div>
                <div>
                  <span style={{ background:"rgba(255,214,0,.1)", color:"#FFD600", border:"1px solid rgba(255,214,0,.2)", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700, display:"inline-block", marginBottom:8 }}>{v.tag}</span>
                  <h3 style={{ fontWeight:800, fontSize:17, marginBottom:6 }}>{v.name}</h3>
                  <p style={{ color:"rgba(255,255,255,.45)", fontSize:13, lineHeight:1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="section" style={{ background:"#0d0d0d" }}>
        <div className="section-inner" style={{ textAlign:"center" }}>
          <div className="section-label">Why Sana Cab</div>
          <h2 className="section-title" style={{ marginBottom:48 }}>Your Comfort Is Our Priority</h2>
          <div className="grid-2">
            {[
              { icon:"🛡️", t:"Safety First", d:"Every trip is driven with care and responsibility." },
              { icon:"⏰", t:"Always On Time", d:"We respect your time — punctuality is non-negotiable." },
              { icon:"💰", t:"Transparent Pricing", d:"Fair, upfront fares with no hidden charges." },
              { icon:"🌏", t:"Pan-India Coverage", d:"From Chennai to any corner of India — we'll go." },
            ].map(w => (
              <div key={w.t} className="card" style={{ display:"flex", gap:18, alignItems:"flex-start", textAlign:"left" }}>
                <div style={{ width:52, height:52, borderRadius:14, background:"rgba(255,214,0,.08)", border:"1px solid rgba(255,214,0,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{w.icon}</div>
                <div>
                  <h3 style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>{w.t}</h3>
                  <p style={{ color:"rgba(255,255,255,.45)", fontSize:13, lineHeight:1.6 }}>{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:"#FFD600", padding:"52px 24px" }}>
        <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2rem,5vw,3.2rem)", color:"#0d0d0d", letterSpacing:2, marginBottom:12 }}>Ready to Ride Across India?</h2>
          <p style={{ color:"rgba(0,0,0,.6)", fontSize:15, marginBottom:28 }}>Call us or book online — we're available 24/7 for you.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn" style={{ background:"#0d0d0d", color:"#FFD600", fontSize:15, padding:"13px 32px" }} onClick={() => onNav("booking")}>🚕 Book Your Cab</button>
            <a href="tel:+919790582382" className="btn btn-ghost" style={{ background:"rgba(0,0,0,.1)", color:"#0d0d0d", border:"2px solid rgba(0,0,0,.2)", fontWeight:700, fontSize:15, textDecoration:"none", padding:"13px 32px" }}>📞 Call Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
