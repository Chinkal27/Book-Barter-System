import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

// Common book genres
const genres = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Literature',
  'History',
  'Psychology',
  'Business',
  'Economics',
  'Art',
  'Philosophy',
  'Medicine',
  'Law'
];

// Book conditions
const conditions = [
  'New',
  'Like New',
  'Very Good',
  'Good',
  'Acceptable',
  'Poor'
];

interface BookFiltersProps {
  onApplyFilters: (filters: {
    genre?: string[];
    condition?: string[];
    course?: string;
  }) => void;
}

const BookFilters: React.FC<BookFiltersProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [courseCode, setCourseCode] = useState('');

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const applyFilters = () => {
    onApplyFilters({
      genre: selectedGenres.length > 0 ? selectedGenres : undefined,
      condition: selectedConditions.length > 0 ? selectedConditions : undefined,
      course: courseCode.trim() || undefined
    });
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedConditions([]);
    setCourseCode('');
    onApplyFilters({});
  };

  return (
    <div className="mb-6">
      {/* Filter toggle for mobile */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilter}
          className="btn-outline flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters panel */}
      <div className={`bg-white shadow-md rounded-lg p-4 mb-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Filters</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:text-primary-800"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Code filter */}
          <div>
            <h4 className="font-medium mb-2">Course Code</h4>
            <input
              type="text"
              placeholder="e.g. CS101"
              className="input"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>

          {/* Condition filter */}
          <div>
            <h4 className="font-medium mb-2">Condition</h4>
            <div className="space-y-1">
              {conditions.map(condition => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(condition)}
                    onChange={() => toggleCondition(condition)}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span>{condition}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Genre filter */}
          <div>
            <h4 className="font-medium mb-2">Genre</h4>
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 8).map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${
                    selectedGenres.includes(genre)
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {genre}
                </button>
              ))}
              <details className="mt-2 w-full">
                <summary className="text-xs text-primary-600 cursor-pointer">More genres...</summary>
                <div className="flex flex-wrap gap-2 mt-2">
                  {genres.slice(8).map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        selectedGenres.includes(genre)
                          ? 'bg-primary-500 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Applied filters */}
        {(selectedGenres.length > 0 || selectedConditions.length > 0 || courseCode) && (
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <h4 className="font-medium mb-2">Applied Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {courseCode && (
                <div className="badge-primary flex items-center">
                  Course: {courseCode}
                  <button onClick={() => setCourseCode('')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {selectedConditions.map(condition => (
                <div key={condition} className="badge-secondary flex items-center">
                  {condition}
                  <button onClick={() => toggleCondition(condition)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {selectedGenres.map(genre => (
                <div key={genre} className="badge-accent flex items-center">
                  {genre}
                  <button onClick={() => toggleGenre(genre)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apply button for mobile */}
        <div className="mt-4 md:hidden">
          <button
            onClick={applyFilters}
            className="btn-primary w-full"
          >
            Apply Filters
          </button>
        </div>

        {/* Apply button for desktop (auto-applies) */}
        <div className="mt-4 hidden md:block">
          <button
            onClick={applyFilters}
            className="btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookFilters;