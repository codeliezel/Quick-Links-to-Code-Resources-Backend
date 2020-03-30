import { users } from '../database/models/index';
import { Helper } from '../utils/index';

const { generateToken, hashPassword, comparePassword } = Helper;

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
    const {
      userName, firstName, lastName, email, password, phoneNumber,
    } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      const newUser = new users({
        userName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
      });
      const token = generateToken(newUser._id);
      await newUser.save();
      return res.status(201).json({
        status: 201,
        message: 'Success!',
        token,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }

  /**
   * @method signIn
   * @description Method for signing up users
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async signIn(req, res) {
    const { email, password } = req.body;
    const userSignIn = await users.findOne({ email });
    try {
      switch (true) {
        case (!userSignIn):
          res.status(401).json({ status: 401, error: 'This email was not found.' });
          break;
        case (!comparePassword(userSignIn.password, password)):
          res.status(401).json({ status: 401, error: 'Incorrect Password.' });
          break;
        default:
          // eslint-disable-next-line no-underscore-dangle
          const token = await generateToken(userSignIn._id);
          const {
            _doc: {
              userName, firstName, lastName, phoneNumber,
            },
          } = userSignIn;
          res.status(200).json({
            status: 200,
            message: 'Success!',
            data: {
              userName,
              firstName,
              lastName,
              email,
              phoneNumber,
            },
            token,
          });
          break;
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }

  /**
   * @method updateUserDetails
   * @description Method for updating user details
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async updateUserDetails(req, res) {
    const {
      firstName, userName, lastName, phoneNumber,
    } = req.body;
    try {
      const { _id } = req.params;
      await users.findOneAndUpdate(
        { _id },
        {
          firstName, userName, lastName, phoneNumber,
        },
        { new: true },
      );
      if (req.user._id !== _id) {
        return res.status(401)
          .json({
            status: 401,
            error: 'Acess denied!',
          });
      }
      return res.status(200).json({
        status: 200,
        message: 'Success!',
        data: {
          userName, firstName, lastName, phoneNumber,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'An error occurred.' });
    }
  }
}

export default UserController;
