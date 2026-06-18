import { useState, useEffect } from "react";
import { dbGetAll, dbAdd } from "../db.js";
import { Alert, Stars } from "./Shared.jsx";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name:"", rating:5, comment:"" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const all = await dbGetAll("reviews");
    setReviews(all.filter(r => r.status === "approved").sort((a,b) => new Date(b.date) - new Date(a.date)));
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!form.name.trim()) return setMsg({ type:"error", text:"Please enter your name." });
    if (!form.comment.trim()) return setMsg({ type:"error", text:"Please write your review." });
    setLoading(true);
    await dbAdd("reviews", { ...form, status:"pending", date:new Date().toISOString() });
    setMsg({ type:"info", text:"✅ Thank you! Your review will appear after admin approval." });
    setForm({ name:"", rating:5, comment:"" });
    setLoading(false);
  };

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#111100,#0d0d0d)", borderBottom:"1px solid rgba(255,214,0,.1)", padding:"64px 24px 52px", textAlign:"center" }}>
        <div className="section-label">Share Your Experience</div>
        <h1 className="section-title" style={{ marginBottom:12 }}>Customer Reviews</h1>
        <p style={{ color:"rgba(255,255,255,.45)", fontSize:15, maxWidth:520, margin:"0 auto" }}>Real feedback from real passengers. Your voice helps us serve better.</p>
      </div>

      <div style={{ padding:"48px 24px", background:"#0d0d0d" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="grid-2" style={{ marginBottom:48 }}>
            {[
              { emoji:"🚕", title:"Across India", desc:"From the tip of Tamil Nadu to the Himalayas — SANA CAB takes you anywhere.", bg:"linear-gradient(135deg,#1a1a00,#2a1a00)" },
              { emoji:"🌄", title:"Every Journey Matters", desc:"Whether a 5-minute local trip or a 1,000 km outstation — we care the same.", bg:"linear-gradient(135deg,#001a0d,#001a20)" },
              { emoji:"👨‍👩‍👧", title:"Family-Friendly Rides", desc:"Safe, comfortable, and spacious — perfect for family travel.", bg:"linear-gradient(135deg,#0d0020,#1a0020)" },
              { emoji:"💼", title:"Business Class Service", desc:"Professional, punctual, and presentable — ideal for corporate travel.", bg:"linear-gradient(135deg,#001a1a,#001228)" },
            ].map(c => (
              <div key={c.title} style={{ background:c.bg, border:"1px solid rgba(255,255,255,.07)", borderRadius:16, padding:"28px 24px", display:"flex", gap:20, alignItems:"flex-start" }}>
                <div style={{ fontSize:48, lineHeight:1 }}>{c.emoji}</div>
                <div>
                  <h3 style={{ fontWeight:800, fontSize:17, marginBottom:8 }}>{c.title}</h3>
                  <p style={{ color:"rgba(255,255,255,.45)", fontSize:13, lineHeight:1.7 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {reviews.length > 0 ? (
            <>
              <div style={{ textAlign:"center", marginBottom:32 }}>
                <div className="section-label">What Passengers Say</div>
                <h2 className="section-title">Verified Reviews</h2>
              </div>
              <div className="grid-3" style={{ marginBottom:56 }}>
                {reviews.map(r => (
                  <div key={r.id} className="card">
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#FFD600,#E6C000)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:16, color:"#0d0d0d" }}>{r.name[0].toUpperCase()}</div>
                      <Stars value={r.rating} size={18} />
                    </div>
                    <p style={{ color:"rgba(255,255,255,.6)", fontSize:13, lineHeight:1.7, marginBottom:12 }}>"{r.comment}"</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontWeight:700, fontSize:14 }}>{r.name}</span>
                      <span style={{ color:"rgba(255,255,255,.25)", fontSize:11 }}>{new Date(r.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"32px 0 56px" }}>
              <div style={{ fontSize:56, marginBottom:16 }}>⭐</div>
              <h3 style={{ fontWeight:700, marginBottom:8 }}>No Reviews Yet</h3>
              <p style={{ color:"rgba(255,255,255,.35)", fontSize:14 }}>Be the first to share your SANA CAB experience!</p>
            </div>
          )}

          <div className="glass" style={{ maxWidth:580, margin:"0 auto", padding:36 }}>
            <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:1, marginBottom:6 }}>Leave Your Review ✍️</h3>
            <p style={{ color:"rgba(255,255,255,.35)", fontSize:13, marginBottom:24 }}>Submitted reviews appear after admin approval.</p>
            {msg && <Alert type={msg.type} msg={msg.text} onClose={() => setMsg(null)} />}
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({...p,name:e.target.value}))} placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label className="form-label">Rating *</label>
              <Stars value={form.rating} onChange={v => setForm(p => ({...p,rating:v}))} size={28} />
            </div>
            <div className="form-group">
              <label className="form-label">Your Review *</label>
              <textarea style={{ height:100, resize:"vertical" }} value={form.comment} onChange={e => setForm(p => ({...p,comment:e.target.value}))} placeholder="Describe your experience with SANA CAB…" />
            </div>
            <button className="btn btn-yellow" style={{ width:"100%", padding:"13px" }} onClick={submit} disabled={loading}>
              {loading ? "Submitting…" : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
