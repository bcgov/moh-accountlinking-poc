import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080',
          realm: 'master',
          clientId: 'frontend',
        },
        initOptions: {
          // this will solved the error
          checkLoginIframe: false
        }
      });
}
