import http from './AxiosService';

class AuthService {
	async register(email, password) {
		return http.post('/api/auth/register', {
			email: email,
			password: password,
		});
	}

	async login(email, password) {
		return http.post('/api/auth/login', {
			email: email,
			password: password,
		});
	}

	async refresh() {
		return http.post('/api/auth/refresh');
	}

	async logout() {
		return http.post('/api/auth/logout');
	}
}

export default new AuthService();
