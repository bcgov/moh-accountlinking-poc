export interface AppEnvironment {
  production: boolean;
  applicationUrl: string;
  keycloak: {
    url: string;
    realm: string;
    clientId: string;
  };
}
