import * as Yup from 'yup';
import RegexExpression from '~/constants/regex';

export class ValidationRules {
  static URL = Yup.string().url('Please enter a valid URL');
  static REQUIRED = Yup.string().required('Please fill this field');

  static company = {
    category: Yup.string().required('category is required'),
    website: Yup.string()
      .required('company website is required')
      .url('please enter a valid URL'),
    contact_phone: Yup.string()
      .required('company phone number is required')
      .matches(
        RegexExpression.mobileNumber,
        'please enter a valid phone number',
      )
      .matches(
        RegexExpression.phoneNumber,
        'phone number must include country code',
      ),
  };

  static userDetails = {
    email: Yup.string()
      .required('email is required')
      .email('enter a valid email'),

    username: Yup.string()
      .required('username is required')
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'username can only contain letters, numbers and underscores',
      ),
    firstname: Yup.string()
      .required('firstname is required')
      .matches(/^[a-zA-Z]+$/, 'firstname can only contain letters'),
    lastname: Yup.string()
      .required('lastname is required')
      .matches(/^[a-zA-Z]+$/, 'lastname can only contain letters'),
    middlename: Yup.string().matches(
      /^[a-zA-Z]+$/,
      'middlename can only contain letters',
    ),
    phone_number: Yup.string()
      .matches(
        RegexExpression.mobileNumber,
        'Please enter a valid phone number',
      )
      .matches(
        RegexExpression.phoneNumber,
        'Phone number must include country code',
      ),
    gender: Yup.string().required('gender is required'),
  };
}
