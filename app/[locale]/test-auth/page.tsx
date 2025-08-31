"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { apiService } from '@/lib/api-service';

export default function TestAuthPage() {
  const [email, setEmail] = useState('abdo@envaglo.com'); // Use the working email from your test
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionCookie, setSessionCookie] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loginResult, setLoginResult] = useState<any>(null);

  const testLogin = async () => {
    setIsLoading(true);
    try {
      console.log('Testing login...');
      const result = await apiService.loginCustomer({ email, password });
      console.log('Login result:', result);
      setLoginResult(result);
      
      if (result.sessionCookie) {
        setSessionCookie(result.sessionCookie);
        toast.success('Login successful! Session cookie received.');
      } else if (result.token) {
        toast.success('Login successful! Token received.');
      } else {
        toast.success('Login successful!');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetProfile = async () => {
    if (!sessionCookie && !loginResult?.token) {
      toast.error('Please login first to get authentication');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Testing get profile...');
      const result = await apiService.getCustomerProfile();
      console.log('Profile result:', result);
      setProfileData(result);
      toast.success('Profile retrieved successfully!');
    } catch (error: any) {
      console.error('Get profile failed:', error);
      toast.error(`Get profile failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLogout = async () => {
    setIsLoading(true);
    try {
      console.log('Testing logout...');
      await apiService.logoutCustomer();
      setSessionCookie(null);
      setProfileData(null);
      setLoginResult(null);
      toast.success('Logout successful!');
    } catch (error: any) {
      console.error('Logout failed:', error);
      toast.error(`Logout failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = () => {
    apiService.clearSessionCookie();
    apiService.clearCsrfToken();
    setSessionCookie(null);
    setProfileData(null);
    setLoginResult(null);
    toast.success('Session cleared!');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Test Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <Button
              onClick={testLogin}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Logging in...' : 'Test Login'}
            </Button>
          </CardContent>
        </Card>

        {/* Session Info */}
        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Session Cookie:</Label>
              <div className="text-sm bg-gray-100 p-2 rounded mt-1">
                {sessionCookie ? '✅ Present' : '❌ None'}
              </div>
            </div>
            <div>
              <Label>API Service Session:</Label>
              <div className="text-sm bg-gray-100 p-2 rounded mt-1">
                {apiService.getSessionCookie() ? '✅ Present' : '❌ None'}
              </div>
            </div>
            <div>
              <Label>Token:</Label>
              <div className="text-sm bg-gray-100 p-2 rounded mt-1">
                {loginResult?.token ? '✅ Present' : '❌ None'}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={testGetProfile}
                disabled={(!sessionCookie && !loginResult?.token) || isLoading}
                variant="outline"
                className="flex-1"
              >
                Test Get Profile
              </Button>
              <Button
                onClick={clearSession}
                variant="outline"
                className="flex-1"
              >
                Clear Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Login Result */}
      {loginResult && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Login Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(loginResult, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Profile Data */}
      {profileData && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Profile Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(profileData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              onClick={testLogout}
              disabled={(!sessionCookie && !loginResult?.token) || isLoading}
              variant="destructive"
            >
              Test Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Test Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Enter your credentials and click "Test Login"</li>
            <li>Check if token and/or session cookie is received</li>
            <li>Click "Test Get Profile" to test authenticated endpoint</li>
            <li>Use "Clear Session" to reset the session</li>
            <li>Use "Test Logout" to test logout functionality</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <strong>Note:</strong> The email "abdo@envaglo.com" was pre-filled based on your working test. 
            You can change it to test with different credentials.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
