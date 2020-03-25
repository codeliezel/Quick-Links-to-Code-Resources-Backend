import { users } from '../database/models/index';

/**
 * @class UserValidation
 * @description controller for user validation
 * @exports UserController
 */
class UserValidation {
  /**
   * @method userEmail
   * @description Method for checking is user email exists
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async userVal(req, res, next) {
    const { email, userName, phoneNumber } = req.body;
    const userEmail = await users.findOne({ email });
    const TheuserName = await users.findOne({ userName });
    const userPnum = await users.findOne({ phoneNumber });
    try {
      if (userEmail) {
        return res.status(409).json({ status: 409, error: 'This email exists already.' });
      }
      if (TheuserName) {
        return res.status(409).json({ status: 409, error: 'This username exists already.' });
      }
      if (userPnum) {
        return res.status(409).json({ status: 409, error: 'This phone number exists already.' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }
}

export default UserValidation;
