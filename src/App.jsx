import React, { useState } from 'react';
import { Plane, Plus, Trash2, Download, Edit2, X } from 'lucide-react';

// Ho rinominato la funzione in "App"
export default function App() {
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    callsign: '',
    aircraft: '',
    task: '',
    ett: '',
    tot: '',
    rtb: '',
    roe: '',
    freq: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.callsign || !formData.aircraft || !formData.task || !formData.ett || !formData.tot || !formData.rtb || !formData.roe || !formData.freq) {
      alert('Compila tutti i campi obbligatori');
      return;
    }
    
    if (editingId !== null) {
      setPackages(packages.map(pkg => 
        pkg.id === editingId ? { ...formData, id: editingId } : pkg
      ));
      setEditingId(null);
    } else {
      const newPackage = {
        ...formData,
        id: Date.now()
      };
      setPackages([...packages, newPackage]);
    }
    
    setFormData({
      callsign: '',
      aircraft: '',
      task: '',
      ett: '',
      tot: '',
      rtb: '',
      roe: '',
      freq: '',
      notes: ''
    });
  };

  const handleEdit = (pkg) => {
    setFormData(pkg);
    setEditingId(pkg.id);
  };

  const handleDelete = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      callsign: '',
      aircraft: '',
      task: '',
      ett: '',
      tot: '',
      rtb: '',
      roe: '',
      freq: '',
      notes: ''
    });
  };

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #ato-table, #ato-table * {
            visibility: visible;
          }
          #ato-table {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Generatore ATO</h1>
          </div>
          <div className="text-sm text-slate-400">
            Air Tasking Order Generator
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 shadow-xl no-print">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {editingId ? 'Modifica Pacchetto' : 'Aggiungi Pacchetto'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Callsign</label>
              <input
                type="text"
                name="callsign"
                value={formData.callsign}
                onChange={handleInputChange}
                placeholder="es. VIPER 1-1"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Aeromobile</label>
              <input
                type="text"
                name="aircraft"
                value={formData.aircraft}
                onChange={handleInputChange}
                placeholder="es. F-16C"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Task/Obiettivo</label>
              <input
                type="text"
                name="task"
                value={formData.task}
                onChange={handleInputChange}
                placeholder="es. CAP / SEAD / CAS"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">ETT (Decollo)</label>
              <input
                type="time"
                name="ett"
                value={formData.ett}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">TOT (Time On Target)</label>
              <input
                type="time"
                name="tot"
                value={formData.tot}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">RTB (Rientro)</label>
              <input
                type="time"
                name="rtb"
                value={formData.rtb}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">ROE</label>
              <input
                type="text"
                name="roe"
                value={formData.roe}
                onChange={handleInputChange}
                placeholder="es. Weapons Free"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Freq/Ente</label>
              <input
                type="text"
                name="freq"
                value={formData.freq}
                onChange={handleInputChange}
                placeholder="es. 251.000"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium mb-1 text-slate-300">Note (opzionale)</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="es. Coordinare con AWACS / Rifornimento previsto..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center gap-2"
              >
                {editingId ? <><Edit2 className="w-4 h-4" /> Aggiorna</> : <><Plus className="w-4 h-4" /> Aggiungi</>}
              </button>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div id="ato-table" className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Air Tasking Order</h2>
            <button
              onClick={exportToPDF}
              className="no-print bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Esporta PDF
            </button>
          </div>

          {packages.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Plane className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nessun pacchetto inserito</p>
              <p className="text-sm">Aggiungi il primo pacchetto per generare l'ATO</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Callsign</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Aeromobile</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Task/Obiettivo</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ETT</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">TOT</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">RTB</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ROE</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Freq/Ente</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Note</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold no-print">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-slate-750 transition-colors">
                      <td className="px-4 py-3 font-medium text-blue-400">{pkg.callsign}</td>
                      <td className="px-4 py-3">{pkg.aircraft}</td>
                      <td className="px-4 py-3">{pkg.task}</td>
                      <td className="px-4 py-3 font-mono">{pkg.ett}</td>
                      <td className="px-4 py-3 font-mono">{pkg.tot}</td>
                      <td className="px-4 py-3 font-mono">{pkg.rtb}</td>
                      <td className="px-4 py-3">{pkg.roe}</td>
                      <td className="px-4 py-3 font-mono">{pkg.freq}</td>
                      <td className="px-4 py-3 text-center">
                        {pkg.notes && (
                          <div className="relative inline-block group">
                            <span className="cursor-pointer text-blue-400 hover:text-blue-300 text-lg">ℹ️</span>
                            <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute z-50 w-72 p-3 bg-slate-950 text-slate-200 text-sm rounded-lg shadow-2xl border-2 border-slate-600 bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-opacity duration-200">
                              <div className="font-semibold mb-1 text-blue-400">Note:</div>
                              <div className="whitespace-normal break-words">{pkg.notes}</div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-600"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        {!pkg.notes && <span className="text-slate-600">—</span>}
                      </td>
                      <td className="px-4 py-3 no-print">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                            title="Modifica"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                            title="Elimina"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {packages.length > 0 && (
          <div className="mt-4 text-right text-sm text-slate-400 no-print">
            Totale pacchetti: {packages.length}
          </div>
        )}
      </div>
    </div>
  );
}