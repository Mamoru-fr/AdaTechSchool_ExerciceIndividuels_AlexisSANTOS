'use client';

import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

type postType = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export default function PostPage({params}: {params: Promise<{id: string}>}) {
    const router = useRouter();
    const [post, setPost] = useState<postType | null>(null);
    const { id } = React.use(params);
    const idNumber = Number(id);
    console.log("This is the post with the id: ", id);

    useEffect(() => {
        fetch(`http://localhost:3002/api/posts/${idNumber}`)
            .then(res => res.json())
            .then(data => {
                console.log('Raw API response:', data);
                // If API returns an array, get the first item
                const postData = Array.isArray(data) ? data[0] : data;
                setPost(postData);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    }, [idNumber]);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            fetch(`http://localhost:3002/api/posts/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                router.push('/posts');
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
        }
    };

    if (!post) {
        return <div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>;
    }

    console.log('This is my post : ', post);

    return (
        <div style={styles.container}>
            <article style={styles.article}>
                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.title}>
                        {post.title}
                    </h1>
                    <div style={styles.dateContainer}>
                        <svg style={styles.dateIcon} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <time style={styles.dateText}>
                            {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </time>
                    </div>
                </div>

                {/* Content Section */}
                <div style={styles.content}>
                    <p style={styles.contentText}>
                        {post.content}
                    </p>
                </div>

                {/* Footer Section */}
                <div style={styles.footer}>
                    <div style={styles.footerContainer}>
                        <button style={styles.backButton} onClick={() => router.push('/posts')}>
                            <svg style={styles.backIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Posts
                        </button>
                        <div style={styles.buttonGroup}>
                            <button style={styles.deleteButton} onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

// Styles dictionary
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        padding: '3rem 1rem',
    },
    article: {
        maxWidth: '56rem',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
    },
    header: {
        background: 'linear-gradient(to right, #2563eb, #1e40af)',
        padding: '3rem 2rem',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold' as const,
        color: 'white',
        marginBottom: '1rem',
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        color: '#dbeafe',
    },
    dateIcon: {
        width: '1.25rem',
        height: '1.25rem',
        marginRight: '0.5rem',
    },
    dateText: {
        fontSize: '0.875rem',
        fontWeight: '500' as const,
    },
    content: {
        padding: '2.5rem 2rem',
    },
    contentText: {
        color: '#374151',
        lineHeight: 1.75,
        fontSize: '1.125rem',
        whiteSpace: 'pre-wrap' as const,
    },
    footer: {
        padding: '1.5rem 2rem',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
    },
    footerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        color: '#2563eb',
        fontWeight: '600' as const,
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
    },
    backIcon: {
        width: '1.25rem',
        height: '1.25rem',
        marginRight: '0.5rem',
    },
    buttonGroup: {
        display: 'flex',
        gap: '0.75rem',
    },
    deleteButton: {
        backgroundColor: '#dc2626',
        color: 'white',
        padding: '0.5rem 1.5rem',
        borderRadius: '0.375rem',
        fontWeight: '600' as const,
        transition: 'background-color 0.2s',
        cursor: 'pointer',
        border: 'none',
    },
} as const;