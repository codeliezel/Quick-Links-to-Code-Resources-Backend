import { Helper } from '../utils/index';

const { verifyToken } = Helper;

export const authenticate = {
  async verifyToken(req, res, next) {
    try {
      const { headers: { authorization } } = req;
      const token = authorization.split(' ')[1];
      const decoded = await verifyToken(token);
      req.user = decoded;
      switch (true) {
        case (!token || token === ''):
          res.status(401).json({
            status: '401', error: 'Access denied.',
          });
          break;
        case (!(decoded && decoded.userId)):
          res.status(401).json({
            status: '401', error: 'Access denied. We could not verify user',
          });
          break;
        default:
          next();
      }
    } catch (error) {
      return res.status(500).json({ status: '401', error: 'Server error' });
    }
  },
};
