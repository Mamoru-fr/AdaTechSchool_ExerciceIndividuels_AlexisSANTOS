import {db} from '@/lib/db';
import {users} from '@/lib/schema';

export async function GET() {
    const userData = await db.select().from(users);
    console.log('Fetch API Data');
    console.log('User data : ', userData);
    return new Response(JSON.stringify(userData));
}

export async function POST(request: Request) {
    const reqBody = await request.json();
    const newUser = {
        username: reqBody.username,
        email: reqBody.email,
    };
    const insertedUser = await db.insert(users).values(newUser).returning();
    console.log('New user added : ', insertedUser);
    return new Response(JSON.stringify(insertedUser));
}