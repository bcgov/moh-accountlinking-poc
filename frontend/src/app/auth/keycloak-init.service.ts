import { Injectable } from '@angular/core';
import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitService {
  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
  ) {}

  public async load(): Promise<void> {
    const authenticated = await this.keycloakService.init(
      this.getKeycloakOptions(),
    );

    this.keycloakService.getKeycloakInstance().onTokenExpired = (): void => {
      this.keycloakService
        .updateToken()
        .catch(() => this.router.navigateByUrl('/login'));
    };

    if (authenticated) {
      // Force refresh to begin expiry timer
      await this.keycloakService.updateToken(-1);
    }
  }

  private getKeycloakOptions(): KeycloakOptions {
    return {
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        // this will solved the error
        checkLoginIframe: false,
      },
    };
  }
}
