import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Car, MessageSquare, Bell, Wrench, TrendingUp, Search, Mail } from 'lucide-react'
import Publicaciones from './Publicaciones'

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [trendingTopics] = useState([
    { id: 1, name: 'Mantenimiento', count: 120 },
    { id: 2, name: 'Tuning', count: 98 },
    { id: 3, name: 'Eléctricos', count: 85 },
    { id: 4, name: 'Clásicos', count: 72 },
    { id: 5, name: 'Offroad', count: 65 },
  ])
  const [popularCommunities] = useState([
    { id: 1, name: 'Mecánicos Unidos', members: 5200 },
    { id: 2, name: 'Amantes del Tuning', members: 4800 },
    { id: 3, name: 'Autos Eléctricos', members: 3900 },
    { id: 4, name: 'Restauradores de Clásicos', members: 3500 },
    { id: 5, name: 'Aventuras 4x4', members: 3200 },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-6">
        <div className="w-3/4 pr-4">
          <h1 className="text-3xl font-bold mb-6">Bienvenido a la Comunidad de Autos</h1>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Search className="mr-2" />
              <input
                type="text"
                placeholder="Buscar publicaciones, usuarios o comunidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2 flex-grow"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link to="/marketplace" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Car className="h-8 w-8 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Marketplace</h2>
              <p className="text-gray-600">Explora y publica autos en venta.</p>
            </Link>
            <Link to="/talleres-cercanos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Wrench className="h-8 w-8 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Talleres Cercanos</h2>
              <p className="text-gray-600">Encuentra talleres mecánicos en tu área.</p>
            </Link>
            <Link to="/notificaciones" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Bell className="h-8 w-8 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Notificaciones</h2>
              <p className="text-gray-600">Mantente al día con las últimas actualizaciones.</p>
            </Link>
            <Link to="/mensajes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Mail className="h-8 w-8 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Mensajes</h2>
              <p className="text-gray-600">Conecta con otras personas de la comunidad</p>
            </Link>
          </div>
          <Publicaciones />
        </div>
        <div className="w-1/4 pl-4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2" />
              Temas Tendencia
            </h2>
            <ul>
              {trendingTopics.map((topic) => (
                <li key={topic.id} className="mb-2">
                  <a href="#" className="text-indigo-600 hover:underline">
                    #{topic.name} <span className="text-gray-500">({topic.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Comunidades Populares</h2>
            <ul>
              {popularCommunities.map((community) => (
                <li key={community.id} className="mb-2">
                  <a href="#" className="text-indigo-600 hover:underline">
                    {community.name} <span className="text-gray-500">({community.members} miembros)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard