export default function Filters({ q, setQ, category, setCategory, inStock, setInStock, categories }) {
  return (
    <div className="toolbar">
      <input
        placeholder="Search by plant or category..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={inStock} onChange={(e) => setInStock(e.target.value)}>
        <option value="">Stock: All</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
      <div />
    </div>
  )
}
