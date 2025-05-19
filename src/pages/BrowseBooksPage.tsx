import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import BookGrid from '../components/books/BookGrid';
import BookFilters from '../components/books/BookFilters';
import { Book } from '../types';
import { getBooks, searchBooks, filterBooks } from '../services/bookService';

const BrowseBooksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        let booksData;
        
        if (initialQuery) {
          booksData = await searchBooks(initialQuery);
        } else {
          booksData = await getBooks();
        }

        setBooks(booksData);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [initialQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      setIsLoading(true);
      try {
        const results = await searchBooks(searchQuery);
        setBooks(results);
      } catch (error) {
        console.error('Error searching books:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleApplyFilters = async (filters: {
    genre?: string[];
    condition?: string[];
    course?: string;
  }) => {
    setIsLoading(true);
    try {
      const results = await filterBooks(filters);
      setBooks(results);
    } catch (error) {
      console.error('Error filtering books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Books</h1>
        <p className="text-neutral-600">
          Find textbooks to barter with fellow students
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Search */}
        <div className="w-full md:w-2/3">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-grow">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search by title, author, genre, or course..."
                className="input pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary ml-2">
              Search
            </button>
          </form>
        </div>

        {/* Filter Toggle (Mobile) */}
        <div className="md:hidden w-full">
          <button
            onClick={toggleFilters}
            className="btn-outline w-full flex items-center justify-center"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      <div className="md:grid md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className={`md:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <BookFilters onApplyFilters={handleApplyFilters} />
        </div>

        {/* Book Grid */}
        <div className="md:col-span-3">
          <BookGrid 
            books={books} 
            isLoading={isLoading} 
            emptyMessage={
              searchQuery 
                ? `No books found matching "${searchQuery}". Try a different search term.` 
                : "No books available at the moment."
            } 
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseBooksPage;