import { Helper } from '../utils/index';

const { verifyToken } = Helper;

export const authenticate = {
  async verifyToken(req, res, next) {
    try {
      const { headers: { authorization } } = req;
      const token = authorization.split(' ')[1];
      if (!token || token === '') {
        return res.status(401).json({ status: '401', error: 'Access denied.' });
      }
      const decoded = await verifyToken(token);
      // if (!(decoded && decoded._id)) {
      //   return res.status(401).json({ status: '401', error: 'Access denied. We could not verify user' });
      // }
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
    }
  },
};
