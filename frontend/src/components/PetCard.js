import React from 'react';

export default function PetCard({ pet, onAdopt, onDelete }) {
  return (
    <div className={`card ${pet.adopted ? 'adopted' : ''}`}>
      <div className="img-wrap">
        <img src={pet.image || (pet.type === 'Cat' ? 'https://placekitten.com/300/200' : 'https://placedog.net/300/200')} alt={pet.name} />
      </div>
      <div className="card-body">
        <h3>{pet.name} {pet.adopted && <span className="badge">ADOPTED</span>}</h3>
        <p><strong>Type:</strong> {pet.type} • <strong>Age:</strong> {pet.age}</p>
        {pet.breed && <p><strong>Breed:</strong> {pet.breed}</p>}
        <p>{pet.description}</p>
        <div className="actions">
          {!pet.adopted && <button onClick={onAdopt}>Adopt</button>}
          <button className="del" onClick={onDelete}>Delete</button>
          {pet.adopted && <p className="adopt-info">Adopted by {pet.adoptedBy}</p>}
        </div>
      </div>
    </div>
  );
}
