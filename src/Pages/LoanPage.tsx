import { useState, useEffect } from 'react';
import { LoanService } from '../Services/LoanService.ts';
import type { Loan } from '../Types';
import Message from '../Components/Message.tsx';

const LoansPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string }>({
    type: 'info', 
    text: ''
  });

  const loadLoans = async () => {
    try {
      const data = await LoanService.getAll(); 
      setLoans(data);
    } catch (error) {
      showMessage('error', 'Error al cargar los préstamos');
      console.error(error);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: 'info', text: '' }), 3000); 
  };

  useEffect(() => {
    loadLoans(); 
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Lista de Préstamos</h1>

     
      {message.text && <Message type={message.type} text={message.text} />}

      <ul className="list-disc pl-6">
       {loans.map((loan) => (
         <li key={loan.id}>
           <strong>{loan.studentName}</strong> - {loan.book.title} ({loan.loanDate.toLocaleDateString()})
        </li>
           ))}
     </ul>
      {loans.length === 0 && (
        <div className="mt-4 text-gray-600">
          No hay préstamos registrados.
        </div>
      )}
    </div>
  );
};

export default LoansPage;
