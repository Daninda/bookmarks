import dotenv from 'dotenv';
import psql from 'pg';

dotenv.config();

const pool = new psql.Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
});

console.log('Database connected');

async function create() {
	await pool.query(
		`CREATE TABLE IF NOT EXISTS users (
			user_id SERIAL PRIMARY KEY,
			email VARCHAR(64) UNIQUE NOT NULL,
			password VARCHAR(64) NOT NULL
		)`
	);

	await pool.query(
		`CREATE TABLE IF NOT EXISTS bookmarks (
			bookmark_id SERIAL PRIMARY KEY,
			title VARCHAR(64) NOT NULL,
			link TEXT NOT NULL,
			description TEXT,
			create_at TIMESTAMP NOT NULL,
			user_id INTEGER REFERENCES users(user_id) NOT NULL
		)`
	);

	await pool.query(
		`CREATE TABLE IF NOT EXISTS tags (
			tag_id SERIAL PRIMARY KEY,
			title VARCHAR(32) NOT NULL
		)`
	);

	await pool.query(
		`CREATE TABLE IF NOT EXISTS bookmarks_tags (
			bookmark_id INTEGER REFERENCES bookmarks(bookmark_id),
			tag_id INTEGER REFERENCES tags(tag_id),
			PRIMARY KEY(bookmark_id, tag_id)
		)`
	);
}

await create();

export default pool;
