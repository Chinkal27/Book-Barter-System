import React from 'react';
import { Link } from 'react-router-dom';
import { Book as BookType } from '../../types';
import { Tag, Star } from 'lucide-react';

interface BookCardProps {
  book: BookType;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  // Function to get condition badge color
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'badge-success';
      case 'Like New':
        return 'badge-success';
      case 'Very Good':
        return 'badge-secondary';
      case 'Good':
        return 'badge-secondary';
      case 'Acceptable':
        return 'badge-warning';
      case 'Poor':
        return 'badge-error';
      default:
        return 'badge-primary';
    }
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'badge-success';
      case 'Pending':
        return 'badge-warning';
      case 'Traded':
        return 'badge-secondary';
      default:
        return 'badge-primary';
    }
  };

  // Get primary genre to display
  const primaryGenre = book.genre[0] || 'General';

  return (
    <Link to={`/book/${book.id}`} className="book-card group h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={book.cover} 
          alt={`${book.title} cover`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <span className={`${getConditionColor(book.condition)} text-xs`}>
            {book.condition}
          </span>
          <span className={`${getStatusColor(book.status)} text-xs`}>
            {book.status}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-lg line-clamp-2">{book.title}</h3>
        </div>
        <p className="text-neutral-600 mb-2">{book.author}</p>
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="h-4 w-4 text-primary-500" />
          <span className="text-xs text-neutral-500">{primaryGenre}</span>
        </div>
        {book.course && (
          <div className="mt-auto">
            <span className="badge-primary">
              Course: {book.course}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BookCard;