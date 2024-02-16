import bcrypt from 'bcrypt';
import ApiError from '../errors/ApiError.js';
import TokenService from './TokenService.js';
import UserService from './UserService.js';

class Service {
	async register(email, password) {
		if (await UserService.getOne(email)) {
			throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
		}
		const hashPassword = bcrypt.hashSync(password, 7);
		await UserService.create(email, hashPassword);

		const user = await UserService.getOne(email);

		const { accessToken, refreshToken } = TokenService.generateTokens({
			user_id: user.user_id,
			email: user.email,
		});

		return {
			user: {
				user_id: user.user_id,
				email: user.email,
			},
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
	}

	async login(email, password) {
		const user = await UserService.getOne(email);
		if (!user || !bcrypt.compareSync(password, user.password)) {
			throw ApiError.BadRequest('Неправильный логин или пароль');
		}

		const { accessToken, refreshToken } = TokenService.generateTokens({
			user_id: user.user_id,
			email: user.email,
		});

		return {
			user: {
				user_id: user.user_id,
				email: user.email,
			},
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
	}

	async refresh(oldRefreshToken) {
		if (!oldRefreshToken) {
			throw ApiError.Unauthorized();
		}

		const payload = TokenService.validateRefreshToken(oldRefreshToken);
		if (!payload) {
			throw ApiError.Unauthorized();
		}

		const user = await UserService.getOne(payload.email);

		const { accessToken, refreshToken } = TokenService.generateTokens({
			user_id: user.user_id,
			email: user.email,
		});

		return {
			user: {
				user_id: user.user_id,
				email: user.email,
			},
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
	}
}

export default new Service();
