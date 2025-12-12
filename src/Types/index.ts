export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    stock: number;
    createdAt: Date;
}

export interface Loan {
    id: string;
    bookId: string;
    studentName: string;
    loanDate: Date;
    returnDate: Date | null;
    status: string;
    createdAt: Date;
    book: Book;
}

export interface CreateBookDTO {
  title: string;
  author: string;
  isbn: string;
  stock: number;
}
export interface CreateLoanDTO {
    bookId: string;
    studentName: string;
}
