import {object, string} from 'yup';

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX = /^[0-9]*$/;

export const AddressSchema = {
  personelInfo: object({
    firstName: string().required('The first name field is required'),
    lastName: string().required('The last name field is required'),
    phoneNumber: string().required('The phone number field is required'),
    email: string().required('The email field is required'),
    country: string().required('The country field is required'),
    state: string().required('The state field is required'),
    city: string().required('The city field is required'),
    zipCode: string().required('The zipcode field is required'),
    street: string().required('The street field is required'),
  }),
};

export const ProifleSchema = {
  profile: object({
    displayName: string().required('The display name field is required'),
    firstName: string().required('The first name field is required'),
    lastName: string().required('The last name field is required'),
    email: string()
      .required('The email field is required')
      .matches(EMAIL_REGEX, {message: 'Invalid email'}),
  }),
};
