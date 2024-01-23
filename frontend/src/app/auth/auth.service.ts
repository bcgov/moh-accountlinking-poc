import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';
import { Observable, from, map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AccessTokenService } from './access-token.service';
import { AccessTokenParsed } from './access-token-parsed.model';
import cryptojs from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$: Observable<AccessTokenParsed | null> = new Observable<null>();

  constructor(
    private keycloakService: KeycloakService,
    private accessTokenService: AccessTokenService,
  ) {
    this.accessTokenService
      .token()
      .pipe(
        map((data) => {
          if (data) {
            this.token$ = this.accessTokenService.decodeToken();
          }
        }),
      )
      .subscribe();
  }

  public linkAccount(): void {
    // The code for the relevant endpoint on the server side can be found at:
    // https://github.com/keycloak/keycloak/blob/main/services/src/main/java/org/keycloak/services/resources/IdentityBrokerService.java#L207

    // the random nonce
    const nonce = uuidv4(); // should be a random UUID
    const sessionState =
      this.keycloakService.getKeycloakInstance().tokenParsed?.session_state;
    const clientId = environment.keycloak.clientId; // the client the user has a session with: 'PIDP-WEBAPP' or 'account', see note at end
    const provider = 'bcprovidertest'; // This is the IDP you are linking to, *not* the IDP you are currently logged into

    const payloadString = nonce + sessionState + clientId + provider;
    const digest = cryptojs.SHA256(payloadString);
    const hash = digest.toString(cryptojs.enc.Base64url);

    const redirectUri = encodeURIComponent(environment.applicationUrl);
    const query = `?nonce=${nonce}&hash=${hash}&client_id=${clientId}&redirect_uri=${redirectUri}`;
    const url = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/broker/${provider}/link${query}`;

    window.location.replace(url);
  }

  // Note on what clientId to use:
  // Account linking requires either using the "account" client, or for the user to have the "manage account" or "manage account links" role in whatever client they are logged into.
  // Users don't currently have that role in the PIDP-WEBAPP client, so using that clientId will result in a "not allowed" response (a 302 redirect to <redirect URI>/?link_error=not_allowed).
  // Using "account" as the clientId causes a different error: a 400 Bad Request due to our application not being a valid redirect URI of the "account" client.

  // Technically, the token has both "PIDP-WEBAPP" and "account" as audiences (the "aud" claim), but may in practice only have an active session with "PIDP-WEBAPP" and not "account".
  // In that case, updating the valid redirect URIs of the "account" client and using "account" as the clientId will result in a 400 Bad Request as before but will be recorded in the error events as "INVALID_TOKEN" instead of "INVALID_REDIRECT_URI".

  public login(options?: KeycloakLoginOptions): Observable<void> {
    return from(this.keycloakService.login(options));
  }

  public isLoggedIn(): Observable<boolean> {
    return of(this.keycloakService.isLoggedIn());
  }

  public logout(redirectUri?: string): Observable<void> {
    return from(this.keycloakService.logout(redirectUri));
  }
}
