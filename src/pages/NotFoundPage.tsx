import React from 'react';
import { Link } from 'react-router-dom';
import { BookX } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4 py-16">
        <BookX className="h-24 w-24 text-neutral-300 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-neutral-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/browse" className="btn-outline">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;