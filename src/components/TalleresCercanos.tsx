import React, { useState } from 'react'
import { MapPin, Search } from 'lucide-react'

interface Taller {
  id: number
  name: string
  address: string
  distance: number
  rating: number
}

const TalleresCercanos: React.FC = () => {
  const [talleres, setTalleres] = useState<Taller[]>([
    { id: 1, name: 'Taller Mecánico Express', address: 'Calle Principal 123', distance: 1.5, rating: 4.5 },
    { id: 2, name: 'AutoService Pro', address: 'Avenida Central 456', distance: 2.3, rating: 4.2 },
    { id: 3, name: 'Mecánicos Unidos', address: 'Boulevard Norte 789', distance: 3.1, rating: 4.8 },
  ])

  const [ubicacion, setUbicacion] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para buscar talleres cercanos basados en la ubicación
    // Por ahora, solo mostraremos un mensaje de alerta
    alert(`Buscando talleres cerca de: ${ubicacion}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Talleres Cercanos</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center">
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            placeholder="Ingresa tu ubicación"
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {talleres.map((taller) => (
          <div key={taller.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{taller.name}</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{taller.address}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">A {taller.distance} km de distancia</span>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{taller.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TalleresCercanos