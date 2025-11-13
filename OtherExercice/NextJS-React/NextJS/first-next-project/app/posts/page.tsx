'use client';

import {AllPosts} from "@/components/AllPosts";
import CreatePostsPopup from "@/components/CreatePostsPopup";
import {useState} from "react";

export default function Posts() {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const onClose = () => setIsOpen(false);

  const handleSubmit = async (title: string, content: string) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    const data = await response.json();
    console.log('Submitting post:', { title, content }, data);
    
    // Refresh the posts list after successful creation
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <AllPosts refreshKey={refreshKey} />
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white w-14 h-14 rounded-full text-3xl hover:bg-blue-600 shadow-lg"
      >
        +
      </button>
      {isOpen && (
        <CreatePostsPopup 
          isOpen={isOpen} 
          onClose={onClose} 
          onSubmit={handleSubmit} 
        />
      )}
    </div>
  );
}