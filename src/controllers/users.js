import users from '../database/models/userModel';

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
    const newUser = new users({username, firstname, lastname, email, password, phonenumber});
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}
}

export default UserController