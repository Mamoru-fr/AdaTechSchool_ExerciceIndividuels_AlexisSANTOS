import {db} from '@/lib/db';
import {posts} from '@/lib/schema';

export async function GET() {
    const postData = await db.select().from(posts);
    console.log('Fetch API Data');
    console.log('Post data : ', postData);
    return new Response(JSON.stringify(postData));
}

export async function POST(request: Request) {
    const reqBody = await request.json();
    const newPost = {
        title: reqBody.title,
        content: reqBody.content,
        createdAt: reqBody.createdAt,
    };
    const insertedPost = await db.insert(posts).values(newPost).returning();
    console.log('New post added : ', insertedPost);
    return new Response(JSON.stringify(insertedPost));
}