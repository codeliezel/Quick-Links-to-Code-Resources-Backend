import { authenticate } from './authenticate';
import validate from './validation';
import UserValidation from './users';

const { verifyToken } = authenticate;
const { userVal } = UserValidation;


export {
  verifyToken, validate, userVal,
};
