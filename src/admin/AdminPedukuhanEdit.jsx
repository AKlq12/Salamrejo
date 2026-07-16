import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getSession, hasAccessToDusun } from './adminAuth';
import { pedukuhanList, pedukuhanData } from '../data/siteData';

const STORAGE_KEY = 'salamrejo_admin_data';

function loadLocalData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveLocalData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function AdminPedukuhanEdit() {
  const { id } = useParams();
  const session = getSession();
  const [activeTab, setActiveTab] = useState('info');
  const [toast, setToast] = useState('');

  const pedukuhan = pedukuhanList.find((p) => p.id === id);
  if (!pedukuhan) return <div className="text-center py-20 text-gray-500">Pedukuhan tidak ditemukan.</div>;
  if (!hasAccessToDusun(session, id)) return <Navigate to="/admin/dashboard" replace />;

  const original = pedukuhanData[id] || {};
  const stored = loadLocalData();
  const merged = { ...original, ...stored[id] };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const tabs = [
    { key: 'info', label: 'Info Dukuh', icon: '📋' },
    { key: 'statistik', label: 'Statistik', icon: '📊' },
    { key: 'umkm', label: 'UMKM', icon: '🏪' },
    { key: 'galeri', label: 'Galeri', icon: '🖼️' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-leaf-600 text-white px-5 py-3 rounded-xl shadow-lg animate-fade-in text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{pedukuhan.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Pedukuhan {pedukuhan.nama}</h1>
            <p className="text-sm text-gray-500">Kelola data pedukuhan</p>
          </div>
        </div>
        <Link to={`/pedukuhan/${id}`} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-leaf-700 bg-leaf-50 hover:bg-leaf-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          Lihat Halaman Publik
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === t.key ? 'bg-white text-leaf-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {activeTab === 'info' && <InfoTab id={id} data={merged} showToast={showToast} />}
        {activeTab === 'statistik' && <StatistikTab id={id} data={merged} showToast={showToast} />}
        {activeTab === 'umkm' && <UMKMTab id={id} data={merged} showToast={showToast} />}
        {activeTab === 'galeri' && <GaleriTab id={id} data={merged} showToast={showToast} />}
      </div>
    </div>
  );
}

/* ========== INFO TAB ========== */
function InfoTab({ id, data, showToast }) {
  const [form, setForm] = useState({
    nama: data.dukuh?.nama || '',
    wa: data.dukuh?.wa || '',
    peta_url: data.dukuh?.peta_url || '',
    hero_foto: data.hero_foto || '',
  });

  const handleSave = () => {
    const stored = loadLocalData();
    stored[id] = { ...stored[id], dukuh: { nama: form.nama, wa: form.wa, peta_url: form.peta_url }, hero_foto: form.hero_foto };
    saveLocalData(stored);
    showToast('Info pedukuhan berhasil disimpan!');
  };

  return (
    <div className="space-y-5 max-w-xl">
      <h3 className="text-base font-semibold text-gray-800">Informasi Dukuh</h3>
      <InputField label="Nama Dukuh" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="Nama kepala dukuh" />
      <InputField label="Nomor WhatsApp" value={form.wa} onChange={(v) => setForm({ ...form, wa: v })} placeholder="628xxxxxxxxxx" />
      <InputField label="URL Peta Google Maps" value={form.peta_url} onChange={(v) => setForm({ ...form, peta_url: v })} placeholder="https://maps.google.com/..." />
      <InputField label="URL Foto Hero" value={form.hero_foto} onChange={(v) => setForm({ ...form, hero_foto: v })} placeholder="https://..." />
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ========== STATISTIK TAB ========== */
function StatistikTab({ id, data, showToast }) {
  const [form, setForm] = useState({
    jml_rt: data.statistik?.jml_rt || 0,
    jml_kk: data.statistik?.jml_kk || 0,
    laki_laki: data.statistik?.laki_laki || 0,
    perempuan: data.statistik?.perempuan || 0,
  });

  const handleSave = () => {
    const stored = loadLocalData();
    stored[id] = { ...stored[id], statistik: { jml_rt: Number(form.jml_rt), jml_kk: Number(form.jml_kk), laki_laki: Number(form.laki_laki), perempuan: Number(form.perempuan) } };
    saveLocalData(stored);
    showToast('Statistik berhasil disimpan!');
  };

  return (
    <div className="space-y-5 max-w-xl">
      <h3 className="text-base font-semibold text-gray-800">Data Statistik</h3>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Jumlah RT" type="number" value={form.jml_rt} onChange={(v) => setForm({ ...form, jml_rt: v })} />
        <InputField label="Jumlah KK" type="number" value={form.jml_kk} onChange={(v) => setForm({ ...form, jml_kk: v })} />
        <InputField label="Laki-laki" type="number" value={form.laki_laki} onChange={(v) => setForm({ ...form, laki_laki: v })} />
        <InputField label="Perempuan" type="number" value={form.perempuan} onChange={(v) => setForm({ ...form, perempuan: v })} />
      </div>
      <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
        <strong>Total Penduduk:</strong> {(Number(form.laki_laki) + Number(form.perempuan)).toLocaleString('id-ID')} jiwa
      </div>
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ========== UMKM TAB ========== */
function UMKMTab({ id, data, showToast }) {
  const [items, setItems] = useState(data.umkm || []);
  const [editing, setEditing] = useState(null); // index or 'new'
  const [form, setForm] = useState({ nama: '', kategori: '', deskripsi: '', foto: null, wa: '' });

  const save = (list) => {
    const stored = loadLocalData();
    stored[id] = { ...stored[id], umkm: list };
    saveLocalData(stored);
    setItems(list);
  };

  const startEdit = (i) => { setEditing(i); setForm({ ...items[i] }); };
  const startNew = () => { setEditing('new'); setForm({ nama: '', kategori: '', deskripsi: '', foto: null, wa: '' }); };
  const cancel = () => setEditing(null);

  const handleSave = () => {
    const list = [...items];
    if (editing === 'new') list.push(form);
    else list[editing] = form;
    save(list);
    setEditing(null);
    showToast(editing === 'new' ? 'UMKM ditambahkan!' : 'UMKM diperbarui!');
  };

  const handleDelete = (i) => {
    if (!confirm('Hapus UMKM ini?')) return;
    const list = items.filter((_, idx) => idx !== i);
    save(list);
    showToast('UMKM dihapus.');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Daftar UMKM ({items.length})</h3>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-leaf-600 text-white text-sm font-medium hover:bg-leaf-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah UMKM
        </button>
      </div>

      {editing !== null && (
        <div className="bg-leaf-50 border border-leaf-200 rounded-xl p-5 space-y-4">
          <h4 className="font-semibold text-gray-800 text-sm">{editing === 'new' ? 'Tambah UMKM Baru' : 'Edit UMKM'}</h4>
          <InputField label="Nama Usaha" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} />
          <InputField label="Kategori" value={form.kategori} onChange={(v) => setForm({ ...form, kategori: v })} placeholder="Makanan / Kerajinan / Pertanian" />
          <TextareaField label="Deskripsi" value={form.deskripsi} onChange={(v) => setForm({ ...form, deskripsi: v })} />
          <InputField label="URL Foto" value={form.foto || ''} onChange={(v) => setForm({ ...form, foto: v })} />
          <InputField label="Nomor WhatsApp" value={form.wa} onChange={(v) => setForm({ ...form, wa: v })} />
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-leaf-600 text-white text-sm font-medium hover:bg-leaf-700 transition-colors">Simpan</button>
            <button onClick={cancel} className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors">Batal</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-8">Belum ada data UMKM.</p>}
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div>
              <p className="font-medium text-gray-800 text-sm">{item.nama}</p>
              <p className="text-xs text-gray-500">{item.kategori} — {item.deskripsi?.slice(0, 60)}...</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(i)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button onClick={() => handleDelete(i)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Hapus">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========== GALERI TAB ========== */
function GaleriTab({ id, data, showToast }) {
  const [items, setItems] = useState(data.galeri || []);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ judul: '', kategori: '', foto: null, deskripsi: '' });

  const save = (list) => {
    const stored = loadLocalData();
    stored[id] = { ...stored[id], galeri: list };
    saveLocalData(stored);
    setItems(list);
  };

  const startEdit = (i) => { setEditing(i); setForm({ ...items[i] }); };
  const startNew = () => { setEditing('new'); setForm({ judul: '', kategori: '', foto: null, deskripsi: '' }); };
  const cancel = () => setEditing(null);

  const handleSave = () => {
    const list = [...items];
    if (editing === 'new') list.push(form);
    else list[editing] = form;
    save(list);
    setEditing(null);
    showToast(editing === 'new' ? 'Foto galeri ditambahkan!' : 'Galeri diperbarui!');
  };

  const handleDelete = (i) => {
    if (!confirm('Hapus foto galeri ini?')) return;
    const list = items.filter((_, idx) => idx !== i);
    save(list);
    showToast('Foto galeri dihapus.');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Galeri Foto ({items.length})</h3>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-leaf-600 text-white text-sm font-medium hover:bg-leaf-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Foto
        </button>
      </div>

      {editing !== null && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 space-y-4">
          <h4 className="font-semibold text-gray-800 text-sm">{editing === 'new' ? 'Tambah Foto Baru' : 'Edit Foto'}</h4>
          <InputField label="Judul" value={form.judul} onChange={(v) => setForm({ ...form, judul: v })} />
          <InputField label="Kategori" value={form.kategori} onChange={(v) => setForm({ ...form, kategori: v })} placeholder="Budaya / Alam / Kegiatan / Fasilitas" />
          <InputField label="URL Foto" value={form.foto || ''} onChange={(v) => setForm({ ...form, foto: v })} />
          <TextareaField label="Deskripsi" value={form.deskripsi} onChange={(v) => setForm({ ...form, deskripsi: v })} />
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-leaf-600 text-white text-sm font-medium hover:bg-leaf-700 transition-colors">Simpan</button>
            <button onClick={cancel} className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors">Batal</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-8 col-span-2">Belum ada foto galeri.</p>}
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-lg overflow-hidden">
                {item.foto ? <img src={item.foto} alt={item.judul} className="w-full h-full object-cover" /> : '🖼️'}
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">{item.judul}</p>
                <p className="text-xs text-gray-500">{item.kategori}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(i)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
              <button onClick={() => handleDelete(i)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========== SHARED COMPONENTS ========== */
function InputField({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-transparent transition-all" />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-transparent transition-all resize-none" />
    </div>
  );
}

function SaveButton({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-leaf-600 text-white text-sm font-semibold hover:bg-leaf-700 shadow-lg shadow-leaf-600/20 hover:shadow-xl transition-all">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      Simpan Perubahan
    </button>
  );
}
