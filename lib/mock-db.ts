// Shared mock database for development
// In production, replace this with a real database

export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Initialize with a test user
export const mockUsers: MockUser[] = [
  {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: '$2b$12$ZbLhXNsG8RLL0jY8RJZxF.GVaufoDQuJh5neerXv5FEv4m9WqWkWm', // password123
    phone: '1234567890',
    country: 'المملكة العربية السعودية',
    city: 'الرياض',
    address: 'شارع الملك فهد',
    role: 'user',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Helper functions
export const findUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const findUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const addUser = (user: MockUser): void => {
  mockUsers.push(user);
};

export const updateUser = (id: string, updates: Partial<MockUser>): void => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates, updatedAt: new Date() };
  }
};

export const deleteUser = (id: string): void => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
  }
};
