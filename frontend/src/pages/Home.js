import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PetCard from '../components/PetCard';
import PetDetails from '../components/PetDetails';

export default function Home(){
  const [pets, setPets] = useState([]);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const [limit] = useState(12);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/pets?q=${encodeURIComponent(query)}&type=${type}&page=${page}&limit=${limit}`);
      setPets(res.data.pets);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
      alert('Failed to load pets (is backend running?)');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, [query, type, page]);

  return (
    <div>
      <div className="controls">
        <div style={{flex:1}} className="search-row">
          <input className="input" placeholder="Search name, breed, description..." value={query} onChange={e=>setQuery(e.target.value)} />
          <select className="input" value={type} onChange={e=>setType(e.target.value)}>
            <option value="">All types</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Other</option>
          </select>
          <button className="btn" onClick={()=>{ setPage(1); load(); }}>Search</button>
        </div>
      </div>

      {loading ? <p>Loading…</p> : (
        <>
          <div className="grid">
            {pets.map(p=> <PetCard key={p._id} pet={p} onView={()=>setSelected(p)} />)}
          </div>

          <div className="pager">
            <button className="btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}>Prev</button>
            <span className="small">Page {page} / {pages}</span>
            <button className="btn" onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page>=pages}>Next</button>
          </div>
        </>
      )}

      {selected && <PetDetails pet={selected} onClose={()=>setSelected(null)} refresh={load} />}
    </div>
  );
}
