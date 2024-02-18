import http from './AxiosService';

class BookmarkService {
  async getAll() {
    return http.get('/api/bookmarks/');
  }

  async getOne(bookmark_id) {
    return http.get(`/api/bookmarks/${bookmark_id}`);
  }

  async create(title, link, description) {
    return http.post('/api/bookmarks/', {
      title: title,
      link: link,
      description: description,
    });
  }

  async update(bookmark_id, title, link, description) {
    return http.put(`/api/bookmarks/${bookmark_id}`, {
      title: title,
      link: link,
      description: description,
    });
  }

  async delete(bookmark_id) {
    return http.delete(`/api/bookmarks/${bookmark_id}`);
  }
}

export default new BookmarkService();
