import React, { useState } from 'react'
import { MapPin, Search, Star, Phone, Clock, Wrench } from 'lucide-react'

interface Taller {
  id: number
  name: string
  address: string
  distance: number
  rating: number
  phone: string
  schedule: string
  services: string[]
  image: string
}

const TalleresCercanos: React.FC = () => {
  const [talleres, setTalleres] = useState<Taller[]>([
    {
      id: 1,
      name: 'Taller Mecánico Express',
      address: 'Calle Principal 123',
      distance: 1.5,
      rating: 4.5,
      phone: '555-0123',
      schedule: 'Lun-Sáb: 9:00 - 18:00',
      services: ['Mecánica general', 'Electricidad', 'Frenos', 'Suspensión'],
      image: 'https://images.unsplash.com/photo-1503434396599-58ba8a18d932?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'AutoService Pro',
      address: 'Avenida Central 456',
      distance: 2.3,
      rating: 4.2,
      phone: '555-0124',
      schedule: 'Lun-Dom: 8:00 - 20:00',
      services: ['Diagnóstico computarizado', 'Afinación', 'Transmisión', 'Aire acondicionado'],
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Mecánicos Unidos',
      address: 'Boulevard Norte 789',
      distance: 3.1,
      rating: 4.8,
      phone: '555-0125',
      schedule: 'Lun-Vie: 8:00 - 19:00',
      services: ['Hojalatería y pintura', 'Scanner', 'Alineación', 'Balanceo'],
      image: 'https://images.unsplash.com/photo-1449130015084-2d48a345ae62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
  ])

  const [ubicacion, setUbicacion] = useState('')
  const [selectedTaller, setSelectedTaller] = useState<Taller | null>(null)

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Talleres Cercanos</h1>
      
      <div className="mb-8">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder="Buscar por ubicación..."
              className="input input-bordered w-full"
            />
            <button className="btn btn-square">
              <Search />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talleres.map((taller) => (
          <div key={taller.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={taller.image} alt={taller.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {taller.name}
                <div className="badge badge-primary">
                  {taller.rating} <Star className="w-4 h-4 ml-1" />
                </div>
              </h2>
              
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {taller.address}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {taller.schedule}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {taller.services.slice(0, 2).map((service, index) => (
                  <span key={index} className="badge badge-outline">{service}</span>
                ))}
                {taller.services.length > 2 && (
                  <span className="badge badge-outline">+{taller.services.length - 2} más</span>
                )}
              </div>

              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => setSelectedTaller(taller)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTaller && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg mb-4">{selectedTaller.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img 
                src={selectedTaller.image} 
                alt={selectedTaller.name}
                className="w-full rounded-lg object-cover h-64"
              />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-xl font-bold">{selectedTaller.rating}</span>
                </div>
                
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {selectedTaller.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    {selectedTaller.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {selectedTaller.schedule}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Wrench className="w-5 h-5" />
                    Servicios
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTaller.services.map((service, index) => (
                      <span key={index} className="badge badge-primary">{service}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedTaller(null)}>Cerrar</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedTaller(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  )
}

export default TalleresCercanos