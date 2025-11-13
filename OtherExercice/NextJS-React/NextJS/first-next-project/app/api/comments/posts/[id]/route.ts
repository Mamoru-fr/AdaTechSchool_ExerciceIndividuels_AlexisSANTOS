import {db} from '@/lib/db';
import {comments} from '@/lib/schema';
import {eq} from "drizzle-orm";

export async function GET(
    request: Request, 
    {params}: {params: Promise<{id: string}>}
) {
    // In Next.js 15+, params is a Promise and must be awaited
    const {id} = await params;
    
    // Convert the string ID to a number
    const commentId = Number(id);
    console.log('Comment ID is: ', commentId);
    
    // With better-sqlite3, this is synchronous (no await needed)
    const commentData = db.select().from(comments).where(eq(comments.postId, commentId)).all();
    
    console.log('Fetch API Data');
    console.log('Comment data : ', commentData);
    
    // Return the response
    return Response.json(commentData);
}