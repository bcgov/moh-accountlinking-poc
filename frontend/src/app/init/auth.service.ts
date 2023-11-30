import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) { }

  public login(options?: KeycloakLoginOptions): Observable<void> {
    return from(this.keycloakService.login(options));
  }

  public logout(redirectUri?: string): Observable<void> {
    return from(this.keycloakService.logout(redirectUri));
  }
}
