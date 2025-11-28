import React, { useState } from 'react';
import api from '../utils/api';

export default function PetDetails({ pet, onClose, refresh }){
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/adoptions', { petId: pet._id, adopterName: form.name || 'Anonymous', adopterEmail: form.email, adopterPhone: form.phone, message: form.message });
      alert('Adoption request sent. Admin will review it.');
      setForm({ name:'', email:'', phone:'', message:'' });
      if (refresh) refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to send request');
    } finally { setSubmitting(false); }
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{width:900,maxWidth:'100%',background:'#fff',borderRadius:12,overflow:'auto',maxHeight:'90%'}}>
        <div style={{display:'flex',gap:12}}>
          <div style={{flex:'1 1 320px',padding:16}}>
            <img src={pet.image || 'https://placedog.net/600/400'} style={{width:'100%',borderRadius:8}} alt={pet.name} />
            <h2 style={{marginTop:8}}>{pet.name} {pet.adopted && <span style={{color:'#ef4444'}}>ADOPTED</span>}</h2>
            <p className="small">{pet.type} • {pet.age} yrs • {pet.breed}</p>
            <p>{pet.description}</p>
          </div>

          <div style={{flex:'1 1 320px',padding:16,borderLeft:'1px solid #f1f1f1'}}>
            <h3>Adoption Request</h3>
            {pet.adopted ? <p className="small">This pet has already been adopted.</p> : (
              <form onSubmit={submit} className="form">
                <input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
                <input className="input" placeholder="Email (optional)" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
                <input className="input" placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
                <textarea className="input" rows="4" placeholder="Message (optional)" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
                <div style={{display:'flex',gap:8}}>
                  <button className="btn" type="submit" disabled={submitting}>Send Request</button>
                  <button className="btn" type="button" onClick={onClose} style={{background:'#ef4444'}}>Close</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
