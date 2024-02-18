import BookmarkService from '../services/BookmarkService.js';

class Controller {
  async getAll(req, res, next) {
    try {
      const { user_id } = req.user;
      const result = await BookmarkService.getAll(user_id);
      return res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { user_id } = req.user;
      const { bookmark_id } = req.params;
      const result = await BookmarkService.getOne(user_id, bookmark_id);
      return res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { title, link, description } = req.body;
      const { user_id } = req.user;
      const result = await BookmarkService.create(
        title,
        link,
        description,
        user_id
      );
      return res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { title, link, description } = req.body;
      const { user_id } = req.user;
      const bookmark_id = +req.params.bookmark_id;
      await BookmarkService.update(
        title,
        link,
        description,
        user_id,
        bookmark_id
      );
      return res.send().status(200);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { user_id } = req.user;
      const { bookmark_id } = req.params;
      const result = await BookmarkService.delete(user_id, bookmark_id);
      return res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
