import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function AddPet(){
  const [form, setForm] = useState({ name:'', type:'Dog', age:0, breed:'', description:'', imageFile:null });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('type', form.type);
      data.append('age', form.age);
      data.append('breed', form.breed);
      data.append('description', form.description);
      if (form.imageFile) data.append('image', form.imageFile);
      await api.instance.post('/pets', data, { headers:{ 'Content-Type': 'multipart/form-data' }});
      alert('Pet added');
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Add pet failed');
    }
  };

  return (
    <div style={{maxWidth:700}}>
      <h2>Add Pet (admin)</h2>
      <form className="form" onSubmit={submit}>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <select className="input" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option>Dog</option><option>Cat</option><option>Other</option>
        </select>
        <input className="input" placeholder="Breed" value={form.breed} onChange={e=>setForm({...form,breed:e.target.value})} />
        <input className="input" placeholder="Age" type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
        <textarea className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input className="input" type="file" accept="image/*" onChange={e=>setForm({...form,imageFile:e.target.files[0]})} />
        <button className="btn" type="submit">Add Pet</button>
      </form>
    </div>
  );
}
