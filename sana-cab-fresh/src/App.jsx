import { useState, useEffect } from "react";
import { injectCSS } from "./styles.js";
import { openDB } from "./db.js";
import { Loader } from "./components/Shared.jsx";
import Homepage from "./components/Homepage.jsx";
import BookingPage from "./components/BookingPage.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import ReviewsPage from "./components/ReviewsPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [adminAuth, setAdminAuth] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    injectCSS();
    openDB().then(() => setReady(true));
  }, []);

  if (!ready) return <Loader />;

  const nav = [
    { id:"home",     label:"Home",         icon:"🏠" },
    { id:"booking",  label:"Book a Cab",   icon:"🚕" },
    { id:"register", label:"Register Cab", icon:"📋" },
    { id:"reviews",  label:"Reviews",      icon:"⭐" },
    { id:"contact",  label:"Contact",      icon:"📞" },
    { id:"admin",    label:"Admin",        icon:"🔐" },
  ];

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", minHeight:"100vh", background:"#0d0d0d", color:"#f5f5f5" }}>

      {/* NAVBAR */}
      <nav style={{ background:"rgba(13,13,13,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,214,0,.1)", padding:"0 24px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => setPage("home")}>
          <div style={{ width:38, height:38, borderRadius:10, background:"#FFD600", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:"#0d0d0d" }}>🚖</div>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2 }}>SANA <span style={{ color:"#FFD600" }}>CAB</span></span>
        </div>
        <div style={{ display:"flex", gap:2, alignItems:"center", overflowX:"auto" }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} className={`nav-btn ${page===n.id?"active":""}`}>
              <span style={{ marginRight:4 }}>{n.icon}</span>
              <span className="hide-sm">{n.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* PAGES */}
      {page==="home"     && <Homepage onNav={setPage} />}
      {page==="booking"  && <BookingPage />}
      {page==="register" && <RegistrationPage />}
      {page==="reviews"  && <ReviewsPage />}
      {page==="contact"  && <ContactPage onNav={setPage} />}
      {page==="admin"    && !adminAuth && <AdminLogin onLogin={() => setAdminAuth(true)} />}
      {page==="admin"    && adminAuth  && <AdminDashboard onLogout={() => setAdminAuth(false)} />}

      {/* FOOTER */}
      <footer style={{ background:"#111", borderTop:"1px solid rgba(255,214,0,.1)", padding:"28px 24px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, marginBottom:6 }}>SANA <span style={{ color:"#FFD600" }}>CAB</span></div>
        <p style={{ color:"rgba(255,255,255,.25)", fontSize:12, marginBottom:8 }}>All Over India Cab Services · Based in Chennai</p>
        <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap", marginBottom:10 }}>
          <a href="tel:+919790582382" style={{ color:"rgba(255,255,255,.4)", fontSize:12, textDecoration:"none" }}>📞 +91 97905 82382</a>
          <a href="mailto:kumarsandhiya561@gmail.com" style={{ color:"rgba(255,255,255,.4)", fontSize:12, textDecoration:"none" }}>📧 kumarsandhiya561@gmail.com</a>
        </div>
        <p style={{ color:"rgba(255,255,255,.15)", fontSize:11 }}>© {new Date().getFullYear()} SANA CAB · All rights reserved</p>
      </footer>
    </div>
  );
}
