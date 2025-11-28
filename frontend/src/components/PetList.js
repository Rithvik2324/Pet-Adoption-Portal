import React from 'react';
import PetCard from './PetCard';

export default function PetList({ pets, onAdopt, onDelete }) {
  if (!pets || pets.length === 0) return <p>No pets yet. Add one!</p>;
  return (
    <div className="pet-grid">
      {pets.map(p => (
        <PetCard key={p._id} pet={p} onAdopt={() => onAdopt(p._id)} onDelete={() => onDelete(p._id)} />
      ))}
    </div>
  );
}
