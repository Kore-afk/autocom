import React, { useState } from 'react'
import { PlusCircle, X, MessageSquare, DollarSign, Info } from 'lucide-react'

interface Car {
  id: number
  title: string
  price: number
  image: string
  description: string
  year: number
  mileage: number
  seller: string
}

interface Bid {
  amount: number
  bidder: string
}

const Marketplace: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([
    { id: 1, title: 'Toyota Corolla 2020', price: 18000, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', description: 'Excelente estado, único dueño', year: 2020, mileage: 30000, seller: 'Juan Pérez' },
    { id: 2, title: 'Honda Civic 2019', price: 16500, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', description: 'Mantenimiento al día, como nuevo', year: 2019, mileage: 45000, seller: 'María García' },
    { id: 3, title: 'Ford Mustang 2018', price: 25000, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', description: 'Deportivo en perfectas condiciones', year: 2018, mileage: 35000, seller: 'Carlos Rodríguez' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showDetails, setShowDetails] = useState<number | null>(null)
  const [newCar, setNewCar] = useState({ title: '', price: 0, image: '', description: '', year: 2023, mileage: 0 })
  const [bids, setBids] = useState<{ [key: number]: Bid[] }>({})
  const [newBid, setNewBid] = useState<number>(0)
  const [infoRequest, setInfoRequest] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCar({ ...newCar, [name]: name === 'price' || name === 'year' || name === 'mileage' ? parseInt(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = cars.length + 1
    setCars([...cars, { ...newCar, id, seller: 'Usuario Actual' }])
    setShowModal(false)
    setNewCar({ title: '', price: 0, image: '', description: '', year: 2023, mileage: 0 })
  }

  const handleBid = (carId: number) => {
    if (newBid > 0) {
      const updatedBids = { ...bids }
      if (!updatedBids[carId]) {
        updatedBids[carId] = []
      }
      updatedBids[carId].push({ amount: newBid, bidder: 'Usuario Actual' })
      setBids(updatedBids)
      setNewBid(0)
    }
  }

  const handleInfoRequest = (carId: number) => {
    if (infoRequest.trim() !== '') {
      alert(`Solicitud de información enviada al vendedor del auto ${carId}: ${infoRequest}`)
      setInfoRequest('')
    }
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="mr-2" />
          Publicar auto
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={car.image} alt={car.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{car.title}</h2>
              <p className="text-gray-600">${car.price.toLocaleString()}</p>
              <button 
                onClick={() => setShowDetails(car.id)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Publicar auto</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newCar.title}
                onChange={handleInputChange}
                placeholder="Título"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={newCar.price}
                onChange={handleInputChange}
                placeholder="Precio"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="url"
                name="image"
                value={newCar.image}
                onChange={handleInputChange}
                placeholder="URL de la imagen"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                name="description"
                value={newCar.description}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="year"
                value={newCar.year}
                onChange={handleInputChange}
                placeholder="Año"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="mileage"
                value={newCar.mileage}
                onChange={handleInputChange}
                placeholder="Kilometraje"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md">
                Publicar
              </button>
            </form>
          </div>
        </div>
      )}

      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-11/12 sm:w-3/4 max-h-3/4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Detalles del auto</h2>
              <button onClick={() => setShowDetails(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            {cars.find(car => car.id === showDetails) && (
              <div>
                <img src={cars.find(car => car.id === showDetails)!.image} alt={cars.find(car => car.id === showDetails)!.title} className="w-full h-64 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold mb-2">{cars.find(car => car.id === showDetails)!.title}</h3>
                <p className="text-gray-600 mb-2">${cars.find(car => car.id === showDetails)!.price.toLocaleString()}</p>
                <p className="text-gray-700 mb-2">{cars.find(car => car.id === showDetails)!.description}</p>
                <p className="text-gray-600 mb-2">Año: {cars.find(car => car.id === showDetails)!.year}</p>
                <p className="text-gray-600 mb-4">Kilometraje: {cars.find(car => car.id === showDetails)!.mileage.toLocaleString()} km</p>
                <button 
                  onClick={() => handleBid(showDetails)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full mb-4"
                >
                  Ofertar
                </button>
                <textarea
                  value={infoRequest}
                  onChange={(e) => setInfoRequest(e.target.value)}
                  placeholder="Solicitar más información"
                  className="w-full p-2 mb-4 border rounded"
                />
                <button 
                  onClick={() => handleInfoRequest(showDetails)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
                >
                  Enviar solicitud
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace
