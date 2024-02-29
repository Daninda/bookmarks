import { Router } from 'express';
import BookmarkController from '../controllers/BookmarkController.js';

const router = new Router();

router.get('/', BookmarkController.getAll);
router.get('/tags', BookmarkController.getAllUserTags);
router.get('/:bookmark_id', BookmarkController.getOne);
router.post('/', BookmarkController.create);
router.put('/:bookmark_id', BookmarkController.update);
router.delete('/:bookmark_id', BookmarkController.delete);

export default router;
