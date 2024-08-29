'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * A custom component that has all validation schemas' feedback messages,
 * it is used to translate the stored messages according to the current application's `locale`.
 * The main idea is to save the message slug inside the schema, then use this slug as a query index to get the appropriate message from the component storage content.
 *
 * If you want to add a new validation feedback message, please add it to this component first, then copy the message key and use it as a slug in the schema,
 * and finally use this component where you'd like to display the message and pass the message slug to it using the errors returned from the schema.
 *
 * @param {string} messageSlug - The message code/slug to use in indexing the validation messages content
 * @returns {React.JSX.Element} The validation message as a React JSX
 *
 * @example
 * // 1) Prepare your schema
 * {..., password: yup.required('A password is required!')}
 * // 2) Save your message in the ValidationFeedback component content object and give it a key
 * content: {..., signup_password_required: 'A password is required!'}
 * // 3) Replace the message in the schema with the corresponding key you just created
 * {..., password: yup.required('signup_password_required')}
 * // 4) Use the component anywhere by giving it the message key as a slug and it'll return the corresponding message
 * <ValidationFeedback messageSlug='signup_password_required'/>
 * @returns "A password is required!" / "كلمة المرور مطلوبة!
 */
export default function ValidationFeedback({ messageSlug }: { messageSlug: string | undefined }) {
  const [message, setMessage] = useState<string | null>(null);
  const t = useTranslations();

  const content = useMemo(() => {
    return {
      signup_email_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      signup_email_required: t('UB0DuPfXh-Os6BqLAzj7D'),
      signup_password_min: t('d_IXbynvWXr8rNj67uwjz'),
      signup_password_required: t('BMZ9xwfBBlHfnDrCMkgsQ'),
      signup_confirm_match: t('4UVdTqV_1x2kl9AOXb59V'),
      signup_confirm_required: t('MESB_otRZPcU-sSLrpPex'),
      signup_phone_min: t('NB1adiL7iBCHaH15ULvaU'),
      signup_phone_max: t('6Dprp6bvZfbQLmD1Ss1Lp'),
      signup_phone_required: t('vVwZ-5ilWqeQbttzXC65N'),
      login_email_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      login_email_required: t('UB0DuPfXh-Os6BqLAzj7D'),
      login_password_min: t('d_IXbynvWXr8rNj67uwjz'),
      login_password_required: t('BMZ9xwfBBlHfnDrCMkgsQ'),
      recover_email_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      recover_email_required: t('UB0DuPfXh-Os6BqLAzj7D'),
      confirm_code_min: t('iWDgNOQSgdQGduxpHFUiX'),
      confirm_code_max: t('d5kljJcyE3-JCJNEPqN-p'),
      confirm_code_required: t('Cjf2mqI-SCZhNdQ5vLh8y'),
      username_firstname_min: t('-udsgdDFF5zrp7ORDnJjL'),
      username_firstname_max: t('vOzvDpWDWQCjSo8RtsRCp'),
      username_firstname_required: t('-ILt3UwanBuYe8AZuj32f'),
      username_lastname_min: t('Z-Hw6KoJpNLVzveMBwZDp'),
      username_lastname_max: t('dbPAMs7XSacMtvONwl_P-'),
      username_lastname_required: t('TxLZNPxz0_ymrgQ9mtkRe'),
      update_displayname_min: t('dHonywpzVR9RwBik2t7ZH'),
      update_displayname_max: t('oT_DZicq4dQpXPNsJAgnF'),
      update_displayname_required: t('oZds4FI_nglY_7WWsnY-3'),
      update_newpassword_min: t('d_IXbynvWXr8rNj67uwjz'),
      update_newpassword_max: t('tPVBeIK18n7Vdz4m6cmkF'),
      update_newpassword_required: t('BMZ9xwfBBlHfnDrCMkgsQ'),
      update_confirmpassword_match: t('4UVdTqV_1x2kl9AOXb59V'),
      update_confirmpassword_required: t('MESB_otRZPcU-sSLrpPex'),
      update_email_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      update_email_required: t('UB0DuPfXh-Os6BqLAzj7D'),
      contact_name_required: t('fREeu_43g6zB__Z5eKoRu'),
      contact_email_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      contact_email_required: t('UB0DuPfXh-Os6BqLAzj7D'),
      contact_subject_required: t('u_xUk8nGZPyZ-Ji90OHlh'),
      contact_message_required: t('2C345jcCT66DlpX3UzNa0'),
      editprofile_firstname_min: t('ndAQdCk1pA_Nl_Qs7BHtm'),
      editprofile_displayname_min: t('bJvnPmP7Lzun2bjVToK8A'),
      editprofile_email_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      editprofile_email_required: t('UB0DuPfXh-Os6BqLAzj7D'),
      editprofile_confirmcode_required: t('ChI4q5rvC0YX80wSb4QwJ'),
      editprofile_password_min: t('d_IXbynvWXr8rNj67uwjz'),
      editprofile_confirmpassword_match: t('4UVdTqV_1x2kl9AOXb59V'),
      share_sender_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      share_sender_required: t('3Pn8scrDIPJMPtekyMrEW'),
      share_recipient_invalid: t('xKFQH_dcDYGa38HiVU9gp'),
      share_recipient_required: t('ZnbNCQYnhGG37YYUTnC6C'),
      place_id_required: t('u_1S5yljwMgXaA5cNUbkO'),
      transfers_pickup_min: t('vFkakyCsBB5gBPcVUbvVM'),
      transfers_pickup_max: t('89efADiIt7GedpE1Ehml3'),
      transfers_dropoff_min: t('1xZ6us1KItmUxgjtu4RtM'),
      transfers_dropoff_max: t('85fCzt_xTqLDP-esGvHRA'),
      transfers_locations_different: t('JxdrKzwwez1fR2AFflShH'),
      flights_code_required: t('v3WYhi5zwT8QLXN24xxS9'),
      trip_origin_min: t('N-bRzVgy2dmS_QE5pdFFj'),
      trip_destination_min: t('m6SKzXg-HBnsTkJvNz6-w'),
      trip_date_required: t('jrLzZVFlfimNC-8V65mqd'),
      trip_date_min: t('qe6u5lpN7Yw4ELNVBslZo'),
      trip_date_max: t('2c_j6ETW6vzZiH4m4PjDF'),
      searchbox_trips_required: t('Dat5gU02aYM5_wQlC-jM4'),
      searchbox_trips_min: t('-hKaI5c8_yVN-bNCfQKVw'),
      searchbox_trips_different: t('zTiRPlxneohaeX2uq4WAy'),
      searchbox_trip_different: t('tG4sL-FkNvKyvDctCiJB5'),
      hotels_destination_code: t('1npNkfzfPBsQdGAXcG1mr'),
      hotels_destination_name: t('ltUaqqIfb0wAjO9UV9EDH'),
      hotels_destination_phrase: t('5vbzzy2o4fdk5LxVPFmsP'),
      hotels_destination_city: t('ZJ0lMfgXY4QZjf5oasY4M'),
      hotels_destination_country: t('qlgEFR538MjTEOjltlcXK'),
      hotels_destination_location_required: t('Z5Lun9LTYpfGYBjVxtk84'),
      hotels_destination_location_type: t('sqW2KJ9iWJfvqp5vaKwIa'),
      hotels_destination_coordinates_required: t('kk_xBK-7oBF1-cMksRk_0'),
      hotels_destination_coordinates_min: t('rL7Qmkct0i-eKXimiu4RY'),
      hotels_destination_coordinates_max: t('JrylfUA3v3sA_0U-tG-fj'),
      hotels_destination_place: t('C8yHr_gcgEoWgrA712w2T'),
      hotels_destination_min: t('m6SKzXg-HBnsTkJvNz6-w'),
      hotels_destination_required: t('0Of7uqxLGIBAqzCWP75Tm'),
      hotels_date_required: t('qJzGZiejhdp-o9Tg-wFuz'),
      hotels_guests_room: t('oAhRnci6G0SmADUU2qGEz'),
      hotels_guests_adult: t('AQplUqDCT07rpgy5-LMkj'),
      hotels_guests_child: t('H28Oj9rXZjpmHHtN-i8YJ'),
      hotels_guests_required: t('RgwPVfAhBGhoopb12lJaG'),
    };
  }, [t]);

  useEffect(() => {
    setMessage(content[messageSlug as keyof typeof content]);
  }, [messageSlug, content]);

  return <>{message}</>;
}
