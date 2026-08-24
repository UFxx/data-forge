import { db } from '#db';
import { eq } from 'drizzle-orm';
import { users } from '#db/schema';

export default defineEventHandler(async (e) =>
	{
		const userId = e.context.userId;
		const user   = db.select({ login: users.login }).from(users).where(eq(users.id, userId)).get();

		return { login: user?.login };
	}
)