import {db} from '@/lib/db';
import {comments} from '@/lib/schema';

export async function GET() {
    const commentData = await db.select().from(comments);
    console.log('Fetch API Data');
    console.log('Comment data : ', commentData);
    return new Response(JSON.stringify(commentData));
}

export async function POST(request: Request) {
    const reqBody = await request.json();
    const newComment = {
        postId: reqBody.postId,
        content: reqBody.content,
        createdAt: reqBody.createdAt,
    };
    const insertedComment = await db.insert(comments).values(newComment).returning();
    console.log('New comment added : ', insertedComment);
    return new Response(JSON.stringify(insertedComment));
}