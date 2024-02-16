import db from '../db.js';

class Service {
	async create(email, password) {
		return await db.query(
			'INSERT INTO users (email, password) values ($1, $2)',
			[email, password]
		);
	}

	async getOne(email) {
		try {
			return (await db.query('SELECT * FROM users WHERE email = $1', [email]))
				.rows[0];
		} catch (error) {
			console.log(error);
		}
	}
}

export default new Service();
