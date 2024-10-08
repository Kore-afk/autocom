import React, { useState, useEffect } from 'react'
import { MessageSquare, ArrowUp, ArrowDown, Search, PlusCircle, ImagePlus, X } from 'lucide-react' // Asegúrate de importar 'X'
import { Link } from 'react-router-dom'


interface Post {
  id: number
  author: string
  content: string
  upvotes: number
  downvotes: number
  comments: Comment[]
  image?: string
  createdAt: Date
}

interface Comment {
  id: number
  author: string
  content: string
  createdAt: Date
}

const Publicaciones: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: 'Juan Pérez', content: '¿Alguien sabe dónde puedo conseguir piezas para un Volkswagen Golf 2015?', upvotes: 5, downvotes: 1, comments: [], createdAt: new Date('2023-05-01') },
    { id: 2, author: 'María García', content: 'Acabo de instalar un nuevo sistema de sonido en mi auto. ¡Suena increíble!', upvotes: 10, downvotes: 2, comments: [], image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', createdAt: new Date('2023-05-02') },
    { id: 3, author: 'Carlos Rodríguez', content: 'Recomiendo este taller para alineación y balanceo. Excelente servicio.', upvotes: 8, downvotes: 1, comments: [], createdAt: new Date('2023-05-03') },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newPost, setNewPost] = useState({ content: '', image: '' })
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    sortPosts()
  }, [sortBy])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPost({ ...newPost, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = posts.length + 1
    const newPostObj: Post = {
      ...newPost,
      id,
      author: 'Usuario Actual',
      upvotes: 0,
      downvotes: 0,
      comments: [],
      createdAt: new Date()
    }
    setPosts([newPostObj, ...posts])
    setShowModal(false)
    setNewPost({ content: '', image: '' })
  }

  const handleVote = (id: number, isUpvote: boolean) => {
    setPosts(posts.map(post => 
      post.id === id
        ? {
            ...post,
            upvotes: isUpvote ? post.upvotes + 1 : post.upvotes,
            downvotes: !isUpvote ? post.downvotes + 1 : post.downvotes
          }
        : post
    ))
  }

  const sortPosts = () => {
    const sortedPosts = [...posts]
    switch (sortBy) {
      case 'hot':
        sortedPosts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
        break
      case 'new':
        sortedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'top':
        sortedPosts.sort((a, b) => b.upvotes - a.upvotes)
        break
    }
    setPosts(sortedPosts)
  }

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPost && newComment.trim()) {
      const newCommentObj: Comment = {
        id: selectedPost.comments.length + 1,
        author: 'Usuario Actual',
        content: newComment,
        createdAt: new Date()
      }
      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? { ...post, comments: [...post.comments, newCommentObj] }
          : post
      ))
      setNewComment('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Publicaciones</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="mr-2" />
          Nueva publicación
        </button>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2">Ordenar por:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'hot' | 'new' | 'top')}
            className="border rounded p-2"
          >
            <option value="hot">Destacados</option>
            <option value="new">Nuevos</option>
            <option value="top">Más votados</option>
          </select>
        </div>
        <div className="flex items-center">
          <Search className="mr-2" />
          <input
            type="text"
            placeholder="Buscar publicaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="flex flex-col items-center mr-4">
                <button onClick={() => handleVote(post.id, true)} className="text-gray-500 hover:text-indigo-600">
                  <ArrowUp />
                </button>
                <span className="my-1">{post.upvotes - post.downvotes}</span>
                <button onClick={() => handleVote(post.id, false)} className="text-gray-500 hover:text-indigo-600">
                  <ArrowDown />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.author}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="Imagen de la publicación" className="w-full h-64 object-cover rounded-lg mb-4" />
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedPost(post)}
              className="flex items-center text-gray-500 hover:text-indigo-600"
            >
              <MessageSquare className="mr-1" />
              <span>{post.comments.length} comentarios</span>
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Nueva publicación</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="¿Qué quieres compartir?"
                className="w-full p-2 mb-4 border rounded h-32"
                required
              />
              <div className="flex items-center mb-4">
                <ImagePlus className="mr-2 text-gray-500" />
                <input
                  type="url"
                  name="image"
                  value={newPost.image}
                  onChange={handleInputChange}
                  placeholder="URL de la imagen (opcional)"
                  className="w-full p-2 border rounded"
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md">
                Publicar
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Comentarios</h2>
              <button onClick={() => setSelectedPost(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {selectedPost.comments.map(comment => (
                <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold">{comment.author}</h3>
                  <p>{comment.content}</p>
                </div>
              ))}
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario..."
                  className="w-full p-2 border rounded mb-4 h-24"
                  required
                />
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md">
                  Comentar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Publicaciones
