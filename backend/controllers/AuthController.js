import AuthService from '../services/AuthService.js';

class Controller {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const authData = await AuthService.register(email, password);

      return res
        .cookie('refreshToken', authData.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json({
          user: {
            user_id: authData.user.user_id,
            email: authData.user.email,
          },
          accessToken: authData.accessToken,
        });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const authData = await AuthService.login(email, password);

      return res
        .cookie('refreshToken', authData.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json({
          user: {
            user_id: authData.user.user_id,
            email: authData.user.email,
          },
          accessToken: authData.accessToken,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      return res.clearCookie('refreshToken').status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const authData = await AuthService.refresh(refreshToken);
      return res
        .cookie('refreshToken', authData.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json({
          user: {
            user_id: authData.user.user_id,
            email: authData.user.email,
          },
          accessToken: authData.accessToken,
        });
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
