import { useState, useEffect } from "react";
import { dbGetAll, dbUpdate, dbDelete } from "../db.js";
import { Alert, Stars } from "./Shared.jsx";

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState("overview");
  const [regs, setRegs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [editData, setEditData] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setRegs(await dbGetAll("registrations"));
    setBookings(await dbGetAll("bookings"));
    setReviews(await dbGetAll("reviews"));
  };
  useEffect(() => { load(); }, []);

  const updateReg = async (id, ch) => { const item = regs.find(r=>r.id===id); await dbUpdate("registrations",{...item,...ch}); setMsg({type:"success",text:"Updated."}); load(); };
  const updateBooking = async (id, ch) => { const item = bookings.find(b=>b.id===id); await dbUpdate("bookings",{...item,...ch}); setMsg({type:"success",text:"Updated."}); load(); };
  const del = async (store, id) => { await dbDelete(store,id); setMsg({type:"success",text:"Deleted."}); load(); };

  const stats = [
    { l:"Total Registrations", v:regs.length, c:"#FFD600", i:"📋" },
    { l:"Pending Registrations", v:regs.filter(r=>r.status==="pending").length, c:"#fbbf24", i:"⏳" },
    { l:"Approved Drivers", v:regs.filter(r=>r.status==="approved").length, c:"#34d399", i:"✅" },
    { l:"Total Bookings", v:bookings.length, c:"#60a5fa", i:"🚕" },
    { l:"Pending Bookings", v:bookings.filter(b=>b.status==="pending").length, c:"#fbbf24", i:"📌" },
    { l:"Confirmed", v:bookings.filter(b=>b.status==="confirmed").length, c:"#34d399", i:"🟢" },
    { l:"Completed", v:bookings.filter(b=>b.status==="completed").length, c:"#a78bfa", i:"🏁" },
    { l:"Reviews", v:reviews.length, c:"#f472b6", i:"⭐" },
  ];

  const fRegs = regs.filter(r => {
    const q=search.toLowerCase();
    return (!q||r.driverName?.toLowerCase().includes(q)||r.cabNumber?.toLowerCase().includes(q)||r.email?.toLowerCase().includes(q))&&(filter==="all"||r.status===filter);
  });
  const fBooks = bookings.filter(b => {
    const q=search.toLowerCase();
    return (!q||b.customerName?.toLowerCase().includes(q)||b.mobile?.includes(q)||b.pickup?.toLowerCase().includes(q))&&(filter==="all"||b.status===filter);
  });

  const AB = ({ color, label, onClick }) => (
    <button className="action-btn" style={{ color, borderColor:color, background:`${color}12` }} onClick={onClick}>{label}</button>
  );

  return (
    <div style={{ background:"#0d0d0d", minHeight:"100vh" }}>
      <div style={{ background:"#111", borderBottom:"1px solid rgba(255,214,0,.1)", padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:1 }}>SANA CAB <span style={{ color:"#FFD600" }}>ADMIN</span></h1>
          <p style={{ color:"rgba(255,255,255,.25)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5 }}>Control Panel</p>
        </div>
        <button className="btn btn-outline" style={{ padding:"8px 18px", fontSize:13 }} onClick={onLogout}>Logout</button>
      </div>

      <div style={{ background:"rgba(255,255,255,.02)", borderBottom:"1px solid rgba(255,255,255,.06)", padding:"0 24px", display:"flex", gap:0, overflowX:"auto" }}>
        {["overview","registrations","bookings","reviews"].map(t => (
          <button key={t} onClick={() => { setTab(t); setSearch(""); setFilter("all"); }} className="nav-btn" style={{ ...(tab===t?{color:"#FFD600",background:"rgba(255,214,0,.07)",borderBottom:"2px solid #FFD600"}:{borderBottom:"2px solid transparent"}), borderRadius:0, padding:"12px 18px", textTransform:"capitalize", fontWeight:700 }}>{t}</button>
        ))}
      </div>

      <div style={{ padding:24, maxWidth:1200, margin:"0 auto" }}>
        {msg && <Alert type={msg.type} msg={msg.text} onClose={() => setMsg(null)} />}

        {tab === "overview" && (
          <>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, marginBottom:20 }}>Overview</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:14, marginBottom:28 }}>
              {stats.map(s => (
                <div key={s.l} className="glass" style={{ padding:"16px 18px", borderLeft:`3px solid ${s.c}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <span style={{ fontSize:18 }}>{s.i}</span>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, color:s.c, letterSpacing:1 }}>{s.v}</span>
                  </div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.35)", fontWeight:600 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className="grid-2">
              <div className="glass" style={{ padding:22 }}>
                <h3 style={{ fontWeight:700, fontSize:14, marginBottom:16 }}>Recent Registrations</h3>
                {regs.length===0 && <p style={{ color:"rgba(255,255,255,.25)", fontSize:13 }}>No registrations yet.</p>}
                {regs.slice(-5).reverse().map(r => (
                  <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
                    <div><div style={{ fontWeight:600, fontSize:13 }}>{r.driverName}</div><div style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>{r.cabNumber} · {r.vehicleType}</div></div>
                    <span className={`tag tag-${r.status}`}>{r.status}</span>
                  </div>
                ))}
              </div>
              <div className="glass" style={{ padding:22 }}>
                <h3 style={{ fontWeight:700, fontSize:14, marginBottom:16 }}>Recent Bookings</h3>
                {bookings.length===0 && <p style={{ color:"rgba(255,255,255,.25)", fontSize:13 }}>No bookings yet.</p>}
                {bookings.slice(-5).reverse().map(b => (
                  <div key={b.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
                    <div><div style={{ fontWeight:600, fontSize:13 }}>{b.customerName}</div><div style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>{b.pickup} → {b.drop}</div></div>
                    <span className={`tag tag-${b.status}`}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "registrations" && (
          <>
            <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
              <input placeholder="Search by name, cab no., email…" style={{ maxWidth:300 }} value={search} onChange={e => setSearch(e.target.value)} />
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {["all","pending","approved","rejected"].map(f => <button key={f} className={`pill ${filter===f?"on":"off"}`} onClick={() => setFilter(f)}>{f}</button>)}
              </div>
            </div>
            <div className="glass" style={{ padding:0, overflow:"hidden" }}>
              <div style={{ overflowX:"auto" }}>
                <table>
                  <thead><tr>{["App ID","Driver","Mobile","Cab No.","Type","Status","Date","Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {fRegs.length===0 && <tr><td colSpan={8} style={{ textAlign:"center", color:"rgba(255,255,255,.25)", padding:32 }}>No registrations found</td></tr>}
                    {fRegs.map(r => (
                      <tr key={r.id}>
                        <td><code style={{ background:"rgba(255,214,0,.1)", color:"#FFD600", padding:"2px 7px", borderRadius:5, fontSize:11, fontFamily:"monospace" }}>{r.appId}</code></td>
                        <td><div style={{ fontWeight:600 }}>{r.driverName}</div><div style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>{r.email}</div></td>
                        <td style={{ fontSize:12 }}>{r.mobile}</td>
                        <td style={{ fontSize:12 }}>{r.cabNumber}</td>
                        <td style={{ fontSize:12 }}>{r.vehicleType}</td>
                        <td><span className={`tag tag-${r.status}`}>{r.status}</span></td>
                        <td style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>{new Date(r.submittedAt).toLocaleDateString()}</td>
                        <td>
                          {r.status==="pending"&&<><AB color="#34d399" label="Approve" onClick={()=>updateReg(r.id,{status:"approved"})} /><AB color="#ef4444" label="Reject" onClick={()=>updateReg(r.id,{status:"rejected"})} /></>}
                          <AB color="#60a5fa" label="View" onClick={()=>setModal({type:"viewReg",data:r})} />
                          <AB color="#fbbf24" label="Edit" onClick={()=>{setEditData({...r});setModal({type:"editReg"});}} />
                          <AB color="#ef4444" label="Del" onClick={()=>del("registrations",r.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === "bookings" && (
          <>
            <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
              <input placeholder="Search by name, mobile, location…" style={{ maxWidth:300 }} value={search} onChange={e => setSearch(e.target.value)} />
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {["all","pending","confirmed","completed","cancelled"].map(f => <button key={f} className={`pill ${filter===f?"on":"off"}`} onClick={() => setFilter(f)}>{f}</button>)}
              </div>
            </div>
            <div className="glass" style={{ padding:0, overflow:"hidden" }}>
              <div style={{ overflowX:"auto" }}>
                <table>
                  <thead><tr>{["Ref","Customer","Route","Date/Time","Vehicle","Status","Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {fBooks.length===0 && <tr><td colSpan={7} style={{ textAlign:"center", color:"rgba(255,255,255,.25)", padding:32 }}>No bookings found</td></tr>}
                    {fBooks.map(b => (
                      <tr key={b.id}>
                        <td><code style={{ background:"rgba(96,165,250,.1)", color:"#60a5fa", padding:"2px 7px", borderRadius:5, fontSize:11, fontFamily:"monospace" }}>{b.bookingRef}</code></td>
                        <td><div style={{ fontWeight:600 }}>{b.customerName}</div><div style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>{b.mobile}</div></td>
                        <td><div style={{ fontSize:12 }}>📍 {b.pickup}</div><div style={{ fontSize:12, color:"rgba(255,255,255,.3)" }}>🏁 {b.drop}</div></td>
                        <td><div style={{ fontSize:12 }}>{b.date}</div><div style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>{b.time}</div></td>
                        <td style={{ fontSize:12 }}>{b.vehicleType} · {b.passengers}p</td>
                        <td><span className={`tag tag-${b.status}`}>{b.status}</span></td>
                        <td>
                          {b.status==="pending"&&<AB color="#34d399" label="Confirm" onClick={()=>updateBooking(b.id,{status:"confirmed"})} />}
                          {b.status==="confirmed"&&<AB color="#a78bfa" label="Complete" onClick={()=>updateBooking(b.id,{status:"completed"})} />}
                          {(b.status==="pending"||b.status==="confirmed")&&<AB color="#ef4444" label="Cancel" onClick={()=>updateBooking(b.id,{status:"cancelled"})} />}
                          <AB color="#60a5fa" label="View" onClick={()=>setModal({type:"viewBooking",data:b})} />
                          <AB color="#fbbf24" label="Edit" onClick={()=>{setEditData({...b});setModal({type:"editBooking"});}} />
                          <AB color="#ef4444" label="Del" onClick={()=>del("bookings",b.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === "reviews" && (
          <div className="glass" style={{ padding:24 }}>
            <h3 style={{ fontWeight:700, marginBottom:20, fontSize:15 }}>All Reviews ({reviews.length})</h3>
            {reviews.length===0 && <p style={{ color:"rgba(255,255,255,.25)", textAlign:"center", padding:32 }}>No reviews yet.</p>}
            {reviews.map(r => (
              <div key={r.id} style={{ padding:"14px 0", borderBottom:"1px solid rgba(255,255,255,.05)", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8, flexWrap:"wrap" }}>
                    <strong style={{ fontSize:14 }}>{r.name}</strong>
                    <Stars value={r.rating} size={15} />
                    <span className={`tag tag-${r.status}`}>{r.status}</span>
                  </div>
                  <p style={{ color:"rgba(255,255,255,.5)", fontSize:13, marginBottom:4, lineHeight:1.6 }}>{r.comment}</p>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,.2)" }}>{new Date(r.date).toLocaleDateString()}</span>
                </div>
                <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                  {r.status==="pending"&&<button className="action-btn" style={{ color:"#34d399", borderColor:"#34d399", background:"rgba(52,211,153,.12)" }} onClick={async()=>{await dbUpdate("reviews",{...r,status:"approved"});load();}}>Approve</button>}
                  <button className="action-btn" style={{ color:"#ef4444", borderColor:"#ef4444", background:"rgba(239,68,68,.12)" }} onClick={()=>del("reviews",r.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal?.type==="viewReg" && (
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, marginBottom:20 }}>Registration Details</h2>
            {[["Application ID",modal.data.appId],["Driver Name",modal.data.driverName],["Mobile",modal.data.mobile],["Email",modal.data.email],["Address",modal.data.address],["Cab Number",modal.data.cabNumber],["Vehicle Type",modal.data.vehicleType],["License Number",modal.data.licenseNumber],["Status",modal.data.status],["Submitted",new Date(modal.data.submittedAt).toLocaleString()]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                <div style={{ width:155, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.5, color:"rgba(255,255,255,.3)" }}>{k}</div>
                <div style={{ flex:1, fontSize:13 }}>{v}</div>
              </div>
            ))}
            <button className="btn btn-yellow" style={{ marginTop:22, width:"100%" }} onClick={()=>setModal(null)}>Close</button>
          </div>
        </div>
      )}

      {modal?.type==="viewBooking" && (
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, marginBottom:20 }}>Booking Details</h2>
            {[["Booking Ref",modal.data.bookingRef],["Customer",modal.data.customerName],["Mobile",modal.data.mobile],["Email",modal.data.email||"—"],["Pickup",modal.data.pickup],["Drop",modal.data.drop],["Date",modal.data.date],["Time",modal.data.time],["Vehicle",modal.data.vehicleType],["Passengers",modal.data.passengers],["Notes",modal.data.notes||"—"],["Status",modal.data.status],["Assigned Driver",modal.data.assignedDriver||"Not assigned"],["Submitted",new Date(modal.data.submittedAt).toLocaleString()]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                <div style={{ width:155, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.5, color:"rgba(255,255,255,.3)" }}>{k}</div>
                <div style={{ flex:1, fontSize:13 }}>{v}</div>
              </div>
            ))}
            <button className="btn btn-yellow" style={{ marginTop:22, width:"100%" }} onClick={()=>setModal(null)}>Close</button>
          </div>
        </div>
      )}

      {modal?.type==="editReg" && editData && (
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, marginBottom:20 }}>Edit Registration</h2>
            {[["driverName","Driver Name"],["mobile","Mobile"],["email","Email"],["cabNumber","Cab Number"],["licenseNumber","License Number"],["address","Address"]].map(([k,l])=>(
              <div key={k} className="form-group"><label className="form-label">{l}</label><input value={editData[k]||""} onChange={e=>setEditData(p=>({...p,[k]:e.target.value}))} /></div>
            ))}
            <div className="form-group"><label className="form-label">Status</label>
              <select value={editData.status} onChange={e=>setEditData(p=>({...p,status:e.target.value}))}>
                <option>pending</option><option>approved</option><option>rejected</option>
              </select>
            </div>
            <div style={{ display:"flex", gap:12, marginTop:20 }}>
              <button className="btn btn-yellow" onClick={async()=>{await dbUpdate("registrations",editData);setModal(null);load();setMsg({type:"success",text:"Updated."});}}>Save</button>
              <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {modal?.type==="editBooking" && editData && (
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:1, marginBottom:20 }}>Edit Booking</h2>
            {[["customerName","Customer Name"],["mobile","Mobile"],["email","Email"],["pickup","Pickup"],["drop","Drop"],["assignedDriver","Assigned Driver"]].map(([k,l])=>(
              <div key={k} className="form-group"><label className="form-label">{l}</label><input value={editData[k]||""} onChange={e=>setEditData(p=>({...p,[k]:e.target.value}))} /></div>
            ))}
            <div className="grid-2">
              <div className="form-group"><label className="form-label">Date</label><input type="date" value={editData.date||""} onChange={e=>setEditData(p=>({...p,date:e.target.value}))} /></div>
              <div className="form-group"><label className="form-label">Time</label><input type="time" value={editData.time||""} onChange={e=>setEditData(p=>({...p,time:e.target.value}))} /></div>
            </div>
            <div className="form-group"><label className="form-label">Status</label>
              <select value={editData.status} onChange={e=>setEditData(p=>({...p,status:e.target.value}))}>
                <option>pending</option><option>confirmed</option><option>completed</option><option>cancelled</option>
              </select>
            </div>
            <div style={{ display:"flex", gap:12, marginTop:20 }}>
              <button className="btn btn-yellow" onClick={async()=>{await dbUpdate("bookings",editData);setModal(null);load();setMsg({type:"success",text:"Updated."});}}>Save</button>
              <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
