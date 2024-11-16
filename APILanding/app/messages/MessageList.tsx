'use client';

import { useEffect, useState } from 'react';

interface Memory {
  id: string;
  text: string;
  imageUrl: string;
  ipfsHash: string;
  timestamp: string;
}

export default function MessageList() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchMemories = async () => {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMemories(data.memories);
    };

    fetchMemories();
    const interval = setInterval(fetchMemories, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Memory Collection</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <div key={memory.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={memory.imageUrl} 
              alt="Memory visualization" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-400 mb-2">
                {new Date(memory.timestamp).toLocaleDateString()}
              </p>
              <p className="mb-4">{memory.text}</p>
              <a 
                href={`https://ipfs.io/ipfs/${memory.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline"
              >
                View on IPFS
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}