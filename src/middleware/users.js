import { users } from '../database/models/index';

/**
 * @class UserValidation
 * @description controller for user validation
 * @exports UserController
 */
class UserValidation {
  /**
   * @method userVal
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
      switch (false) {
        case (!userEmail):
          return res.status(409).json({ status: 409, error: 'This email exists already.' });
        case (!TheuserName):
          return res.status(409).json({ status: 409, error: 'This username exists already.' });
        case (!userPnum):
          return res.status(409).json({ status: 409, error: 'This phone number exists already.' });
        default:
          next();
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }
}

export default UserValidation;
