import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import {Observable, throwError} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {PhoneValidationApiResponse} from '../model/phone-validaton-api-responce.model';
import {MatSnackBar} from '@angular/material/snack-bar';


/**
 * Error interceptor.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar) { }

  /**
   * Intercept http request.
   */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          filter((event: any) => event instanceof HttpResponse),
          map((event: HttpResponse<PhoneValidationApiResponse>) => {
            const {body} = event;
            // If the request didn't succeed, we display and alert with a message
            if (body && body.success === false) {
              // @ts-ignore
              const {code, info, type} = body.error;
              switch (code) {
                case 404: this.openSnackBar("The server is Down or no longer Exist !!"); break;
                case 101: this.openSnackBar("Invalid Credential !!"); break;
                case 103: this.openSnackBar("Invalid Request !!"); break;
                case 310: this.openSnackBar(info); break;
                case 104: this.openSnackBar("The maximum number of request has been reached !!"); break;
                case 105: this.openSnackBar("Your Subscription Don't allow the use of HTTPS !!"); break;
                case 102: this.openSnackBar("Invalid User !!"); break;
              }
              // And we transform the response to an error so that it will not be catch bu the subscribe fn.
              throw new HttpErrorResponse({
                error: info,
                headers: event.headers,
                status: code,
                statusText: type,
                // @ts-ignore
                url: event.url || null
              });
            } else {
              return event;
            }
          }));
    }

    // Display an alert
  openSnackBar(message: string) {
    this._snackBar.open(message, "Dismiss");
  }
}


