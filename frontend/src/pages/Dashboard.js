import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Dashboard(){
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/adoptions');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load adoption requests');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const decide = async (id, action) => {
    try {
      await api.post(`/adoptions/${id}/decision`, { action });
      load();
    } catch (err) {
      console.error(err);
      alert('Decision failed');
    }
  };

  return (
    <div>
      <h2>Adoption Requests</h2>
      {loading ? <p>Loading…</p> : (
        <div style={{display:'grid',gap:12}}>
          {requests.map(r => (
            <div key={r._id} className="card">
              <h3>{r.adopterName} — <span className="small">{r.status}</span></h3>
              <p className="small">Pet: {r.pet?.name} ({r.pet?.type})</p>
              <p>{r.message}</p>
              <div style={{display:'flex',gap:8}}>
                {r.status === 'requested' && <>
                  <button className="btn" onClick={()=>decide(r._id,'approve')}>Approve</button>
                  <button className="btn" style={{background:'#ef4444'}} onClick={()=>decide(r._id,'reject')}>Reject</button>
                </>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
