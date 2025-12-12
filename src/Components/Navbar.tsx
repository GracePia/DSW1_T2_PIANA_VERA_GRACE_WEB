import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const linkBaseClass = "px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200";
  const linkActiveClass = "bg-indigo-600 text-white shadow-lg";
  const linkInactiveClass = "text-gray-600 hover:bg-indigo-600 hover:text-white";

  return (
    <nav className="bg-white shadow-md w-full rounded-xl mb-6">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1>Biblioteca</h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/books"
            className={`${linkBaseClass} ${isActive('/books') ? linkActiveClass : linkInactiveClass}`}
          >
            Libros
          </Link>
          <Link
            to="/loans"
            className={`${linkBaseClass} ${isActive('/loans') ? linkActiveClass : linkInactiveClass}`}
          >
            Préstamos
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
