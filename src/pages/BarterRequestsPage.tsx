import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inbox, SendHorizontal, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BarterRequest } from '../types';
import BarterRequestCard from '../components/barter/BarterRequestCard';
import { getSentBarterRequests, getReceivedBarterRequests, updateBarterRequestStatus } from '../services/barterService';
import { Link } from 'react-router-dom';

const BarterRequestsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [sentRequests, setSentRequests] = useState<BarterRequest[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<BarterRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const [sent, received] = await Promise.all([
          getSentBarterRequests(user.id),
          getReceivedBarterRequests(user.id)
        ]);
        
        setSentRequests(sent);
        setReceivedRequests(received);
      } catch (error) {
        console.error('Error loading barter requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, [user]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const updatedRequest = await updateBarterRequestStatus(requestId, 'Accepted');
      setReceivedRequests(receivedRequests.map(req => 
        req.id === requestId ? updatedRequest : req
      ));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const updatedRequest = await updateBarterRequestStatus(requestId, 'Rejected');
      setReceivedRequests(receivedRequests.map(req => 
        req.id === requestId ? updatedRequest : req
      ));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleCompleteRequest = async (requestId: string) => {
    try {
      const updatedRequest = await updateBarterRequestStatus(requestId, 'Completed');
      setReceivedRequests(receivedRequests.map(req => 
        req.id === requestId ? updatedRequest : req
      ));
    } catch (error) {
      console.error('Error completing request:', error);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <MessageSquare className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Please sign in or create an account to view your barter requests.
        </p>
        <Link to="/auth" className="btn-primary">
          Sign In / Register
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Barter Requests</h1>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('received')}
          className={`flex items-center py-3 px-4 border-b-2 ${
            activeTab === 'received' 
              ? 'border-primary-500 text-primary-600 font-medium' 
              : 'border-transparent text-neutral-500 hover:text-neutral-700'
          }`}
        >
          <Inbox className="h-4 w-4 mr-2" />
          <span>Received</span>
          {receivedRequests.filter(req => req.status === 'Pending').length > 0 && (
            <span className="ml-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {receivedRequests.filter(req => req.status === 'Pending').length}
            </span>
          )}
        </button>
        
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center py-3 px-4 border-b-2 ${
            activeTab === 'sent' 
              ? 'border-primary-500 text-primary-600 font-medium' 
              : 'border-transparent text-neutral-500 hover:text-neutral-700'
          }`}
        >
          <SendHorizontal className="h-4 w-4 mr-2" />
          <span>Sent</span>
        </button>
      </div>
      
      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4 animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg h-48"></div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4"
        >
          {activeTab === 'received' && (
            <>
              {receivedRequests.length > 0 ? (
                <>
                  {/* Pending requests */}
                  {receivedRequests.filter(req => req.status === 'Pending').length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
                      <div className="grid gap-4">
                        {receivedRequests
                          .filter(req => req.status === 'Pending')
                          .map(request => (
                            <BarterRequestCard
                              key={request.id}
                              request={request}
                              userType="owner"
                              onAccept={handleAcceptRequest}
                              onReject={handleRejectRequest}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Accepted requests */}
                  {receivedRequests.filter(req => req.status === 'Accepted').length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-4">Accepted Requests</h2>
                      <div className="grid gap-4">
                        {receivedRequests
                          .filter(req => req.status === 'Accepted')
                          .map(request => (
                            <BarterRequestCard
                              key={request.id}
                              request={request}
                              userType="owner"
                              onComplete={handleCompleteRequest}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Past requests */}
                  {receivedRequests.filter(req => ['Completed', 'Rejected'].includes(req.status)).length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Past Requests</h2>
                      <div className="grid gap-4">
                        {receivedRequests
                          .filter(req => ['Completed', 'Rejected'].includes(req.status))
                          .map(request => (
                            <BarterRequestCard
                              key={request.id}
                              request={request}
                              userType="owner"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <Inbox className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Requests Received</h3>
                  <p className="text-neutral-600 max-w-md mx-auto">
                    You haven't received any barter requests yet. Add more books to increase your chances of receiving requests.
                  </p>
                  <Link to="/profile" className="btn-primary mt-6 inline-block">
                    Manage My Books
                  </Link>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'sent' && (
            <>
              {sentRequests.length > 0 ? (
                <>
                  {/* Pending requests */}
                  {sentRequests.filter(req => req.status === 'Pending').length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
                      <div className="grid gap-4">
                        {sentRequests
                          .filter(req => req.status === 'Pending')
                          .map(request => (
                            <BarterRequestCard
                              key={request.id}
                              request={request}
                              userType="requester"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Accepted requests */}
                  {sentRequests.filter(req => req.status === 'Accepted').length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-4">Accepted Requests</h2>
                      <div className="grid gap-4">
                        {sentRequests
                          .filter(req => req.status === 'Accepted')
                          .map(request => (
                            <BarterRequestCard
                              key={request.id}
                              request={request}
                              userType="requester"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Past requests */}
                  {sentRequests.filter(req => ['Completed', 'Rejected'].includes(req.status)).length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Past Requests</h2>
                      <div className="grid gap-4">
                        {sentRequests
                          .filter(req => ['Completed', 'Rejected'].includes(req.status))
                          .map(request => (
                            <BarterRequestCard
                              key={request.id}
                              request={request}
                              userType="requester"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <SendHorizontal className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Requests Sent</h3>
                  <p className="text-neutral-600 max-w-md mx-auto">
                    You haven't sent any barter requests yet. Browse available books and request a barter to get started.
                  </p>
                  <Link to="/browse" className="btn-primary mt-6 inline-block">
                    Browse Books
                  </Link>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BarterRequestsPage;