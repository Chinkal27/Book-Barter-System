import { BarterRequest } from '../types';

// Mock data for barter requests
const mockBarterRequests: BarterRequest[] = [
  {
    id: '1',
    requesterId: '1', // Current user in AuthContext
    requestedBookId: '2',
    offeredBookId: '7',
    status: 'Pending',
    message: 'Hello, I would love to trade for your copy of The Great Gatsby. It\'s required for my English class this semester.',
    createdAt: '2024-04-12T14:25:00Z',
    updatedAt: '2024-04-12T14:25:00Z'
  },
  {
    id: '2',
    requesterId: '3',
    requestedBookId: '8', // One of user's books
    offeredBookId: '3',
    status: 'Pending',
    message: 'I noticed you have the Physics textbook I need. Would you be interested in trading?',
    createdAt: '2024-04-10T09:30:00Z',
    updatedAt: '2024-04-10T09:30:00Z'
  },
  {
    id: '3',
    requesterId: '1', // Current user
    requestedBookId: '5',
    offeredBookId: '9',
    status: 'Accepted',
    message: 'I need this calculus book for my summer class. Let me know if you want to trade!',
    createdAt: '2024-03-25T11:15:00Z',
    updatedAt: '2024-03-26T16:40:00Z'
  },
  {
    id: '4',
    requesterId: '5',
    requestedBookId: '10', // One of user's books
    offeredBookId: '4',
    status: 'Rejected',
    message: 'Would you trade your chemistry book for my organic chemistry text?',
    createdAt: '2024-03-18T13:45:00Z',
    updatedAt: '2024-03-19T10:20:00Z'
  },
  {
    id: '5',
    requesterId: '1', // Current user
    requestedBookId: '6',
    offeredBookId: '11',
    status: 'Completed',
    message: 'I really need this psychology book for my class!',
    createdAt: '2024-02-10T15:30:00Z',
    updatedAt: '2024-02-15T09:10:00Z'
  }
];

// Simulating API calls with promises
export const getBarterRequests = async (): Promise<BarterRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBarterRequests), 800);
  });
};

export const getSentBarterRequests = async (userId: string): Promise<BarterRequest[]> => {
  return new Promise((resolve) => {
    const filtered = mockBarterRequests.filter(request => request.requesterId === userId);
    setTimeout(() => resolve(filtered), 800);
  });
};

export const getReceivedBarterRequests = async (userId: string): Promise<BarterRequest[]> => {
  // In a real app, we would filter based on the requestedBook's owner
  // For demo purposes, let's assume user id '1' owns books with ids '8', '10', etc.
  return new Promise((resolve) => {
    const userOwnedBookIds = ['8', '10', '11'];
    const filtered = mockBarterRequests.filter(request => 
      userOwnedBookIds.includes(request.requestedBookId)
    );
    setTimeout(() => resolve(filtered), 800);
  });
};

export const createBarterRequest = async (
  requesterId: string,
  requestedBookId: string,
  offeredBookId: string,
  message?: string
): Promise<BarterRequest> => {
  return new Promise((resolve) => {
    const newRequest: BarterRequest = {
      id: `${Date.now()}`,
      requesterId,
      requestedBookId,
      offeredBookId,
      status: 'Pending',
      message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTimeout(() => resolve(newRequest), 1000);
  });
};

export const updateBarterRequestStatus = async (
  requestId: string,
  status: 'Accepted' | 'Rejected' | 'Completed'
): Promise<BarterRequest> => {
  return new Promise((resolve, reject) => {
    const requestIndex = mockBarterRequests.findIndex(r => r.id === requestId);
    
    if (requestIndex === -1) {
      reject(new Error('Barter request not found'));
      return;
    }
    
    const updatedRequest = {
      ...mockBarterRequests[requestIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    
    setTimeout(() => resolve(updatedRequest), 1000);
  });
};