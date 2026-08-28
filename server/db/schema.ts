import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users',
	{
		id       : text('id').primaryKey(),
		login    : text('login').notNull().unique(),
		password : text('password').notNull()
	}
);

export const files = sqliteTable('files',
	{
		id          : text('id').primaryKey(),
		name        : text('name').notNull(),
		path        : text('path'),
		userId      : text('user_id').notNull().references(() => users.id),
		uniqueName  : text('unique_name').notNull().unique(),
		isProcessed : integer('is_processed', { mode: 'boolean' }).default(true).notNull(),
	}
)
