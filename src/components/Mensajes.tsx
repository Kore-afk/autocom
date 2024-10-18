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
    { id: 1, name: "Cuau" },
    { id: 2, name: "Max" },
    { id: 3, name: "Cris" },
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
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-200 mb-6 w-60 mx-auto">
        <div className="card-body">
          <h2 className="card-title text-base-content justify-center">
            Mensajes
          </h2>
        </div>
      </div>
      <div className="flex">
        <ul className="menu bg-base-200 w-56 tex">
          <li>
            <ul>
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className={`p-2 cursor-pointer hover:bg-transparent rounded ${
                    selectedContact?.id === contact.id
                      ? "text-base-content"
                      : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center text-base-content">
                    <User className="mr-2" />
                    {contact.name}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div className="w-full pl-4">
          {selectedContact ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-base-content bg-base-100 pt-0 pb-2 round-lg text-center">
                {selectedContact.name}
                <button className="btn btn-ghost btn-circle ml-72">
                  <li className="flex items-left">
                    <Phone
                      className="swap-on h-10 w-10 fill-current"
                      viewBox="-5 -39 64 64"
                    />
                  </li>
                </button>
              </h2>

              <div className="bg-base-100 shadow-md p-4 h-96 overflow-y-auto mb-3">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat ${
                      msg.sender === "Usuario Actual"
                        ? "chat-end"
                        : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src="https://i.imgur.com/bv4ulC3.jpeg"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {msg.sender}
                      <time className="text-xs opacity-50 ml-2">
                        {msg.timestamp.toLocaleTimeString()}
                      </time>
                    </div>
                    <div className="chat-bubble">{msg.content}</div>
                    <div className="chat-footer opacity-50">Delivered</div>
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
            <p className="text-gray-500">
              Selecciona un contacto para comenzar a chatear.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
