import React, { useEffect, useState } from 'react';
import { fetchPets, createPet, adoptPet, deletePet } from './api';
import PetList from './components/PetList';
import AddPet from './components/AddPet';

export default function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchPets();
    setPets(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (pet) => {
    const created = await createPet(pet);
    setPets(prev => [created, ...prev]);
  };

  const handleAdopt = async (id) => {
    const name = prompt('Your name to adopt (leave blank for Anonymous)') || 'Anonymous';
    const updated = await adoptPet(id, name);
    setPets(prev => prev.map(p => p._id === id ? updated : p));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pet?')) return;
    await deletePet(id);
    setPets(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="container">
      <header>
        <h1>Pet Adoption Portal</h1>
        <p>Quick MERN demo — list, add, adopt</p>
      </header>

      <AddPet onAdd={handleAdd} />

      {loading ? <p>Loading pets…</p> : (
        <PetList pets={pets} onAdopt={handleAdopt} onDelete={handleDelete} />
      )}

      <footer>
        <small>Built fast — customize as needed</small>
      </footer>
    </div>
  );
}
