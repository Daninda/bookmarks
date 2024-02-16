import ApiError from '../errors/ApiError.js';
import TokenService from '../services/TokenService.js';

export default function Middleware(req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			next(ApiError.Unauthorized());
		}

		const accessToken = authHeader.split(' ')[1];
		if (!accessToken) {
			next(ApiError.Unauthorized());
		}

		const payload = TokenService.validateAccessToken(accessToken);
		if (!payload) {
			next(ApiError.Unauthorized());
		}

		req.user = {
			user_id: payload.user_id,
			email: payload.email,
		};

		next();
	} catch (error) {
		next(ApiError.Unauthorized());
	}
}
