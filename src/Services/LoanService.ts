import api from "./api";
import type { Loan, CreateLoanDTO } from "../Types";

export const LoanService = {
  getAll: async (): Promise<Loan[]> => {
    const response = await api.get<Loan[]>("/loans");
    return response.data;
  },
    getById: async (id: string): Promise<Loan> => {
    const response = await api.get<Loan>(`/loans/${id}`);
    return response.data;
  },  
    create: async (loanData: CreateLoanDTO): Promise<Loan> => {
    const response = await api.post<Loan>("/loans", loanData);  
    return response.data;
    },
    update: async (id: string, loanData: Partial<CreateLoanDTO>): Promise<Loan> => {
    const response = await api.put<Loan>(`/loans/${id}`, loanData);
    return response.data;
  },
    delete: async (id: string): Promise<void> => {
    await api.delete<void>(`/loans/${id}`);
  },
};