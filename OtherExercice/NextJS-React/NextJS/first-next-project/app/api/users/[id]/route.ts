import {db} from '@/lib/db';
import {users} from '@/lib/schema';
import {eq} from "drizzle-orm";

export async function GET(
    request: Request, 
    {params}: {params: Promise<{id: string}>}
) {
    // In Next.js 15+, params is a Promise and must be awaited
    const {id} = await params;
    
    // Convert the string ID to a number
    const userId = Number(id);
    console.log('User ID is: ', userId);
    
    // With better-sqlite3, this is synchronous (no await needed)
    const userData = db.select().from(users).where(eq(users.id, userId)).all();
    
    console.log('Fetch API Data');
    console.log('User data : ', userData);
    
    // Return the response
    return Response.json(userData);
}

export async function DELETE(
    request: Request, 
    {params}: {params: Promise<{id: string}>}
) {
    const {id} = await params;
    const userId = Number(id);

    // Execute the DELETE query with .run()
    const result = db.delete(users).where(eq(users.id, userId)).run();

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
    const userId = Number(id);
    
    // Parse the request body to get the updated data
    const body = await request.json();
    
    // Execute the UPDATE query with .run()
    // .set() needs an object with the fields to update
    const result = db.update(users)
        .set({
            username: body.username,
            email: body.email
        })
        .where(eq(users.id, userId))
        .run();
    
    // Return the result
    return Response.json({ 
        success: true, 
        updated: result.changes,
        message: `Updated ${result.changes} user(s)` 
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