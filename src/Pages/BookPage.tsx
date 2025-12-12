import { useState, useEffect } from "react";
import { BookService } from "../Services/BookService";
import type { Book, CreateBookDTO } from "../Types";
import Message from "../Components/Message";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string }>({ type: "info", text: "" });
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<CreateBookDTO>({
    title: "",
    author: "",
    isbn: "",
    stock: 0,
  });

  // Cargar libros al inicio
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await BookService.getAll();
        setBooks(data);
      } catch (error) {
        console.error(error);
        setMessage({ type: "error", text: "Error al cargar libros" });
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  // Manejo de formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await BookService.create(formData);
      setMessage({ type: "success", text: "Libro creado" });
      setFormData({ title: "", author: "", isbn: "", stock: 0 });
      const updatedBooks = await BookService.getAll();
      setBooks(updatedBooks);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error al guardar libro" });
    }
  };

  return (
    <div className="page">
      <h1>Libros</h1>
      {message.text && <Message type={message.type} text={message.text} />}

      <div className="card">
        <h3>Agregar Nuevo Libro</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" required />
          <input name="author" value={formData.author} onChange={handleChange} placeholder="Autor" required />
          <input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" required />
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div className="card">
        <h3>Lista de Libros</h3>
        {loading ? (
          <p>Cargando libros...</p>
        ) : books.length === 0 ? (
          <p>No hay libros registrados</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>ISBN</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
