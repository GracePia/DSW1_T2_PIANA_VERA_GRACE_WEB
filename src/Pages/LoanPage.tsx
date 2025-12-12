import { useState, useEffect } from "react";
import { LoanService } from "../Services/LoanService";
import { BookService } from "../Services/BookService";
import type { Loan, Book } from "../Types";
import Message from "../Components/Message";

const LoansPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId, setBookId] = useState<number>(0);
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string }>({ type: "info", text: "" });
  const [loading, setLoading] = useState(true);

  // Cargar libros y préstamos al inicio
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const booksData = await BookService.getAll();
        const loansData = await LoanService.getAll();
        setBooks(booksData);
        setLoans(loansData);
      } catch (error) {
        console.error(error);
        setMessage({ type: "error", text: "Error al cargar los datos" });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Agregar nuevo préstamo
  const handleAddLoan = async () => {
    if (!bookId || !studentName) {
      setMessage({ type: "error", text: "Completa todos los campos" });
      return;
    }

    try {
      await LoanService.create({ bookId, studentName, status: "Active" });
      setMessage({ type: "success", text: "Préstamo agregado correctamente" });
      setBookId(0);
      setStudentName("");
      const updatedLoans = await LoanService.getAll();
      setLoans(updatedLoans);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error al agregar préstamo" });
    }
  };

  return (
    <div className="page">
      <h1>Préstamos</h1>
      {message.text && <Message type={message.type} text={message.text} />}

      <div className="card">
        <h3>Registrar Préstamo</h3>
        <select value={bookId} onChange={(e) => setBookId(Number(e.target.value))}>
          <option value={0}>Selecciona un libro</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nombre del estudiante"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button onClick={handleAddLoan}>Agregar Préstamo</button>
      </div>

      <div className="card">
        <h3>Lista de Préstamos</h3>
        {loading ? (
          <p>Cargando préstamos...</p>
        ) : loans.length === 0 ? (
          <p>No hay préstamos registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Libro</th>
                <th>Estudiante</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                const book = books.find((b) => b.id === loan.bookId);
                return (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{book ? book.title : "Desconocido"}</td>
                    <td>{loan.studentName}</td>
                    <td>{loan.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LoansPage;
