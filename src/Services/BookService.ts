import api from "./api";
import { Book, CreateBookDTO } from "../Models/BookModels";

export const BookService = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get<Book[]>("/books");
    return response.data;
  },

  getById: async (id: string): Promise<Book> => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },    
    create: async (bookData: CreateBookDTO): Promise<Book> => {
    const response = await api.post<Book>("/books", bookData);
    return response.data;
  },
    update: async (id: string, bookData: Partial<CreateBookDTO>): Promise<Book> => {
    const response = await api.put<Book>(`/books/${id}`, bookData);
    return response.data;
  },
    delete: async (id: string): Promise<void> => {
    await api.delete<void>(`/books/${id}`);
  },
};