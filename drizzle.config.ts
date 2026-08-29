import { defineConfig } from 'drizzle-kit';
import { join } from 'node:path';

export default defineConfig({
	schema: './server/db/schema.ts',
	out: './server/db/migrations',
	dialect: 'sqlite',
	dbCredentials: {
		url: join(process.cwd(), 'dataforge.sqlite')
	}
})