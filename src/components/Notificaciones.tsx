import React, { useState } from 'react'
import { Bell, X } from 'lucide-react'

interface Notification {
  id: number
  content: string
  read: boolean
}

const Notificaciones: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, content: 'Nuevo comentario en tu publicación', read: false },
    { id: 2, content: 'Tu auto ha recibido una oferta', read: false },
    { id: 3, content: 'Recordatorio: Mantenimiento programado', read: true },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notificaciones</h1>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-white rounded-lg shadow-md p-4 flex items-center justify-between ${notif.read ? 'opacity-50' : ''}`}>
            <div className="flex items-center">
              <Bell className={`mr-3 ${notif.read ? 'text-gray-400' : 'text-indigo-600'}`} />
              <span>{notif.content}</span>
            </div>
            <div className="flex items-center">
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 mr-3"
                >
                  Marcar como leída
                </button>
              )}
              <button
                onClick={() => deleteNotification(notif.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-gray-500">No tienes notificaciones nuevas</p>
        )}
      </div>
    </div>
  )
}

export default Notificaciones