import { init, Applications } from '@kinde/management-api-js';

export const getConnections = async () => {
  if (!process.env.KINDE_DOMAIN) {
    throw new Error('KINDE_DOMAIN environment variable is not set');
  }

  init({
    domain: process.env.KINDE_DOMAIN,
    clientId: process.env.KINDE_CLIENT_ID,
    clientSecret: process.env.KINDE_CLIENT_SECRET,
  });

  const { connections } = await Applications.getApplicationConnections({
    applicationId: '0b529d71a0d849b49679faf2fe6e4458',
  });

  return connections;
};
