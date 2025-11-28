import React from 'react';

export default function PetCard({ pet, onView }){
  return (
    <div className="card">
      <img src={pet.image || (pet.type?.toLowerCase().includes('cat') ? 'https://placekitten.com/400/240' : 'https://placedog.net/400/240')} alt={pet.name} />
      <h3>{pet.name} {pet.adopted && <span style={{color:'#ef4444',fontSize:12}}> (Adopted)</span>}</h3>
      <p className="small">{pet.type} • {pet.age} yrs • {pet.breed}</p>
      <p className="small">{pet.description?.slice(0,90)}...</p>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="btn" onClick={onView}>View</button>
      </div>
    </div>
  );
}
