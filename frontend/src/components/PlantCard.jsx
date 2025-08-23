export default function PlantCard({ plant }) {
  return (
    <div className="card">
      <div className="title">{plant.name}</div>
      <div className="pills">
        {plant.categories?.map((c, i) => (
          <span className="pill" key={i}>{c}</span>
        ))}
      </div>
      <div className="price-row">
        <div>₹ {plant.price.toFixed(2)}</div>
        <span className={["status", plant.available ? "in" : "out"].join(' ')}>
          {plant.available ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  )
}
