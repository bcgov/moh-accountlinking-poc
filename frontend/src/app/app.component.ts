import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './init/auth.service';
import { AccessTokenService } from './init/access-token.service';
import { Observable } from 'rxjs';
import { AccessTokenParsed } from './init/access-token-parsed.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [AuthService, AccessTokenService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'linking-frontend';
  token$: Observable<AccessTokenParsed>;

  public constructor(private authService: AuthService, private accessTokenService: AccessTokenService) {
    this.token$ = accessTokenService.decodeToken();
  }

  public login(): void {
    this.authService.login({
      redirectUri: 'http://localhost:4200',
    })
    .subscribe();
  }

  logout() {
    this.authService.logout('http://localhost:4200').subscribe();
  }
}
