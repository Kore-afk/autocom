import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Car, Mail, Bell, User, Wrench, Code2Icon, Info } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold mb-4 md:mb-0">AutoComunidad</Link>
          <div className="flex flex-wrap justify-center md:space-x-4">
            <Link to="/" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap mb-2 md:mb-0">
              <Home className="mr-1" />
              Inicio
            </Link>
            <Link to="/marketplace" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap mb-2 md:mb-0">
              <Car className="mr-1" />
              Marketplace
            </Link>
            <Link to="/talleres-cercanos" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap mb-2 md:mb-0">
              <Wrench className="mr-1" />
              Talleres
            </Link>
            <Link to="/mensajes" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap mb-2 md:mb-0">
              <Mail className="mr-1" />
              Mensajes
            </Link>
            <Link to="/notificaciones" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap mb-2 md:mb-0">
              <Bell className="mr-1" />
              Notificaciones
            </Link>
            <Link to="/perfil" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap mb-2 md:mb-0">
              <User className="mr-1" />
              Perfil
            </Link>
            <Link to="/Nosotros" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap mb-2 md:mb-0">
              <Info className="mr-1" />
              Nosotros
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
