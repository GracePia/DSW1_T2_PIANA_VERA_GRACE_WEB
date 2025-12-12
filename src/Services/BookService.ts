import api from "./api";
import type { Book, CreateBookDTO } from "../Types";

export const BookService = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get<Book[]>("/books");
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  create: async (bookData: CreateBookDTO): Promise<Book> => {
    const response = await api.post<Book>("/books", bookData);
    return response.data;
  },

  update: async (id: number, bookData: Partial<CreateBookDTO>): Promise<Book> => {
    const response = await api.put<Book>(`/books/${id}`, bookData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<void>(`/books/${id}`);
  },
};
