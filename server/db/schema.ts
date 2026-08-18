import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const table = sqliteTable('table',
	{
		id: text('id').primaryKey(),
		text: text('text').notNull()
	}
);

