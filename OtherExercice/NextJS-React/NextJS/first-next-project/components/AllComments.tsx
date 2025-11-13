'use client';

import {useEffect, useState} from "react";

interface AllCommentsProps {
  refreshKey?: number;
  id: number;
}

type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
}

export const AllComments = ({refreshKey = 0, id}: AllCommentsProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const refreshComments = () => {
    fetch(`http://localhost:3002/api/comments/posts/${id}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }
  
  useEffect(() => {
    refreshComments();
  }, [refreshKey, id]);

  return (
    <div className="mt-8 px-8 pb-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Comments ({comments.length})
      </h3>
      
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li 
              key={comment.id} 
              className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed mb-2">
                    {comment.content}
                  </p>
                  <small className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </small>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}