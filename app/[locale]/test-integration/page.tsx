"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function TestIntegrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const testApiConnectivity = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-connectivity');
      const data = await response.json();
      setTestResults(data);
      
      if (response.ok) {
        toast.success('API connectivity test completed!');
      } else {
        toast.error('API connectivity test failed!');
      }
    } catch (error) {
      console.error('Test error:', error);
      toast.error('Test failed with error');
      setTestResults({ error: 'Network error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const testExternalApi = async () => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/customer/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
          "Authentication": "Bearer " + localStorage.getItem('accessToken'),
        },
      });
      
      const data = await response.json();
      setTestResults({
        success: true,
        externalApiStatus: response.status,
        externalApiStatusText: response.statusText,
        data: data,
        message: 'Direct external API test completed'
      });
      
      if (response.ok) {
        toast.success('External API test successful!');
      } else {
        toast.error(`External API test failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('External API test error:', error);
      toast.error('External API test failed');
      setTestResults({ 
        error: 'External API test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testProxyRoute = async () => {
    setIsLoading(true);
    try {
      // Test GET request through proxy
      const getResponse = await fetch('/api/proxy?endpoint=/api/v1/customer/get');
      const getData = await getResponse.json();
      
      // Test POST request through proxy
      const postResponse = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: '/api/v1/customer/login',
          method: 'POST',
          data: { email: 'test@example.com', password: 'test123' }
        }),
      });
      const postData = await postResponse.json();
      
      setTestResults({
        success: true,
        proxyTests: {
          get: getData,
          post: postData
        },
        message: 'Proxy route tests completed'
      });
      
      if (getResponse.ok && postResponse.ok) {
        toast.success('Proxy route tests successful!');
      } else {
        toast.error('Some proxy tests failed');
      }
    } catch (error) {
      console.error('Proxy test error:', error);
      toast.error('Proxy test failed');
      setTestResults({ 
        error: 'Proxy test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testSimpleProxy = async () => {
    setIsLoading(true);
    try {
      // Test the simple test-proxy endpoint first
      const testResponse = await fetch('/api/test-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data', endpoint: '/test' }),
      });
      
      const testData = await testResponse.json();
      console.log('Simple proxy test response:', testData);
      
      setTestResults({
        success: true,
        simpleProxyTest: testData,
        message: 'Simple proxy test completed'
      });
      
      if (testResponse.ok) {
        toast.success('Simple proxy test successful!');
      } else {
        toast.error('Simple proxy test failed');
      }
    } catch (error) {
      console.error('Simple proxy test error:', error);
      toast.error('Simple proxy test failed');
      setTestResults({ 
        error: 'Simple proxy test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testDirectFetch = async () => {
    setIsLoading(true);
    try {
      // Test with different fetch options
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      // Test 1: Basic fetch
      const basicResponse = await fetch(`${apiUrl}/api/v1/customer/get`);
      const basicData = await basicResponse.text();
      
      // Test 2: With mode: 'cors'
      const corsResponse = await fetch(`${apiUrl}/api/v1/customer/get`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const corsData = await corsResponse.text();
      
      // Test 3: With mode: 'no-cors'
      const noCorsResponse = await fetch(`${apiUrl}/api/v1/customer/get`, {
        mode: 'no-cors',
      });
      const noCorsData = await noCorsResponse.text();
      
      setTestResults({
        success: true,
        directTests: {
          basic: { status: basicResponse.status, data: basicData },
          cors: { status: corsResponse.status, data: corsData },
          noCors: { status: noCorsResponse.status, data: noCorsData }
        },
        message: 'Direct fetch tests completed'
      });
      
      toast.success('Direct fetch tests completed!');
    } catch (error) {
      console.error('Direct fetch test error:', error);
      toast.error('Direct fetch test failed');
      setTestResults({ 
        error: 'Direct fetch test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">API Integration Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test Local Route</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testApiConnectivity} 
              disabled={isLoading}
              className="w-full text-xs"
              size="sm"
            >
              {isLoading ? 'Testing...' : 'Test Local'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test External API</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testExternalApi} 
              disabled={isLoading}
              variant="outline"
              className="w-full text-xs"
              size="sm"
            >
              {isLoading ? 'Testing...' : 'Test External'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test Proxy Route</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testProxyRoute} 
              disabled={isLoading}
              variant="secondary"
              className="w-full text-xs"
              size="sm"
            >
              {isLoading ? 'Testing...' : 'Test Proxy'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test Simple Proxy</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testSimpleProxy} 
              disabled={isLoading}
              variant="default"
              className="w-full text-xs"
              size="sm"
            >
              {isLoading ? 'Testing...' : 'Test Simple'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test Direct Fetch</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testDirectFetch} 
              disabled={isLoading}
              variant="destructive"
              className="w-full text-xs"
              size="sm"
            >
              {isLoading ? 'Testing...' : 'Test Fetch'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">What to Check:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• API URL is correctly configured in your .env file</li>
            <li>• External API is accessible from your development environment</li>
            <li>• CORS is properly configured on the external API</li>
            <li>• Network connectivity between your app and the external API</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">Common Solutions:</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Use the proxy route to bypass CORS issues</li>
            <li>• Check if the API server is running and accessible</li>
            <li>• Verify firewall and network settings</li>
            <li>• Contact API administrator for CORS configuration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
