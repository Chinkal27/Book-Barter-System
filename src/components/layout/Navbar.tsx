import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Menu, Search, User, Bell, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-primary-600" />
            <span className="font-serif font-bold text-xl text-primary-800">BookBarter</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Browse Books
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/barter-requests" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
                  Barter Requests
                </Link>
                <Link to="/profile" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
                  My Books
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-neutral-600" />
            </button>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover border border-neutral-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                      {user?.name.charAt(0)}
                    </div>
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-3">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-neutral-600" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-neutral-600" />
              ) : (
                <Menu className="h-6 w-6 text-neutral-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              to="/browse" 
              className="px-2 py-3 font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Books
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/barter-requests" 
                  className="px-2 py-3 font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Barter Requests
                </Link>
                <Link 
                  to="/profile" 
                  className="px-2 py-3 font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-2 py-3 text-left font-medium text-error-600 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="btn-primary self-start"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="bg-white border-t border-neutral-100 py-3 animate-fade-in">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <Search className="h-5 w-5 text-neutral-400 mr-2" />
              <input
                type="text"
                placeholder="Search by title, author, genre, or course..."
                className="input border-none flex-1 focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                type="button" 
                onClick={toggleSearch}
                className="p-1 ml-2"
              >
                <X className="h-5 w-5 text-neutral-500" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;