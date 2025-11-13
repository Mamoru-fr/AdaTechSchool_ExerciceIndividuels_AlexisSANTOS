import {db} from '@/lib/db';
import {posts} from '@/lib/schema';
import {eq} from "drizzle-orm";

export async function GET(
    request: Request, 
    {params}: {params: Promise<{id: string}>}
) {
    // In Next.js 15+, params is a Promise and must be awaited
    const {id} = await params;
    
    // Convert the string ID to a number
    const postId = Number(id);
    console.log('Post ID is: ', postId);
    
    // With better-sqlite3, this is synchronous (no await needed)
    const postData = db.select().from(posts).where(eq(posts.id, postId)).all();
    
    console.log('Fetch API Data');
    console.log('Post data : ', postData);
    
    // Return the response
    return Response.json(postData);
}

export async function DELETE(
    request: Request, 
    {params}: {params: Promise<{id: string}>}
) {
    const {id} = await params;
    const postId = Number(id);

    // Execute the DELETE query with .run()
    const result = db.delete(posts).where(eq(posts.id, postId)).run();

    // result contains: { changes: number, lastInsertRowid: number }
    return Response.json({ 
        success: true, 
        deleted: result.changes,
        message: `Deleted ${result.changes} user(s)` 
    });
}

export async function PUT(
    request: Request, 
    {params}: {params: Promise<{id: string}>}
) {
    const {id} = await params;
    const postId = Number(id);
    
    // Parse the request body to get the updated data
    const body = await request.json();
    
    // Execute the UPDATE query with .run()
    // .set() needs an object with the fields to update
    const result = db.update(posts)
        .set({
            title: body.title,
            content: body.content,
            createdAt: body.createdAt
        })
        .where(eq(posts.id, postId))
        .run();
    
    // Return the result
    return Response.json({ 
        success: true, 
        updated: result.changes,
        message: `Updated ${result.changes} post(s)` 
    });
}

// export async function GET(
//     _req: NextApiRequest,
//     res: RouteContext<"/api/users/[id]">
// ) { 

//     console.log(res);

//     const params = await res.params;
//     // Convert the string ID to a number
//     const userId = parseInt(params.id, 10);
//     console.log('User ID is: ', userId);
    
//     // With better-sqlite3, this is synchronous (no await needed)
//     const userData = db.select().from(users).where(eq(users.id, userId)).all();
    
//     console.log('Fetch API Data');
//     console.log('User data : ', userData);
    
//     // Return the response
//     return Response.json(userData);
// }