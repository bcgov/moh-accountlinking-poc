import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  production: true,
  applicationUrl: 'http://localhost:8081',
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'ExistingRealm',
    clientId: 'frontend',
  },
};
