import * as yup from 'yup';

const SignUpSchema = yup.object({
  email: yup
    .string()
    .email('signup_email_invalid')
    .required('signup_email_required')
    .label('Email'),
  password: yup
    .string()
    .min(8, 'signup_password_min')
    .required('signup_password_required')
    .label('Password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'signup_confirm_match')
    .required('signup_confirm_required')
    .label('Confirm Password'),
  // phoneNumber: yup
  //   .string()
  //   .min(11, 'Phone number must be at least 11 digits')
  //   .max(25, 'Phone number must be less than 25 digits')
  //   .required('Phone number is required')
  //   .label('Phone Number'),
});

const LoginSchema = yup.object({
  email: yup.string().email('login_email_invalid').required('login_email_required').label('Email'),
  password: yup
    .string()
    .min(8, 'login_password_min')
    .required('login_password_required')
    .label('Password'),
  remeberMe: yup.boolean().label('Remember Me').default(false),
});

const RecoverEmailSchema = yup.object({
  email: yup
    .string()
    .email('recover_email_invalid')
    .required('recover_email_required')
    .label('Email'),
});

const ConfirmEmailSchema = yup.object({
  confirmCode: yup
    .string()
    .min(4, 'confirm_code_min')
    .max(25, 'confirm_code_max')
    .required('confirm_code_required')
    .label('Code'),
});

const UpdateUserNameSchema = yup.object({
  firstName: yup
    .string()
    .min(4, 'username_firstname_min')
    .max(25, 'username_firstname_max')
    .required('username_firstname_required')
    .label('First Name'),
  lastName: yup
    .string()
    .min(4, 'username_lastname_min')
    .max(25, 'username_lastname_max')
    .required('username_lastname_required')
    .label('First Name'),
});

const UpdateDisplayNameSchema = yup.object({
  displayName: yup
    .string()
    .min(4, 'update_displayname_min')
    .max(25, 'update_displayname_max')
    .required('update_displayname_required')
    .label('Display name'),
});

const UpdatePassSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'update_newpassword_min')
    .max(25, 'update_newpassword_max')
    .required('update_newpassword_required')
    .label('Password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'update_confirmpassword_match')
    .required('update_confirmpassword_required'),
});

const UpdateEmailSchema = yup.object({
  email: yup
    .string()
    .email('update_email_invalid')
    .required('update_email_required')
    .label('Email'),
  confirmCode: yup.string().optional().label('Code'),
});

export {
  ConfirmEmailSchema,
  LoginSchema,
  RecoverEmailSchema,
  SignUpSchema,
  UpdateDisplayNameSchema,
  UpdateEmailSchema,
  UpdatePassSchema,
  UpdateUserNameSchema,
};
