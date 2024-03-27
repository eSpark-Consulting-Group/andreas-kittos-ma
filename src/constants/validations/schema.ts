import {object, string} from 'yup';

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX =
  /^(\+357|00357|0)(?:2[0-9]{7}|9[0-9]{7})$|^(\+30|0030|0)?(2\d{9}|69\d{8})$|^(\+92|0092|0)?(3\d{9})$/;

export const AddressSchema = {
  personelInfo: object({
    firstName: string()
      .required('The first name field is required')
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        {message: 'Invalid First Name'},
      ),
    lastName: string()
      .required('The last name field is required')
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        {message: 'Invalid Last Name'},
      ),
    phoneNumber: string()
      .required('The phone number field is required')
      .matches(PHONE_REGEX, {
        message: 'Invalid Phone Number',
      }),
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
    phoneNumber: string()
      .min(10, 'Invalid Phone Number')
      .max(10)
      .matches(PHONE_REGEX, {
        message: 'Invalid Phone Number',
      })
      .nullable(),
  }),
};
