import axios from 'axios'

const api = axios.create({
  baseURL: ''
})

export async function fetchPlants({ q='', category='', inStock='', page=1, limit=12 } = {}) {
  const params = {}
  if (q) params.q = q
  if (category) params.category = category
  if (inStock !== '') params.inStock = inStock
  params.page = page
  params.limit = limit
  const res = await api.get('/api/plants', { params })
  return res.data
}

export async function addPlant(payload) {
  const res = await api.post('/api/plants', payload)
  return res.data
}
