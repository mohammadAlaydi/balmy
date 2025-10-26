# 🔍 Token Flow Debug Guide

## Current Issue
- **Postman**: Shows token in response ✅
- **E-commerce App**: No token in response ✅ (This is correct!)
- **Refresh Token**: Now fixed! ✅

## Expected Behavior
The e-commerce app should work **without** tokens in the response because:
1. Tokens are stored in httpOnly cookies (secure)
2. All API calls go through Next.js routes
3. Next.js routes handle token management
4. Refresh flow uses current access token to get new access token

## Debug Steps

### 1. Check if Access Token is Being Stored in Cookies
```javascript
// In browser console, check if cookies are set:
document.cookie
// Should show: accessToken=...
```

### 2. Check Login Response
```javascript
// The login response should look like this (NO tokens):
{
  "data": {
    "id": 4,
    "email": "mohammadalaydi@gmail.com",
    // ... user data
  },
  "message": "Logged in successfully."
}
```

### 3. Test Token Refresh Manually
```javascript
// In browser console:
fetch('/api/auth/refresh', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
// Should return: { message: "Token refreshed successfully" }
```

### 4. Check Network Tab
- Login request should go to `/api/auth/login`
- Response should NOT contain tokens
- Cookies should be set in response headers

### 5. Test API Call with Authentication
```javascript
// This should work if tokens are in cookies:
fetch('/api/auth/me')
  .then(r => r.json())
  .then(console.log)
```

## Possible Issues

### Issue 1: Refresh Token Not Being Stored
**Check**: Are both accessToken and refreshToken cookies being set?
**Fix**: Check login route cookie setting

### Issue 2: Refresh Endpoint Not Working
**Check**: Does `/api/auth/refresh` return success?
**Fix**: Check refresh route implementation

### Issue 3: Token Expiry
**Check**: Are tokens expiring too quickly?
**Fix**: Adjust cookie maxAge settings

### Issue 4: CORS Issues
**Check**: Are cookies being sent with requests?
**Fix**: Ensure `credentials: 'include'` is set

## Quick Fix Test

If refresh token still doesn't work, try this temporary fix:

1. **Modify login route** to return token in response (for debugging only)
2. **Test if refresh works** with token in response
3. **If it works**, the issue is with httpOnly cookie handling
4. **If it doesn't work**, the issue is with the refresh endpoint

## Expected Flow
1. Login → Access token stored in httpOnly cookie → No token in response ✅
2. API calls → Use token from cookie → Work ✅
3. Token expires → Send current token to refresh endpoint → New token in cookie ✅
4. Continue using new token → Work ✅

## How Refresh Works Now
1. **API call fails with 401** → Automatic refresh triggered
2. **Refresh endpoint** → Sends current access token to `/api/v1/customer/refresh-token`
3. **Backend responds** → Returns new access token
4. **New token stored** → Updated in httpOnly cookie
5. **Original request retried** → With new token

The missing token in response is **CORRECT** for security. The refresh flow now works properly!
