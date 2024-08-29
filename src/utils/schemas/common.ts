import * as yup from 'yup';

const ContactUsSchema = yup.object({
  name: yup.string().required('contact_name_required'),
  email: yup.string().email('contact_email_invalid').required('contact_email_required'),
  subject: yup.string().required('contact_subject_required'),
  message: yup.string().required('contact_message_required'),
});

const EditProfileSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'editprofile_name_min')
    .when('lastName', {
      is: true,
      then: (schema) => schema.min(0),
    }),
  lastName: yup.string(),
  displayName: yup.string().min(2, 'editprofile_displayname_min'),
  email: yup.string().min(1, 'editprofile_email_required').email('editprofile_email_invalid'),
  confirmCode: yup.string().min(3, 'editprofile_confirmcode_required'),
  password: yup.string().min(8, 'editprofile_password_min'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'editprofile_confirmpassword_match'),
});

const shareModalSchema = yup.object({
  yourEmail: yup.string().required('share_sender_required').email('share_sender_invalid'),
  toEmail: yup.string().required('share_recipient_required').email('share_recipient_invalid'),
  message: yup.string(),
});

const soloAdvertiserSchema = yup.object().shape({
  passengers: yup.array().of(yup.number().min(0).required()).required(),
  cabin: yup
    .object()
    .shape({
      id: yup.string().required(),
      title: yup.string().required(),
    })
    .required(),
  tripType: yup.string().oneOf(['round-trip', 'one-way', 'multi-city']).required(),
  direct: yup.boolean().required(),
  trips: yup
    .array()
    .of(
      yup.object().shape({
        origin: yup
          .array()
          .of(
            yup.object().shape({
              code: yup.string().required(),
              name: yup.string().required(),
              phrase: yup.string().required(),
              cityCode: yup.string().required(),
              countryCode: yup.string().required(),
              location: yup
                .object()
                .shape({
                  type: yup.string().required(),
                  coordinates: yup.array().of(yup.number().required()).length(2),
                })
                .required(),
              placeType: yup.string().required(),
            }),
          )
          .required()
          .length(1),
        destination: yup.array().of(
          yup.object().shape({
            code: yup.string().required(),
            name: yup.string().required(),
            phrase: yup.string().required(),
            cityCode: yup.string().required(),
            countryCode: yup.string().required(),
            location: yup
              .object()
              .shape({
                type: yup.string().required(),
                coordinates: yup.array().of(yup.number().required()).length(2),
              })
              .required(),
            placeType: yup.string().required(),
          }),
        ),
        date: yup.array().of(yup.date().required()).min(2).max(2),
      }),
    )
    .required(),
});
export { ContactUsSchema, EditProfileSchema, shareModalSchema, soloAdvertiserSchema };
