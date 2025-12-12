import api from "./api";
import type { Loan, CreateLoanDTO } from "../Types";

export const LoanService = {
  getAll: async (): Promise<Loan[]> => {
    const response = await api.get<Loan[]>("/loans");
    return response.data;
  },

  create: async (loanData: CreateLoanDTO & { status: 'Active' | 'Returned' }) => {
    const response = await api.post<Loan>("/loans", loanData);
    return response.data;
    
  },
};
