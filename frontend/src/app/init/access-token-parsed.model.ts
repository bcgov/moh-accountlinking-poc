import { KeycloakTokenParsed } from 'keycloak-js';


export interface AccessTokenParsed extends KeycloakTokenParsed {
  acr: string;
  'allowed-origins': string[];
  aud: string;
  auth_time: number;
  azp: string;
  iss: string;
  jti: string;
  scope: string;
  typ: string;
  sub: string;
  preferred_username: string;
}
