import React from 'react';
import { BarterRequest } from '../../types';
import { Check, X, MessageCircle } from 'lucide-react';

interface BarterRequestCardProps {
  request: BarterRequest;
  userType: 'requester' | 'owner';
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  onComplete?: (requestId: string) => void;
}

const BarterRequestCard: React.FC<BarterRequestCardProps> = ({
  request,
  userType,
  onAccept,
  onReject,
  onComplete
}) => {
  // Helper function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'badge-warning';
      case 'Accepted':
        return 'badge-success';
      case 'Rejected':
        return 'badge-error';
      case 'Completed':
        return 'badge-secondary';
      default:
        return 'badge-primary';
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">
            {userType === 'requester' ? 'You requested:' : 'Request from:'}
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            {formatDate(request.createdAt)}
          </p>
        </div>
        <span className={`${getStatusBadge(request.status)}`}>
          {request.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Book details */}
        <div className="p-3 bg-neutral-50 rounded-md">
          <h4 className="text-sm font-medium text-neutral-500 mb-2">
            {userType === 'requester' ? 'Book You Want' : 'Your Book'}
          </h4>
          <div className="flex">
            <div className="h-16 w-12 bg-neutral-200 rounded mr-3 flex-shrink-0"></div>
            <div>
              <p className="font-medium">{request.requestedBook?.title || 'Book Title'}</p>
              <p className="text-sm text-neutral-600">{request.requestedBook?.author || 'Author'}</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-neutral-50 rounded-md">
          <h4 className="text-sm font-medium text-neutral-500 mb-2">
            {userType === 'requester' ? 'Book You Offer' : 'Book Offered'}
          </h4>
          <div className="flex">
            <div className="h-16 w-12 bg-neutral-200 rounded mr-3 flex-shrink-0"></div>
            <div>
              <p className="font-medium">{request.offeredBook?.title || 'Book Title'}</p>
              <p className="text-sm text-neutral-600">{request.offeredBook?.author || 'Author'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {request.message && (
        <div className="mb-4 p-3 bg-primary-50 rounded-md">
          <div className="flex items-start space-x-2">
            <MessageCircle className="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm text-primary-700">Message:</h4>
              <p className="text-sm mt-1">{request.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {userType === 'owner' && request.status === 'Pending' && (
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => onAccept && onAccept(request.id)}
            className="btn-success flex-1 flex items-center justify-center"
          >
            <Check className="h-4 w-4 mr-1" /> Accept
          </button>
          <button
            onClick={() => onReject && onReject(request.id)}
            className="btn-outline flex-1 text-error-600 flex items-center justify-center"
          >
            <X className="h-4 w-4 mr-1" /> Decline
          </button>
        </div>
      )}

      {userType === 'owner' && request.status === 'Accepted' && (
        <div className="mt-3">
          <button
            onClick={() => onComplete && onComplete(request.id)}
            className="btn-primary w-full"
          >
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default BarterRequestCard;