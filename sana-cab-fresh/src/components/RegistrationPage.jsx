import { useState } from "react";
import { dbAdd } from "../db.js";

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ driverName:"", mobile:"", email:"", address:"", cabNumber:"", vehicleType:"Sedan", licenseNumber:"", documents:{} });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.driverName.trim()) e.driverName = "Required";
      if (!form.mobile.match(/^[6-9]\d{9}$/)) e.mobile = "Valid 10-digit number required";
      if (!form.email.match(/\S+@\S+\.\S+/)) e.email = "Valid email required";
      if (!form.address.trim()) e.address = "Required";
    }
    if (s === 2) {
      if (!form.cabNumber.trim()) e.cabNumber = "Required";
      if (!form.licenseNumber.trim()) e.licenseNumber = "Required";
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setStep(s => s+1);
  };

  const handleFile = (name, file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = (e) => setForm(p => ({...p, documents:{...p.documents,[name]:{name:file.name,data:e.target.result}}}));
    r.readAsDataURL(file);
  };

  const submit = async () => {
    setLoading(true);
    const appId = "SCR-" + (Math.floor(Math.random() * 90000) + 10000);
    await dbAdd("registrations", {...form, status:"pending", appId, submittedAt:new Date().toISOString()});
    setSuccess(appId);
    setLoading(false);
  };

  if (success) return (
    <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div className="glass fadeUp" style={{ maxWidth:460, width:"100%", padding:48, textAlign:"center" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:1, marginBottom:8 }}>Application Submitted!</h2>
        <p style={{ color:"rgba(255,255,255,.5)", marginBottom:28, lineHeight:1.7 }}>We'll review your application and get back to you within 2 business days.</p>
        <div style={{ background:"rgba(255,214,0,.07)", border:"1px solid rgba(255,214,0,.2)", borderRadius:12, padding:20, marginBottom:28 }}>
          <div className="form-label" style={{ textAlign:"center", marginBottom:6 }}>Application ID</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:"#FFD600", letterSpacing:2 }}>{success}</div>
        </div>
        <button className="btn btn-yellow" style={{ width:"100%" }} onClick={() => { setSuccess(null); setStep(1); setForm({ driverName:"", mobile:"", email:"", address:"", cabNumber:"", vehicleType:"Sedan", licenseNumber:"", documents:{} }); }}>Submit Another</button>
      </div>
    </div>
  );

  const F = ({ name, label, type="text", placeholder }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type={type} style={errors[name]?{borderColor:"#ef4444"}:{}} value={form[name]} onChange={e => { setForm(p => ({...p,[name]:e.target.value})); setErrors(p => ({...p,[name]:""})); }} placeholder={placeholder} />
      {errors[name] && <div className="form-error">{errors[name]}</div>}
    </div>
  );

  const steps = ["Personal Info","Vehicle Details","Documents"];
  const stepC = ["#FFD600","#60a5fa","#34d399"];

  return (
    <div style={{ maxWidth:680, margin:"0 auto", padding:"52px 24px" }}>
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div className="section-label">Join Our Network</div>
        <h1 className="section-title">Register Your Cab</h1>
        <p style={{ color:"rgba(255,255,255,.45)", marginTop:10 }}>Partner with SANA CAB and grow your earnings</p>
      </div>

      {/* Stepper */}
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:36, gap:0 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:step>i+1?"#34d399":step===i+1?stepC[i]:"rgba(255,255,255,.08)", color:step>=i+1?"#0d0d0d":"rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, margin:"0 auto 6px", transition:"all .3s" }}>{step>i+1?"✓":i+1}</div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:.5, textTransform:"uppercase", color:step===i+1?stepC[i]:"rgba(255,255,255,.25)", transition:"all .3s" }}>{s}</div>
            </div>
            {i<steps.length-1 && <div style={{ width:60, height:2, background:step>i+1?"#34d399":"rgba(255,255,255,.08)", margin:"0 8px 18px", transition:"background .3s" }} />}
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding:36 }}>
        {step === 1 && (
          <>
            <h3 style={{ fontWeight:700, color:"#FFD600", marginBottom:20, fontSize:13, textTransform:"uppercase", letterSpacing:1 }}>Personal Information</h3>
            <div className="grid-2"><F name="driverName" label="Full Name *" placeholder="Your full name" /><F name="mobile" label="Mobile *" placeholder="10-digit number" /></div>
            <F name="email" label="Email *" placeholder="your@email.com" />
            <div className="form-group">
              <label className="form-label">Address *</label>
              <textarea style={{ height:80, resize:"vertical", ...(errors.address?{borderColor:"#ef4444"}:{}) }} value={form.address} onChange={e => { setForm(p => ({...p,address:e.target.value})); setErrors(p => ({...p,address:""})); }} placeholder="Full address with city and pincode" />
              {errors.address && <div className="form-error">{errors.address}</div>}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3 style={{ fontWeight:700, color:"#60a5fa", marginBottom:20, fontSize:13, textTransform:"uppercase", letterSpacing:1 }}>Vehicle Details</h3>
            <div className="grid-2">
              <F name="cabNumber" label="Cab / Vehicle Number *" placeholder="e.g. TN09AB1234" />
              <div className="form-group">
                <label className="form-label">Vehicle Type</label>
                <select value={form.vehicleType} onChange={e => setForm(p => ({...p,vehicleType:e.target.value}))}>
                  {["Sedan","SUV","Hatchback","Minivan","Luxury"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <F name="licenseNumber" label="Driving License Number *" placeholder="e.g. TN0120200001234" />
          </>
        )}
        {step === 3 && (
          <>
            <h3 style={{ fontWeight:700, color:"#34d399", marginBottom:8, fontSize:13, textTransform:"uppercase", letterSpacing:1 }}>Upload Documents</h3>
            <p style={{ color:"rgba(255,255,255,.35)", fontSize:13, marginBottom:20 }}>Upload clear photos or scans · JPG, PNG, PDF accepted</p>
            {[["dl","Driving License *"],["rc","Vehicle RC Certificate *"],["insurance","Insurance Certificate *"]].map(([key,lbl]) => (
              <div key={key} className="form-group">
                <label className="form-label">{lbl}</label>
                <div style={{ border:`2px dashed ${form.documents[key]?"#34d399":"rgba(255,255,255,.1)"}`, borderRadius:12, padding:20, textAlign:"center", background:form.documents[key]?"rgba(52,211,153,.04)":"rgba(255,255,255,.02)", transition:"all .2s" }}>
                  {form.documents[key] ? <div style={{ color:"#34d399", fontWeight:700, fontSize:13 }}>✓ {form.documents[key].name}</div> : <div style={{ color:"rgba(255,255,255,.25)", fontSize:13, marginBottom:10 }}>Drop file here or choose below</div>}
                  <input type="file" accept="image/*,.pdf" style={{ display:"none" }} id={`f_${key}`} onChange={e => handleFile(key, e.target.files[0])} />
                  <button type="button" className="btn btn-outline" style={{ marginTop:8, padding:"6px 16px", fontSize:12 }} onClick={() => document.getElementById(`f_${key}`).click()}>Choose File</button>
                </div>
              </div>
            ))}
          </>
        )}
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:24 }}>
          {step > 1 ? <button className="btn btn-ghost" onClick={() => setStep(s => s-1)}>← Back</button> : <div />}
          {step < 3 ? <button className="btn btn-yellow" onClick={next}>Next Step →</button> : <button className="btn btn-yellow" onClick={submit} disabled={loading}>{loading?"Submitting…":"Submit Application"}</button>}
        </div>
      </div>
    </div>
  );
}
