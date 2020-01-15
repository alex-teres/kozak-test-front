import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === 'http://localhost:3000/login' || req.url === 'http://localhost:3000/signUp') {
            return next.handle(req);
        }
        const idToken = localStorage.getItem('jwt');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', idToken)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}