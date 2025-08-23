import { useState } from 'react'

export default function AddPlantForm({ onClose, onSubmit, loading }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [categories, setCategories] = useState('Indoor, Home Decor')
  const [available, setAvailable] = useState(true)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!name || name.trim().length < 2) e.name = 'Enter a valid name (min 2 chars).'
    const p = parseFloat(price)
    if (isNaN(p) || p < 0) e.price = 'Enter a valid non-negative price.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function submit(evn) {
    evn.preventDefault()
    if (!validate()) return
    await onSubmit({
      name: name.trim(),
      price: parseFloat(price),
      categories,
      available
    })
  }

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <h3 style={{margin:0}}>Add New Plant</h3>
        <form onSubmit={submit}>
          <div className="row">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Money Plant" />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="row cols-2">
            <div>
              <label>Price (₹)</label>
              <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 249" />
              {errors.price && <div className="form-error">{errors.price}</div>}
            </div>
            <div>
              <label>Availability</label>
              <select value={available ? 'true' : 'false'} onChange={e => setAvailable(e.target.value === 'true')}>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="row">
            <label>Categories (comma-separated)</label>
            <input value={categories} onChange={e => setCategories(e.target.value)} placeholder="Indoor, Air Purifying" />
            <div className="small">Tip: try keywords like "home decor", "indoor", "succulent".</div>
          </div>
          <hr className="sep" />
          <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button className="primary" disabled={loading}>{loading ? 'Saving…' : 'Add Plant'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
