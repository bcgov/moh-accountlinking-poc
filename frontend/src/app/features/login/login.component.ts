import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public constructor(private authService: AuthService) {}

  public login(): void {
    this.authService
      .login({
        redirectUri: environment.applicationUrl,
      })
      .subscribe();
  }
}
