import React, { useState, useEffect, useRef } from "react";
import { Search, Users, MessageSquare, ArrowUp, ArrowDown, PlusCircle } from "lucide-react";

interface Post {
  id: number;
  author: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  image?: string;
  createdAt: Date;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
}

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Juan Pérez",
      content: "¿Alguien sabe dónde puedo conseguir piezas para un Volkswagen Golf 2015?",
      upvotes: 5,
      downvotes: 1,
      comments: [],
      createdAt: new Date("2023-05-01"),
    },
    {
      id: 2,
      author: "María García",
      content: "Acabo de instalar un nuevo sistema de sonido en mi auto. ¡Suena increíble!",
      upvotes: 10,
      downvotes: 2,
      comments: [],
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      createdAt: new Date("2023-05-02"),
    },
    {
      id: 3,
      author: "Carlos Rodríguez",
      content: "Recomiendo este taller para alineación y balanceo. Excelente servicio.",
      upvotes: 8,
      downvotes: 1,
      comments: [],
      createdAt: new Date("2023-05-03"),
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", image: "" });
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("hot");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [trendingTopics] = useState([
    { id: 1, name: "Mantenimiento", count: 120 },
    { id: 2, name: "Tuning", count: 98 },
    { id: 3, name: "Autos Eléctricos", count: 85 },
    { id: 4, name: "Historias en carretera", count: 72 },
    { id: 5, name: "Tsuritos Team", count: 65 },
  ]);

  const [popularCommunities] = useState([
    { id: 1, name: "Mecanicos Unidos", members: 149 },
    { id: 2, name: "Amantes del Tuning", members: 480 },
    { id: 3, name: "Uber drivers unidos", members: 390 },
    { id: 4, name: "Restauradores de Clásicos", members: 3500 },
    { id: 5, name: "Aventuras 4x4", members: 3200 },
  ]);

  useEffect(() => {
    sortPosts();
  }, [sortBy]);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = posts.length + 1;
    const newPostObj: Post = {
      ...newPost,
      id,
      author: "Usuario Actual",
      upvotes: 0,
      downvotes: 0,
      comments: [],
      createdAt: new Date(),
    };
    setPosts([newPostObj, ...posts]);
    setShowModal(false);
    setNewPost({ content: "", image: "" });
  };

  const handleVote = (id: number, isUpvote: boolean) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              upvotes: isUpvote ? post.upvotes + 1 : post.upvotes,
              downvotes: !isUpvote ? post.downvotes + 1 : post.downvotes,
            }
          : post
      )
    );
  };

  const sortPosts = () => {
    const sortedPosts = [...posts];
    switch (sortBy) {
      case "hot":
        sortedPosts.sort(
          (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        );
        break;
      case "new":
        sortedPosts.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      case "top":
        sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
        break;
    }
    setPosts(sortedPosts);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost && newComment.trim()) {
      const newCommentObj: Comment = {
        id: selectedPost.comments.length + 1,
        author: "Usuario Actual",
        content: newComment,
        createdAt: new Date(),
      };
      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, comments: [...post.comments, newCommentObj] }
            : post
        )
      );
      setNewComment("");
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchTerm("");
    }
  };

  const Publicaciones: React.FC = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Publicaciones</h1>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            <PlusCircle className="mr-2" />
            Nueva publicación
          </button>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center w-full sm:w-auto">
            <label htmlFor="sort" className="mr-2">
              Ordenar por:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "hot" | "new" | "top")
              }
              className="select select-bordered w-full max-w-xs"
            >
              <option value="hot">Destacados</option>
              <option value="new">Nuevos</option>
              <option value="top">Más votados</option>
            </select>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <div className={`input-group w-full transition-all duration-300 ease-in-out ${isSearchExpanded ? 'w-64' : 'w-10'}`}>
              <button className="btn btn-square" onClick={handleSearchToggle}>
                <Search />
              </button>
              {isSearchExpanded && (
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar publicaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="flex flex-col items-center mr-4">
                    <button
                      onClick={() => handleVote(post.id, true)}
                      className="btn btn-ghost btn-sm"
                    >
                      <ArrowUp />
                    </button>
                    <span className="my-1">{post.upvotes - post.downvotes}</span>
                    <button
                      onClick={() => handleVote(post.id, false)}
                      className="btn btn-ghost btn-sm"
                    >
                      <ArrowDown />
                    </button>
                  </div>
                  <div>
                    <h2 className="card-title">{post.author}</h2>
                    <p>{post.content}</p>
                    {post.image && (
                      <figure className="mt-4">
                        <img
                          src={post.image}
                          alt="Imagen de la publicación"
                          className="rounded-lg"
                        />
                      </figure>
                    )}
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="btn btn-ghost btn-sm"
                  >
                    <MessageSquare className="mr-1" />
                    <span>{post.comments.length} comentarios</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-6">Bienvenido al Dashboard</h1>
          <Publicaciones />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Temas en Tendencia</h2>
              <ul>
                {trendingTopics.map((topic) => (
                  <li key={topic.id} className="mb-2">
                    <a href="#" className="link link-primary">
                      #{topic.name}{" "}
                      <span className="text-base-content">({topic.count})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Comunidades Populares</h2>
              <ul>
                {popularCommunities.map((community) => (
                  <li key={community.id} className="mb-2">
                    <a href="#" className="link link-primary">
                      {community.name}{" "}
                      <span className="text-base-content">
                        ({community.members}
                        <Users className="inline-block h-4 w-4 ml-1" />)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">Nueva Publicación</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="Escribe tu publicación..."
                className="textarea textarea-bordered w-full mb-4"
              />
              <input
                type="text"
                name="image"
                value={newPost.image}
                onChange={handleInputChange}
                placeholder="URL de la imagen (opcional)"
                className="input input-bordered w-full mb-4"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Publicar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedPost && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">
              {selectedPost.author} - Comentarios
            </h2>
            <div className="max-h-60 overflow-y-auto mb-4">
              {selectedPost.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-base-300 mb-2 pb-2"
                >
                  <p className="font-semibold">{comment.author}</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="textarea textarea-bordered w-full mb-4"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Comentar
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="btn"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;