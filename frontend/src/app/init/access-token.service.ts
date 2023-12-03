import { Injectable } from '@angular/core';

import { Observable, from, map } from 'rxjs';

import { KeycloakService } from 'keycloak-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessTokenParsed } from './access-token-parsed.model';


export interface IAccessTokenService {
  token(): Observable<string>;
  decodeToken(): Observable<AccessTokenParsed | null>;
  clearToken(): void;
}

@Injectable({
  providedIn: 'root',
})
export class AccessTokenService implements IAccessTokenService {
  private jwtHelper: JwtHelperService;

  public constructor(private keycloakService: KeycloakService) {
    this.jwtHelper = new JwtHelperService();
  }

  public token(): Observable<string> {
    return from(this.keycloakService.getToken());
  }

  public decodeToken(): Observable<AccessTokenParsed> {
    return this.token().pipe(
      map((token: string) => {
        const accessToken = this.jwtHelper.decodeToken(token);
        if (accessToken == null) {
          throw new Error('Token could not be decoded');
        }
        return accessToken;
      })
    );
  }

  public clearToken(): void {
    this.keycloakService.clearToken();
  }
}
