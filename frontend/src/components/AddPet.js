import React, { useState } from 'react';

export default function AddPet({ onAdd }) {
  const [form, setForm] = useState({
    name: '', type: '', age: '', breed: '', description: '', image: ''
  });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.type) return alert('Name & type required');
    onAdd({ ...form, age: Number(form.age || 0) });
    setForm({ name: '', type: '', age: '', breed: '', description: '', image: '' });
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="type" value={form.type} onChange={handleChange} placeholder="Type (Dog/Cat)" />
      <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Short description" />
      <button type="submit">Add Pet</button>
    </form>
  );
}
