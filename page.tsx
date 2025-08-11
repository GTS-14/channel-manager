'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

type Event = { id: string; title: string; start: string; end: string };

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [listingName, setListingName] = useState('');
  const [platform, setPlatform] = useState('AIRBNB');
  const [url, setUrl] = useState('');

  async function load() {
    const res = await fetch('/api/reservations');
    const data = await res.json();
    setEvents(data.events);
  }
  useEffect(() => { load(); }, []);

  async function addIcal(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/ical/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingName, platform, url }),
    });
    if (res.ok) {
      alert('Flux iCal ajouté. Import en cours.');
      await fetch('/api/ical/ingest', { method: 'POST' });
      load();
      setListingName(''); setUrl('');
    } else {
      alert('Erreur lors de l\'ajout du flux');
    }
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Ajouter un flux iCal</h3>
        <form onSubmit={addIcal}>
          <div style={{display:'grid', gap:10, gridTemplateColumns:'1fr 160px'}}>
            <input className="input" placeholder="Nom du logement" value={listingName} onChange={e=>setListingName(e.target.value)} required />
            <select className="input" value={platform} onChange={e=>setPlatform(e.target.value)}>
              <option value="AIRBNB">Airbnb</option>
              <option value="BOOKING">Booking</option>
              <option value="VRBO">VRBO/Abritel</option>
              <option value="MANUAL">Manuel</option>
            </select>
          </div>
          <input className="input" placeholder="URL iCal (.ics)" value={url} onChange={e=>setUrl(e.target.value)} required style={{marginTop:10}}/>
          <button className="btn" type="submit" style={{marginTop:10}}>Ajouter</button>
        </form>
      </div>
      <div className="card" style={{gridColumn:'1 / -1'}}>
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth" events={events} height={720} />
      </div>
    </div>
  );
}
