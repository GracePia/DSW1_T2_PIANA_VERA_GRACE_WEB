import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BooksPage from './Pages/BookPage';
import LoansPage from './Pages/LoanPage';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
      </Routes>
    </Router>
  );
}

export default App;
