import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './init/auth.service';
import { AccessTokenService } from './init/access-token.service';
import { Observable, map } from 'rxjs';
import { AccessTokenParsed } from './init/access-token-parsed.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [AuthService, AccessTokenService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'linking-frontend';
  token$: Observable<AccessTokenParsed | null> = new Observable<null>();

  public constructor(
    private authService: AuthService,
    private accessTokenService: AccessTokenService,
  ) {
    accessTokenService
      .token()
      .pipe(
        map((data) => {
          if (data) {
            this.token$ = accessTokenService.decodeToken();
          }
        }),
      )
      .subscribe();
  }

  public linkAccount(): void {
    this.authService.linkAccount();
  }

  public login(): void {
    this.authService
      .login({
        redirectUri: environment.applicationUrl,
      })
      .subscribe();
  }

  public logout(): void {
    this.authService.logout(environment.applicationUrl).subscribe();
  }
}
