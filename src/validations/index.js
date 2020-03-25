import {
  signUp, signIn, details, signUpFields,
} from './validators/rules';
  
const getValidator = (validationName) => {
  const rules = {
    signUp, signIn, details, signUpFields,
  };
  
  return rules[validationName];
};
  
export default getValidator;
