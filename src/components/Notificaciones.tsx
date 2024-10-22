import React, { useState } from 'react'
import { Bell, X, Check } from 'lucide-react'

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
    <div className="space-y-4">
      {notifications.map((notif) => (
        <div key={notif.id} className={`alert ${notif.read ? 'alert-info' : 'alert-warning'} shadow-lg`}>
          <Bell className={`h-6 w-6 ${notif.read ? 'text-info-content' : 'text-warning-content'}`} />
          <div>
            <h3 className={`font-bold ${notif.read ? 'text-info-content' : 'text-warning-content'}`}>
              {notif.content}
            </h3>
          </div>
          <div className="flex-none">
            {!notif.read && (
              <button className="btn btn-sm btn-ghost" onClick={() => markAsRead(notif.id)}>
                <Check className="h-4 w-4" />
              </button>
            )}
            <button className="btn btn-sm btn-ghost" onClick={() => deleteNotification(notif.id)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="alert alert-info shadow-lg">
          <div>
            <Bell className="h-6 w-6" />
            <span>No tienes notificaciones nuevas</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notificaciones