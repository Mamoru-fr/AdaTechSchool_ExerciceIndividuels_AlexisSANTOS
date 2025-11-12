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