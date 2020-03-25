import { check, body, param } from 'express-validator';


const nameRegex = /^[a-zA-Z]*$/;
const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
const phoneNumberRegExp = /^[0-9]*$/;
const userNameRegExp = /^[a-zA-Z0-9_.-]*$/;

const signUp = [
  check('firstName', 'The first name should contain only alphabets.')
    .matches(nameRegex)
    .trim(),
  check('lastName', 'The last name should contain only alphabets.')
    .matches(nameRegex)
    .trim(),
  check('phoneNumber', 'Invalid phone number.')
    .matches(phoneNumberRegExp)
    .isLength({ min: 11, max: 20 })
    .trim(),
  check('userName', 'The username should contain only alphabets, letters or characters like dot, dash and underscore')
    .matches(userNameRegExp)
    .trim(),
  check('password', 'The password should contain nothing less than 6 characters.')
    .matches(passRegExp),
  check('email', 'Please provide a valid email.')
    .isEmail()
    .isLength({ min: 3, max: 250 })
    .trim(),
];

const signUpFields = [
  check('firstName', 'Supply the first name.')
    .not()
    .isEmpty(),
  check('lastName', 'Supply the last name.')
    .not()
    .isEmpty()
    .trim(),
  check('phoneNumber', 'Supply the phone number.')
    .not()
    .isEmpty()
    .trim(),
  check('userName', 'Supply the username.')
    .not()
    .isEmpty()
    .trim(),
  check('password', 'Supply a password.')
    .not()
    .isEmpty()
    .trim(),
  check('email', 'Supply the email.')
    .not()
    .isEmpty()
    .trim(),
];

const signIn = [
  check('email', 'Please, supply the email.')
    .not()
    .isEmpty()
    .trim(),
  check('password', 'Please, supply the password.')
    .not()
    .isEmpty()
    .trim(),
];

const details = [
  check('firstName', 'The first name should contain only alphabets.')
    .matches(nameRegex)
    .trim(),
  check('lastName', 'The last name should contain only alphabets.')
    .matches(nameRegex)
    .trim(),
  check('phoneNumber', 'Invalid phone number.')
    .matches(phoneNumberRegExp)
    .isLength({ min: 11, max: 20 })
    .trim(),
  check('userName', 'The username should contain only alphabets, letters or characters like dot, dash and underscore')
    .matches(userNameRegExp)
    .trim(),
];

export {
  signUp, signIn, details, signUpFields,
};
