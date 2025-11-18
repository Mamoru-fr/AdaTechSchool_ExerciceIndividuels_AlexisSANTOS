'use client';

import React, {useState} from 'react';

type CreateCommentProps = {
    postId: number,
    refreshComments: () => void,
}

export function CreateComment({postId, refreshComments}: CreateCommentProps) {
    const [content, setContent] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim() !== '') {
            try {
                const response = await fetch(`/api/comments`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({postId, content})
                });
                const data = await response.json();
                console.log('New comment created: ', data);
                setContent('');
                refreshComments();
            } catch (error) {
                console.error('Error creating comment:', error);
            }
        }
    }

    return (
        <div style={{marginTop: '1.5rem', padding: '0 2rem 2rem'}}>
            <h4 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937'}}>
                Add a Comment
            </h4>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your comment here..."
                    rows={4}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        resize: 'none'
                    }}
                    required
                />
                <div style={{display: 'flex', justifyContent: 'flex-end', height: '100%'}}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#2563eb',
                            height: '100%',
                            color: 'white',
                            fontWeight: '600',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '0.375rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        </div>
    );
}