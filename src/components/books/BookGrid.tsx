import React from 'react';
import { Book } from '../../types';
import BookCard from './BookCard';
import { BookOpen } from 'lucide-react';

interface BookGridProps {
  books: Book[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ 
  books, 
  isLoading = false,
  emptyMessage = "No books found." 
}) => {
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="book-card animate-pulse">
            <div className="h-48 bg-neutral-200"></div>
            <div className="p-4">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-neutral-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-16 w-16 text-neutral-300 mb-4" />
        <p className="text-neutral-600">{emptyMessage}</p>
      </div>
    );
  }

  // Book grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;