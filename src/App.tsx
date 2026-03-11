import React, { useState, useEffect, Component, ReactNode } from 'react';
import { Search, Filter, Plus, X, ChevronRight, ChevronDown, Save, Trash2, Edit2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Fastener, FastenerFilters } from './types';
import { FASTENERS_DATA } from './data/fasteners';

// --- Error Boundary ---
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg p-6">
          <div className="max-w-md w-full bg-white border border-ink/10 p-8 shadow-xl">
            <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4 text-red-600">Application Error</h2>
            <p className="font-mono text-sm mb-6 opacity-70">{this.state.error?.message || "Something went wrong."}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

const STORAGE_KEY = 'fastener_database_local';

function App() {
  const [fasteners, setFasteners] = useState<Fastener[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FastenerFilters>({
    search: '',
    thread: '',
    type: '',
    material: '',
    minLength: '',
    maxLength: '',
    category: ''
  });
  const [selectedFastener, setSelectedFastener] = useState<Fastener | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [groupByThread, setGroupByThread] = useState(false);
  const [filterOptions, setFilterOptions] = useState<{ threads: string[], types: string[], materials: string[] }>({
    threads: [],
    types: [],
    materials: [],
  });

  // Initialize data from localStorage or master data
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setFasteners(JSON.parse(savedData));
      } catch (e) {
        console.error('Error parsing local storage data:', e);
        setFasteners(FASTENERS_DATA);
      }
    } else {
      setFasteners(FASTENERS_DATA);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever fasteners change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fasteners));
    }
  }, [fasteners, loading]);

  // Update filter options dynamically based on ALL data
  useEffect(() => {
    const threads = Array.from(new Set(fasteners.map(f => f.thread))).filter(Boolean).sort();
    const types = Array.from(new Set(fasteners.map(f => f.type))).filter(Boolean).sort();
    const materials = Array.from(new Set(fasteners.map(f => f.material))).filter(Boolean).sort();
    
    setFilterOptions({ threads, types, materials });
  }, [fasteners]);

  const handleSave = (fastener: Fastener) => {
    if (fastener.id) {
      // Update
      setFasteners(prev => prev.map(f => f.id === fastener.id ? fastener : f));
    } else {
      // Create
      const newFastener = {
        ...fastener,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      setFasteners(prev => [...prev, newFastener]);
    }
    setIsAdding(false);
    setIsEditing(false);
    setSelectedFastener(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setFasteners(prev => prev.filter(f => f.id !== id));
    setSelectedFastener(null);
  };

  const filteredFasteners = fasteners.filter(f => {
    const matchesSearch = !filters.search || 
      f.internal_code.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesThread = !filters.thread || f.thread === filters.thread;
    const matchesType = !filters.type || f.type === filters.type;
    const matchesMaterial = !filters.material || f.material === filters.material;
    
    const matchesMinLength = !filters.minLength || f.length_mm >= Number(filters.minLength);
    const matchesMaxLength = !filters.maxLength || f.length_mm <= Number(filters.maxLength);

    return matchesSearch && matchesThread && matchesType && matchesMaterial && matchesMinLength && matchesMaxLength;
  });

  const groupedFasteners = groupByThread 
    ? filteredFasteners.reduce((acc, f) => {
        const group = f.thread || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(f);
        return acc;
      }, {} as Record<string, Fastener[]>)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-ink/10 p-4 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-ink flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-bg rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter uppercase">Fastener Standards</h1>
            <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Internal Engineering Tool v2.0 (Local Data)</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 mr-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-mono">
              Mode: Local Storage
            </span>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={14} /> Add Record
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-64 border-r border-ink/10 p-6 flex flex-col gap-6 overflow-y-auto bg-white/30">
          <div className="flex items-center justify-between">
            <h2 className="sidebar-label">Search & Filters</h2>
            <button 
              onClick={() => setFilters({ search: '', thread: '', type: '', material: '', minLength: '', maxLength: '', category: '' })}
              className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="sidebar-label">Internal Code Search</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" />
                <input 
                  type="text" 
                  placeholder="Search code..." 
                  className="w-full pl-9"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="sidebar-label">Thread Size</label>
              <select 
                className="w-full"
                value={filters.thread}
                onChange={(e) => setFilters({ ...filters, thread: e.target.value })}
              >
                <option value="">All Sizes</option>
                {filterOptions.threads.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="sidebar-label">Category</label>
              <select 
                className="w-full"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="">All Categories</option>
                {filterOptions.types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="sidebar-label">Material</label>
              <select 
                className="w-full"
                value={filters.material}
                onChange={(e) => setFilters({ ...filters, material: e.target.value })}
              >
                <option value="">All Materials</option>
                {filterOptions.materials.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="sidebar-label">Length Range (mm)</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full"
                  value={filters.minLength}
                  onChange={(e) => setFilters({ ...filters, minLength: e.target.value })}
                />
                <span className="opacity-30">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full"
                  value={filters.maxLength}
                  onChange={(e) => setFilters({ ...filters, maxLength: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input 
                type="checkbox" 
                id="groupByThread"
                checked={groupByThread}
                onChange={(e) => setGroupByThread(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="groupByThread" className="sidebar-label mb-0 cursor-pointer">Group by Thread</label>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white/10">
          <div className="grid grid-cols-8 bg-white/50 sticky top-0 z-10">
            <div className="col-header">Internal Code</div>
            <div className="col-header">Standard</div>
            <div className="col-header">Category</div>
            <div className="col-header">Thread</div>
            <div className="col-header">Length</div>
            <div className="col-header">Head</div>
            <div className="col-header">Drive</div>
            <div className="col-header">Material</div>
          </div>

          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center opacity-30">
              <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-mono text-xs uppercase tracking-widest">Loading Data...</p>
            </div>
          ) : filteredFasteners.length === 0 ? (
            <div className="p-20 text-center opacity-30">
              <p className="font-mono text-xs uppercase tracking-widest">No records found matching criteria</p>
            </div>
          ) : groupByThread && groupedFasteners ? (
            Object.entries(groupedFasteners as Record<string, Fastener[]>).sort().map(([thread, items]) => (
              <div key={thread} className="mb-4">
                <div className="bg-ink/5 px-4 py-2 border-y border-ink/10 flex items-center gap-2">
                  <ChevronDown size={14} className="opacity-50" />
                  <span className="font-mono font-bold text-xs uppercase tracking-widest">Thread: {thread}</span>
                  <span className="text-[10px] opacity-40 ml-2">({items.length} items)</span>
                </div>
                {items.map(f => (
                  <div key={f.id}>
                    <FastenerRow f={f} onClick={() => setSelectedFastener(f)} />
                  </div>
                ))}
              </div>
            ))
          ) : (
            filteredFasteners.map(f => (
              <div key={f.id}>
                <FastenerRow f={f} onClick={() => setSelectedFastener(f)} />
              </div>
            ))
          )}
        </main>
      </div>

      {/* Detail / Edit / Add Modal */}
      <AnimatePresence>
        {(selectedFastener || isAdding) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex justify-end"
            onClick={() => {
              if (!isEditing && !isAdding) setSelectedFastener(null);
            }}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-bg h-full shadow-2xl flex flex-col border-l border-ink"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-ink/10 flex justify-between items-center bg-white/50">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      setSelectedFastener(null);
                      setIsAdding(false);
                      setIsEditing(false);
                    }}
                    className="p-2 hover:bg-ink/5 rounded-full"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-xl font-bold tracking-tighter uppercase">
                    {isAdding ? 'New Fastener Record' : isEditing ? 'Edit Record' : 'Fastener Details'}
                  </h2>
                </div>
                <div className="flex gap-2">
                  {!isAdding && !isEditing && (
                    <>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => selectedFastener?.id && handleDelete(selectedFastener.id)}
                        className="btn-secondary text-red-600 border-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => {
                      setSelectedFastener(null);
                      setIsAdding(false);
                      setIsEditing(false);
                    }}
                    className="p-2 hover:bg-ink/5 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {(isEditing || isAdding) ? (
                  <FastenerForm 
                    initialData={selectedFastener || undefined} 
                    onSave={handleSave}
                    onCancel={() => {
                      if (isAdding) setIsAdding(false);
                      else setIsEditing(false);
                    }}
                  />
                ) : selectedFastener ? (
                  <FastenerDetails f={selectedFastener} />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FastenerRow({ f, onClick }: { f: Fastener; onClick: () => void }) {
  return (
    <div className="data-row" onClick={onClick}>
      <div className="data-value font-bold">{f.internal_code}</div>
      <div className="data-value opacity-70">{f.standard}</div>
      <div className="data-value text-xs uppercase opacity-50">{f.type}</div>
      <div className="data-value">{f.thread}</div>
      <div className="data-value">{f.length_mm}mm</div>
      <div className="data-value opacity-70">{f.head_type}</div>
      <div className="data-value opacity-70">{f.drive_type}</div>
      <div className="data-value truncate">{f.material}</div>
    </div>
  );
}

function FastenerDetails({ f }: { f: Fastener }) {
  const fields = [
    { label: 'Internal Code', value: f.internal_code, mono: true },
    { label: 'Standard', value: f.standard },
    { label: 'Type', value: f.type },
    { label: 'Thread', value: f.thread, mono: true },
    { label: 'Length (mm)', value: `${f.length_mm} mm`, mono: true },
    { label: 'Head Type', value: f.head_type },
    { label: 'Drive Type', value: f.drive_type },
    { label: 'Material', value: f.material },
    { label: 'Strength Grade', value: f.strength_grade },
    { label: 'Coating', value: f.coating },
    { label: 'Usage', value: f.usage },
    { label: 'Notes', value: f.notes, fullWidth: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {fields.map(field => (
        <div key={field.label} className={`${field.fullWidth ? 'col-span-2' : ''} border-b border-ink/5 pb-4`}>
          <label className="sidebar-label">{field.label}</label>
          <div className={`${field.mono ? 'font-mono' : ''} text-lg`}>
            {field.value || <span className="opacity-20 italic">None</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function FastenerForm({ initialData, onSave, onCancel }: { 
  initialData?: Fastener, 
  onSave: (f: Fastener) => void,
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Fastener>(initialData || {
    internal_code: '',
    standard: '',
    type: '',
    thread: '',
    length_mm: 0,
    head_type: '',
    drive_type: '',
    material: '',
    strength_grade: '',
    coating: '',
    usage: '',
    notes: '',
    category: 'Screws'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Internal Code *</label>
        <input 
          required
          value={formData.internal_code}
          onChange={e => setFormData({ ...formData, internal_code: e.target.value })}
          placeholder="e.g. STD-SC-0042"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Standard</label>
        <input 
          value={formData.standard}
          onChange={e => setFormData({ ...formData, standard: e.target.value })}
          placeholder="e.g. ISO 14580"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Type</label>
        <input 
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
          placeholder="e.g. Machine screw"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Thread</label>
        <input 
          value={formData.thread}
          onChange={e => setFormData({ ...formData, thread: e.target.value })}
          placeholder="e.g. M4"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Length (mm)</label>
        <input 
          type="number"
          step="0.1"
          value={formData.length_mm}
          onChange={e => setFormData({ ...formData, length_mm: parseFloat(e.target.value) || 0 })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Head Type</label>
        <input 
          value={formData.head_type}
          onChange={e => setFormData({ ...formData, head_type: e.target.value })}
          placeholder="e.g. Pan head"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Drive Type</label>
        <input 
          value={formData.drive_type}
          onChange={e => setFormData({ ...formData, drive_type: e.target.value })}
          placeholder="e.g. Torx T8"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Material</label>
        <input 
          value={formData.material}
          onChange={e => setFormData({ ...formData, material: e.target.value })}
          placeholder="e.g. Stainless steel"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Strength Grade</label>
        <input 
          value={formData.strength_grade}
          onChange={e => setFormData({ ...formData, strength_grade: e.target.value })}
          placeholder="e.g. A2-70"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="sidebar-label">Coating</label>
        <input 
          value={formData.coating}
          onChange={e => setFormData({ ...formData, coating: e.target.value })}
          placeholder="e.g. Zinc plated"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label className="sidebar-label">Usage</label>
        <input 
          value={formData.usage}
          onChange={e => setFormData({ ...formData, usage: e.target.value })}
          placeholder="e.g. General assembly"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label className="sidebar-label">Notes</label>
        <textarea 
          className="w-full bg-transparent border border-ink/20 p-3 font-mono text-sm outline-none focus:border-ink min-h-[100px]"
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional information..."
        />
      </div>
      <div className="col-span-2 flex justify-end gap-4 mt-6">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary flex items-center gap-2">
          <Save size={14} /> Save Record
        </button>
      </div>
    </form>
  );
}
