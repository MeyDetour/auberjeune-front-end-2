import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {catchError, Observable, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FailureHandler} from '../services/failureHandler';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private failureHandler: FailureHandler, private router: Router, private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("intercept request ! ")
    let token = localStorage.getItem('token');


    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(req).pipe(
      catchError(error => {
        let message = this.getErrorMessage(error);
        console.log("Interfecept response with error :", error)

        this.failureHandler.setError(message)
        return throwError(() => new HttpErrorResponse({error: message, status: error.status}));


      })
    )
  }

  getErrorMessage(error: HttpErrorResponse) {
    const currentRoute = this.router.url

    console.log(currentRoute);
    if (error.status === 401) {
      if (currentRoute === '/admin/auth') {
        return "Identifiants incorrects. Veuillez réessayer.";
      } else {
        localStorage.removeItem('token'); // Supprimer le token
        this.router.navigate(['admin/auth']);
        return "Please login";
      }
    }

    if (error.error && error.error.message) {

      return error.error.message;
    } else if (error.status === 0) {
      this.router.navigate(['error']);

      return "Impossible de se connecter au serveur."

    }

    return `Erreur ${error.status}: ${error.message}`


  }


  //
  //
  // private handleError(error: HttpErrorResponse) {
  //
  //   if (error.error instanceof ErrorEvent) {
  //     // Erreur côté client
  //     this.setError('Client-side error:' + error.error.message);
  //     return throwError(() => new Error('Client-side error: ' + error.error.message));
  //
  //   } else {
  //     // Erreur côté serveur
  //     console.error(`Server-side error: ${error.status} - ${error.message}`);
  //     if (error.error.message) {
  //       this.setError(error.error.message);
  //       return throwError(() => new Error(error.error.message));
  //     }
  //   }
  //   this.setError('Something went wrong. Please try again later.');
  //   return throwError(() => new Error('Something went wrong. Please try again later.'));
  //
  // }
}

