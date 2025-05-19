import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Book as BookIcon, 
  BookOpen, 
  Star, 
  Clock, 
  Plus, 
  Settings, 
  ChevronRight, 
  BarChart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Book } from '../types';
import BookGrid from '../components/books/BookGrid';
import { getBooksByOwner } from '../services/bookService';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [activeTab, setActiveTab] = useState<'books' | 'stats' | 'settings'>('books');

  useEffect(() => {
    const loadUserBooks = async () => {
      if (!user) return;

      setIsLoadingBooks(true);
      try {
        const books = await getBooksByOwner(user.id);
        setMyBooks(books);
      } catch (error) {
        console.error('Error loading user books:', error);
      } finally {
        setIsLoadingBooks(false);
      }
    };

    loadUserBooks();
  }, [user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <User className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Please sign in or create an account to view your profile and manage your books.
        </p>
        <Link to="/auth" className="btn-primary">
          Sign In / Register
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-4 md:mb-0 md:mr-6">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-bold border-4 border-white shadow">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-neutral-600 mb-3">{user.email}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              {user.university && (
                <span className="badge-primary">
                  {user.university}
                </span>
              )}
              <div className="badge-secondary flex items-center">
                <Star className="h-3 w-3 mr-1 text-accent-500" />
                {user.rating.toFixed(1)} ({user.reviewCount} reviews)
              </div>
              <div className="badge-accent flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Joined {new Date(user.joinedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div>
            <button className="btn-outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 pt-6 border-t border-neutral-200">
          <StatCard 
            icon={<BookIcon className="text-primary-500" />}
            label="Listed Books"
            value={myBooks.length.toString()}
          />
          <StatCard 
            icon={<BookOpen className="text-secondary-500" />}
            label="Completed Trades"
            value="8"
          />
          <StatCard 
            icon={<Star className="text-accent-500" />}
            label="Rating"
            value={user.rating.toFixed(1)}
          />
          <StatCard 
            icon={<BarChart className="text-primary-500" />}
            label="Money Saved"
            value="$256"
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6 border-b border-neutral-200">
        <div className="flex space-x-6">
          <TabButton 
            active={activeTab === 'books'} 
            onClick={() => setActiveTab('books')}
            icon={<BookIcon className="h-4 w-4" />}
            label="My Books"
          />
          <TabButton 
            active={activeTab === 'stats'} 
            onClick={() => setActiveTab('stats')}
            icon={<BarChart className="h-4 w-4" />}
            label="Statistics"
          />
          <TabButton 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'books' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Books</h2>
              <button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Book
              </button>
            </div>
            
            <BookGrid 
              books={myBooks} 
              isLoading={isLoadingBooks} 
              emptyMessage="You haven't listed any books yet. Add books to start bartering!"
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Statistics</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center py-12">
                <BarChart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                <p className="text-neutral-600 max-w-md mx-auto">
                  Detailed statistics about your barter activity will be available here soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-neutral-200">
                <SettingsItem 
                  icon={<User className="text-primary-500" />}
                  title="Personal Information"
                  description="Update your name, email, and university"
                />
                <SettingsItem 
                  icon={<BookIcon className="text-secondary-500" />}
                  title="Book Preferences"
                  description="Set your preferred genres and courses"
                />
                <SettingsItem 
                  icon={<Settings className="text-accent-500" />}
                  title="Notification Settings"
                  description="Configure how and when we contact you"
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="bg-neutral-50 p-4 rounded-lg">
    <div className="flex items-center mb-2">
      <div className="h-5 w-5 mr-2">
        {icon}
      </div>
      <p className="text-sm text-neutral-600">{label}</p>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center py-3 px-1 border-b-2 ${
      active 
        ? 'border-primary-500 text-primary-600 font-medium' 
        : 'border-transparent text-neutral-500 hover:text-neutral-700'
    }`}
  >
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </button>
);

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, description }) => (
  <div className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
    <div className="flex items-center">
      <div className="h-8 w-8 mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-neutral-400" />
  </div>
);

export default ProfilePage;