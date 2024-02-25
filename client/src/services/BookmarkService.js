import http from './AxiosService';

class BookmarkService {
  async getAll() {
    return http.get('/api/bookmarks/');
  }

  async getAllTags() {
    return http.get('/api/bookmarks/tags');
  }

  async getOne(bookmark_id) {
    return http.get(`/api/bookmarks/${bookmark_id}`);
  }

  async create(title, link, description, tags) {
    return http.post('/api/bookmarks/', {
      title: title,
      link: link,
      description: description,
      tags: tags,
    });
  }

  async update(bookmark_id, title, link, description, tags) {
    return http.put(`/api/bookmarks/${bookmark_id}`, {
      title: title,
      link: link,
      description: description,
      tags: tags,
    });
  }

  async delete(bookmark_id) {
    return http.delete(`/api/bookmarks/${bookmark_id}`);
  }
}

export default new BookmarkService();
