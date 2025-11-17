import {is} from 'drizzle-orm';
import React, {useState} from 'react';

interface ModifyPostsPopupProps {
    isOpen: boolean;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    onSubmit: (title: string, content: string) => void;
    post: {
        id: number;
        title: string;
        content: string;
    };
}

export default function ModifyPostsPopup({isOpen, onClose, onSubmit, post, setIsDeleted}: ModifyPostsPopupProps) {
    const [title, setTitle] = useState<string>(post.title);
    const [content, setContent] = useState<string>(post.content);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            onSubmit(title, content);
            onClose();
        }
    };

    const handleDelete = () => {
        
        fetch(`/api/posts/${post.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Post deleted successfully:', data);
        }).catch(error => {
            console.error('Error deleting post:', error);
        });

        console.log('Post deleted');
        setIsDeleted(true);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Create New Post</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter post title"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-medium mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-64 resize-none"
                            placeholder="Enter post content"
                            required
                        />
                    </div>

                    <div className="flex justify-between gap-3">
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    handleDelete();
                                    console.log('Delete post');
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                            >
                                Delete Post
                            </button>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Update Post
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

