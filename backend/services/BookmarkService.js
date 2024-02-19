import db from '../db.js';

class BookmarkService {
  static async getAll(user_id) {
    try {
      return (
        await db.query('SELECT * FROM bookmarks WHERE user_id = $1', [user_id])
      ).rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne(user_id, bookmark_id) {
    try {
      return (
        await db.query(
          'SELECT * FROM bookmarks WHERE user_id = $1 AND bookmark_id = $2',
          [user_id, bookmark_id]
        )
      ).rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async create(title, link, description = '', user_id) {
    try {
      const create_at = new Date();
      console.log(create_at);
      return (
        await db.query(
          `INSERT INTO bookmarks (title, link, description, create_at, user_id)
					VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [title, link, description, create_at, user_id]
        )
      ).rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async update(title, link, description = '', user_id, bookmark_id) {
    try {
      await db.query(
        `UPDATE bookmarks SET
						title = $1,
						link = $2,
						description = $3
					WHERE user_id = $4 AND bookmark_id = $5`,
        [title, link, description, user_id, bookmark_id]
      );
      const result = await this.getOne(user_id, bookmark_id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(user_id, bookmark_id) {
    try {
      await db.query(
        'DELETE FROM bookmarks WHERE user_id = $1 AND bookmark_id = $2',
        [user_id, bookmark_id]
      );
      return { bookmark_id: bookmark_id };
    } catch (error) {
      console.log(error);
    }
  }
}

export default BookmarkService;
