import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Car, Bell, Wrench, TrendingUp, Search, Mail, Code2Icon, Info } from 'lucide-react'
import Publicaciones from './Publicaciones'

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [trendingTopics] = useState([
    { id: 1, name: 'Mantenimiento', count: 120 },
    { id: 2, name: 'Tuning', count: 98 },
    { id: 3, name: 'Autos Eléctricos', count: 85 },
    { id: 4, name: 'Historias en carretera', count: 72 },
    { id: 5, name: 'Tsuritos Team', count: 65 },
  ])
  const [popularCommunities] = useState([
    { id: 1, name: 'Mecanicos Unidos', members: 5200 },
    { id: 2, name: 'Amantes del Tuning', members: 4800 },
    { id: 3, name: 'Uber drivers unidos', members: 3900 },
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