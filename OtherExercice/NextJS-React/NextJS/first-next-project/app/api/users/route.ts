import {db} from '@/lib/db';
import {users} from '@/lib/schema';

export async function GET() {
    const userData = await db.select().from(users);
    console.log('Fetch API Data');
    console.log('User data : ', userData);
    return new Response(JSON.stringify(userData));
}