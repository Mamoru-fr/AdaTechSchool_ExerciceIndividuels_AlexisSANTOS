import {db} from '@/lib/db';
import {comments} from '@/lib/schema';

export async function GET() {
    const commentData = await db.select().from(comments);
    return new Response(JSON.stringify(commentData));
}

export async function POST(request: Request) {
    const reqBody = await request.json();
    const newComment = {
        postId: reqBody.postId,
        content: reqBody.content,
        createdAt: new Date().toISOString(),
    };
    const insertedComment = await db.insert(comments).values(newComment).returning();
    
    return new Response(JSON.stringify(insertedComment));
}