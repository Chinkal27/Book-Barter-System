import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Bookmark, 
  Calendar, 
  Tag, 
  Flag, 
  Award, 
  MessageSquare, 
  Info, 
  Sparkles,
  User
} from 'lucide-react';
import { Book, MatchSuggestion } from '../types';
import { getBookById, getMatchSuggestions } from '../services/bookService';
import { createBarterRequest } from '../services/barterService';
import { useAuth } from '../context/AuthContext';
import MatchSuggestionCard from '../components/matching/MatchSuggestionCard';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [matchSuggestions, setMatchSuggestions] = useState<MatchSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedBookToOffer, setSelectedBookToOffer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Mock user books for demo
  const myBooks = [
    { id: '7', title: 'Introduction to Psychology', author: 'David G. Myers', condition: 'Very Good' },
    { id: '8', title: 'Data Structures and Algorithms', author: 'Robert Lafore', condition: 'Good' },
    { id: '9', title: 'Organic Chemistry', author: 'John McMurry', condition: 'Like New' },
    { id: '10', title: 'Economics: Principles and Policy', author: 'William J. Baumol', condition: 'Acceptable' },
    { id: '11', title: 'Introduction to Linear Algebra', author: 'Gilbert Strang', condition: 'Good' }
  ];

  useEffect(() => {
    const loadBookDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
        
        // Load match suggestions after book is loaded
        if (bookData) {
          setIsLoadingSuggestions(true);
          try {
            const suggestions = await getMatchSuggestions(id);
            setMatchSuggestions(suggestions);
          } catch (error) {
            console.error('Error loading match suggestions:', error);
          } finally {
            setIsLoadingSuggestions(false);
          }
        }
      } catch (error) {
        console.error('Error loading book details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookDetails();
  }, [id]);

  const handleBarterRequest = async (matchedBook: Book) => {
    if (!isAuthenticated || !user) {
      // Redirect to login if not authenticated
      return;
    }

    setSelectedBookToOffer(myBooks[0].id); // Pre-select first book
    // Open modal or form for barter request
  };

  const submitBarterRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user || !book || !selectedBookToOffer) {
      setSubmitError('Missing required information. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await createBarterRequest(
        user.id,
        book.id,
        selectedBookToOffer,
        message
      );
      
      setSubmitSuccess(true);
      setMessage('');
    } catch (error) {
      console.error('Error creating barter request:', error);
      setSubmitError('Failed to submit barter request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="h-80 bg-neutral-200 rounded mb-4"></div>
              <div className="h-10 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
              <div className="h-32 bg-neutral-200 rounded"></div>
            </div>
            
            <div className="md:col-span-2">
              <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-6"></div>
              
              <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2 mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
        <p className="text-neutral-600 mb-6">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/browse" className="btn-primary">
          Browse Available Books
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/browse" className="text-primary-600 hover:text-primary-800 flex items-center">
          ← Back to Browse
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Image and Actions */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="aspect-[3/4] bg-neutral-100 rounded-md overflow-hidden mb-4">
                {book.cover ? (
                  <img 
                    src={book.cover} 
                    alt={`${book.title} cover`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-neutral-300" />
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className={`badge-${
                  book.status === 'Available' ? 'success' : 
                  book.status === 'Pending' ? 'warning' : 'secondary'
                }`}>
                  {book.status}
                </span>
                <span className={`badge-${
                  book.condition === 'New' || book.condition === 'Like New' ? 'success' :
                  book.condition === 'Very Good' || book.condition === 'Good' ? 'secondary' :
                  'warning'
                }`}>
                  {book.condition}
                </span>
              </div>
              
              {isAuthenticated ? (
                // Barter request form
                submitSuccess ? (
                  <div className="bg-success-50 p-4 rounded-md text-success-700 mb-4">
                    <p className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Barter request sent successfully!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitBarterRequest} className="mb-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Select a book to offer:
                      </label>
                      <select 
                        className="input"
                        value={selectedBookToOffer}
                        onChange={(e) => setSelectedBookToOffer(e.target.value)}
                        required
                      >
                        <option value="">Select a book</option>
                        {myBooks.map(book => (
                          <option key={book.id} value={book.id}>
                            {book.title} ({book.condition})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Message (optional):
                      </label>
                      <textarea
                        className="input"
                        rows={3}
                        placeholder="Introduce yourself and explain why you'd like this book..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    
                    {submitError && (
                      <div className="text-error-600 text-sm mb-4">
                        {submitError}
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      className="btn-primary w-full"
                      disabled={isSubmitting || !selectedBookToOffer}
                    >
                      {isSubmitting ? 'Sending Request...' : 'Request Barter'}
                    </button>
                  </form>
                )
              ) : (
                <div className="mb-4">
                  <Link to="/auth" className="btn-primary w-full block text-center">
                    Sign in to Request Barter
                  </Link>
                </div>
              )}
              
              {/* Book owner info */}
              <div className="border-t border-neutral-200 pt-4">
                <h3 className="font-medium mb-2">Book Owner</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-neutral-200 rounded-full mr-3 flex-shrink-0">
                    {book.owner?.avatar && (
                      <img 
                        src={book.owner.avatar} 
                        alt={book.owner.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{book.owner?.name || 'User'}</p>
                    {book.owner?.rating && (
                      <div className="flex items-center text-xs text-neutral-600">
                        <Star filled={true} className="text-accent-500 mr-1" />
                        <span>{book.owner.rating.toFixed(1)}</span>
                        <span className="mx-1">•</span>
                        <span>{book.owner.reviewCount} reviews</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-neutral-600 mb-4">{book.author}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <DetailItem 
                    icon={<Bookmark className="text-primary-500" />}
                    label="ISBN"
                    value={book.isbn}
                  />
                  
                  {book.publisher && (
                    <DetailItem 
                      icon={<Award className="text-primary-500" />}
                      label="Publisher"
                      value={book.publisher}
                    />
                  )}
                  
                  {book.publishedYear && (
                    <DetailItem 
                      icon={<Calendar className="text-primary-500" />}
                      label="Published Year"
                      value={book.publishedYear.toString()}
                    />
                  )}
                </div>
                
                <div>
                  {book.course && (
                    <DetailItem 
                      icon={<BookOpen className="text-primary-500" />}
                      label="Course"
                      value={book.course}
                    />
                  )}
                  
                  <DetailItem 
                    icon={<Tag className="text-primary-500" />}
                    label="Genres"
                    value={
                      <div className="flex flex-wrap gap-1">
                        {book.genre.map(g => (
                          <span key={g} className="badge-primary">{g}</span>
                        ))}
                      </div>
                    }
                  />
                  
                  <DetailItem 
                    icon={<Flag className="text-primary-500" />}
                    label="Condition"
                    value={book.condition}
                  />
                </div>
              </div>
              
              {book.description && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary-500" />
                    Description
                  </h3>
                  <p className="text-neutral-700">{book.description}</p>
                </div>
              )}
              
              <div className="text-sm text-neutral-500 mt-6 pt-4 border-t border-neutral-200">
                <p>Listed on {new Date(book.listingDate).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>

          {/* Match Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-center mb-6">
                <Sparkles className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-xl font-bold">Book Barter Matches</h2>
              </div>
              
              {isLoadingSuggestions ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="bg-neutral-100 h-40 rounded-lg"></div>
                  ))}
                </div>
              ) : matchSuggestions.length > 0 ? (
                <div className="space-y-6">
                  {matchSuggestions.slice(0, 3).map(suggestion => (
                    <MatchSuggestionCard
                      key={suggestion.book.id}
                      suggestion={suggestion}
                      bookToMatch={book}
                      onRequestBarter={handleBarterRequest}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                  <h3 className="font-medium mb-2">No matches found</h3>
                  <p className="text-neutral-600 max-w-md mx-auto">
                    We couldn't find any matching books for barter at the moment. Check back later or browse all available books.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-start mb-3">
    <div className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-neutral-500 mb-0.5">{label}</p>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

const Star: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = '' }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default BookDetailsPage;