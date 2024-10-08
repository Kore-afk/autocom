import React, { useState } from 'react'
import { Send, User } from 'lucide-react'

interface Message {
  id: number
  sender: string
  receiver: string
  content: string
  timestamp: Date
}

interface Contact {
  id: number
  name: string
}

const Mensajes: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Juan Pérez', receiver: 'Usuario Actual', content: 'Hola, ¿cómo estás?', timestamp: new Date('2023-05-10T10:30:00') },
    { id: 2, sender: 'Usuario Actual', receiver: 'Juan Pérez', content: 'Bien, gracias. ¿Y tú?', timestamp: new Date('2023-05-10T10:35:00') },
    { id: 3, sender: 'María García', receiver: 'Usuario Actual', content: '¿Tienes información sobre el Ford Mustang?', timestamp: new Date('2023-05-11T14:20:00') },
  ])

  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Carlos Rodríguez' },
  ])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (selectedContact && newMessage.trim() !== '') {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'Usuario Actual',
        receiver: selectedContact.name,
        content: newMessage,
        timestamp: new Date(),
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const filteredMessages = selectedContact
    ? messages.filter(
        (msg) =>
          (msg.sender === selectedContact.name && msg.receiver === 'Usuario Actual') ||
          (msg.sender === 'Usuario Actual' && msg.receiver === selectedContact.name)
      )
    : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mensajes</h1>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <h2 className="text-xl font-semibold mb-4">Contactos</h2>
          <ul>
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className={`p-2 cursor-pointer hover:bg-gray-100 rounded ${
                  selectedContact?.id === contact.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center">
                  <User className="mr-2" />
                  {contact.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 pl-4">
          {selectedContact ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Chat con {selectedContact.name}</h2>
              <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto mb-4">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 ${
                      msg.sender === 'Usuario Actual' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        msg.sender === 'Usuario Actual'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      {msg.content}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {msg.timestamp.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700"
                >
                  <Send />
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Selecciona un contacto para comenzar a chatear.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mensajes