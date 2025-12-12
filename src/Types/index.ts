export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  stock: number;
  // createdAt?: Date; // opcional, si tu API no lo devuelve
}

export interface Loan {
  id: number;
  bookId: number;
  studentName: string;
  status: 'Active' | 'Returned';
  // loanDate?: Date; // opcional
  // returnDate?: Date | null; // opcional
}

export interface CreateBookDTO {
  title: string;
  author: string;
  isbn: string;
  stock: number;
}

export interface CreateLoanDTO {
  bookId: number;
  studentName: string;
}
