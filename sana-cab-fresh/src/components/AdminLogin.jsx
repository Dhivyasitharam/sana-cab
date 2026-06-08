import { useState } from "react";
import { Alert } from "./Shared.jsx";

export default function AdminLogin({ onLogin }) {
  const [creds, setCreds] = useState({ user:"", pass:"" });
  const [err, setErr] = useState("");
  const go = () => {
    if (creds.user === "admin" && creds.pass === "admin123") onLogin();
    else setErr("Invalid credentials. Use admin / admin123");
  };
  return (
    <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div className="glass fadeIn" style={{ maxWidth:380, width:"100%", padding:40, textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#FFD600,#E6C000)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, margin:"0 auto 20px" }}>🔐</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:1, marginBottom:4 }}>Admin Login</h2>
        <p style={{ color:"rgba(255,255,255,.3)", fontSize:13, marginBottom:24 }}>SANA CAB Control Panel</p>
        {err && <Alert type="error" msg={err} onClose={() => setErr("")} />}
        <div className="form-group"><label className="form-label">Username</label><input value={creds.user} onChange={e => setCreds(p => ({...p,user:e.target.value}))} placeholder="admin" /></div>
        <div className="form-group"><label className="form-label">Password</label><input type="password" value={creds.pass} onChange={e => setCreds(p => ({...p,pass:e.target.value}))} placeholder="••••••••" onKeyDown={e => e.key==="Enter"&&go()} /></div>
        <button className="btn btn-yellow" style={{ width:"100%", marginTop:8 }} onClick={go}>Login to Dashboard</button>
        <p style={{ color:"rgba(255,255,255,.15)", fontSize:11, marginTop:14 }}>admin / admin123</p>
      </div>
    </div>
  );
}
