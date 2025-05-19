export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university?: string;
  rating: number;
  reviewCount: number;
  joinedAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  publishedYear?: number;
  cover: string;
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Acceptable' | 'Poor';
  description?: string;
  genre: string[];
  course?: string;
  ownerId: string;
  owner?: User;
  listingDate: string;
  status: 'Available' | 'Pending' | 'Traded';
}

export interface BarterRequest {
  id: string;
  requesterId: string;
  requester?: User;
  requestedBookId: string;
  requestedBook?: Book;
  offeredBookId: string;
  offeredBook?: Book;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewer?: User;
  reviewedUserId: string;
  rating: number;
  comment?: string;
  barterRequestId: string;
  createdAt: string;
}

export interface MatchSuggestion {
  book: Book;
  matchScore: number;
  reasons: string[];
}