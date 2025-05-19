import React from 'react';
import { MatchSuggestion, Book } from '../../types';
import { Link } from 'react-router-dom';
import { Tag, Smile, ArrowRight } from 'lucide-react';

interface MatchSuggestionCardProps {
  suggestion: MatchSuggestion;
  bookToMatch: Book;
  onRequestBarter: (matchedBook: Book) => void;
}

const MatchSuggestionCard: React.FC<MatchSuggestionCardProps> = ({
  suggestion,
  bookToMatch,
  onRequestBarter
}) => {
  const { book, matchScore, reasons } = suggestion;
  
  // Get match quality based on score
  const getMatchQuality = (score: number) => {
    if (score >= 30) return { text: 'Excellent match', color: 'text-success-500' };
    if (score >= 20) return { text: 'Good match', color: 'text-primary-500' };
    return { text: 'Fair match', color: 'text-neutral-500' };
  };
  
  const matchQuality = getMatchQuality(matchScore);

  return (
    <div className="card p-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={`font-medium ${matchQuality.color} flex items-center`}>
          <Smile className="h-4 w-4 mr-1" />
          {matchQuality.text}
        </div>
        <div className="badge-primary">
          Score: {matchScore}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Your book */}
        <div className="flex-1 p-3 bg-neutral-50 rounded-md">
          <h4 className="text-sm font-medium text-neutral-500 mb-2">Your Book</h4>
          <div className="flex">
            <div className="h-16 w-12 bg-neutral-200 rounded overflow-hidden mr-3 flex-shrink-0">
              {bookToMatch.cover && (
                <img 
                  src={bookToMatch.cover} 
                  alt={bookToMatch.title} 
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-medium line-clamp-1">{bookToMatch.title}</p>
              <p className="text-sm text-neutral-600">{bookToMatch.author}</p>
              <p className="text-xs mt-1 text-neutral-500">Condition: {bookToMatch.condition}</p>
            </div>
          </div>
        </div>
        
        {/* Arrow for desktop */}
        <div className="hidden md:flex items-center justify-center">
          <ArrowRight className="text-primary-300" />
        </div>
        
        {/* Arrow for mobile */}
        <div className="flex md:hidden items-center justify-center">
          <ArrowRight className="transform rotate-90 text-primary-300" />
        </div>
        
        {/* Matched book */}
        <div className="flex-1 p-3 bg-neutral-50 rounded-md">
          <h4 className="text-sm font-medium text-neutral-500 mb-2">Suggested Match</h4>
          <div className="flex">
            <div className="h-16 w-12 bg-neutral-200 rounded overflow-hidden mr-3 flex-shrink-0">
              {book.cover && (
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-medium line-clamp-1">{book.title}</p>
              <p className="text-sm text-neutral-600">{book.author}</p>
              <p className="text-xs mt-1 text-neutral-500">Condition: {book.condition}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Match reasons */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Why this is a good match:</h4>
        <ul className="space-y-1">
          {reasons.map((reason, index) => (
            <li key={index} className="text-sm flex items-start">
              <Tag className="h-3 w-3 text-primary-500 mt-1 mr-2 flex-shrink-0" />
              {reason}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex space-x-2">
        <Link 
          to={`/book/${book.id}`}
          className="btn-outline flex-1 text-center"
        >
          View Details
        </Link>
        <button 
          onClick={() => onRequestBarter(book)}
          className="btn-primary flex-1"
        >
          Request Barter
        </button>
      </div>
    </div>
  );
};

export default MatchSuggestionCard;