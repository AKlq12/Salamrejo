import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getSession, hasAccessToDusun } from './adminAuth';
import { pedukuhanList } from '../data/siteData';
import { useSiteData } from '../context/SiteDataContext';
import { updateSheetData } from '../data/apiConfig';

export default function AdminPedukuhanEdit() {
  const { id } = useParams();
  const session = getSession();
  const [activeTab, setActiveTab] = useState('info');
  const [toast, setToast] = useState(null);
  
  const { loading, getPedukuhanData } = useSiteData();

  const pedukuhan = pedukuhanList.find((p) => p.id === id);
  if (!pedukuhan) return <div className="text-center py-20 text-gray-500">Pedukuhan tidak ditemukan.</div>;
  if (!hasAccessToDusun(session, id)) return <Navigate to="/admin/dashboard" replace />;

  if (loading) return <div className="text-center py-20 text-gray-500 animate-pulse">Memuat data dari server...</div>;

  const data = getPedukuhanData(id);

  const showToast = (msg, type = 'success') => { 
    setToast({ msg, type }); 
    setTimeout(() => setToast(null), 3000); 
  };

  const tabs = [
    { key: 'info', label: 'Info Dukuh', icon: '📋' },
    { key: 'statistik', label: 'Statistik', icon: '📊' },
    { key: 'umkm', label: 'UMKM', icon: '🏪' },
    { key: 'galeri', label: 'Galeri', icon: '🖼️' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 text-white px-5 py-3 rounded-xl shadow-lg animate-fade-in text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-leaf-600'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={toast.type === 'error' ? 'M6 18L18 6M6 6l12 12' : 'M5 13l4 4L19 7'} /></svg>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{pedukuhan.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Pedukuhan {pedukuhan.nama}</h1>
            <p className="text-sm text-gray-500">Kelola data terhubung langsung ke Google Sheets</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh Data
          </button>
          <Link to={`/pedukuhan/${id}`} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-leaf-700 bg-leaf-50 hover:bg-leaf-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Lihat Halaman Publik
          </Link>
        </div>
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
        {activeTab === 'info' && <InfoTab id={id} data={data} showToast={showToast} />}
        {activeTab === 'statistik' && <StatistikTab id={id} data={data} showToast={showToast} />}
        {activeTab === 'umkm' && <UMKMTab id={id} data={data} showToast={showToast} />}
        {activeTab === 'galeri' && <GaleriTab id={id} data={data} showToast={showToast} />}
      </div>
    </div>
  );
}

/* ========== INFO TAB ========== */
function InfoTab({ id, data, showToast }) {
  const { refreshData } = useSiteData();
  const [form, setForm] = useState({
    nama: data.dukuh?.nama || '',
    wa: data.dukuh?.wa || '',
    peta_url: data.dukuh?.peta_url || '',
    hero_foto: data.hero_foto || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSheetData('updateInfo', {
        id_pedukuhan: id,
        nama: form.nama,
        wa: form.wa,
        peta_url: form.peta_url,
        hero_foto: form.hero_foto
      });
      await refreshData(true); // Silent refresh
      showToast('Info pedukuhan berhasil disimpan ke Google Sheets!');
    } catch (e) {
      showToast('Gagal menyimpan info!', 'error');
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-5 max-w-xl">
      <h3 className="text-base font-semibold text-gray-800">Informasi Dukuh</h3>
      <InputField label="Nama Dukuh" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="Nama kepala dukuh" />
      <InputField label="Nomor WhatsApp" value={form.wa} onChange={(v) => setForm({ ...form, wa: v })} placeholder="628xxxxxxxxxx" />
      <InputField label="URL Peta Google Maps" value={form.peta_url} onChange={(v) => setForm({ ...form, peta_url: v })} placeholder="https://maps.google.com/..." />
      <InputField label="URL Foto Hero" value={form.hero_foto} onChange={(v) => setForm({ ...form, hero_foto: v })} placeholder="https://..." />
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </div>
  );
}

/* ========== STATISTIK TAB ========== */
function StatistikTab({ id, data, showToast }) {
  const { refreshData } = useSiteData();
  const [form, setForm] = useState({
    jml_rt: data.statistik?.jml_rt || 0,
    jml_kk: data.statistik?.jml_kk || 0,
    laki_laki: data.statistik?.laki_laki || 0,
    perempuan: data.statistik?.perempuan || 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSheetData('updateStatistik', {
        id_pedukuhan: id,
        jml_rt: form.jml_rt,
        jml_kk: form.jml_kk,
        laki_laki: form.laki_laki,
        perempuan: form.perempuan
      });
      await refreshData(true); // Silent refresh
      showToast('Statistik berhasil disimpan ke Google Sheets!');
    } catch (e) {
      showToast('Gagal menyimpan statistik!', 'error');
    }
    setIsSaving(false);
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
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </div>
  );
}

/* ========== UMKM TAB ========== */
function UMKMTab({ id, data, showToast }) {
  const { refreshData } = useSiteData();
  const [items, setItems] = useState(data.umkm || []);
  const [editing, setEditing] = useState(null); // index or 'new'
  const [form, setForm] = useState({ nama: '', kategori: '', deskripsi: '', foto: '', wa: '', lokasi: '' });
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (i) => { setEditing(i); setForm({ ...items[i] }); };
  const startNew = () => { setEditing('new'); setForm({ nama: '', kategori: '', deskripsi: '', foto: '', wa: '', lokasi: '' }); };
  const cancel = () => setEditing(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editing === 'new') {
        await updateSheetData('addUMKM', {
          ID_Pedukuhan: id,
          Nama_Usaha: form.nama,
          Kategori: form.kategori,
          Deskripsi: form.deskripsi,
          Foto: form.foto,
          WA: form.wa,
          Lokasi: form.lokasi
        });
        setItems([...items, form]);
        await refreshData(true); // Silent refresh
        showToast('UMKM berhasil ditambahkan ke Google Sheets!');
      } else {
        await updateSheetData('editUMKM', {
          id_pedukuhan: id,
          nama_usaha_lama: items[editing].nama,
          newData: {
            Nama_Usaha: form.nama,
            Kategori: form.kategori,
            Deskripsi: form.deskripsi,
            Foto: form.foto,
            WA: form.wa,
            Lokasi: form.lokasi
          }
        });
        const newList = [...items];
        newList[editing] = form;
        setItems(newList);
        await refreshData(true); // Silent refresh
        showToast('UMKM berhasil diperbarui!');
      }
      setEditing(null);
    } catch(e) {
      showToast('Gagal menyimpan UMKM!', 'error');
    }
    setIsSaving(false);
  };

  const handleDelete = async (i) => {
    if (!confirm('Hapus UMKM ini secara permanen dari Google Sheets?')) return;
    setIsSaving(true);
    try {
      await updateSheetData('deleteUMKM', {
        id_pedukuhan: id,
        nama_usaha: items[i].nama
      });
      setItems(items.filter((_, idx) => idx !== i));
      await refreshData(true); // Silent refresh
      showToast('UMKM berhasil dihapus.');
    } catch(e) {
      showToast('Gagal menghapus UMKM!', 'error');
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-5 relative">
      {isSaving && <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-xl"><div className="w-8 h-8 border-4 border-leaf-200 border-t-leaf-600 rounded-full animate-spin"></div></div>}
      
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
          <InputField label="Lokasi (Opsional)" value={form.lokasi || ''} onChange={(v) => setForm({ ...form, lokasi: v })} />
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-leaf-600 text-white text-sm font-medium hover:bg-leaf-700 transition-colors">Simpan</button>
            <button onClick={cancel} className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors">Batal</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-8">Belum ada data UMKM.</p>}
        {items.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4">
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
  const { refreshData } = useSiteData();
  const [items, setItems] = useState(data.galeri || []);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ judul: '', kategori: '', foto: '', deskripsi: '' });
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (i) => { setEditing(i); setForm({ ...items[i] }); };
  const startNew = () => { setEditing('new'); setForm({ judul: '', kategori: '', foto: '', deskripsi: '' }); };
  const cancel = () => setEditing(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editing === 'new') {
        await updateSheetData('addGaleri', {
          ID_Pedukuhan: id,
          Judul: form.judul,
          Kategori: form.kategori,
          Foto_URL: form.foto,
          Deskripsi: form.deskripsi
        });
        setItems([...items, form]);
        await refreshData(true); // Silent refresh
        showToast('Foto galeri berhasil ditambahkan!');
      } else {
        await updateSheetData('editGaleri', {
          id_pedukuhan: id,
          judul_lama: items[editing].judul,
          newData: {
            Judul: form.judul,
            Kategori: form.kategori,
            Foto_URL: form.foto,
            Deskripsi: form.deskripsi
          }
        });
        const newList = [...items];
        newList[editing] = form;
        setItems(newList);
        await refreshData(true); // Silent refresh
        showToast('Galeri berhasil diperbarui!');
      }
      setEditing(null);
    } catch(e) {
      showToast(`Gagal menyimpan Galeri! ${e.message}`, 'error');
    }
    setIsSaving(false);
  };

  const handleDelete = async (i) => {
    if (!confirm('Hapus foto galeri ini secara permanen?')) return;
    setIsSaving(true);
    try {
      await updateSheetData('deleteGaleri', {
        id_pedukuhan: id,
        judul: items[i].judul
      });
      setItems(items.filter((_, idx) => idx !== i));
      await refreshData(true); // Silent refresh
      showToast('Foto galeri dihapus.');
    } catch(e) {
      showToast(`Gagal menghapus Galeri! ${e.message}`, 'error');
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-5 relative">
      {isSaving && <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-xl"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div></div>}

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

function SaveButton({ onClick, isSaving }) {
  return (
    <button onClick={onClick} disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-leaf-600 text-white text-sm font-semibold hover:bg-leaf-700 shadow-lg shadow-leaf-600/20 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
      {isSaving ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      )}
      {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
    </button>
  );
}
