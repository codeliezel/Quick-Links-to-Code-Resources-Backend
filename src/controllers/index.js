import UserController from './users';
import LinkController from './links';

const { signUp, signIn, updateUserDetails } = UserController;
const {
  addLink, getLink, getAllLinks, updateLink, deleteLink,
} = LinkController;
export {
  signUp, signIn, updateUserDetails, addLink, getLink, getAllLinks, updateLink, deleteLink,
};
