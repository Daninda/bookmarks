import jwt from 'jsonwebtoken';

class TokenService {
	validateAccessToken(token) {
		try {
			const payload = jwt.verify(token, process.env.ACCESS_SECRET);
			return payload;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const payload = jwt.verify(token, process.env.REFRESH_SECRET);
			return payload;
		} catch (error) {
			return null;
		}
	}

	generateTokens(payload) {
		const accessToken = jwt.sign(
			{ user_id: payload.user_id, email: payload.email },
			process.env.ACCESS_SECRET,
			{
				expiresIn: process.env.ACCESS_EXPIRES_IN,
			}
		);

		const refreshToken = jwt.sign(
			{ user_id: payload.user_id, email: payload.email },
			process.env.REFRESH_SECRET,
			{
				expiresIn: process.env.REFRESH_EXPIRES_IN,
			}
		);

		return {
			accessToken,
			refreshToken,
		};
	}
}

export default new TokenService();
