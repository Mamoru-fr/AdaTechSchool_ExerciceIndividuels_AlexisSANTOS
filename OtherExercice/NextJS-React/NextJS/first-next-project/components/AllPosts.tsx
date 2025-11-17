'use client';

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

interface AllPostsProps {
  refreshKey?: number;
}

export const AllPosts = ({refreshKey = 0}: AllPostsProps) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const refreshPosts = () => {
    fetch('http://localhost:3002/api/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
    .then((data) => {
      console.log('Posts fetched from API: ', data)
    });
  }

  useEffect(() => {
    refreshPosts();
  }, [refreshKey]);
  console.log(posts);

  return <div className="container mx-auto px-4 py-8 max-w-4xl">
    <h1 className="text-4xl font-bold mb-8 text-gray-800">All Posts</h1>
    <ul className="space-y-4">
      {posts.map((post: any) => (
        <li key={post.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg p-6 border border-gray-200" onClick={() => router.push(`/posts/${post.id}`)} style={{ cursor: 'pointer' }}>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>;
}