import { useState, useEffect } from 'react';
import { BookService } from '../Services/BookService.ts';
import type { Book, CreateBookDTO } from '../Types';
import Message from '../Components/Message.tsx';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string }>({
    type: 'info', // valor inicial válido
    text: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateBookDTO>({
    title: '',
    author: '',
    isbn: '',
    stock: 0,
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await BookService.getAll();
      setBooks(data);
    } catch {
      showMessage('error', 'Error al cargar libros');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: 'info', text: '' }), 3000); // usar 'info' al limpiar
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name.toLowerCase()]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentId) {
        await BookService.update(currentId, formData);
        showMessage('success', 'Libro actualizado');
      } else {
        await BookService.create(formData);
        showMessage('success', 'Libro creado');
      }
      clearForm();
      loadBooks();
    } catch {
      showMessage('error', 'Error al guardar libro');
    }
  };

  const handleEdit = (book: Book) => {
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      stock: book.stock,
    });
    setCurrentId(book.id.toString());
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este libro?')) return;
    try {
      await BookService.delete(id.toString());
      showMessage('success', 'Libro eliminado');
      loadBooks();
    } catch {
      showMessage('error', 'Error al eliminar libro');
    }
  };

  const clearForm = () => {
    setFormData({ title: '', author: '', isbn: '', stock: 0 });
    setCurrentId(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Libros</h1>

      {/* Mostrar mensaje solo si hay texto */}
      {message.text && <Message type={message.type} text={message.text} />}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 pb-4 mb-5 border-b-2 border-blue-500">
          {isEditing ? 'Editar Libro' : 'Nuevo Libro'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título del libro"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Autor</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Autor del libro"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="ISBN del libro"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Cantidad disponible"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg">
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
            <button type="button" onClick={clearForm} className="px-6 py-2.5 bg-gray-500 text-white font-semibold text-sm rounded-lg">
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {books.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Título</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Autor</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">ISBN</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Stock</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-5 py-4 text-sm text-gray-700">{book.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-800">{book.title}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{book.author}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{book.isbn}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{book.stock}</td>
                  <td className="px-5 py-4 flex gap-2">
                    <button onClick={() => handleEdit(book)} className="px-3 py-1.5 bg-cyan-500 text-white text-xs font-semibold rounded-md hover:bg-cyan-600">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-white/90 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-lg">No hay libros registrados</p>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
