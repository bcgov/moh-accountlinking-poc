import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  production: false,
  applicationUrl: 'http://localhost:4200',
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'master',
    clientId: 'frontend'
  }
};
