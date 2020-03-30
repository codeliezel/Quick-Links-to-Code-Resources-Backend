import {
  signUp, signIn, details, signUpFields, addLinks,
} from './validators/rules';
  
const getValidator = (validationName) => {
  const rules = {
    signUp, signIn, details, signUpFields, addLinks,
  };
  
  return rules[validationName];
};
  
export default getValidator;
