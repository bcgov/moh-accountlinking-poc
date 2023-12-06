import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { AccessTokenService } from '../../auth/access-token.service';
import { Observable, map } from 'rxjs';
import { AccessTokenParsed } from '../../auth/access-token-parsed.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService, AccessTokenService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  token$: Observable<AccessTokenParsed | null> = new Observable<null>();

  public constructor(
    private authService: AuthService,
    private accessTokenService: AccessTokenService,
  ) {
    accessTokenService
      .token()
      .pipe(
        map((data) => {
          console.log('data', data);
          if (data) {
            this.token$ = accessTokenService.decodeToken();
            console.log('this.token$', this.token$);
          }
        }),
      )
      .subscribe();
  }

  public linkAccount(): void {
    this.authService.linkAccount();
  }

  public logout(): void {
    this.authService.logout(environment.applicationUrl).subscribe();
  }
}
