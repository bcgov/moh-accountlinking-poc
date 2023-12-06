import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((authenticated: boolean): boolean | UrlTree => {
      if (authenticated) {
        return true;
      } else {
        const queryParams =
          router.getCurrentNavigation()?.extractedUrl.queryParams;
        const urlTree = router.createUrlTree(['/login'], {
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        });
        return urlTree;
      }
    }),
    catchError((error) => {
      console.error('Error occurred during access validation: ', error);
      return of(false);
    }),
  );
};
