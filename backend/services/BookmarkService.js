import db from '../db.js';

class BookmarkService {
  static async getAll(user_id) {
    try {
      const result = (
        await db.query(
          'SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY create_at DESC',
          [user_id]
        )
      ).rows;
      for (let i = 0; i < result.length; i++) {
        result[i].tags = await this.getBookmarkTags(result[i].bookmark_id);
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUserTags(user_id) {
    try {
      const result = (
        await db.query(
          `SELECT DISTINCT tags.tag_id, tags.title FROM tags
          JOIN bookmarks_tags USING (tag_id)
          JOIN bookmarks USING (bookmark_id)
          WHERE user_id = $1`,
          [user_id]
        )
      ).rows;
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne(user_id, bookmark_id) {
    try {
      const result = (
        await db.query(
          'SELECT * FROM bookmarks WHERE user_id = $1 AND bookmark_id = $2',
          [user_id, bookmark_id]
        )
      ).rows[0];
      result.tags = await this.getBookmarkTags(bookmark_id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(title, link, description = '', tags, user_id) {
    try {
      const create_at = new Date().getTime();
      const result = (
        await db.query(
          `INSERT INTO bookmarks (title, link, description, create_at, user_id)
					VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [title, link, description, create_at, user_id]
        )
      ).rows[0];

      await this.addTags(result.bookmark_id, tags);

      const data = await this.getOne(result.user_id, result.bookmark_id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async addTags(bookmark_id, tags) {
    try {
      for (let i = 0; i < tags.length; i++) {
        let tag = (
          await db.query(`SELECT * FROM tags WHERE title = $1`, [tags[i].title])
        ).rows[0];

        if (!tag) {
          tag = (
            await db.query(`INSERT INTO tags (title) VALUES ($1) RETURNING *`, [
              tags[i].title,
            ])
          ).rows[0];
        }

        await db.query(
          `INSERT INTO bookmarks_tags (bookmark_id, tag_id) VALUES ($1, $2)`,
          [bookmark_id, tag.tag_id]
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update(
    title,
    link,
    description = '',
    tags,
    user_id,
    bookmark_id
  ) {
    try {
      await db.query(
        `UPDATE bookmarks SET
						title = $1,
						link = $2,
						description = $3
					WHERE user_id = $4 AND bookmark_id = $5`,
        [title, link, description, user_id, bookmark_id]
      );
      await db.query(`DELETE FROM bookmarks_tags WHERE bookmark_id = $1`, [
        bookmark_id,
      ]);

      await this.addTags(bookmark_id, tags);

      const result = await this.getOne(user_id, bookmark_id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(user_id, bookmark_id) {
    try {
      await db.query(`DELETE FROM bookmarks_tags WHERE bookmark_id = $1`, [
        bookmark_id,
      ]);

      await db.query(
        'DELETE FROM bookmarks WHERE user_id = $1 AND bookmark_id = $2',
        [user_id, bookmark_id]
      );
      return { bookmark_id: bookmark_id };
    } catch (error) {
      console.log(error);
    }
  }

  static async getBookmarkTags(bookmark_id) {
    try {
      return (
        await db.query(
          `SELECT tag_id, title FROM bookmarks_tags bt 
          JOIN tags USING (tag_id)
          WHERE bookmark_id = $1
          ORDER BY title`,
          [bookmark_id]
        )
      ).rows;
    } catch (error) {
      console.log(error);
    }
  }
}

export default BookmarkService;
