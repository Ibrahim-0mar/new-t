export const userData = (session: any) => {
  const {
    data: { user },
  } = session;
  const isNotCredentials = user.provider !== 'credentials';

  const userEmail = user?.email;

  const firstName = isNotCredentials ? user?.apiResponse?.firstName : user?.firstName || '';

  const lastName = isNotCredentials ? user?.apiResponse?.lastName : user?.lastName || '';

  const name = isNotCredentials
    ? user?.name
    : user?.name ||
      user?.firstName + ' ' + user?.lastName ||
      user?.email.slice(0, user?.email.indexOf('@'));

  const displayName = isNotCredentials ? user?.apiResponse?.displayName : user?.displayName;

  const mainAirport = isNotCredentials ? user?.apiResponse?.mainAirport : user?.mainAirport;

  const avatarUrl = isNotCredentials ? user?.apiResponse?.avatarUrl : user?.avatarUrl;

  const token = isNotCredentials ? user?.id_token : user?.token;

  return {
    name,
    firstName,
    lastName,
    displayName,
    userEmail,
    mainAirport,
    avatarUrl,
    token,
  };
};

export const ServerUserData = (session: any) => {
  const { user } = session;
  const isNotCredentials = user.provider !== 'credentials';

  const userEmail = user?.email;

  const firstName = isNotCredentials ? user?.apiResponse?.firstName : user?.firstName || '';

  const lastName = isNotCredentials ? user?.apiResponse?.lastName : user?.lastName || '';

  const name = isNotCredentials
    ? user?.name
    : user?.name ||
      user?.firstName + ' ' + user?.lastName ||
      user?.email.slice(0, user?.email.indexOf('@'));

  const displayName = isNotCredentials ? user?.apiResponse?.displayName : user?.displayName;

  const mainAirport = isNotCredentials ? user?.apiResponse?.mainAirport : user?.mainAirport;

  const avatarUrl = isNotCredentials ? user?.apiResponse?.avatarUrl : user?.avatarUrl;

  const token = isNotCredentials ? user?.id_token : user?.token;

  return {
    name,
    firstName,
    lastName,
    displayName,
    userEmail,
    mainAirport,
    avatarUrl,
    token,
  };
};
