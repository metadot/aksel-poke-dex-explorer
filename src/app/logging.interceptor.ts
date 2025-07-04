import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event) => console.log('HTTP Response:', event),
      error: (err) => console.error('HTTP Error:', err),
    })
  );
};
