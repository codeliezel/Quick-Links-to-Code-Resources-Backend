import users from '../database/models/userModel';
import {Helper} from '../utils/index';

const {generateToken} = Helper

 /**
 * @class UserController
 * @description controller for users
 * @exports UserController
 */
class UserController {
  /**
   * @method signUp
   * @description Method for signing up users
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
    static async signUp(req, res) {
    const {username, firstname, lastname, email, password, phonenumber} = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new users({
        username, firstname, lastname, email,
         password: hashedPassword, phonenumber});
         const token = generateToken(user._id, user.isAdmin);
          await newUser.save();
          return res.status(201).json({
            status: 201,
            message: 'Successfully signed up',
            data: newUser,
            token,
          });
        }
}

export default UserController