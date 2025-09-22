import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Loader2 } from 'lucide-react';

export default function Dynamic() {
  useEffect(() => {
    // Redirect to GameGPT's dynamic page
    window.location.href = 'http://localhost:8081/dynamic';
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-primary">
            Redirecting to GameGPT...
          </h1>
          
          <p className="text-lg text-gray-600">
            You're being redirected to the GameGPT Dynamic Game Creator.
          </p>
          
          <p className="text-sm text-gray-500 mt-4">
            If you're not redirected automatically, <a href="http://localhost:8081/dynamic" className="text-primary hover:underline">click here</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}