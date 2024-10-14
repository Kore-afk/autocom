import React from 'react'
import { Users, Wrench, Heart } from 'lucide-react'

const Nosotros: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nosotros</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-6">
          AutoComunidad es una plataforma dedicada a unir a entusiastas y profesionales del mundo automotriz, nuestra misión es crear un espacio donde los amantes de los autos puedan compartir conocimientos, experiencias y pasión por los vehículos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Comunidad</h2>
            <p>Conectamos a personas con intereses similares en el mundo automotriz.</p>
          </div>
          <div className="text-center">
            <Wrench className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Conocimiento</h2>
            <p>Compartimos experiencias y consejos para el mantenimiento y mejora de vehículos.</p>
          </div>
          <div className="text-center">
            <Heart className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Pasión</h2>
            <p>Celebramos la pasión por los autos en todas sus formas y estilos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nosotros