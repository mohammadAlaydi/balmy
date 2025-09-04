"use client";

import ReactStars from "@/components/react-stars";

export default function TestStarsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Test Stars Component</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Desktop Size (24px)</h2>
          <ReactStars rating={4.5} edit={false} />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Tablet Size (20px)</h2>
          <ReactStars rating={3.5} edit={false} />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Mobile Size (16px)</h2>
          <ReactStars rating={5} edit={false} />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Editable Stars</h2>
          <ReactStars rating={0} edit={true} />
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          Resize your browser window to see how the stars adapt to different screen sizes.
          On mobile devices (≤640px), stars will be 16px. On tablets (641-768px), stars will be 20px. 
          On desktop (>768px), stars will be 24px.
        </p>
      </div>
    </div>
  );
}

