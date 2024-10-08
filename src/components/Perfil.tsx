import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Edit2, X, Star } from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  rating: number
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    phone: '+1 234 567 890',
    location: 'Ciudad de México, México',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    rating: 4.5
  })

  const [showModal, setShowModal] = useState(false)
  const [editUser, setEditUser] = useState<UserProfile>(user)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditUser({ ...editUser, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(editUser)
    setShowModal(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mr-6" />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">Entusiasta de autos</p>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{user.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="w-6 h-6 text-indigo-600 mr-2" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-6 h-6 text-indigo-600 mr-2" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-indigo-600 mr-2" />
            <span>{user.location}</span>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Edit2 className="mr-2" />
          Editar perfil
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Editar perfil</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                value={editUser.phone}
                onChange={handleInputChange}
                placeholder="Teléfono"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="text"
                name="location"
                value={editUser.location}
                onChange={handleInputChange}
                placeholder="Ubicación"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="url"
                name="avatar"
                value={editUser.avatar}
                onChange={handleInputChange}
                placeholder="URL del avatar"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="rating"
                value={editUser.rating}
                onChange={handleInputChange}
                placeholder="Calificación"
                className="w-full p-2 mb-4 border rounded"
                required
                min="0"
                max="5"
                step="0.1"
              />
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Perfil