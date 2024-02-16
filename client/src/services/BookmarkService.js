import http from './AxiosService';

class BookmarkService {
	async getAll() {
		return http.get('/api/bookmarks/all');
	}
}

export default new BookmarkService();
