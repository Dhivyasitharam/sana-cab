export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#0d0d0d;color:#f5f5f5}
:root{--yellow:#FFD600;--yellow-dark:#E6C000;--yellow-light:#FFF176;--black:#0d0d0d;--black2:#161616;--black3:#1f1f1f;--white:#f5f5f5;--grey:rgba(255,255,255,0.5);--border:rgba(255,255,255,0.1)}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#0d0d0d}
::-webkit-scrollbar-thumb{background:var(--yellow);border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,214,0,.5)}50%{box-shadow:0 0 0 16px rgba(255,214,0,0)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes scaleIn{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
.fadeUp{animation:fadeUp .6s ease both}
.fadeIn{animation:fadeIn .4s ease both}
.float{animation:float 4s ease-in-out infinite}
input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#f5f5f5;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.12);border-radius:10px;padding:11px 14px;width:100%;outline:none;transition:border .2s,box-shadow .2s}
input:focus,select:focus,textarea:focus{border-color:var(--yellow);box-shadow:0 0 0 3px rgba(255,214,0,.15)}
select option{background:#1f1f1f;color:#f5f5f5}
input[type="date"]::-webkit-calendar-picker-indicator,input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(1)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:14px;border-radius:10px;padding:12px 26px;cursor:pointer;transition:all .2s;border:none;white-space:nowrap}
.btn-yellow{background:var(--yellow);color:#0d0d0d;box-shadow:0 4px 20px rgba(255,214,0,.25)}
.btn-yellow:hover{background:var(--yellow-light);transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,214,0,.4)}
.btn-yellow:active{transform:translateY(0)}
.btn-yellow:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-outline{background:transparent;color:var(--yellow);border:2px solid var(--yellow)}
.btn-outline:hover{background:rgba(255,214,0,.08);transform:translateY(-2px)}
.btn-ghost{background:rgba(255,255,255,.07);color:#fff;border:1px solid rgba(255,255,255,.12)}
.btn-ghost:hover{background:rgba(255,255,255,.12)}
.card{background:var(--black2);border:1px solid var(--border);border-radius:16px;padding:24px;transition:transform .2s,box-shadow .2s,border-color .2s}
.card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.5);border-color:rgba(255,214,0,.2)}
.glass{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(16px);border-radius:20px}
.section{padding:72px 24px}
.section-inner{max-width:1100px;margin:0 auto}
.section-label{display:inline-block;background:rgba(255,214,0,.1);border:1px solid rgba(255,214,0,.3);color:var(--yellow);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,5vw,3.2rem);letter-spacing:1px;line-height:1.1;color:#fff}
.grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}
.tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px}
.tag-approved,.tag-confirmed,.tag-completed{background:rgba(52,211,153,.12);color:#34d399;border:1px solid rgba(52,211,153,.25)}
.tag-pending{background:rgba(255,214,0,.12);color:var(--yellow);border:1px solid rgba(255,214,0,.25)}
.tag-rejected,.tag-cancelled{background:rgba(239,68,68,.12);color:#ef4444;border:1px solid rgba(239,68,68,.25)}
.form-label{display:block;margin-bottom:6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:rgba(255,255,255,.4)}
.form-group{margin-bottom:18px}
.form-error{color:#ef4444;font-size:12px;margin-top:4px}
.nav-btn{background:none;border:none;color:rgba(255,255,255,.6);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;padding:8px 14px;border-radius:8px;transition:all .2s;white-space:nowrap}
.nav-btn:hover{color:#fff;background:rgba(255,255,255,.07)}
.nav-btn.active{color:var(--yellow);background:rgba(255,214,0,.1)}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:rgba(255,214,0,.06);padding:11px 13px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--yellow);border-bottom:1px solid rgba(255,214,0,.15);white-space:nowrap}
td{padding:11px 13px;border-bottom:1px solid rgba(255,255,255,.05);vertical-align:middle}
tr:hover td{background:rgba(255,214,0,.03)}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px}
.modal-box{background:#161616;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:32px;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;animation:scaleIn .25s ease}
.action-btn{font-size:11px;font-weight:700;border-radius:6px;padding:3px 10px;cursor:pointer;border:1px solid;margin:0 2px 2px 0;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
.action-btn:hover{opacity:.8}
.pill{padding:5px 14px;border-radius:20px;border:none;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Plus Jakarta Sans',sans-serif}
.pill.on{background:var(--yellow);color:#0d0d0d}
.pill.off{background:rgba(255,255,255,.07);color:rgba(255,255,255,.5)}
.pill.off:hover{background:rgba(255,255,255,.12);color:#fff}
.marquee-wrap{overflow:hidden;white-space:nowrap;border-top:1px solid rgba(255,214,0,.15);border-bottom:1px solid rgba(255,214,0,.15);background:rgba(255,214,0,.04);padding:12px 0}
.marquee-track{display:inline-flex;animation:marquee 20s linear infinite}
.marquee-item{padding:0 32px;font-size:13px;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:1px}
@media(max-width:640px){.hide-sm{display:none!important}.section{padding:52px 16px}}
`;

export function injectCSS() {
  if (document.getElementById("sana-cab-css")) return;
  const el = document.createElement("style");
  el.id = "sana-cab-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}
