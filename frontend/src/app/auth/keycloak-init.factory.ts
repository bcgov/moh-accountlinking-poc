import { KeycloakInitService } from './keycloak-init.service';

export function initializeKeycloak(keycloakInitService: KeycloakInitService) {
  return (): Promise<void> => keycloakInitService.load();
}
