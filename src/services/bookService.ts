import { Book, MatchSuggestion } from '../types';

// Mock data for books
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '9780262033848',
    publisher: 'MIT Press',
    publishedYear: 2009,
    cover: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=300',
    condition: 'Very Good',
    description: 'Some minor highlighting in the first few chapters, otherwise in great condition',
    genre: ['Computer Science', 'Algorithms', 'Mathematics'],
    course: 'CS101',
    ownerId: '2',
    listingDate: '2024-04-01T10:30:00Z',
    status: 'Available'
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    publisher: 'Scribner',
    publishedYear: 2004,
    cover: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=300',
    condition: 'Good',
    description: 'Classic novel, slight wear on cover',
    genre: ['Fiction', 'Classics', 'Literature'],
    course: 'ENG201',
    ownerId: '3',
    listingDate: '2024-03-15T14:20:00Z',
    status: 'Available'
  },
  {
    id: '3',
    title: 'Principles of Physics',
    author: 'David Halliday',
    isbn: '9781118230732',
    publisher: 'Wiley',
    publishedYear: 2011,
    cover: 'https://images.pexels.com/photos/2873479/pexels-photo-2873479.jpeg?auto=compress&cs=tinysrgb&w=300',
    condition: 'Like New',
    description: 'Barely used, no markings',
    genre: ['Physics', 'Science', 'Textbook'],
    course: 'PHY101',
    ownerId: '4',
    listingDate: '2024-04-10T09:15:00Z',
    status: 'Available'
  },
  {
    id: '4',
    title: 'Organic Chemistry',
    author: 'Paula Yurkanis Bruice',
    isbn: '9780134042282',
    publisher: 'Pearson',
    publishedYear: 2016,
    cover: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=300',
    condition: 'Good',
    description: 'Some highlighting throughout, but all pages intact',
    genre: ['Chemistry', 'Science', 'Textbook'],
    course: 'CHEM201',
    ownerId: '5',
    listingDate: '2024-03-20T11:45:00Z',
    status: 'Available'
  },
  {
    id: '5',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    isbn: '9781285741550',
    publisher: 'Cengage Learning',
    publishedYear: 2015,
    cover: 'https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg?auto=compress&cs=tinysrgb&w=300',
    condition: 'Acceptable',
    description: 'Well-used but functional, some wear on spine',
    genre: ['Mathematics', 'Calculus', 'Textbook'],
    course: 'MATH101',
    ownerId: '6',
    listingDate: '2024-04-05T16:30:00Z',
    status: 'Available'
  },
  {
    id: '6',
    title: 'Psychology',
    author: 'David G. Myers',
    isbn: '9781464140815',
    publisher: 'Worth Publishers',
    publishedYear: 2013,
    cover: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=300',
    condition: 'Very Good',
    description: 'Minor wear on corners, no markings inside',
    genre: ['Psychology', 'Social Science', 'Textbook'],
    course: 'PSY101',
    ownerId: '7',
    listingDate: '2024-03-25T13:10:00Z',
    status: 'Available'
  },
];

// Simulating API calls with promises
export const getBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBooks), 800);
  });
};

export const getBooksByOwner = async (ownerId: string): Promise<Book[]> => {
  return new Promise((resolve) => {
    const filtered = mockBooks.filter(book => book.ownerId === ownerId);
    setTimeout(() => resolve(filtered), 800);
  });
};

export const getBookById = async (id: string): Promise<Book | null> => {
  return new Promise((resolve) => {
    const book = mockBooks.find(book => book.id === id) || null;
    setTimeout(() => resolve(book), 500);
  });
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  return new Promise((resolve) => {
    const normalizedQuery = query.toLowerCase();
    const results = mockBooks.filter(book => 
      book.title.toLowerCase().includes(normalizedQuery) ||
      book.author.toLowerCase().includes(normalizedQuery) ||
      book.genre.some(g => g.toLowerCase().includes(normalizedQuery)) ||
      (book.course && book.course.toLowerCase().includes(normalizedQuery))
    );
    setTimeout(() => resolve(results), 800);
  });
};

export const filterBooks = async (filters: {
  condition?: string[];
  genre?: string[];
  course?: string;
}): Promise<Book[]> => {
  return new Promise((resolve) => {
    let filtered = [...mockBooks];
    
    if (filters.condition && filters.condition.length > 0) {
      filtered = filtered.filter(book => 
        filters.condition!.includes(book.condition)
      );
    }
    
    if (filters.genre && filters.genre.length > 0) {
      filtered = filtered.filter(book =>
        book.genre.some(g => filters.genre!.includes(g))
      );
    }
    
    if (filters.course) {
      filtered = filtered.filter(book =>
        book.course === filters.course
      );
    }
    
    setTimeout(() => resolve(filtered), 800);
  });
};

// This is the core matching algorithm for suggesting barter matches
export const getMatchSuggestions = async (bookId: string): Promise<MatchSuggestion[]> => {
  return new Promise((resolve) => {
    // Get the book to match
    const bookToMatch = mockBooks.find(book => book.id === bookId);
    
    if (!bookToMatch) {
      resolve([]);
      return;
    }
    
    // Filter out books by the same owner
    const otherBooks = mockBooks.filter(book => 
      book.ownerId !== bookToMatch.ownerId && 
      book.status === 'Available'
    );
    
    // Calculate match scores
    const suggestions: MatchSuggestion[] = otherBooks.map(book => {
      let matchScore = 0;
      const reasons: string[] = [];
      
      // Same genre bonus
      const commonGenres = book.genre.filter(g => bookToMatch.genre.includes(g));
      if (commonGenres.length > 0) {
        matchScore += commonGenres.length * 10;
        reasons.push(`${commonGenres.length} shared genres`);
      }
      
      // Same course bonus
      if (book.course && bookToMatch.course && book.course === bookToMatch.course) {
        matchScore += 25;
        reasons.push('Same course');
      }
      
      // Similar condition bonus
      const conditionMap = {
        'New': 5,
        'Like New': 4,
        'Very Good': 3,
        'Good': 2,
        'Acceptable': 1,
        'Poor': 0
      };
      
      const bookConditionValue = conditionMap[book.condition as keyof typeof conditionMap];
      const matchBookConditionValue = conditionMap[bookToMatch.condition as keyof typeof conditionMap];
      
      const conditionDifference = Math.abs(bookConditionValue - matchBookConditionValue);
      if (conditionDifference === 0) {
        matchScore += 15;
        reasons.push('Identical condition');
      } else if (conditionDifference === 1) {
        matchScore += 10;
        reasons.push('Similar condition');
      }
      
      // Similar age bonus
      if (book.publishedYear && bookToMatch.publishedYear) {
        const yearDifference = Math.abs(book.publishedYear - bookToMatch.publishedYear);
        if (yearDifference <= 2) {
          matchScore += 10;
          reasons.push('Similar publication year');
        }
      }
      
      return {
        book,
        matchScore,
        reasons
      };
    });
    
    // Sort by match score (descending)
    suggestions.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return top suggestions
    setTimeout(() => resolve(suggestions.slice(0, 5)), 1000);
  });
};