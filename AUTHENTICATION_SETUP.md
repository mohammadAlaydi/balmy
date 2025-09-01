# 🔐 Authentication System Setup Guide

## Overview
This guide explains how to set up and use the authentication system in your Farada e-commerce platform.

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **State Management**: Redux Toolkit
- **Authentication**: JWT with refresh tokens
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Radix UI + Tailwind CSS

### Security Features
- JWT access tokens (15 minutes expiry)
- JWT refresh tokens (7 days expiry)
- Automatic token refresh
- Password hashing with bcrypt
- Input validation with Zod
- Protected routes

## 🚀 Quick Start

### 1. Environment Variables
Create a `.env.local` file in your project root:

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

# Database Configuration (when you add a real database)
# DATABASE_URL=your-database-connection-string
```

### 2. Test the System
The system includes a test user for development:

**Email**: `test@example.com`  
**Password**: `password123`

## 📁 File Structure

```
components/auth/
├── auth-modal.tsx          # Modal for login/register
├── auth-initializer.tsx    # App startup authentication
├── login-form.tsx          # Login form component
├── register-form.tsx       # Registration form component
└── protected-route.tsx     # Route protection component

store/features/
└── auth-slice.ts           # Redux authentication slice

app/api/auth/
├── login/route.ts          # Login API endpoint
├── register/route.ts       # Registration API endpoint
├── logout/route.ts         # Logout API endpoint
├── refresh/route.ts        # Token refresh endpoint
└── me/route.ts             # Get current user endpoint

app/[locale]/auth/
├── login/page.tsx          # Login page
└── register/page.tsx       # Registration page

hooks/
└── use-auth.ts             # Custom authentication hook
```

## 🔧 Usage Examples

### Using the Authentication Hook
```typescript
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user?.firstName}!</div>;
}
```

### Protecting Routes
```typescript
import ProtectedRoute from '@/components/auth/protected-route';

function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

### Using Authentication Actions
```typescript
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '@/store/features/auth-slice';

function MyComponent() {
  const dispatch = useDispatch();
  
  const handleLogin = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      // Login successful
    }
  };
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };
}
```

## 🔒 Security Considerations

### Production Checklist
- [ ] Change default JWT secrets
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Set secure cookie flags
- [ ] Implement proper error logging
- [ ] Add input sanitization
- [ ] Set up monitoring and alerts

### Token Management
- Access tokens expire every 15 minutes
- Refresh tokens expire every 7 days
- Automatic refresh happens every 14 minutes
- Failed refresh attempts clear all tokens

## 🗄️ Database Integration

### Current Implementation
The system uses in-memory storage for development. To integrate with a real database:

1. **Replace mock data** in API routes
2. **Add database connection** (Prisma, TypeORM, etc.)
3. **Implement user model** with proper indexing
4. **Add database transactions** for critical operations
5. **Set up connection pooling**

### Recommended Database Schema
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'user',
  is_email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

## 🧪 Testing

### Manual Testing
1. **Registration**: Create a new account
2. **Login**: Sign in with credentials
3. **Token Refresh**: Wait for automatic refresh
4. **Logout**: Sign out and verify token clearing
5. **Protected Routes**: Access authenticated-only content

### Automated Testing
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

## 🚨 Troubleshooting

### Common Issues

**"Invalid token" errors**
- Check JWT_SECRET environment variable
- Verify token expiration
- Clear browser storage and re-login

**"Network error occurred"**
- Check API route availability
- Verify server is running
- Check network connectivity

**Form validation errors**
- Ensure all required fields are filled
- Check password confirmation match
- Verify email format

### Debug Mode
Enable debug logging by setting:
```bash
NODE_ENV=development
DEBUG=auth:*
```

## 🔄 Future Enhancements

### Planned Features
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social authentication (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Audit logging
- [ ] Role-based access control

### Performance Optimizations
- [ ] Token caching
- [ ] Database query optimization
- [ ] CDN integration
- [ ] Service worker for offline support

## 📚 Additional Resources

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

## 🤝 Support

For questions or issues:
1. Check this documentation
2. Review the code comments
3. Check the console for errors
4. Verify environment variables
5. Test with the provided test user

---

**Note**: This authentication system is designed for development and testing. For production use, implement additional security measures and integrate with a proper database system.
