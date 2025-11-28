const API = '/api/pets'; // proxy in package.json points to backend

export async function fetchPets() {
  const res = await fetch(API);
  return res.json();
}

export async function createPet(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function adoptPet(id, adopter) {
  const res = await fetch(`${API}/${id}/adopt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adopter })
  });
  return res.json();
}

export async function deletePet(id) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  return res.json();
}
