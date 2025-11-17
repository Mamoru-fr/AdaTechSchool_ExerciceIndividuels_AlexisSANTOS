'use client';

import {useEffect, useState} from "react";
import {CreateComment} from "@/components/CreateComment";
import { CommentFormat } from "@/components/CommentFormat";
import { ModifyComment } from "@/components/ModifyComment";

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
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

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

  const handleEdit = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleSaveEdit = (commentId: number, newContent: string) => {
    // Update comment via API
    fetch(`http://localhost:3002/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: newContent})
    })
    .then(res => res.json())
    .then(() => {
      refreshComments();
      setEditingCommentId(null);
    })
    .catch(error => {
      console.error('Error updating comment:', error);
    });
  };

  const handleDeleteComment = (commentId: number) => {
    // Delete comment via API
    fetch(`http://localhost:3002/api/comments/${commentId}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      refreshComments();
      setEditingCommentId(null);
    })
    .catch(error => {
      console.error('Error deleting comment:', error);
    });
  };

  return (
    <div className="mt-8 px-8 pb-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Comments ({comments.length})
      </h3>
      <CreateComment postId={id} refreshComments={refreshComments} />
      
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id}>
              {editingCommentId === comment.id ? (
                <ModifyComment 
                  comment={comment}
                  onSave={(newContent) => handleSaveEdit(comment.id, newContent)}
                  onCancel={handleCancelEdit}
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              ) : (
                <CommentFormat 
                  comment={comment}
                  onEdit={() => handleEdit(comment.id)}
                  refreshComments={refreshComments}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}