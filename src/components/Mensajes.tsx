import React, { useState } from "react";
import { Phone, Send, User } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
}

interface Contact {
  id: number;
  name: string;
}

const Mensajes: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Juan Pérez",
      receiver: "Usuario Actual",
      content: "Hola, ¿cómo estás?",
      timestamp: new Date("2023-05-10T10:30:00"),
    },
    {
      id: 2,
      sender: "Usuario Actual",
      receiver: "Juan Pérez",
      content: "Bien, gracias. ¿Y tú?",
      timestamp: new Date("2023-05-10T10:35:00"),
    },
    {
      id: 3,
      sender: "María García",
      receiver: "Usuario Actual",
      content: "¿Tienes información sobre el Ford Mustang?",
      timestamp: new Date("2023-05-11T14:20:00"),
    },
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Juan Pérez" },
    { id: 2, name: "María García" },
    { id: 3, name: "Carlos Rodríguez" },
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (selectedContact && newMessage.trim() !== "") {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "Usuario Actual",
        receiver: selectedContact.name,
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const filteredMessages = selectedContact
    ? messages.filter(
        (msg) =>
          (msg.sender === selectedContact.name &&
            msg.receiver === "Usuario Actual") ||
          (msg.sender === "Usuario Actual" &&
            msg.receiver === selectedContact.name)
      )
    : [];

  return (
    <div className="flex h-[70vh]">
      <div className="w-1/3 border-r overflow-y-auto">
        <ul className="menu bg-base-200 w-full rounded-box">
          {contacts.map((contact) => (
            <li key={contact.id}>
              <a
                className={selectedContact?.id === contact.id ? "active" : ""}
                onClick={() => setSelectedContact(contact)}
              >
                <User className="h-5 w-5" />
                {contact.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedContact ? (
          <>
            <div className="bg-base-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedContact.name}</h2>
              <button className="btn btn-circle btn-outline">
                <Phone className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat ${
                    msg.sender === "Usuario Actual" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-bubble">{msg.content}</div>
                  <div className="chat-footer opacity-50 text-xs">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-base-200">
              <div className="join w-full">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="input input-bordered join-item w-full"
                />
                <button
                  onClick={handleSendMessage}
                  className="btn join-item"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">
              Selecciona un contacto para comenzar a chatear
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mensajes;