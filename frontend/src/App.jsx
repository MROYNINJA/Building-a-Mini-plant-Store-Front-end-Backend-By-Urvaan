import { useEffect, useMemo, useState } from 'react'
import { fetchPlants, addPlant } from './api'
import PlantCard from './components/PlantCard'
import Filters from './components/Filters'
import AddPlantForm from './components/AddPlantForm'

const DEFAULT_CATEGORIES = ['Indoor','Outdoor','Succulent','Air Purifying','Home Decor','Flowering','Low Maintenance','Hanging','Bonsai','Herb']

export default function App() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [inStock, setInStock] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [meta, setMeta] = useState({ total: 0, pages: 1, page: 1 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [adding, setAdding] = useState(false)

  async function load() {
    try {
      setLoading(true); setError('')
      const res = await fetchPlants({
        q, category, inStock: inStock === '' ? '' : inStock === 'true', page, limit: 12
      })
      setData(res.data); setMeta(res.meta)
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to load plants')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { setPage(1) }, [q, category, inStock])
  useEffect(() => { load() }, [q, category, inStock, page])

  async function handleAdd(payload) {
    try {
      setAdding(true)
      await addPlant(payload)
      setShowAdd(false)
      await load()
    } catch (e) {
      alert(e?.response?.data?.errors?.[0]?.msg || e?.response?.data?.error || 'Failed to add plant')
    } finally {
      setAdding(false)
    }
  }

  const pages = useMemo(() => Array.from({ length: meta.pages || 1 }, (_, i) => i + 1), [meta.pages])

  return (
    <div className="container">
      <div className="header">
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span className="brand">Urvann Mini Plant Store</span>
          <span className="badge">Demo</span>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button onClick={() => setShowAdd(true)} className="primary">+ Add Plant</button>
        </div>
      </div>

      <Filters
        q={q} setQ={setQ}
        category={category} setCategory={setCategory}
        inStock={inStock} setInStock={setInStock}
        categories={DEFAULT_CATEGORIES}
      />

      {loading && <div style={{padding:20}}>Loading plants…</div>}
      {error && <div style={{padding:20, color:'#ffb4a8'}}>Error: {error}</div>}

      <div className="grid">
        {!loading && !error && data.map(p => <PlantCard key={p._id} plant={p} />)}
      </div>

      {!loading && !error && pages.length > 1 && (
        <div style={{display:'flex', gap:6, justifyContent:'center', marginTop:16}}>
          {pages.map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className=""
              style={{padding:'8px 10px', borderRadius:10, border:'1px solid #2a3a4b', background: page===p ? '#1a2431' : 'transparent', color:'#c8d4df'}}
            >{p}</button>
          ))}
        </div>
      )}

      <div className="footer">Search by plant name or category keyword. Filter by category or stock. Add new plants from the top-right.</div>

      {showAdd && <AddPlantForm onClose={() => setShowAdd(false)} onSubmit={handleAdd} loading={adding} />}
    </div>
  )
}
