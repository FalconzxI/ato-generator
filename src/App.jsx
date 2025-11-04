import React, { useState } from 'react';
import { Plane, Plus, Trash2, Download, Edit2, X } from 'lucide-react';

// --- STILI CSS MANUALI ---
const globalStyles = `
  /* Direttiva per la stampa in orizzontale */
  @page {
    size: landscape;
  }

  /* --- Tema di base --- */
  body {
    background-color: #0f172a;
    color: #f1f5f9;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    margin: 0;
  }

  /* --- Contenitore principale --- */
  .app-container {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 24px;
  }
  
  /* --- Card per form e tabella --- */
  .card {
    background-color: #1e293b;
    border-radius: 0.5rem;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  /* --- Stili per il Form --- */
  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 4px;
    color: #cbd5e1;
  }
  .form-input {
    width: 100%;
    padding: 8px 12px;
    background-color: #334155;
    border: 1px solid #475569;
    border-radius: 0.375rem;
    color: #f1f5f9;
    transition: box-shadow 0.2s;
  }
  .form-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
  
  /* --- Stili per i Pulsanti --- */
  .btn {
    padding: 8px 16px;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    border: none;
    flex-grow: 1;
  }
  .btn-primary { background-color: #2563eb; color: white; }
  .btn-primary:hover { background-color: #1d4ed8; }
  .btn-secondary { background-color: #475569; color: white; flex-grow: 0; }
  .btn-secondary:hover { background-color: #64748b; }
  .btn-success { background-color: #16a34a; color: white; }
  .btn-success:hover { background-color: #15803d; }

  /* --- Layout a Griglia per il Form (Sempre in colonna) --- */
  .form-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
  }
  
  /* --- Stili per la Tabella --- */
  .table-wrapper { overflow-x: auto; }
  .table { width: 100%; border-collapse: collapse; }
  .table th, .table td { padding: 12px 16px; text-align: left; font-size: 0.875rem; }
  .table thead { background-color: #334155; }
  .table th { font-weight: 600; }
  .table tbody tr { border-bottom: 1px solid #334155; }
  .table tbody tr:hover { background-color: #283344; }
  .table .monospace { font-family: monospace; }
  
  /* --- NUOVO: Stile per il Callsign cliccabile --- */
  .table .callsign {
    color: #60a5fa;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: text-decoration 0.2s;
  }
  .table .callsign:hover {
    text-decoration: underline;
  }
  
  /* --- Stili per il Tooltip delle Note (su Click) --- */
  .note-cell {
    position: relative;
    text-align: center;
  }
  .tooltip-container {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background-color: #020617;
    color: #cbd5e1;
    padding: 12px;
    border-radius: 0.5rem;
    border: 1px solid #475569;
    width: 288px;
    font-size: 0.875rem;
    text-align: left;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
    transition: opacity 0.2s, visibility 0.2s;
  }
  .tooltip-container.visible {
    visibility: visible;
    opacity: 1;
  }
  .note-icon {
    cursor: pointer;
  }
  
  /* --- Classi di Utilità --- */
  .no-print { display: block; }
  @media print {
    body * { visibility: hidden; }
    #ato-table, #ato-table * { visibility: visible; }
    #ato-table { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
    .no-print { display: none !important; }
  }
`;

export default function App() {
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [missionTitle, setMissionTitle] = useState('Air Tasking Order');
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  const [formData, setFormData] = useState({
    callsign: '', aircraft: '', airbase: '', task: '', ett: '', tot: '', rtb: '', roe: '', freq: '', notes: ''
  });

  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.callsign || !formData.aircraft || !formData.airbase || !formData.task || !formData.ett || !formData.tot || !formData.rtb || !formData.roe || !formData.freq) {
      alert('Compila tutti i campi obbligatori');
      return;
    }
    if (editingId !== null) {
      setPackages(packages.map(pkg => pkg.id === editingId ? { ...formData, id: editingId } : pkg));
      setEditingId(null);
    } else {
      const newPackage = { ...formData, id: Date.now() };
      setPackages([...packages, newPackage]);
    }
    setFormData({ callsign: '', aircraft: '', airbase: '', task: '', ett: '', tot: '', rtb: '', roe: '', freq: '', notes: '' });
  };
  const handleEdit = (pkg) => { setFormData(pkg); setEditingId(pkg.id); };
  const handleDelete = (id) => { setPackages(packages.filter(pkg => pkg.id !== id)); };
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ callsign: '', aircraft: '', airbase: '', task: '', ett: '', tot: '', rtb: '', roe: '', freq: '', notes: '' });
  };
  const exportToPDF = () => { window.print(); };

  const handleTooltipToggle = (packageId) => {
    setActiveTooltipId(activeTooltipId === packageId ? null : packageId);
  };

  // --- NUOVO: Funzione per duplicare una riga ---
  const handleDuplicate = (pkgToDuplicate) => {
    // Assicurati che non siamo in modalità di modifica
    setEditingId(null);
    // Popola il form con i dati del pacchetto da duplicare
    setFormData(pkgToDuplicate);
    // Scorre la pagina in cima per mostrare il form compilato
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <style>{globalStyles}</style>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Plane style={{ width: '32px', height: '32px', color: '#60a5fa' }} />
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Generatore ATO</h1>
        </div>
        <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Air Tasking Order Generator</div>
      </div>
      
      <div className="card no-print">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus width={20} height={20} />
          {editingId ? 'Modifica Pacchetto' : 'Aggiungi Pacchetto'}
        </h2>
        <div className="form-grid">
           <div><label className="form-label">Callsign</label><input type="text" name="callsign" value={formData.callsign} onChange={handleInputChange} placeholder="es. VIPER 1-1" className="form-input" /></div>
           <div><label className="form-label">Aeromobile</label><input type="text" name="aircraft" value={formData.aircraft} onChange={handleInputChange} placeholder="es. F-16C" className="form-input" /></div>
           <div><label className="form-label">Airbase</label><input type="text" name="airbase" value={formData.airbase} onChange={handleInputChange} placeholder="es. Aviano AB" className="form-input" /></div>
           <div><label className="form-label">Task/Obiettivo</label><input type="text" name="task" value={formData.task} onChange={handleInputChange} placeholder="es. CAP / SEAD / CAS" className="form-input" /></div>
           <div><label className="form-label">ETT (Decollo)</label><input type="time" name="ett" value={formData.ett} onChange={handleInputChange} className="form-input" /></div>
           <div><label className="form-label">TOT (Time On Target)</label><input type="time" name="tot" value={formData.tot} onChange={handleInputChange} className="form-input" /></div>
           <div><label className="form-label">RTB (Rientro)</label><input type="time" name="rtb" value={formData.rtb} onChange={handleInputChange} className="form-input" /></div>
           <div><label className="form-label">ROE</label><input type="text" name="roe" value={formData.roe} onChange={handleInputChange} placeholder="es. Weapons Free" className="form-input" /></div>
           <div><label className="form-label">Freq/Ente</label><input type="text" name="freq" value={formData.freq} onChange={handleInputChange} placeholder="es. 251.000" className="form-input" /></div>
           <div className="md-col-span-2 lg-col-span-3"><label className="form-label">Note (opzionale)</label><input type="text" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="es. Coordinare con AWACS / Rifornimento previsto..." className="form-input" /></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <button onClick={handleSubmit} className="btn btn-primary">{editingId ? <><Edit2 width={16} height={16} /> Aggiorna</> : <><Plus width={16} height={16} /> Aggiungi</>}</button>
            {editingId && (<button onClick={cancelEdit} className="btn btn-secondary"><X width={16} height={16} /></button>)}
          </div>
        </div>
      </div>

      <div className="card no-print">
        <label className="form-label">Nome Missione / Titolo Tabella</label>
        <input type="text" value={missionTitle} onChange={(e) => setMissionTitle(e.target.value)} className="form-input" />
      </div>

      <div id="ato-table" className="card">
        <div style={{ paddingBottom: '24px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>{missionTitle}</h2>
          <button onClick={exportToPDF} className="btn btn-success no-print"><Download width={16} height={16} /> Esporta PDF</button>
        </div>
        {packages.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
            <Plane style={{ width: '64px', height: '64px', margin: '0 auto 16px auto', opacity: '0.5' }} />
            <p style={{ fontSize: '1.125rem', margin: 0 }}>Nessun pacchetto inserito</p>
            <p style={{ fontSize: '0.875rem', margin: 0 }}>Aggiungi il primo pacchetto per generare l'ATO</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Callsign</th><th>Aeromobile</th><th>Airbase</th><th>Task/Obiettivo</th><th>ETT</th><th>TOT</th><th>RTB</th><th>ROE</th><th>Freq/Ente</th><th style={{ textAlign: 'center' }}>Note</th><th style={{ textAlign: 'center' }} className="no-print">Azioni</th></tr></thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    {/* --- MODIFICATO: Callsign cliccabile per duplicare --- */}
                    <td className="callsign" onClick={() => handleDuplicate(pkg)} title="Copia dati nel form">{pkg.callsign}</td>
                    <td>{pkg.aircraft}</td>
                    <td>{pkg.airbase}</td>
                    <td>{pkg.task}</td>
                    <td className="monospace">{pkg.ett}</td>
                    <td className="monospace">{pkg.tot}</td>
                    <td className="monospace">{pkg.rtb}</td>
                    <td>{pkg.roe}</td>
                    <td className="monospace">{pkg.freq}</td>
                    <td className="note-cell">
                      {pkg.notes ? (
                        <>
                          <span className="note-icon" onClick={() => handleTooltipToggle(pkg.id)}>ℹ️</span>
                          <div className={`tooltip-container ${activeTooltipId === pkg.id ? 'visible' : ''}`}>
                            <p style={{ fontWeight: 'bold', color: '#60a5fa', margin: '0 0 4px 0' }}>Note:</p>
                            {pkg.notes}
                          </div>
                        </>
                      ) : (
                        <span style={{ color: '#64748b' }}>—</span>
                      )}
                    </td>
                    <td className="no-print">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <button onClick={() => handleEdit(pkg)} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer' }} title="Modifica"><Edit2 width={16} height={16} /></button>
                        <button onClick={() => handleDelete(pkg.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }} title="Elimina"><Trash2 width={16} height={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}